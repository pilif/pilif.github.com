---
layout: post
title: stabilizing tempalias
categories:
- tempalias
tags:
- bugs
- crash
- lucky
- Personal
- Programming
- Software
- stability
- tempalias
status: publish
type: post
published: true
meta:
  _edit_last: "1"
  _wp_old_slug: ""
---
While the <a href="http://www.gnegg.ch/2010/06/do-spammers-find-pleasure-in-destroying-fun-stuff/">maintenance last weekend</a> brought quite a bit of stabilization to the tempalias service, I quickly noticed that it was still dying sooner or later and while before updating node, it died due to not being able to allocate more memory, this time, it died by just not answering any requests any more.

A look at the error log quickly revealed quite many exceptions complaining about a certain request type not being allowed to have a body and finally one complaining about not being able to open a file due to having run out of file handles.

So I quickly improved error logging and restarted the daemon in order to get a stacktrace leading to these tons of exceptions.

[caption id="attachment_754" align="alignleft" width="173" caption="Picture by L.G.Mills"]<a href="http://www.flickr.com/photos/lmillsphotography/2659662694/"><img class="size-full wp-image-754  " title="Milkweed Bug" src="http://www.gnegg.ch/wp-content/uploads/2010/07/2659662694_9502870853_m.jpg" alt="" width="173" height="173" /></a>[/caption]

This quickly pointed to paperboy which was sending the file even if the request was a HEAD request. <code>http.js</code> in node checks for this and throws whenever you send a body when you should not. That exception lead then to paperboy never closing the file (have I already complained how incredibly difficult it is to do proper exception handling the moment continuations get involved? I think not and I also think it's a good topic for another diary entry). With the help of <code>lsof</code> I've quickly seen that my suspicions were true: the node process serving tempalias had tons of open handles to <a href="http://github.com/pilif/tempalias/blob/master/public/index.html">public/index.html</a>.

I sent a patch for this behavior to <a href="http://twitter.com/felixge">@felixge</a> which was <a href="http://github.com/felixge/node-paperboy/commit/8c37d6fa32ca10e4198490af8a25595bdb5abf16">quickly applied</a>, so that's fixed now. I hope it's of some use for other people too.

Now knowing that having a look at <code>lsof</code> here and then might be a good idea, quickly revealed another problem: While the file handles were gone, I've noticed tons and tons of SMTP sockets staying open in CLOSE_WAIT state. Not good as that too will lead to handle starvation sooner or later.

On a hunch, I found out that connecting to the SMTP daemon and then disconnecting, not sending QUIT to let the server disconnect was what was causing the lingering sockets. Clients disconnecting like that is very common in case the sender sends a 5xx response which is what the tempalias daemon was designed for.

So <a href="http://github.com/pilif/node-smtp/commit/a95d80720af58d5495a2cd9f63c2e5c88e73c3f6">I had to fix that</a> in my fork of the node smtp daemon (the original upstream isn't interested in daemon functionality and the owner I forked the daemon for doesn't respond to my pull requests. Hence I'm maintaining my own fork for now).

Futher looks at lsof prove that now we are quite stable in resource consumption: No lingering connections, no unclosed file handles.

But the error log was still filling up. This time something about <code>removeListener</code> needing a function. Thanks to the callstack I now had in my error log, I quickly hunted that one down <a href="http://github.com/pilif/node-smtp/commit/c9e04139483cd61abd4e276fef02965465c31d43">and fixed it</a> - that was a very stupid mistake. Thankfully, because the mails I usually deliver are small enough so that socket draining usually wasn't required.

Onwards to the next issue filling the error log: «This deferred has already been resolved».

This comes from the <code>Promise.js</code> library if you <code>emit*()</code> multiple times on the same promise. This time, of course, the callstack was useless (... at &lt;anonymous&gt; - why, thank you), but I was very lucky again in that I tested from home and my mail relay didn't trust my home IP address and thus denied relaying with a 500 which immediately led to the exception.

Now, this one is crazy: When you call <code>.addErrback()</code> on a Promise before calling <code>addCallback()</code>, your callback will be executed no matter if the errback was executed first.

Promise.js does some really interesting things to simulate polymorphism in JavaScript and I really didn't want to fix up that library as lately, node.js itself seems go to a simpler continuation style using a callback parameter, so sooner or later, I'll have to patch up the smtp server library anyways to remove Promise.js if I want to adhere to current node style.

So I <a href="http://github.com/pilif/node-smtp/commit/c22d333e344325e0f36fa801b5bf91bba7285439">took the workaround route</a> by just using addCallback() before addErrback() even though the other order feels more natural to me. In addition, <a href="http://github.com/kriszyp/node-promise/issues/issue/1">I reported an issue</a> with the author as this is clearly unexpected behavior.

Now the error log is pretty much silent (minus some ECONNRESET exceptions due to clients sending RST packets in mid-transfer, but I <em>think </em>they are uncritical to resource consumption), so I hope the overall stability of the site has improved a bunch - I'd love not having to restart the daemon for more than a day :-)
