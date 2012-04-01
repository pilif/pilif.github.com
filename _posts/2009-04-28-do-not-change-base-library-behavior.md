---
layout: post
title: Do not change base library behavior
categories:
- Programming
tags:
- Opinions
- opionion
- Programming
- Software
- webdev
status: publish
type: post
published: true
meta:
  _edit_last: "1"
  _wp_old_slug: do-not-change-base-library-behaviour
---
Modern languages like JavaScript or Ruby provide the programmer with an option to "reopen" any class to add additional behavior to them. In the case of Ruby and JavaScript, this is not constrained in any way: You are able to reopen any  class - even the ones that come with your language itself and there are no restrictions on the functionality of your extension methods.

Ruby at least knows of the concept of private methods and fields which you can't call from your additional methods, but that's just Ruby. JS knows of no such thing.

This provides awesome freedom to the users of these languages. Agreed. Miss a method on a class? Easy. Just implement that and call it from wherever you want.

This also helps to free you from things like
{% highlight java %}BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(of)));{% endhighlight %}
which is lots of small (but terribly inconventiently named) classes wrapped into each other to provide the needed functionality. In this example, what the author wanted is to read a file line-by-line. Why exactly do I need three objects for this? Separation of concern is nice, but stuff like this make learning a language needlessly complicated.

In the world of Ruby or JS, you would just extend FileInputStream with whatever functionality you need and then call that, creating code that is much easier to read.
{% highlight javascript %}FileInputStream.prototype.readLine = function(){...}
//...
of.readLine();
//...{% endhighlight %}
And yet, if you are a library (as opposed to consumer code), <strong>this is a terrible, terrible thing to do</strong>!

We have seen <a href="http://github.com/raganwald/homoiconic/blob/master/2009-04-09/my_objection_to_sum.md#readme">previous instances</a> of the kind of problems you will cause: Libraries adding functionality to existing classes create real problems when multiple libraries are doing the same thing and the consuming application is using both libraries.

Let's say for example, that your library A added that method sum() to the generic Array class. Let's also say that your consumer also uses library B which does the same thing.

What's the deal about this, you might ask? It's pretty clear, what sum does after all?

Is it? It probably is when that array contains something that is summable. But what if there is, say, a string in the array you want to sum up? In your library, the functionality of sum() could be defined as "summing up all the numeric values in the array, assuming 0 for non-numeric values". In the other library, sum() could be defined as "summing up all the numeric values in the array, throwing an exception if sum() encounters invalid value".

If your consumer loads your library A first and later on that other library B, <strong>you will be calling B's Array#sum()</strong>.

Now due to your definition of sum(), you assume that it's pretty safe to call sum() with an array that contains mixed values. But because you are now calling B's sum(), you'll get an exception you certainly did not expect in the first place!

Loading B after A in the consumer caused A to break because both created the same method conforming to different specs.

Loading A after B would fix the problem in this case, but what, say, if both you and B implement Array#avg, but with reversed semantics this time around?

You see, <strong>there is no escape</strong>.

Altering classes in the global name space breaks any name spacing facility that may have been available in your language. Even if all your "usual" code lives in your own, unique name space, the moment you alter the global space, you break out of your small island and begin to compete with the rest of the world.

If you are a library, you cannot be sure that you are alone in that competition.

And even if you are a top level application you have to be careful not to break implementations of functions provided by libraries you either use directly or, even worse, indirectly.

If you need a real-life example, the following code in an (outdated) version of scriptaculous' effects.js broke jQuery, despite the latter being very, very careful to check if it can rely on the base functionality provided:
{% highlight javascript %}Array.prototype.call = function() {
 var args = arguments;
 this.each(function(f){ f.apply(this, args) });
}{% endhighlight %}
Interestingly enough, Array#call wasn't used in the affected version of the library. This was a code artifact that actually did nothing but break a completely independent library (I did not have time to determine the exact nature of the breakage).

Not convinced? After all I was using an outdated version of scriptaculous and I should have updated (which is not an option if you have even more libraries dependent on bugs in exactly that version - unless you update all other components as well and then fix all the then broken unit tests).

Firefox 3.0 was the first browser to add document.getElementByClassName, a method also implemented by Prototype. Of course the functionality in Firefox was slightly different from the implementation in Prototype, which now called the built-in version instead its own version which caused a <a href="http://ejohn.org/blog/getelementsbyclassname-pre-prototype-16/">lot of breakage all over the place</a>.

So, dear library developers, stay in your own namespace, please. You'll make us consumers (and your own) lives so much more easier.
