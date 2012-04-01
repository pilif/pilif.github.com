---
layout: post
title: Managed switch
tags:
- Hardware
- networking
- shion
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
<a href="/2009/01/life-is-good/">Yesterday</a> I've talked about configuring a VLAN in my home network.

<a href="http://en.wikipedia.org/wiki/VLAN">VLAN</a> is a technology using some bits in Ethernet frames to create virtual network segments on the same physical network, but just go ahead and read the linked Wikipedia article as it's more detailed than what I would want to go into.

To really make use of VLANs, you are going to need at least one managed switch (two in my case). I knew this and I was looking around for something useful.

In the end, I ended up with two <a href="http://h10010.www1.hp.com/wwpc/uk/en/sm/WF06b/12883-12883-3445275-3445282-3445282-3231819-3231825.html">HP ProCurve 1800-8G</a>'s: I wanted something that has at least 8 ports and was Gigabit capable as I was feeling the bandwidth cap on the previous 100M connection between <a href="/2006/07/computers-under-my-command-issue-1-shion/">shion</a> and my media center when streaming 1080p content.

That's something I hope to solve with the 1G connection, though the drobo may still be the limiting factor here, but theoretical 480Mbit is better (where are the MacMinis with the Firewire800 interface?) than the 100MBit I was constrained to with the old setup.

The ProCurves are fanless, provide 8 ports and have a really nice web interface which is very easy to use and works on all browsers (as opposed to some linksys things which only work with IE6 (not even IE7 does the trick)). Also, the interface is very responsive and it even comes with an excellent online help.

With only 10 minutes of thought going into the setup and another 5 minutes to configure the two switches I was ready to hook them up and got instant satisfaction: In my server-room I plugged a test machine to any of the ports 2-7 and got onto VLAN1 (the internal network). Then I plugged it into port 8 and promptly was on VLAN2 (as evidenced by the public IP I got).

I have only three minor issues with the configuration of the two switches so far:
<ol>
	<li>They come with an empty administration password by default and don't force you to change it. Now granted, on a switch you cannot do as many mischief as on a router or worse, a NAS or access point, but it's still not a good thing.</li>
	<li>They come preconfigured with the address 192.168.2.10 and DHCP disabled, practically forcing you to configure them locally before plugging them. I would have hoped for either DHCP enabled or, even better, the possibility of configuring them using <a href="http://en.wikipedia.org/wiki/Reverse_Address_Resolution_Protocol">RARP</a>. Or they could provide a serial interface which they do not.</li>
	<li>To reset them, you have to unplug them, connect port 1 with port 2 and restart them. While this prevents you from accidentally resetting them, the procedure is a pain to do and when the time comes that I will have to do this, I'll probably have forgotten the procedure.</li>
</ol>
But these are minor issues. The quick web interface, the excellent online help and the small fanless design make this the optimal switch once you have advanced requirements to fulfill despite not needing more than 8 ports.

There's a larger 24 port cousin of the 1800-8G, but that one has a fan, so it was no option in my case - especially not in the sideboard where I'm now at the end of the 8 port capacity.
