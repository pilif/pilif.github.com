---
layout: post
title: tempalias.com - development diary
tags:
- development
- express
- Free Software
- javascript
- nodejs
- Programming
- Solutions
- tempalias
- web
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
After listening to this week's <a href="http://www.grc.com/securitynow.htm">Security Now!</a> podcast where they were discussing <a href="http://disposeamail.com">disposeamail.com</a>. That reminded me of this little idea I had back in 2002: <a href="http://www.pilif.ch/stuff/adaddr/index.php">Selfdestructing Email Addresses</a>.

Instead of providing a web interface for a catchall alias, my solution was based around the idea of providing a way to encode time based validity information and even an usage counter into an email address and then check that information on reception of the email to decide whether to alias the source address to a target address or whether to decline delivery with an "User unknown" error.

This would allow you to create temporary email aliases which redirect to your real inbox for a short amount of time or amount of emails, but instead of forcing you to visit some third-party web interface, you would get the email right there where the other messages end up in: In your personal inbox.

Of course this old solution had one big problem: It required a mail server on the receiving end and it required you as a possible user to hook the script into that mailserver (also, I never managed to do just that with exim before losing interest, but by now, I would probably know how to do it).

Now. Here comes the web 2.0 variant of the same thing.

<strong>tempalias.com</strong> (yeah. it was still available. so was .net) will provide you with a web service that will allow you to create a temporary mail address that will redirect to your real address. This temporary alias will be valid only for a certain date range and/or a certain amount of email sent to it. You will be able to freely chose the date range and/or invocation count.

In contrast to the other services out there, the alias will direct to your standard inbox. No ad-filled web interface. No security problems caused by typos and no account registration.

Also, the service will be completely <em>open source</em>, so you will be able to <strong>run your own</strong>.

My motivation is to learn something new, which is why I am
<ul>
	<li>writing this thing in <a href="http://nodejs.org">Node.js</a> (also, because a simple REST based webapp and a simple SMTP proxy is just what node.js was invented for)</li>
	<li>documenting my progress of implementation here (which also hopefully keeps me motivated).</li>
</ul>
My progress in implementing the service will always be visible to the public on the projects GitHub page:

<a href="http://github.com/pilif/tempalias">http://github.com/pilif/tempalias</a>

As you can see, there's already stuff there. Here's what I've learned about today and what I've done today:
<ul>
	<li>I learned <a href="http://book.git-scm.com/5_submodules.html">how to use git submodules</a></li>
	<li>I learned a bunch about node.js - how to install it, how it works, how module separation works and how to export stuff from modules.</li>
	<li>I learned about the <a href="http://expressjs.com/">Express micro framework</a> (which does <em>exactly</em> what I need here)
<ul>
	<li>I learned how request routing works</li>
	<li>I learned how to configure the framework for my needs (and how that's done internally)</li>
	<li>I learned how to play with HTTP status codes and how to access information about the request</li>
</ul>
</li>
</ul>
What I've accomplished code-wise is, considering the huge amount of stuff I had plain no clue about, quite little:
<ul>
	<li>I added the web server code that will run the webapp</li>
	<li>I created a handler that handles a POST-request to /aliases</li>
	<li>Said handler checks the content type of the request</li>
	<li>I added a very rudimentary model class for the aliases (and learned how to include and use that)</li>
</ul>
I still don't know how I will store the alias information. In a sense, it's a really simple data model mapping an alias ID to its information, so it's predestined for the cool key/value stores out there. On the other hand, I want the application to be simple and I don't feel like adding a key/value store as a huge dependency just for keeping track of 3 values per alias.

Before writing more code, I'll have to find out how to proceed.

So the next update will probably be about that decision.
