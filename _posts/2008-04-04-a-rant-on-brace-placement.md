---
layout: post
title: A rant on brace placement
categories:
- Opinions
- Programming
- rant
- style
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
Many people consider it to be good coding style to have braces (in language that use them for block boundaries) on their own line. Like so:
{% highlight php %}
function doSomething($param1, $param2)
{
    echo "param1: $param1 / param2: $param2";
}
{% endhighlight %}
Their argument usually is that it clearly shows the block boundaries, thus increasing the readability. I, as a proponent of placing bracers at the end of the statement opening the block, strongly disagree. I would format above code like so:

{% highlight php %}
function doSomething($param1, $param2){
    echo "param1: $param1 / param2: $param2";
}
{% endhighlight %}
Here is why I prefer this:
<ul>
	<li>In many languages code blocks don't have their own identity - functions have, but not blocks (they don't provide scope). Placing the opening brace on its own line, you emphasize the block but you actually make it harder to see what caused the block in the first place.</li>
	<li>Using correct indentation, the presence of the block should be obvious anyways. There is no need to emphasize it more (at the cost of readability of the block opening statement).</li>
	<li>I doubt that using one line per token really makes the code more readable. Heck... why don't we write that sample code like so?</li>
</ul>
{% highlight php %}
function
doSomething
(
$param1,
$param2
)
{
    echo "param1: $param1 / param2: $param2";
}
{% endhighlight %}
