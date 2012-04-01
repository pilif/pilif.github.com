---
layout: post
title: Bootcamp, Vista, EFI-Update
tags:
- drivers
- Mac
- Software
- vista
status: publish
type: post
published: true
meta: {}

---
<p>Near the end of october I wanted to install Vista on my Mac Pro, using Bootcamp of course. The reason is that I need a Windows machine at home to watch <a href="http://tasvideos.org">speedruns</a> on it, so it seemed like a nice thing to try.</p>
<p>Back then, I was unable to even get setup going: Whenever you selected a partition that's not the first partition on the drive (where OS X must be). The installer complained that the BIOS reported the selected partition to be non-bootable and that was it.</p>
<p>Yesterday, Apple has released another EFI update which was said to improve compatibility with Bootcamp and to fix some suspend/resume problems (I never had those)</p>
<p>Naturally, I went ahead and tried again.</p>
<p>The good news: Setup doesn't complain any more. Vista can be installed to the second (or rather third) partition without complaining.</p>
<p>The bad news: The bootcamp driver installer doesn't work. It always cancels out with some MSI-error, claims to roll back all changes (which it doesn't - sound keeps working even after that «rollback» has occurred). This means: No driver support for NVIDIA card of my MacPro.</p>
<p>Even after trying to fetch a vista compliant driver from NVIDIA, I had no luck: The installer claimed the installation to be successful, but resolution stayed at 640x480x16 after a reboot. Device manager complained about the driver not finding certain resources to claim the device and that I was supposed to turn off other devices... whatever.</p>
<p>So in the MacPro case, I guess it's waiting for updated Bootcamp drivers by Apple. I hear though that the other machines - those with an ATI driver are quite well supported.</p>
<p>All you have to do is to launch the bootcamp driver installer with the /a /v parameters to just extract the drivers and then you use the device manager and point it to that directory to manually install the drivers.</p>
