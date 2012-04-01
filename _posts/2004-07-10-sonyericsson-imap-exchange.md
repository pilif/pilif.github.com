---
layout: post
title: SonyEricsson, IMAP, Exchange
tags:
- Solutions
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
Since we <a href="/2003/10/each-problem-has-a-solution/">switched to Exchange</a> I've been unable to get my Email from my SonyEricsson-phones (first T610, then Z600 - talk about buying too many mobiles per time unit ;-). Every time I tried to connect, I immediatly got a <tt>Server not found</tt>

Today I'd had enough. This must be fixed, I told myself and set to fix it. And as the category for this enty is "Solutions", I actually did solve it.

A quick check with <tt>netcat</tt> on the firewall (after turning off the port forwarding rules) revealed that it's not actually a connection problem I was running into: The phone connected fine. So it must be something with Exchange...

The event log on the server revealed nothing at all. As always with Microsoft products. Those messages are either not there or completely ununderstandable.

Next I tried to set the server to maximum logging (Exchange-Manager, right click on your Server, Properties, Tab "Diagnostics Logging", IMAP4Svc). The result were two entries in the event log: Client XXX connected, Client XXX disconnected. Extremely helpful. Nearly as helpful as the "Server not found" my cellphone was throwing at me (see <a href="#errnote">note below</a>).

I noticed that this isn't getting me anywhere, so I went getting the cannon to shoot sparrows with: I've downloaded <a href="http://www.ethereal.com/">Ethereal</a> and listened to the conversation my phone is having with exchange:
<pre class="code">S: * OK Microsoft Exchange Server 2003 IMAP4rev1 server version x.x (xxx) ready.
C: A128 AUTH xxx\x xxxx
S: A128 BAD Protocol Error: "Expected SPACE not found".</pre>
<p style="font-size: 0.8em">(I won't ask, why the phone isn't checking the capabilities first before logging in. This is not what I call a clean impementation)</p>

Not very helpful either. At least for me, knowing the IMAP-RFC just enough to understand what the A128 stands for (it's a transaction number which allows for asynchronous command execution. The server prefixes answers to commands with the number given by the client), but not much else. So I had to do something else: Logging in with Mozilla Thunderbird, where I had no problems. After one failed attempt where I forgot to turn off SSL (...), I got this:
<pre class="code">S: * OK Microsoft Exchange Server 2003 IMAP4rev1 server version x.x (xxx) ready.
C: 1 capability
S: * CAPABILITY (...) AUTH=NTLM
S: 1 OK CAPABILITY completed.
C: 2 login "xxx\\xx" "xxx"
S: 2 OK LOGIN completed.</pre>
<p style="font-size: 0.8em">(now that I'm reading through this (still without having read the RFC): Isn't the server lying here: It just tells to be acceping NTLM-Auth, but Mozilla seems to ignore that and using AUTH=LOGIN to log in which the server accepts too. Enlighten me!)</p>

Aha! We seem to be having quoting issues in the phone. Good. Even better: The issue seems to be that the phone does no quoting at all, which is fine because then we can do some quoting in the preferences-screen

After one failed attempt with two spaces after the username in the LOGIN-Line which was fixed by removing the somehow added trailing space in the phone's username-field, <strong>I actually got it working</strong>. Yes. I'm reading my mail with the phone. It did work!

So, if you are having problems connecting to an Exchange-Server using SonyEricssons Phones, do the following:
<ul>
	<li>Enter the username as <tt>"DOMAIN\\username"</tt> (with quotes). Look that there are no spaces before the first and after the last quote.</li>
	<li>Enter the password as <tt>"password"</tt>. Include the quotes too and remove spaces that may linger aroung</li>
</ul>
In other words:
<ul>
	<li>Escape \-es with anoter one of them: \ -&gt; \\</li>
	<li>Put username and Password in double quotes (")</li>
</ul>
<em>Dann klappt's auch mit dem Nachbarn!</em> (from a stupid german commercial. Forget it if you don't understand it)

<a name="errnote"></a>One final note: &lt;rant&gt;Everything would have been so much easier if only there were more usefil error messages involved. While I completly understand that the designers of the software don't want to overwhelm their users and thus create seemingly simple messages, they should absolutely provide a "Details"-Link somewhere where the whole message can be read. Granted. Cellphones are limited, so in a way, I can accept the message I got there. What I can not accept is the way Exchange loggs the errors it occurs. Why on earth doesnt' a protocol error getting logged when logging is set to "Maximum"?&lt;/rant&gt;
