---
layout: post
title: Strangest JavaScript error ever
tags:
- Programming
- Solutions
- Usability
status: publish
type: post
published: true
meta: {}

---
<p>Let's say you create some very nice AJAX-stuff for a web project of yours. With nice I mean: Not breaking the back-button where its functionality is needed, not doing something that works better without AJAX, and doing it while providing lots of useful visual feedback.</p>
<p>Let's further assume that the thing works like a charm in every browser out there (not counting Netscape 4.x and IE in all versions - those are no browsers).</p>
<p>And then, IE throws this at you:</p>
<center>
<img alt="Unknown Runtime Error" src="http://www.gnegg.ch/archives/jserror.png" width="437" height="290" />
</center>
<p>Needless to say that the HTML output in question had a line count not even close to 370, so finding this thing easily was out of the question.</p>
<p>The solution: IE is unable to write to innerHTML of a TBODY element. But instead of providing an useful error message or even a link to the source with the line in question already highlighted (that's what Firefox would do), it just bails out with completely useless error information.</p>
<p>*sigh*</p>
<p>(btw: That mix of fonts in the details section of the error message is just another indication of IEs great code quality)</p>
