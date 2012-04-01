---
layout: post
title: Comments disabled
tags:
- gnegg.ch
status: publish
type: post
published: true
meta: {}

---
<p>Ok. this is it. I have enough.</p>
<p>While I value the legit comments of my visitors, I'm deleting over 200 spam comments per day lately. This must stop. NOW.</p>
<p>Unfortunately, no technical measure currently available really prevents comment spam at least not without serious disadvantages.</p>
<p>Let me go into this:</p>
<ul>
 <li>Use a catpcha: Captchas can be broken and in fact ARE broken all over the place. No point in placing another hurdle that's easily overcome by machines, but can't be overcome at all by some humans. True: I could decrease the readability to make OCRing the thing harder, but what's the point? Once the captcha is unreadable, it can't be broken by machines, but it can't be solved by humans either.</li>
 <li>Use a service like TypeKey to authenticate users and let only authenticated users post: Easy to implement, but unfortunately, noone seems to trust MT (neither do I - fully), so noone is using the service. Unfortunately, it doesn't solve the problem either as machines are well able to create TypeKey accounts (I doubt their captcha is so much better - and even if it currently is: Above problems apply to them aswell).</li>
 <li>Create your own authentication service: While this may be more liked than TypeKey, it means a lot of work to integrate it into MT and has the same drawbacks (machines can create accounts unless you use a captcha, where my first point applies again).</li>
 <li>Use a SpamAssassin-like system to get rid of the SPAM. MT has such a system, but it doesn't really work. Neither seem the blacklists to do their job.</li>
</ul>
<p>So I come to the only tool that really works to take care of all comment spam: Turn off comments. No discriminating against visually impaired people, no possibility for even the smartest algorithm to sneak a comment into the system. Problem solved.</p>
<p>Personally, I think MT is lacking in terms of counter-spam measures and I will once more have a look at <a href="http://www.s9y.org">Serendipity</a> which provides more fine-grained control. Until then, I'm sorry, but I have to disable comments on this site.</p>
<p>Spammers: 1, Freedom: 0</p>
