---
layout: post
title: pilif's guide to jabber
categories: []

status: publish
type: post
published: true
meta: {}

---
<p>I have been talking about <a href="http://www.jabber.org">jabber</a> before on this blog (<a href="/archives/36-Just-like-SMS-only-cheaper.html">here</a> and <a href="http://www.gnegg.ch/archives/150-Gentoo-and-Jabber.html">here</a>). And each time the euphory was put back by one or another malfunctioning element. You know: I would never use a third party service for a fun-project if I can be my own provider aswell.</p>

<p>And being  ones own provider is one of the biggest advantages of using jabber. Over the years (the experiment began in the winter of 2002/2003), I have been running a jabber-server here and then.</p>

<p>First it was after reading the <a href="http://www.oreilly.com/catalog/jabber/index.html">jabber book</a> (very interesting read) which ended with me installing a jabber server with transports for aim (aim-t) and icq (jit? I don't remember). Installing jabber on debian was quite hard because there was no (useable) package (too old - as usual), but once I got it to work, it was fun.</p>

<p>The problems began with the advent of iChat and .Mac: aim-t was not able to detect the presence of .Mac users and thus I was unable to talk with them via the jabber server. Unfortunately, Richard is one of those .Mac guys, so I had to find another solution to talk with him.</p>

<p>For long, the only solution was original AIM itself, but in the fall of 2003 <a href="http://www.trillian.cc">Trillian 2.0</a> was released with AIM/iChat-Support. This was the demise of my jabber-solution.</p>

<p>While I've always liked to have the whole client-configuration, contactlist and whatnot stored on the server, the advantage of actually being able to chat with richard made me switch to trillian and thus even <em>pay</em> for a IM solution - regardless of the many free alternatives.</p>

<p>Remember: At the time, Trillian was the only AIM client capable of talking with the .Mac guys. The original AOL client excluded of course, but who wants to be running a ton of IM clients at the same time (most of my buddies were on ICQ which was not compatible with AIM then)? And who wants to cope with advertising all over the place?</p>

<p>After that, I was keeping Trillian, where I used a Jabber-Plugin to still be connected to the Jabber-Server (which was completely pointless as I was and am the only user on that server and no-one I know is using jabber (any more)).</p>

<p>Then the Debian installation went away and Gentoo came. I've written about the pleasant experience with <a href="http://www.gnegg.ch/archives/150-Gentoo-and-Jabber.html">jabber on Gentoo</a>. Still: As I was the only user, that jabber installation lived not very long either (I've never come around to have jabberd start automatically, so after a power outage, the service was gone. And I did not even notice *sigh*)</p>

<p>Only last week, my interest came back when I've seen that iChat provides jabber-support. Don't ask me why. I just wanted to check the progress of the various projects once more.</p>

<p>I immediately noticed <a href="http://ejabberd.jabber.ru/">ejabberd</a> which is what's currently powering jabber.org</p>

<p>On their site I read about <a href="http://pyaim-t.blathersource.org/">PyAIM-t</a>. Finally a replacement for that old aim-t without .Mac support. And I checked the readme-file: Yes. PyAIM-t uses the oscar protocol which is what's needed to get the presence info of those .Mac users</p>

<p>Installing ejabberd failed miserably though.</p>

<p>For one, the gentoo ebuilds are outdated(!) and I never managed to install the whole thing in a way that the command-line administration tool was able to access the (working) server. I admit: I've not invested nearly enough time to understand that erlang-thing. But why should I? It's a for-fun-only project after all.</p>

<p>Via the installation instructions of that PyAIM-t transport I found out about <a href="http://www.jivesoftware.org/wildfire/">Wildfire</a>. Wildfire is GPL, but backed by a company with strict commercial interest. A bit like the MySQL-thing. For me it did not matter as I did not want to integrate the thing into a commercial solution. Heck! I did not even want to use the unmidified thing commercionally.</p>

<p>Installing wildfire was - even though it required Java - easy to do. Especially as Gentoo provides a current ebuild (hard masked though because Wildfire depends on Java 1.5). Getting the thing to work was a matter of <tt>emerge wildfire</tt>, <tt>/etc/init.d/wildfire start</tt> and <tt>rc-update add wildfire default</tt> as it's the norm with Gentoo.</p>

<p>Then I read the documentation to learn how to add a SSL certificate (signed by our company's CA) which was a bit hairy (note: the web interface does not work. if you use the web interface, you corrupt the certificate store).</p>

<p>Installing the transports (PyAIM-t, PyMSN-t, PyICQ-t) was a matter of untaring the archive, entering the right connections settings I've configured in wildfire and launching the scripts. Easy enough.</p>

<p>Then I went to select the right client (on windows this time around): I've already known <a href="http://jajc.ksn.ru">jajc</a>, new for me were <a href="http://exodus.jabberstudio.org/">Exodus</a> and <a href="http://psi-im.org/">Psi</a> and <a href="http://www.pandion.be/">Pandion</a>. I could have kept trillian, but the nicest thing about the jabber clients is that they can store their settings on the jabber server. Trillian can't do that. So if I'm working on a new machine, I have to reconfigure Trillian where every pure jabber client will just fetch the settings from the server. Also, I wanted to have an OpenSource solution.</p>

<p>Now, that client-thing is a very subjective thing as functionality-wise, all three are identical - at least concerning the jabber-featureset (I'm not counting addons like RSS readers or whatever). </p>

<p>So here's my subjective review:</p>

<p>Jajc is not open source, provides a ton of settings to tweak (too many for my taste) and does not look that attractive (UI-wise).</p>

<p>Exodus seemingly does not provide a way to make the different contacts on the list look differently depending on which transport they use and the chat window is very, very limited in featureset and looks. If you dislike good looking programs with tons of unimportant settings to tweak, go for Exodus (this was not meant with disrespect. I was one of those users myself).</p>

<p>What remains is Pandion and Psi.</p>

<p>What I like about Pandion is the nice contact list display. You know: With avatar display (which works cross-im-network with those python transports!) I also like the nice looking chat window. What I dislike is the limited amount of settings to tweak (hehe... It's hard to make it <em>right</em> for me. Isn't it?).</p>

<p>I like the space-economic, yet still nice looking contact list in PSI. I also like the design of the chat window and the count of settings to tweak.</p>

<p>Personally, I can't decide between Psi and Pandion, so I'm running both of them currently. One day I will sure as hell know which of them I want to use.</p>

<p>So finally I'm up to speed with jabber again: Nice opensource client, working server and - finally - the .Mac AIM-Users on my contact list, while even able to chat with them.</p>

<p>So, you may ask: Why go through all this? Why not just stick with trillian?</p>

<p>Easy!</p>
<ul>
  <li>A pure Open Source solution. No strange subscription model</li>
  <li>As settings are stored on the server, equal configuration wherever I am.</li>
  <li>Jabber has inherent support for multiple connections with the same account.</li>
  <li>Jabber works on many mobile phones. That way I can IM with my mobile phone while not being locked into a specific service</li>
  <li>It was fun to set up!</li>
</ul>
<p><em>*happy*</em></p>
