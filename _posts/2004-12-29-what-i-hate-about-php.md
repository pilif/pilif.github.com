---
layout: post
title: What I hate about PHP
categories:
- Free Software
- PHP
- Programming
status: publish
type: post
published: true
meta: {}

---
<p>This is what I really hate about PHP:</p>
<pre class="code">
pilif@galadriel ~ % cat test.php
&lt;?
if (10 == '10ABC')
    echo "Gnegg!\n";
?&gt;
pilif@galadriel ~ % php test.php
Gnegg!
</pre>
<p>This is the reason for a pretty serious bug in my current i'm-loving-doing-that-as-it's-the-greatest-ever-project</p>
<p>What happens is that PHP implicitly converts 10ABC to an integer (yielding 10) and then making an integer comparison.</p>
<p>In my oppinion, this is wrong as inplicitely converting a string to an integer can cause information to be lost. Would PHP have converted 10 to '10', the comparison would have worked like one expects because converting an intger to a string works without losing information.</p>
<p>Then again, integer-conversions are more accurate than string conversions, so I can understand PHP's way. What I cannot understand is that a non-integer string is converted to something else than 0 or nothing (while causing a runtime-error). The comparison in my example should never have evaluated to a true value (which happened, because <tt>intval('10abc') == 10</tt>!</p>
<p>And converting to string if one argument of a comparison is a string is not the holy grail either - problems with locale-specific decimal points come to mind (is it . or ,?).</p>
<p>So perls idea of using a dedicated string comparison operator may not have been a bad idea after all...</p>
