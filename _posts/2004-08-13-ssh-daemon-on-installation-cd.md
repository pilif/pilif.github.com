---
layout: post
title: SSH daemon on installation CD
tags:
- Software
status: publish
type: post
published: true
meta: {}

---
<p>
First, my apologies for not posting for quite some time now, but  I have a hell of a lot of things to do. One of those was setting up yet another IBM xSeries 345 Server. And yet again, I deceided to install <a href="http://www.gentoo.org">Gentoo Linux</a> on it and yet again this distribution does not stop to amaze me:
</p>
<p>On their current livecd (used for installing the distribution), they have actually installed an OpenSSH-Server ready to be started, allowing you to do the whole installation procedure remotely. This is incredibly nice.</p>
<p>So I could put the server in our basement where its noise did not annoy anyone and still do the installation from my comfortable chair in my office. This is great!</p>
<p>But then I widened my thoughts: Imagine, you modify the CD just a little bit: Preconfigure the network with the IP of your server somewhere in a remote location, set a non-random root password and configure the SSH-daemon to automatically start on boot.
</p>
<p>Then configure the server to boot from CD, if one is there.</p>
<p>Now, if your server (somewhere in a remote location where getting into is difficult or at least time-consuming) should crash and fail to come up properly after a reboot, just ask someone at the housing center to insert the CD and reboot. The rescue system from the CD will boot and the SSH daemon will start. Now you can try to fix your system remotely.
</p>
<p>When you are finished, your customized reboot-script will eject the CD after unmounting it, allowing the server to reboot normally from it's (hopefully) fixed installation. This would even allow to completely fresh-install a compromised system remotely, without forcing you to do that on-location.</p>
<p>This is extremely nice and just another reason why I prefer the seemingly simple and anachronistic installation procedure of Gentoo. I mean: Just try doing this with either Fedora or SuSE...</p>
