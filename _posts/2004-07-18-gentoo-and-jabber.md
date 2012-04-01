---
layout: post
title: Gentoo and Jabber
categories:
- Free Software
- Unix
status: publish
type: post
published: true
meta: {}

---
<p>
Already in 2002 I did my first experiments with jabber and I really liked what I saw when still reading the documentation. Setting up the server was a real pain, but eventually I got it working. </p><p>
Then came the <a href="http://www.gnegg.ch/archives/110-Speed-up.html">thing with our server</a> and having in mind the hard work needed for setting up jabber, I deceided not to rebuild the jabber-configuration - even more so because aim-transport still does not support those fancy iChat-AIM-Accounts while Trillian does.</p>
<p>But today after having seen that iChat in Tiger is going to support jabber, I finally deceided that adding my beloved server back would be a cool thing...</p>
<p>And the whole adventure turned out to be another point where <a href="http://www.gentoo.org">Gentoo</a> shines above all other distributions: The ebuilds for jabber and the two transports I am using (AIM and ICQ) where already beautifully preconfigured. And not only that: They where current too (hint to debian... ;-) )</p>
<p>One thing did not work at the beginning: I could not register with the AIM-Transport. A quick glance at the configuration file of aim-t showed me that the preconfigured config file uses another port (5233) than the recommended settings in the main configuration file (5223).</p>
<p>All in all it took me about 10 minutes to get my old jabber installation back. With current versions of all the tools involved and without writing own startup scripts or other fancy stuff. This is one of the reasons I really like Gentoo</p>
<p>Oh... and in case you ask: My Jabber-ID is <tt>pilif@chat.sensational.ch</tt>. It's not listed in the global user directory.</p>
<p>And if you're asking what client I'm using: Though its interface may need some improvement, <a href="http://jajc.ksn.ru">jajc</a> is in my oppinion the best client you can get if you are using windows</p>
