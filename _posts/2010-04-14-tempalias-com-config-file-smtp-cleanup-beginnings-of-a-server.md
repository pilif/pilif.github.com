---
layout: post
title: tempalias.com - config file, SMTP cleanup, beginnings of a server
categories:
- Free Software
- mail
- nodejs
- Programming
- smtp
- tempalias
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
Welcome to the next installment of a series of blog posts about the creation of a new web service in node.js. The posts serve as a diary of how the development of the service proceeds and should give you some insight in how working with <a href="http://nodejs.org">node.js</a> feels right now. You can <a href="/2010/04/tempalias-com-smtp-and-design/">read the previous episode here</a>.

Yesterday, I unfortunately didn't have a lot of time to commit to the project, so I chose a really small task to complete: create a configuration file, a configuration file parser and use both to actually configure how the application should behave.

The task in general was made a lot easier by the fact that (current) node contains a really simple parser for INI style configuration files. For the simple type of configuration data I have to handle, the INI format felt perfect and as I got a free parser with node itself, that's what I went with. So as of monday it's possible to configure listening addresses and ports for both HTTP and SMTP daemons and additional settings for the SMTP part of the service.

Today I had more time.

The idea was to seriously look into the SMTP transmission. The general idea is that email sent to the tempalias.com domain will have to end up on the node server where the alias expansion is done and the email is prepared for final delivery.

While I strive to keep the service as self-contained as possible, I opted into forcing a smarthost to be present to do the actual mail delivery.

You see, mail delivery is a complicated task in general as you must deliver the mail and if you can't, you have to notify the sender. Reasons for a failing delivery can be permanent (that's easy - you just tell the sending server that there was a problem and you are done) or temporary. In case of many temporary errors you end up with the responsibility of needing to handle them.

Handling in case of temporary errors usually means: Keep the original email around in a queue and retry after the initial client has long disconnected. If you don't succeed for a reasonably large amount of delivery attempts or if a permanent problem creeps up, then you  have to bounce the message back to the initial sender.

If you want to do the final email delivery, so that your app runs without any other dependencies, then you will end up not only writing an SMTP server but also a queueing system, something that's <em>way</em> beyond the scope of simple alias resolution.

Even if I wanted to go through that hassle, it still wouldn't help much as aside of the purely technical hurdles, there are also others on a more meta level:

If you intend to do the final delivery nowadays, you practically need to have a valid PTR record, you need to be in good standing with the various RBL's, you need to handle SSL - the list goes on and on. Much of this is administrative in nature and might even create additional cost and is completely pointless considering the fact that you do usually have a dedicated smarthost around that takes your mail and does the final delivery. And even if you don't: Installing a local MTA for the queue handling is easily done and whatever you install, it'll be way more mature than what I could write in any reasonable amount of time.

So it's decided: <strong>The tempalias codebase will require a smarthost to be configured</strong>. As mine doesn't require authentication from a certain IP range, I can even get away without writing any SMTP authentication support.

Once that was clear, the next design decision was clear too: the tempalias smtp daemon should be a really, really thin layer around the smarthost. When a client connects to tempalias, we will connect to the smarthost (500ing (or maybe 400ing) out if we can't - remember: immediate and permanent errors are easy to handle). When a client sends MAIL FROM, just relay it to the smarthost, returning back to the client whatever we got - you get the idea: the <strong>tempalias mail daemon is an SMTP proxy</strong>.

This keeps the complexity low while still providing all the functionality we need (i.e. rewriting RCPT TO).

Once all of this was clear, I sat down and had a look at the node-smtp servers and clients and it was immediately clear that both need a lot of work to even to the simple thing I had in mind.

This means that most of todays work went into <a href="http://github.com/pilif/node-smtp">my fork of node-smtp</a>:
<ul>
	<li>made the hostname in the banner configurable</li>
	<li>made the smtp client library work with node trunk</li>
	<li>fire additional events (on close, on mail from, on rcpt to)</li>
	<li>fixed various smaller bugs</li>
</ul>
Of course I have notified upstream of my changes - we'll see what they think about.

On the other hand, the <a href="http://github.com/pilif/tempalias/blob/master/tempalias_smtp.js">SMTP server part</a> of tempalias (incidentally the first SMTP server I'm writing. ever) also took shape somewhat. It now correctly handles proxying from initial connection up until DATA. It doesn't do real alias expansion yet, but that's just a matter of hooking it into the backend model class I already have - for now I'm happy with it rewriting all passed recipients to my own email address for testing.

I already had a look at how node-smtp's daemon handles the DATA command and I have to say that gobbling up data into memory until the client stops sending data or we run out of heap isn't quite what I need, so tomorrow I will have to change node-smtp even more in that it fires events for every bit of data that was received. That way a consumer of the API can do some validation on the various chunks  (mostly size validation) and I can pass the data directly to the smarthost as it arrives.

This keeps memory usage of the node server small.

So that's what I'm going to do tomorrow.

On a different note, I had some thought going into actual deployment, which probably will end up with me setting up a reverse proxy after all, but this is a topic for another discussion.
