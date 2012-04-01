---
layout: post
title: Flattening Arrow Code
tags:
- Opinions
- Programming
status: publish
type: post
published: true
meta: {}

---
<p>In an <a href="http://www.codinghorror.com/blog/archives/000486.html">equally named article</a>, the excellent (yes. Really. This is one of the blogs you HAVE to subscribe to) <a href="http://www.codinghorror.com/blog">Coding Horror</a> blog talks about flattening out deeply stacked IF-clauses in your code.</p>
<p>I so agree with the guy, though there seem to be two opinions in the matter of the points 1 and 4 in the list the article provides:</p>
<blockquote>
Replace conditions with guard clauses. This code..
</blockquote>
<p>Many people disagree. Sometimes because they say that Exceptions are a bad thing (I don't get that either) and sometimes because they says that a function should only have one return point</p>
<blockquote>
Always opportunistically return as soon as possible from the function. Once your work is done, get the heck out of there! This isn't always possible -- you might have resources you need to clean up. But whatever you do, you have to abandon the ill-conceived idea that there should only be one exit point at the bottom of the function.
</blockquote>
<p>I once had to work with code a intern has written for us. It was exactly written as Coding Horror tells you not to. It was PHP code and all of it basically took place in a biiig else-clause around the whole page, with a structure like this:</p>
<pre class="code">
if (!$authenticated){
   die('not authenticated');
else{
  // 1000 more lines of code, equally structured
}
</pre>
<p>This is a pain to read, understand and modify.</p>
<p>To <em>read</em> because the thing get's incrediby wide requiring you to scroll horizontally, to <em>understand</em> because you sometimes find an <tt>}else{</tt> not having the slightest idea where it belongs to, requiring you to scroll upwards for half a file to see the condition and to <em>modify</em> because PHP's parser is inherently bad at reporting the exact position missing or spurious braces, which is bound to happen when you extend the beast.</p>
<p>But back to the quote: I talked to that intern about his code style (there were other things) and he mostly agreed, but he refused to change those deeply stacked IF's. "<em>A function must only have one single point of return. Everything else is bad design</em>", he told me.</p>
<p>Point is. I kinda agree. Multiple exit points can make it hard to understand the workings of a function. But if it's a single, well definded condition that makes the function unable to continue or if the function somehow gets its result way early (like if it's able to read the data from a cache of some kind), IMHO there's nothing wrong with just stopping to work. That's easy to read and understand and certianly does not have above problems.</p>
<p>And of course every function should be short enough to fit on one screen, so scrolling is never neccessary and it's always obvious where that }else{ belongs to - at least without making you scroll.</p>
<p>Personally, I write code exactly as it is suggested in that article. And I try to keep my functions short. Like this, it's very easy to understand the code (most of the time) and thus to extend it. Even by third parties.</p>

<p>Christoph, do you agree? And: No, I'm not talking about that sort-by-material-group-thing. That <b>IS</b> unclean. I know that (and so do you now *evilgrin*)</p>
