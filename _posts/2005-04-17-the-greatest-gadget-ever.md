---
layout: post
title: The greatest gadget ever
categories:
- Hardware
status: publish
type: post
published: true
meta: {}

---
<p>Recently I though: "well... having this <a href="http://www.gnegg.ch/archives/198-Pile-of-new-hardware.html">iMac as server</a> is all nice and well, but what about having all that a little more like embedded? What about not having to have this iMac running all the time? After all, it is not always as silent as I would have whished it to be. And I really wanted to have something more "hackish"</p>
<p>So I went after the <a href="http://www.linksys.com/products/product.asp?grid=33&scid=35&prid=601" title="Linksys WRT54G product page">Linksys WRT54G</a>. There are two ROM's you can flash on it: On one hand the more or less proprietary ROM by Sveasoft and on the other hand the ROM by <a href="http://www.openwrt.org">OpenWRT</a>, the last one being the only one actually allowing to install packages.</p>
<p>I bought myself one of those linksys-thingies and I was less then pleased. The ROM by Sveasoft worked well by adding some extended features to the device, but not allowing me to install anything (or even change configuration files). OpenWRT fixed that readonly-thing, but I could not get WPA to work.</p>
<p>After all, the device is of limited use as a home-server. The storage you have at your disposal is just too limited, so I went out to fix that problem.</p>
<p>The fist thing that came to my mind is one of those "Network Harddrives" - poor mans NAS.</p>
<p>I went to one of those big retailers and found the <a href="http://www.linksys.com/products/product.asp?grid=35&scid=43&prid=640" title="NSLU2 Product Page">Linksys NSLU2</a>, which enables externally plugged USB-drives to be exported via CIFS (or SMB or SAMBA or whatever you call it).</p>
<p>Before doing anything with the device - having in mind Linksys' relation to Linux, I googled around a bit and found <a href="http://www.nslu2-linux.org/">NSLU2 Linux</a></p>
<p>After getting it installed (the <a href="http://www.nslu2-linux.org/wiki/HowTo/ChangePasswordsFromTheCommandLine">root-password thing</a> was a bit tricky, but consequent RTFM helped here), I was slowly getting very, very impressed.</p>
<p>What you get is the usual down-stripped linux-distribution, but the root-fs is writable, so you can change the configuration in-place. Then, you can use the attached harddrive as storage for additional software, thus working around the single problem I've had with the wrt54g: In-extensibility</p>
<p>After you install the basic distribution, there's little more than 1 MByte of free space on the flash-rom of the device itself. But there's this script, <tt>unslug</tt> that enables the device plugged to the first USB-port as storage for additional software. And additional software, there's plenty of.</p>
<p>After installing the package <tt>unslug-feeds</tt> (with <tt>ipkg install unslug-feeds</tt>) you gain access to <a href="http://ipkg.nslu2-linux.org/feeds/unslung/native/">this repository</a> containing software like Apache, PHP, Postgresql, a bittorrent-client, cups, perl (for Slimp3),... just all you need on a decent linux distribution (and more less-useful stuff like OpenLDAP). You even get <a href="http://www.asterisk.org">asterisk</a> - and there's a way to install additional USB-drivers. If only AVM would provide kernel modules for the ARM-kernel running on the device. Then, the NSLU2 would be the smallest PBX on this planet.</p>
<p>The best thing is: While the firmware by linksys does not allow it, with the improved version, you can plug an USB-Stick into the first USB-port and use that as target for additional software installation.</p>
<p>This allows for installing a complete linux distribution on a device with no mechanical parts whatsoever. No PC you're going to build yourself will even be so silent. Neither is my iMac. Finally a home-server not making any sound at all. This is great.</p>
<p>Because I have no USB-stick at hand, I have not run <tt>unslug</tt> yet, but I will tomorrow.</p>
<p>Then I'm going to plug my newly bought external 250GB harddisk to the second USB-port and use that for storage for a bittorrent client I'm eventually going to install on the USB stick. And for my MP3's which a <a href="http://www.slimp3.com">Squeezebox</a>-Server installed on the USB-Stick will serve. So, when I'm not asleep, I turn on the HDD to serve MP3's to the Squeezebox. When I'm going to sleep, I just turn the HD off, keeping the rest of the server running.</p>
<p>This little device is so extremely great. I really really like it so far and I can't wait to see it to work at it's fullest potential.</p>
<p>This is the best CHF 150.- I've ever spent in my whole live.</p>
