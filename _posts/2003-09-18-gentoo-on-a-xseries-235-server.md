---
layout: post
title: Gentoo on a xSeries 235 Server
categories:
- Free Software
- Hardware
- Solutions
- Unix
status: publish
type: post
published: true
meta: {}

---
Yesterday, one of the harddisks (or was it the SCSI-Controller - it does not matter...) of our very old, self-assembled developement/fileserver went down. As we had backupped the important data and I had a spare PC running Linux (the multimedia machine I wrote about <a href="http://www.gnegg.ch/archives/6-Fun-with-Linux-and-new-Hardware.html">here</a>), getting a working environement was a matter of about two hours (one I used up trying to get the old server to boot again).

Anyway: We deceided that it was time to move away from self-assembled machines to something more professional (and hopefully more reliable), so we ordered a IBM (we really like those machines - great support, long warranty and rock-solid) xSeries 235 machine which arrived today.

I deceided to install <a href="http://www.gentoo.org">Gentoo Linux</a> on the machine as it will mostly be used as my developement server (and as a windows-fileserver for our data), so eventual downtimes do not really matter (but latest versions of the installed software are important) - a nice testbed for this distribution until I roll out production machines running Gentoo.

Besides the hardware-RAID5 the new server had built in, we plugged an old 120GB IDE drive to be used as storage area for not-so-important files (read: music, temporary files,...) - additionally it contained all the current developement work, so I had to copy it's contents down to the new virtual RAID5 drive.

Installing was quite easy, but unfortunatly, the current <tt>gentoo-sources</tt> kernel (2.4.20 - heavily patched) does not support the DMA-Mode for IDE-Devices on the onboard chipset (ServerWorks something), so copying about 30 GB of data from the IDE drive to the RAID was not funny and neither was doing anything on the server when transfers to the IDE drive where running. It was slooow!

Installing a current 2.4.22 <tt>vanilla-sources</tt> kernel solved the DMA-Problem but raised another: The xSeries 235 uses a Broadcom bcm5700 Gigabit Ethernet chipset which is not supported under a vanilla kernel. Of course, I forgot to patch the driver in before I rebooted the newly created kernel which forced me to go down to the basement, compile the driver and go up here again to write this text.

Anyway: The server is now working like a charm. I really look forward to really use it and to take advantage of the greatly increased speed (PII 500 Mhz -> Xenon 2.6 Ghz and more than twice as much RAM than before)
