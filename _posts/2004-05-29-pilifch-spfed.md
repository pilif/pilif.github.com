---
layout: post
title: pilif.ch SPFed...
categories: []

status: publish
type: post
published: true
meta: {}

---
<p>
I'm quite proud to announce that as of now, <a href="http://www.pilif.ch">pilif.ch</a> (my personal webpage - in contrast to gnegg.ch, my blog) has a TXT record that follows the <a href="http://spf.pobox.com/">SPF</a> specification. If you already use SPF on your mailserver, you can now be sure whether mail seemingly coming for pilif.ch is legit or not.</p

<p>But there's another thing. While I was quite impressed from the simplicity and the good protection from SPAM, SPF could provide, I had some thoughts about how to circumvent SPF based filters and I found that it's disturbingly easy...</p>

<p>The problem lies in the fact that any SPAMMer can just buy himself a nice new domain, use it for this one session of SPAM, while adding a nice SPF record. It's even possible to still use cracked zombie systems when the SPF-entry is "wisely" chosen (like adding 0.0.0.0 to the permitted senders).</p>

<p>But even if that's going to happen, there are some drawbacks for the spammer:</p>
<ul>
 <li>Trackability: If I have to buy myself my very own domain, I become trackable. If SPAMMing is not allowed in my country, it's possible that I'm facing some kind of punishment for my acts</li>
 <li>Price: As the actual executor of the SPAMing action has to actually buy a domain, face legal problems and more, the price for each message will rise. Maybe siginificantly enough so that conventional marketing may get more worthwile.</li>
</ul>

<p>Read <a href="http://spf.pobox.com/faq.html#churn">this FAQ entry</a> to get some thoughts about this problem from the creators of the standard. While I don't like the solutions provided there, i hope my above points will solve the problem in time. And if not, someone else will have another idea to stop the flood once more... For the time being SPF is a nice solution to a big problem. Simple, nice and very pragamtic</a>
