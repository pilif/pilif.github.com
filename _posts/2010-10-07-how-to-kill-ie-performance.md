---
layout: post
title: How to kill IE performance
categories:
- programming
tags:
- ie
- javascript
- jquery
- performance
- Programming
- Software
- Solutions
status: publish
type: post
published: true
meta:
  _flattr_post_language: en_GB
  _flattr_post_category: text
  _flattr_post_hidden: "0"
  _flattr_btn_disabled: ""
  _edit_last: "1"
  _wp_old_slug: ""
---
While working on my day job, we are often dealing with huge data tables in HTML augmented with some JavaScript to do calculations with that data.

Think huge shopping cart: You change the quantity of a line item and the line total as well as the order total will change.

This leads to the same data (line items) having three representations:
<ol>
	<li>The model on the server</li>
	<li>The HTML UI that is shown to the user</li>
	<li>The model that's seen by JavaScript to do the calculations on the client side (and then updating the UI)</li>
</ol>
You might think that the JavaScript running in the browser would somehow be able to work with the data from 2) so that the third model wouldn't be needed, but due to various localization issues (think number formatting) and data that's not displayed but affects the calculations, that's not possible.

So the question is: Considering we have some HTML templating language to build 2), how do we get to 3).

Back in 2004 when I initially designed that system (using AJAX before it was widely called AJAX even), I hadn't seen <a href="http://video.yahoo.com/watch/111593/1710507">Crockford's lecture</a>s yet, so I still lived in the "JS sucks" world, where I've done something like this
{% highlight xml %}<!-- lots of TRs -->
<tr>
    <td>Column 1 <script>addSet(1234 /*prodid*/, 1 /*quantity*/, 10 /*price*/, /* and, later, more, stuff, so, really, ugly */)</script></td>
    <td>Column 2</td>
    <td>Column 3</td>
</tr>
<!-- lots of TRs -->
{% endhighlight %}
(Yeah - as I said: 2004. No object literals, global functions. We had a lot to learn back then, but so did you, so don't be too angry at me - we improved)

Obviously, this doesn't scale: As the line items got more complicated, that parameter list grew and grew. The HTML code got uglier and uglier and of course, cluttering the window object is a big no-no too. So we went ahead and built a beautiful design:
{% highlight xml %}<!-- lots of TRs -->
<tr class="lineitem" data-ps-lineitem='{"prodid": 1234, "quantity": 1, "price": 10, "foo": "bar", "blah": "blah"}'>
    <td>Column 1</td>
    <td>Column 2</td>
    <td>Column 3</td>
</tr>
<!-- lots of TRs -->{% endhighlight %}
The first iteration was then parsing that JSON every time we needed to access any of the associated data (and serializing again whenever it changed). Of course this didn't go that well performance-wise, so we began caching and did something like this (using jQuery):
{% highlight javascript %}$(function(){
    $('.lineitem').each(function(){
        this.ps_data = $.parseJSON($(this).attr('data-ps-lineitem'));
    });
});{% endhighlight %}
Now each DOM element representing one of these <tr>'s had a ps_data member which allowed for quick access. The JSON had to be parsed only once and then the data was available. If it changed, writing it back didn't require a re-serialization either - you just changed that property directly.

This design is reasonably clean (still not as DRY as the initial attempt which had the data only in that JSON string) while still providing enough performance.

Until you begin to amass datasets. That is.

Well. Until you do so and expect this to work in IE.

800 rows like this made IE lock up its UI thread for 40 seconds.

So more optimization was in order.

First,
{% highlight javascript %}$('.lineitem'){% endhighlight %}
will kill IE. Remember: IE (still) doesn't have getElementsByClassName, so in IE, jQuery has to iterate the whole DOM and check whether each elements class attribute contains "lineitem". Considering that IE's DOM isn't really fast to start with, this is a HUGE no-no.

So.
{% highlight javascript %}$('tr.lineitem'){% endhighlight %}
Nope. Nearly as bad considering there are still at least 800 tr's to iterate over.
{% highlight javascript %}$('#whatever tr.lineitem'){% endhighlight %}
Would help if it weren't 800 tr's that match. Using <a href="http://ajax.dynatrace.com/pages/">dynaTrace AJAX</a> (highly recommended tool, by the way) we found out that just selecting the elements alone (without the iteration) took more than 10 seconds.

So the general take-away is: Selecting lots of elements in IE is painfully slow. Don't do that.

But back to our little problem here. Unserializing that JSON at DOM ready time is not feasible in IE, because no matter what we do to that selector, once there are enough elements to handle, it's just going to be slow.

Now by chunking up the amount of work to do and using setTimeout() to launch various deserialization jobs we could fix the locking up, but the total run time before all data is deserialized will still be the same (or slightly worse).

So what we have done in 2004, even though it was ugly, was way more feasible in IE.

Which is why we went back to the initial design with some improvements:
{% highlight xml %}<!-- lots of TRs -->
<tr class="lineitem">
    <td>Column 1 <script>PopScan.LineItems.add({"prodid": 1234, "quantity": 1, "price": 10, "foo": "bar", "blah": "blah"});</script></td>
    <td>Column 2</td>
    <td>Column 3</td>
</tr>
<!-- lots of TRs -->{% endhighlight %}
*phew* crisis averted.

Loading time went back to where it was in the 2004 design. It was still bad though. With those 800 rows, IE was still taking more than 10 seconds for the rendering task. dynaTrace revealed that this time, the time was apparently spent rendering.

The initial feeling was that there's not much to do at that point.

Until we began suspecting the script tags.

Doing this:
{% highlight xml %}
<!-- lots of TRs -->
<tr class="lineitem">
    <td>Column 1</td>
    <td>Column 2</td>
    <td>Column 3</td>
</tr>
<!-- lots of TRs -->{% endhighlight %}
The page loaded instantly.

Doing this
{% highlight xml %}
<!-- lots of TRs -->
<tr class="lineitem">
    <td>Column 1 <script>1===1;</script></td>
    <td>Column 2</td>
    <td>Column 3</td>
</tr>
<!-- lots of TRs -->{% endhighlight %}
it took 10 seconds again.

Considering that IE's JavaScript engine runs as a COM component, this isn't actually that surprising: Whenever IE hits a script tag, it stops whatever it's doing, sends that script over to the COM component (first doing all the marshaling of the data), waits for that to execute, marshals the result back (depending on where the DOM lives and whether the script accesses it, possibly crossing that COM boundary many, many times in between) and then finally resumes page loading.

It has to wait for each script because, potentially, that JavaScript could call document.open() / document.write() at which point the document could completely change.

So the final solution was to loop through the server-side model twice and do something like this:
{% highlight xml %}<!-- lots of TRs -->
<tr class="lineitem">
    <td>Column 1 </td>
    <td>Column 2</td>
    <td>Column 3</td>
</tr>
<!-- lots of TRs -->
</table>
<script>
PopScan.LineItems.add({prodid: 1234, quantity: 1, price: 10, foo: "bar", blah: "blah"});
// 800 more of these
</script>{% endhighlight %}
Problem solved. Not too ugly design. Certainly no 2004 design any more.

And in closing, let me give you a couple of things you can do if you want to bring the performance of IE down to its knees:
<ul>
	<li>Use broad jQuery selectors. <code>$('.someclass')</code> will cause jQuery to loop through <em>all</em> elements on the page.</li>
	<li>Even if you try not to be broad, you can still kill performance: <code>$('div.someclass')</code>. The most help jQuery can expect from IE is getElementsByTagName, so while it's better than iterating <em>all</em> elements, it's still going over all div's on your page. Once it's more than 200, the performance extremely quickly falls down (probably doing some O(n^2) thing somehwere).</li>
	<li>Use a lot of &lt;script&gt;-tags. Every one of these will force IE to marshal data to the scripting engine COM component and to wait for the result.</li>
</ul>
Next time, we'll have a look at how to use jQuery's delegate() to handle common cases with huge selectors.
