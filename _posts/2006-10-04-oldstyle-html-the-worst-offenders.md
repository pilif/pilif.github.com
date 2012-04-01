---
layout: post
title: Oldstyle HTML - the worst offenders
tags:
- dad
- mail
- Opinions
- rant
status: publish
type: post
published: true
meta: {}

---
<p>More and more, the WWW is cleansed of old, outdated pages. In more and more cases, the browsers will finally be able to go into standards mode - no more quirks.</p>
<p>But one bastion still remains to be conquered.</p>
<p>Consider this:</p>
<pre class="code">&lt;br&gt;&lt;font size=2 face="sans-serif">Danke&lt;/font&gt;
&lt;br&gt;&lt;font size=2 face="sans-serif"&gt;Gruss&lt;/font&gt;
&lt;br&gt;&lt;font size=2 face="sans-serif"&gt;xxxx&lt;/font&gt;
</pre>
<p>By accident, I had my email client on "View Source" mode and this is the (complete) body of an email my dad sent me.</p>
<p>Beside the fact that it's a total abuse of HTML email (the message does not contain anything plain text would not have been able to contain), it's an obscene waste of bandwith:</p>
<p>The email ALSO contains a text alternative part, effectively doubling its size - not to speak of the unneeded HTML tags.</p>
<p>What's even worse: This is presentational markup at its finest. Even if I would insist in creating a HTML mail for this message, this would have totally sufficed:
<pre class="code">Danke&lt;br /&gt;
Gruss&lt;br /&gt;
xxxx&lt;br /&gt;
</pre>
<p>Or - semantically correct:</p>
<pre class="code">
&lt;p&gt;Danke&lt;/p&gt;
&lt;p&gt;Gruss&lt;/p&gt;
&lt;p&gt;xxx&lt;/p&gt;
</pre>
<p>Personally, I actually see reason behind a certain kind of HTML email. Newsletter or product announcements come to mind. Why use plain text if you can send over the whole message in a way that's nice for users to view?</p>
<p>Your users are used to viewing rich content - everyone of them probably has a web browser installed.</p>
<p>And with todays bandwith it's even possible to transfer the image and all pictures in one nice package. No security warnings, no crappy looking layout due to broken images.</p>
<p>What I don't see though is what email programs are actually doing. Why send over messages like the one in the example as HTML? Why waste the users bandwith (granted: It doesn't matter any more) and even create security problems (by forcing the email client to display HTML) to send a message that's not looking any different than one consisting of plain text?</p>
<p>The message also underlines another problem: The old presentational markup actually lent itself perfectly for creating WYSIWYG editors. But today's way of creating HTML pages just won't work in these editors for the reasons I outlined in my <a href="/archives/319-Word-2007-So-much-wasted-energy.html">posting about Word 2007</a></p>
<p>Still - using a little bit of CSS could result in so much nicer HTML emails which have the additional benefit of being totally readable even if the user has a client not capable of displaying HTML (which is a wise decision security-wise).</p>
<p>Oh and in case you wonder what client created that email...</p>
<pre class="code">
    X-MIMETrack: Serialize by Router on ZHJZ11/xxxx(Release 7.0.1FP1|April 17, 2006) at
     02.10.2006 16:35:09,
    	Serialize complete at 02.10.2006 16:35:09,
    	Itemize by SMTP Server on ZHJZ05/xxxxx(Release 6.5.3|September 14, 2004) at
     02.10.2006 16:36:15,
    	Serialize by Router on ZHJZ05/xxxxx(Release 6.5.3|September 14, 2004) at
     02.10.2006 16:36:19,
    	Serialize complete at 02.10.2006 16:36:19
</pre>
<p>I wonder if using a notes version of september 04 is a good thing to do in todays world full of spam, spyware and other nice things - especially considering that my dad is working in a public office.</p>
