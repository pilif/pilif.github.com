---
layout: post
title: Fun with Linux and new Hardware
categories:
- Hardware
- Unix
status: publish
type: post
published: true
meta: {}

---
Ooops... what a delay between the last post and this one. I really should post more often or this really gets uninteresting.

However: Recently, I could not resist anymore and bought myself a new desktop PC - initially intended to use at home, but I never could get araound moving it out of the office. One of the reasons may be Richard and our common love in Unreal Tournament which ceratinly works better on a 2.5 GHz P4 with a Radeon 9700 than on my Thinkpad ;-)

Anyway: After having seen KDE 3.1rc3 using TrueType-Fonts with Font-Hinting on my Gentoo-Box at home, I finally deceided that it is time to give linux a shot on this new PC to finally use it for the daily development-work (which I did in jEdit [see below] under Windows on SAMBA-exported directories).

I mean: The time was right: ATI just released a <a href="http://mirror.ati.com/support/drivers/linux/radeon-linux.html">driver</a> for the new Radeon series and I finally wanted to give it a shot.

And I shouldn't have.

I chose Gentoo as my distribution. One one side because I wanted to see how long the new box takes for compiling the whole stuff I need and on the other side because I really *knew* that every other distribution will not work as they do not let the user do enough customizing in the installation and they certainly will not recognize my new hardware.

In short: Even installing Gentoo with its always-brand-new software-packages was a time-consuming frustrating thing. Some points:

<ul>
 <li>I used the integrated Braodcom NetXtreme Gigabit Chipset on my Asus P4PE mainboard. Unfortunatly the driver is not included in the kernel and on the gentoo-install-cd is no compiler to compile a module matching to the running kernel. My solution was using <a href="http://www.knoppix.de">Knoppix</a> with a /lib copied to the partition I wanted to use for Gentoo. Another one would have been trying to get the kernel-headers used to compile the gentoo-install-kernel and compile the driver on another machine.
 <li>2.4.19 does not support the ICH4-integraded IDE-Controller, so I had to install 2.4.20-rc2. I was to lazy to patch in the cool Gentoo-Patches. I will not upgrade the kernel anytime soon as I will certainly forget to re-compile all the modules I had to compile in addition to the ones provided with the kernel.
 <li>In the first night of using emerge &lt&lt;a lot of stuff&gt;&gt; without sitting in front of the monitor, emerge failed about 10 Minutes after I left when compiling <a href="http://www.postgresql.org">PostgreSQL</a> because of a bug in that ebuild. One night the PC run in vain.
 <li>The ATI-Drivers did not work for me: When Starting XFree a strange error about fglrx not containing some object-data appeared and X closed down. Possibly, the <a href="http://dri.sf.net">DRI-Project</a> was of help in at least getting X to work (the current CSV-version seems to support the new Radeon-Chips) - although not very fast and without all the 3D-features I could have. As I am currently not sitting in front of the machine, I could just see X not going down but I could not check if it really works, yet.
</ul>

I've learned that I will *never again* install linux on anything newer than 6 months old. I really am no crack in setting up Linux and the procedure I had to go through was a pain in the ass. Many times I wanted to give up as with every problem I solved, another one arised.

Finally, my liking for <a href="http://www.gentoo.org">Gentoo</a> may be another problem. Compiling everything from Source is cool, but on the other hand does not bring that much of a performance improvement and certainly takes time, even more if ebuilds marked for production use are strictly broken and do not compile. As compiling is a time consuming process, I nearly *demand* that it works without myself having to sit in front of the monitor just to fix a compile-problem here ant there as this (nearly) defeats the whole sense of using gentoo instead of <a href="http://www.linuxfromscratch.org">LFS</a>

Anyway: I am looking forward to the evening when I will possibly finally be ready to start using linux productivly.
