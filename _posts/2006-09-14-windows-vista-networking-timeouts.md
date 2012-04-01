---
layout: post
title: Windows Vista, Networking, Timeouts
tags:
- Software
- Solutions
status: publish
type: post
published: true
meta: {}

---
<p>Today I went ahead and installed the RC2 of Windows Vista on my media center computer.</p><p>The main reason for this was because that installation was very screwed (as most of my Windows installations get over time - thanks to my experimenting around with stuff) and the recovery CD provided by Hush was unable to actually recover the system.</p>
<p>The Hard Drive is connected to a on-board SATA-RAID controller which the XP setup does not recognize. Usually, you just put the driver on a floppy and use setup's capability of loading drivers during install, but that's a bit hard without a floppy drive anywhere.</p>
<p>Vista, I hoped, would recognize the RAID controller and I read a lot of good things about RC2, so I thought I should give it a go.</p>
<p>The installation went flawlessly, though it took quite some time.</p>
<p>Unfortunately, surfing the web didn't actually work.</p>
<p>I could connect to some sites, but on many others, I just got a timeout. <tt>telnet site.com 80</tt> wasn't able to establish a connection.</p>
<p>This problem in particular was in my Marvel Yukon chipset based network adapter: It seems to miscalculate TCP packet checksums here and there and Vista actually uses the hardwares capablity to calculate the sums.</p>
<p>To fix it, I had to open the advanced properties of the network card, select "TCP Checksum Offload (IPv4)" and set it to "Disabled".</p>
<p>Insta-Fix!</p>
<p>And now I'm going ahead and actually start to review the thing</p>
