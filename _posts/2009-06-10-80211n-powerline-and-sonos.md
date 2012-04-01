---
layout: post
title: 802.11n, Powerline and Sonos
tags:
- Hardware
- homecinema
- networking
- Solutions
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
I decided to have a look into the networking setup for my bedroom as lately, I was getting really bad bandwidth.

Earlier, while unable to stream 1080p into my bedrom, I was able to watch 720p, but lately even that has become choppy at best.

In my bedroom, I was using a Sonos Zone Player 100 connected via Ethernet to a Devolo A/V 200MBit power line adapter.

I have been using the switch integrated into the zone player to connect the bedrom MacMini media center and the PS3 to the network. The idea was that powerline will provide better bandwidth than WiFi, which it initially seemed to do, but as I said, lately, this system became really painful to use.

Naturally I had enough and wanted to look into other options.

Here's a quick list of my findings:
<ul>
	<li>The Sonos ZonePlayer actually acts as a bridge. If one player is connected via Ethernet, it'll use its mesh network to wirelessly bridge that Ethernet connection to the switch inside the Sonos. I'm actually deeply astonished that I even got working networking with my configuration.</li>
	<li>Either my Devolo adaptor is defective or something strange is going on in my power line network - a test using FTP never yielded more than 1 MB/s throughput which explains why 720p didn't work.</li>
	<li>While still not a ratified standard, 802.11n, at least as implemented by Apple works really well and delivers constant 4 MB/s throughput in my configuration.</li>
	<li>Not wanting to risk cross-vendor incompatibilities (802.11n is not ratified after all), I went the Apple Airport route, even though there probably would have been cheaper solutions.</li>
	<li>Knowing that bandwidth rapidly decreases with range, I bought one AirPort Extreme Base Station and three AirPort Expresses which I'm using to do nothing but extend the 5Ghz n network.</li>
	<li>All the AirPort products have a nasty constantly lit LED which I had to cover up - this is my bedroom after all, but I still wanted line of sight to optimize bandwidth. There is a configuration option for the LED, but it only provides two options: Constantly on (annoying) and blinking on traffic (very annoying).</li>
	<li>While the large AirPort Extreme can create both a 2.4 GHz and a 5 GHz network, the Express ones can only extend either one of them!</li>
</ul>
This involved a lot of trying out, changing around configurations and a bit of research, but going from 0.7 MB/s to 4 MB/s in throughput certainly was worth the time spent.

Also, yes, these numbers are in Mega<strong>bytes</strong> unless I'm writing MBits in which case it's Mega<strong>bits</strong>.
