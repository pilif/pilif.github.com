---
layout: post
title: E_NOTICE stays off.
categories:
- programming
tags:
- opinion
- programming
- php
- rant
status: publish
type: post
published: true
---
I'm sure you've used this idiom a lot when writing JavaScript code

{% highlight javascript %}options['a'] = options['a'] || 'foobar';{% endhighlight %}

It's short, it's concise and it's clear what it does. In ruby, you can even be more concise:

{% highlight ruby %}params[:a] ||= 'foobar'{% endhighlight %}

So you can imagine that I was happy with PHP 5.3's new ?: operator:

{% highlight php %}<? $options['a'] = $options['a'] ?: 'foobar'; ?>{% endhighlight %}

In all three cases, the syntax is concise and readable, though arguably, the PHP one could read a bit better, but, ?: still is better than writing the full ternary expression, spelling out `$options['a']` three times.

[PopScan](http://www.popscan.com), since forever (forever being 2004) runs with E_NOTICE turned off. Back in the times, I felt it provided just baggage and I just wanted (had to) get things done quickly.

This, of course, lead to people not taking enough care for the code and
recently, I had one too many case of a bug caused by accessing a variable that
was undefined in a specific code path.

I decided that I'm willing to spend the effort in cleaning all of this up and
making sure that there are no undeclared fields and variables in all of
PopScans codebase.

Which turned out to be quite a bit of work as a lot of code is apparently
happily relying on the default `null` that you can read out of undefined
variables. Those instances might be ugly, but they are by no means bugs.

Cases where the `null` wouldn't be expected are the ones I care about, but I
don't even what to go and discern the two - I'll just fix all of the instances
(embarrassingly many, most of them, thankfully, not mine).

Of course, if I put hours into a cleanup project like this, I want to be sure
that nobody destroys my work again over time.

Which is why I was looking into running PHP with `E_NOTICE` in development
mode at least.

Which brings us back to the introduction.

{% highlight php %}<? $options['a'] = $options['a'] ?: 'foobar'; ?>{% endhighlight %}

is wrong code. Any accessing of an undefined index of an array always raises a
notice. It's not like Python where you can chose (accessing a dictionary using
[] will throw a KeyError, but there's get() which just returns None). No. You
don't get to chose. You only get to add boilerplate:

{% highlight php %}<? $options['a'] = isset($options['a']) ? $options['a'] : 'foobar'; ?>{% endhighlight %}

See how I'm now spelling `$options['a']` three times again? `?:` just got a
whole lot less useful.

But not only that. Let's say you have code like this:

{%highlight php %}<?
list($host, $port) = explode(':', trim($def))
$port = $port ?: 11211; ?>{% endhighlight %}

IMHO very readable and clear what it does: It extracts a host and a port and
sets the port to 11211 if there's none in the initial string.

This of course won't work with E_NOTICE enabled. You either lose the very
concise list() syntax, or you do - *ugh* - this:

{%highlight php %}<?
list($host, $port) = explode(':', trim($def)) + array(null, null);
$port = $port ?: 11211; ?>{% endhighlight %}

Which looks ugly as hell. And no, you can't write a wrapper to explode() which
always returns an array big enough, because you don't know what's big enough.
You would have to pass the amount of nulls you want into the call too. That
would look nicer then above hack, but it still doesn't even come close in
conciseness to the solution which throws a notice.

So. In the end, I'm just complaining about syntax you might think? I though so too and I wanted to add the syntax I liked, so I did a bit of experimenting.

Here's a little something I've come up with:

<script src="https://gist.github.com/1267568.js?file=e_notice_stays_off.php"></script>


The wrapped array solution looks really compelling syntax-wise and I could totally see myself using this and even forcing everybody else to go there. But of course, I didn't trust PHP's interpreter and thus benchmarked the thing.

    pilif@tali ~ % php e_notice_stays_off.php
    Notices off. Array 100000 iterations took 0.118751s
    Notices off. Inline. Array 100000 iterations took 0.044247s
    Notices off. Var. Array 100000 iterations took 0.118603s
    Wrapped array. 100000 iterations took 0.962119s
    Parameter call. 100000 iterations took 0.406003s
    Undefined var. 100000 iterations took 0.194525s

So. Using nice syntactic sugar costs 7 times the performance. The second best
solution? Still 4 times. Out of the question. Yes. It could be seen as a
micro-optimization, but 100'000 iterations, while a lot is not *that many*.
Waiting nearly a second instead of 0.1 second is crazy, especially for a
common operation like this.

Interestingly, the most bloated code (that checks with isset()) is twice as
fast as the most readable (just assign). Likely, the notice gets fired
regardless of error_reporting() and then just ignored later on.

What really pisses me off about this is the fact that everywhere else PHP
doesn't give a damn. '0' is equal to 0. Heck, even 'abc' is equal to 0. It
even fails silently many times.

But in a case like this, where there is even newly added nice and concise
syntax, it has to be anal and bitchy. And there's no way to get to the needed
solution but to either write too expensive wrappers or ugly boilerplate.

Dynamic languages give us a very useful tool to be dynamic in the APIs we
write. We can create functions that take a dictionary (an array in PHP) of
options. We can extend our objects at runtime by just adding a property. And
with PHP's (way too) lenient data conversion rules, we can even do math with
user supplied string data.

But can we read data from $_GET without boilerplate? No. Not in PHP. Can we
use a dictionary of optional parameters? Not in PHP. PHP would require
boilerplate.

If a language basically mandates retyping the same expression three times,
then, IMHO, something is broken. And if all the workarounds are either crappy
to read or have very bad runtime properties, then something is terribly
broken.

So, I decided to just fix the problem (undefined variable access) but leave
E_NOTICE where it is (off). There's always `git blame` and I'll make sure I
will get a beer every time somebody lets another undefined variable slip in
:-)