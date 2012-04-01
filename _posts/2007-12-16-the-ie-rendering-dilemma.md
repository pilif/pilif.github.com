---
layout: post
title: The IE rendering dilemma
categories:
- bug
- ie7
- ie8
- opinion
- Opinions
- Software
- webdev
status: publish
type: post
published: true
meta: {}

---
<p>There's a new release of Internet Explorer, aptly named IE8, pending and a whole lot of web developers are in fear of new bugs and no fixes to existing ones. Like the problems we had with IE7. </p> <p>A couple of really <a href="http://www.positioniseverything.net/index.php">nasty bugs</a> where fixed, but there wasn't any significant progress in matters of extended support for web standards or even a really significant amount of bugfixes.</p> <p>And now, so fear the web developers, history is going to repeat itself. Why, are people asking, aren't they just throwing away the currently existing code-base, replacing it with something <a href="http://www.mozilla.org">more</a> <a href="http://webkit.org">reasonable</a>? Or if licensing or political issues prevent using something not developed in-house, why not rewrite IE's rendering engine from scratch?</p> <p>Backwards compatibility. While the web itself has more or less stopped using IE-only-isms and began embracing the way of the web standards (and thus began cursing on IE's bugs), corporate intranets, the websites accessed by Microsoft's main customer base, certainly have not.</p> <p>ActiveX, &lt;FONT&gt;-Tags, VBScript - the list is endless and companies don't have the time or resources to remedy that. Remember. Rewriting for no real purpose than "being modern" is a real waste of time and certainly not worth the effort. Sure. New Applications can be developped in a standards compliant way. But think about the legacy! Why throw all that away when it works so well in the currently installed base of IE6?</p> <p>This is why Microsoft can't just throw away what they have. </p> <p>The only option I see, aside of trying to patch up what's badly broken, is to integrated another rendering engine into IE. One that's standards compliant and one that can be selected by some means - maybe a HTML comment (the DOCTYPE specification is <a href="http://www.quirksmode.org/css/quirksmode.html">already taken</a>).</p> <p>But then, think of the amount of work this creates in the backend. Now you have to maintain two completely different engines with completely different bugs at different places. Think of security problems. And think of what happens if one of these buggers is detected in a third party engine a hypothetical IE may be using. Is MS willing to take responsibility of third-party bugs? Is it reasonable to ask them to do this?</p> <p>To me it looks like we are now paying the price for mistakes MS did a long time ago and for quick technological innovation happening at the wrong time on the wrong platform (imagine the intranet revolution happening <em>now</em>). And personally, I don't see an easy way out. </p> <p>I'm very interested in seeing how Microsoft solves this problem. Ignore the standards-crowd? Ignore the corporate customers? Add the immense burden of another rendering engine? FIx the current engine (impossible, IMHO)? We'll know once IE8 is out I guess.</p>
