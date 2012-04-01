---
layout: post
title: tempalias.com - persistence
categories:
- Free Software
- nodejs
- Programming
- redis
- tempalias
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
(This is the third installment of a development diary about the creation of a self destructing email alias service. <a href="http://www.gnegg.ch/2010/04/tempalias-com-another-day/">Read the previous episode here</a>.)

After the earlier clear idea on how to handle the aliases identity, the next question I needed to tackle was the question of persistence: How do I want to store these aliases? Do I want them to persist a server restart? How would I access them?

On the positive side remains the fact that the data structure for this service is practically non-existant: Each alias has its identity and some data associated with it, mainly a target address and the validity information. And lookup will <em>always</em> happen using that identity (with the exception of garbage collection - something I will tackle later).

So this is a clear candiate to use a very simple key/value store. As I hope to gain at least some traction though (wait until I coded the bookmarklet), I would want this to be at least of <em>some</em> robustness, hence writing flat-files seemed like a bad idea.

Ironically, if you want a really simple, built-in solution for data persistance in node.js, you have two options: Either write your own (which is where I don't want to go to) or use SQLite which is total overkill for the current solution.

So I had the option of just keeping stuff in memory (as plain JS objects or using memcache)  or to use any of the supported key/value storage services.

Aliases going away on server restart felt like a bad thing, so I looked into the various key/value stores.

While looking at the available libraries, I went for the one that was most recently updated, which is <a href="http://github.com/fictorial/redis-node-client">redis-node-client</a>. Of course, this meant that I had to use both redis trunk and node trunk as the library is really tracking the bleeding edge. I don't mind that much though because both redis and node are very self-contained and compile easily on both linux (deployment) and mac os (development) while requiring next to no configuration.

So with a decision made for both persistence and identity, I went ahead and wrote more code.

On the <a href="http://github.com/pilif/tempalias">project page</a>, you will see few commits completing the full functionality I wanted a POST to /aliases to have - including persistence using redis and identity using the previously described method of brute-forcing the issue.

I still have two issues at the moment that will need tackling
<ol>
	<li>The initial length of the pseudo-uuid isn't persisted. This means that once enough aliases are created that we are increasing the length and I'm restarting the server, I will get needless collisions or even a too heavily-used keyspace.</li>
	<li>The current method of checking for ID availability and later usage is totally non-race-proof and needs some <strong>serious</strong> looking-into.</li>
</ol>
Stuff I learned:
<ul>
	<li>node is extremely work-in-progress. While it runs flawlessly and <strong>never</strong> surprises me with irreproducible or even just seemingly illogical behavior, features appear and disappear at will.</li>
	<li>This state of flux in node makes it really hard to work with external dependencies. In this case, multipart.js vanished from node trunk (without change log entry either), but express still depends upon that. On the other hand, I'm forced to use node trunk otherwise redis client won't work.</li>
	<li>Date("&lt;timestamp&gt;") in node is dependent on the local timezone and changing process.env.TZ post-startup doesn't have any effect. This means that I'm going to have to set TZ=UTC in my start script.</li>
	<li>Working with an asynchronous API seems strange sometimes, but the power of closures usually comes to the rescue. I certainly wouldn't want to have to write software like this if I didn't have closures at my disposal (and, NO, global variables are NOT a viable alternative...)</li>
</ul>
