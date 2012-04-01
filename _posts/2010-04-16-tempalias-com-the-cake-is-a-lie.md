---
layout: post
title: tempalias.com - the cake is a lie
categories:
- Free Software
- github
- nodejs
- Programming
- redis
- smtp
- tempalias
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
This is another installment of my development diary for tempalias.com, a web service that will allow you to create self-destructing email aliases. You can <a href="/2010/04/tempalias-com-config-file-smtp-cleanup-beginnings-of-a-server/">read the last previous here</a>.
<blockquote>This was a triumph.
I'm making a note here: HUGE SUCCESS.
It's hard to overstate my satisfaction.</blockquote>
I didn't post an update on wednesday evening because it got very late and I just wanted to sleep. Today, it's late yet again, but I can gladly report that <strong>the backend service is now feature complete. </strong>

We are still missing the UI, but with a bit of curl on the command line, you can use the restful web service interface to create aliases and you can use the generated aliases to send email via the <strong>now completed SMTP proxy </strong>- including time and usage based expiration.

As a reminder: All the code (i.e. the completed backend) is available on my <a href="http://github.com/pilif/tempalias">github repository</a>, though keep in mind that there is no documentation what so ever. That I will save for later when this is really going public. If you are brave, feel free to clone it.

You will need the trunk versions for both redis and node.

<a href="http://www.gnegg.ch/wp-content/uploads/2010/04/Screen-shot-2010-04-16-at-01.00.41.png"><img class="aligncenter size-medium wp-image-683" title="Consuming an alias" src="http://www.gnegg.ch/wp-content/uploads/2010/04/Screen-shot-2010-04-16-at-01.00.41-225x300.png" alt="Screenshot of a terminal showing three consumptions of an alias and a fourth failng." width="225" height="300" /></a>

The screenshot is is showing me consuming an alias four times in a row. Three times, I get the data back, the fourth time, it's gone.

The website itself is still in the process of being designed and I can promise you, it will be awesome. Richard's last design was simply mind-blowing. Unfortunately I can't show it here yet, because he used a non-free picture. Besides, we obviously can't use non-free artwork for a Free Software project.

So this update concerns itself with two days of work. What was going on?

On wednesday, I wanted to complete the SMTP server, but before I went ahead doing so, I revised the servers design. At the end of the last posting here, we had a design where the SMTP proxy would connect to the smarthost the moment a client connects. It would then proceed to proxy through command by command, returning error messages as they are returned by the smarthost.

The issue with this design lies in the fact that tempalias.com is, by definition, not about sending mail, <em>but about rejecting mail</em>. This means that once it's up and running, the majority of mail deliveries will simply fail at the RCPT state.

From this perspective, it doesn't make sense to connect to the smarthost when a client connects. Instead, we should do the handshake up to and including the RCPT TO command, at which time we do the alias expansion. If that fails (which is the more likely case), we don't need to bother to connect to upstream but we can simply deny the recipient.

The consequence of course is that our RCPT TO can now return errors that happened during MAIL FROM on the upstream server. But as MAIL FROM usually only fails with a 5xx error, this isn't terribly wrong anyways - the saved resources far outweigh the not-so-perfect error messages.

Once I completed that design change, the next roadblock I went into was the fact that both the smtp server and the smtp client libraries weren't quite as asynchronous as I would have wanted: The server was reading the complete mail from the client into memory and the client wanted the complete mail as a parameter to its data method.

That felt unpractical to me as in the majority of cases, we won't get the whole mail at once, but we can certainly already begin to push it through to the smarthost, keeping memory usage of our smtp server as low as possible.

So <a href="http://github.com/pilif/node-smtp">my clone of the node SMTP library</a> now contains support for asynchronous handling for DATA. The server fires <code>data</code>, <code>data_available</code> and <code>data_end</code> and the client provides <code>startData()</code>, <code>sendData()</code> and <code>endData()</code>. Of course the old functionality is still available, but the <a href="http://github.com/pilif/tempalias/blob/master/tempalias_smtp.js">tempalias.com SMTP server</a> is using the new interface.

So, that was Wednesday's work:
<ul>
	<li>only connect to the smarthost when it's no longer inevitable</li>
	<li>complete the smtp server node library</li>
	<li>made the smtp server and client libraries fully asynchronous</li>
	<li>complete the SMTP proxy (but without alias expansion yet)</li>
</ul>
Before I went to bed, the SMTP server was accepting mail and sending it using the smarthost. It didn't do alias expansion yet but just rewrote the recipient to my private email address.

This is where I picked up Thursday night: The plan was to hook the alias model classes into the SMTP server as to complete the functionality.

While doing that, I had one more architectural thing to clear: How to make sure that I can decrement the usage-counter race-free? Once that was settled, the rest was pure grunt work by just writing the needed code.

As we are getting long and as it's quite late again, I'm saving the post-mortem of this last task for tomorrow. You'll get a chance learn about bugs in node, about redis' DECR command and finally you will get a chance to laugh at me for totally screwing up the usage of Object.create().

Stay tuned.
