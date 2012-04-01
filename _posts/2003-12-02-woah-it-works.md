---
layout: post
title: Woah! It works?
categories: []

status: publish
type: post
published: true
meta: {}

---
A little history lesson:

<ul>
 <li>My goal <a href="http://www.gnegg.ch/archives/43-Fun-with-OpenLDAP.html">was</a> single-sign on on our Linux-, OSX- and Windows Boxes
 <li>It did <a href="http://www.gnegg.ch/archives/44-And-on-to-replication.html">not</a> <a href="http://www.gnegg.ch/archives/45-Its-coming-along....html">work</a> <a href="http://www.gnegg.ch/archives/46-OSX-and-OpenLDAP.html">very</a> <a href="http://www.gnegg.ch/archives/47-LDAP-again....html">well</a>
 <li>So I turned it off and forgot about it. Or better: I had it in it's sort-of-working state until I had to upgrade SASL for Cyrus Imapd which in turn brought the OpenLDAP-Replica server to a state where it would consume 100% of CPU time and not respond to any requests. This is where I've given up. Talk DLL-Hell ;-)
</ul>

Then came the time with our <a href="http://www.gnegg.ch/archives/63-Each-problem-has-a-solution....html">Exchange-Trial</a> which turned out to be working quite nicely.

And finally, yesterday, Jonas asked for a shell-account on one of the Linux boxes - Samba-Access was already working (by using <tt>security = domain</tt> and <tt>password server = *</tt> in smb.conf). This is where I really wanted to rethink the whole single-sign-on-thing - even more that I really want to create users just once so I don't forget to remove them at different places, should I have to remove (or disable) one once in a while.

LDAP was no alternative (as you can read here on gnegg.ch).

I haven't tried out <tt>winbind</tt> back then, which is what I've set up this morning.

And it's funny: It just worked. First I was joining the Samba-Servers to the ADS-Domain following <a href="http://www.samba.org/samba/docs/man/Samba-HOWTO-Collection.html#ads-member">this quide</a>. No problems (which I could not believe at first). Then I followed <a href="http://www.samba.org/samba/docs/man/Samba-HOWTO-Collection.html#winbind">this guide</a> and the manpage of <tt>smb.conf</tt> to get <tt>winbind</tt> to work and as before: It runs flawlessly (after adding <tt>UsePAM yes</tt> to <tt>sshd.conf</tt>). Even more interesting: Here on the <a href="http://www.gentoo.org">Gentoo</a> box I was trying this out first, it worked even without any PAM-configuration at all.

Nice.

What do I have?

I can manage my users at a central place - this time on the Windows Server with quite good looking GUI tools. This is what I've always wanted to do. Nothing more, nothing less.

I'm a bit afraid from trying to configure our Mac OS X-computer, but we'll see.

Very nice and satisfying.
