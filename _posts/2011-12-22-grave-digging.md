---
layout: post
title: Abusing LiveConnect for fun and profit
categories:
- programming
tags:
- programming
- javascript
- security
- java
- talk
status: publish
type: post
published: true
---
On december 20th I gave a talk at the JSZurich user group meeting in Zürich.
The talk is about a decade old technology which can be abused to get full,
unrestricted access to a client machine from JavaScript and HTML.

I was showing how you would script a Java Applet (which is completely hidden
from the user) to do the dirty work for you while you are creating a very nice
user interface using JavaScript and HTML.

<iframe class="youtube-player" type="text/html" width="640" height="385" src="http://www.youtube.com/embed/zOhyjaTkjI4" frameborder="0">
</iframe>

The slides are <a href="http://bit.ly/vUmkZH">available in PDF format</a> too.

While it's a very cool tech demo, it's IMHO also a very bad security issue
which browser vendors and Oracle need to have a look at. The user sees nothing
but a dialog like this:

![security prompt](/assets/images/java-prompt.png)

and once they click OK, they are completely owned.

Even worse, while this dialog is showing the case of a valid certificate, the
dialog in case of an invalid (self-signed or expired) certificate isn't much
different, so users can easily tricked into clicking allow.

The source code of the demo application is on <a href="https://github.com/pilif/gravedigging">github</a>
and I've already written about this on this blog <a href="/2009/04/javascript-and-applet-interaction/">here</a>,
but back then I was mainly interested in getting it work.

By now though, I'm really concerned about putting an end to this, or at least
increasing the hurdle the end-user has to jump through before this goes off -
maybe force them to click a visible Applet. Or just remove the <a
href="http://en.wikipedia.org/wiki/LiveConnect">LiveConnect</a> feature all
together from browsers, thus forcing applets to be visible.

But aside of the security issues, I still think that this is a very
interesting case of long forgotten technology. If you are interested, do have
a look at the talk and travel back in time to when stuff like this was only
half as scary as it is now.