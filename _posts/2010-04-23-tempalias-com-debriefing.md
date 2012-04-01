---
layout: post
title: tempalias.com - debriefing
tags:
- done
- finally
- finished
- javascript
- node.js
- Programming
- Software
- Solutions
- tempalias
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
This is the last part of the development diary I was keeping about the creation of a new web service in node.js. You can <a href="/2010/04/tempalias-com-learning-css/">read the previous installment here</a>.

It's done.

The layout is finished, the last edges too rough for pushing the thing live are smoothed. <a href="http://tempalias.com">tempalias.com</a> is live. After coming really close to finishing the thing yesterday (hence the lack of a posting here - I was too tired when I had to quit at 2:30am) last night, now I could complete the results page and add the needed finishing touches (like a really cool way of catching enter to proceed from the first to the last form field - my favorite hidden feature).

I guess it's time for a little debriefing:

All in all, the project took a time span of 17 days to implement from start to finish. I did this after work and mostly during weekdays and sundays, so it's actually 11 days in which work was going on (I also was sick two days). Each day I worked around 4 hours, so all in all, this took around 44 hours to implement.

A significant part of this time went into modifications of third party libraries, while I tried to contact the initial authors to get my changes merged upstream:
<ul>
	<li>The author of node-smtp isn't interested in the SMTP daemon functionality (that wasn't there when I started and is now completed)</li>
	<li>The author of redis-node-client didn't like my patch, but we had a really fruitful discussion and node-redis-client got a lot better at handling dropped connection in the process.</li>
	<li>The author of node-paperboy has merged my patch for a nasty issue and even <a href="http://twitter.com/felixge/status/12645935137">tweeted about it</a> (THANKS!)</li>
</ul>
Before I continue, I want to say a huge thanks to <a href="http://github.com/fictorial">fictorial</a> on github for the awesome discussion I was allowed to have with him about node-redis-client's handling of dropped connections. I've enjoyed every word I was typing and reading.

But back to the project.

Non-third-party code consists of just 1624 lines of code (using wc -l, so not an accurate measurement). This doesn't factor in the huge amount of changes I made to <a href="http://github.com/pilif/node-smtp">my fork of node-smtp</a> the daemon part of which was basically non-existant.

Overall, the learnings I made:
<ul>
	<li>git and github are awesome. I knew that beforehand, but this just cemented my opinion</li>
	<li>node.js and friends are still in their infancy. While node removes previously published API on a nearly daily basis (it's mostly bug-free though), none of the third-party libraries I am using were sufficiently bug-free to use them without change.</li>
	<li>Asynchronous programming can be fun if you have closures at your disposal</li>
	<li>Asynchronous programming can be difficult once the nesting gets deep enough</li>
	<li>Making any variable not declared with var global is the worst design decision I have ever seen in my life especially in node where we are adding concurrency to the mix)</li>
	<li>While it's possible (and IMHO preferrable) to have a website done in just RESTful webservices and static/javascript frontend, sometimes just a tiny little bit of HTML generation could be useful. Still. Everything works without emitting even a single line of dynamically generated HTML code.</li>
	<li>Node is crazy fast.</li>
</ul>
Also, I want to take the opportunity and say huge thanks to:
<ul>
	<li>the guys behind <a href="http://nodejs.org">node.js</a>. I would have had to do this in PHP or even rails (which is even less fitting than PHP as it provides so much functionality around generating dynamic HTML and so little around pure JSON based web services) without you guys!</li>
	<li>Richard for his awesome layout</li>
	<li><a href="http://github.com/fictorial">fictorial</a> for redis-node-client and for the awesome discussion I was having with him.</li>
	<li><a href="http://github.com/kennethkalmer">kennethkalmer</a> for his work on node-smtp even though it was still incomplete - you lead me on the right tracks how to write an SMTP daemon. Thank you!</li>
	<li><a href="http://twitter.com/felixge">@felixge</a> for node-paperboy - static file serving done right</li>
	<li>The guys behind <a href="http://code.quirkey.com/sammy/">sammy</a> - writing fully JS based AJAX apps has never been easier and more fun.</li>
</ul>
Thank you all!

The next step will be marketing: Seing this is built on node.js and an actually usable project - way beyond the usual little experiments, I hope to gather some interest in the Hacker community. Seing it also provides a real-world use, I'll even go and try to submit news about the project on more general outlets. And of course on the Security Now! feedback page as this is inspired by their episode 242.
