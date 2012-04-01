---
layout: post
title: tempalias.com - SMTP and design
tags:
- Free Software
- javascript
- nodejs
- Programming
- tempalias
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
After being sick the end of last week, only today I found time and willpower to continue working on this little project of mine.

For people just coming to the series with this article: This is a development diary about the creation of a web service for autodestructing email addresses. <a href="http://www.gnegg.ch/2010/04/tempalias-com-persistence/">Read the previous installment here</a>.

The funny thing about the projcet is that people all around me seem to like the general idea behind the service. I even got some approval from Ebi (who generally dislikes everything that's new) and this evening I was having dinner with a former coworker of mine whom I know for doing kick-ass web design.

He too liked the idea of the project and I could con him into creating the screen design of tempalias.com. This is a really good thing as whatever Richard touches comes out beautiful and usable.

For example, he told me that it makes <em>way</em> more sense to just expose a valid until date and in the form of "Valid for x days" instead of asking the user to provide a real date. This is not only much clearer and easier to use, it also fixes a brewing timezone problem I had with my previous design:

Valid for "3 days from now" is 3 days from now wherever on the world you are. But valid until 2010-04-16 is different depending on where you are.

This is a rare case of where adding usability also keeps the code simpler.

So, this is what Richard came up with so far:

<a href="http://www.gnegg.ch/wp-content/uploads/2010/04/tempalias_schwarz_heller.jpg"><img class="aligncenter size-medium wp-image-677" title="tempalias mokcup" src="http://www.gnegg.ch/wp-content/uploads/2010/04/tempalias_schwarz_heller-300x233.jpg" alt="Mockup of the tempalias website design" width="300" height="233" /></a>It's not finalized yet, but in the spirit of publishing here early and often, I'm posting this now. It's actually the third iteration already and Richard is still working on making it even nicer. But it's already 2124 times better than what I could ever come up with.

On the code-front, I was looking into the SMTP server, where I found @kennethkalmer's <a href="http://github.com/kennethkalmer/node-smtp">node-smtp project</a> which provides a very rough implementation of an SMTP daemon.

Unfortunately, it doesn't run under node trunk (or even 0.1.30), but with the power of github, I was able to create my own fork at

<a href="http://github.com/pilif/node-smtp">http://github.com/pilif/node-smtp</a>

My fork contains a bit of additional code compared to the source:
<ul>
	<li>Runs under node trunk (where trunk is defined as "node as it was last tuesday")</li>
	<li>Enforces proper SMTP protocol sequence (first: HELO, then MAIL FROM, then RCPT TO and finally DATA)</li>
	<li>Supports multiple recipients (by handling multiple RCPT TO)</li>
	<li>Does some email address validation (which is way too strict for being RFC compliant)</li>
</ul>
Tomorrow, I'm going to use this fork to build an SMTP server that we'll be using for alias processing, where I will have to put some thought into actual mail delivery: Do I deliver the mail myself? Am I offloading it to a mail relay (I really want to do this. But read more tomorrow)? If so, how is this done with the most memory efficiency?

We'll see.
