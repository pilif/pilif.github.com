---
layout: post
title: Careful when clean-installing TabletPCs
tags:
- Hardware
- solution
- Solutions
- tabletpc
- vista
status: publish
type: post
published: true
meta: {}

---
<p>At work, I got my hands on a <a href="http://www.motioncomputing.com/products/tablet_pc_ls.asp">LS-800</a> TabletPC by motion computing and after spending a lot of time with it and as I'm <a href="/archives/152-Fun-with-a-tablet-pc.html">very interested</a> in TabletPCs anyways, I finally got myself its bigger brother, the <a href="http://www.motioncomputing.com/products/tablet_pc_le17.asp">LE-1700</a></p>
<p>The device is a joy to work with: Relatively small and light, one big display and generally nice to handle.</p>
<p>The tablet came with Windows XP preinstalled and naturally, I wanted to have a look at the new Tablet-centric features in Vista, so I went ahead and upgraded.</p>
<p>Or better: Clean-installed.</p>
<p>The initial XP installation was german and I was installing an english copy of Vista which makes the clean installation mandatory.</p>
<p>The LE-1700 is one of the few devices without official Vista-support, but I guess that's because of the missing software for the integrated UMTS modem - for all other devices, drivers either come prebundled with Vista, are available on Windows update or you can use the XP drivers provided at the Motion computing support site.</p>
<p>After the clean installation, I noticed that the calibration of the pen was a bit off - depending on the position on the screen, the tablet noticed the pen up to 5mm left or above the actual position of the pen. Unfortunately, using the calibration utility in the control panel didn't seem to help much.</p>
<p>After some googling, I found out what's going on:</p>
<p>The end-user accessible calibration tool only calibrates the screen for the tilt of the pen relative to the current position. The calibration of the pens position is done by the device manufacturer and there is no tool available for end-users to do that.</p>
<p>Which, by the way, is understandable considering how the miscalibration showed itself: To the middle of the screen it was perfect and near the sides it got worse and worse. This means that a tool would have to present quite a lot of points for you to hit to actually get a accurately working calibration.</p>
<p>Of course, this was a problem for me - especially when I tried out journal and had to notice that the error was bad enough to take all the fun out of hand-writing (imagine writing on a paper and the text appearing .5cm left of where you put the pen).</p>
<p>I needed to get the calibration data and I needed to put it back after the clean installation.</p>
<p>It turns out that the linear calibration data is stored in the registry under HKLM\SYSTEM\CurrentControlSet\Control\TabletPC\LinearityData in the form of a (large) binary blob.</p>
<p>Unfortunately, Motion does not provide a tool or even reg-file to quickly re-add the data should you clean-install your device, so I had to do the unthinkable (I probably could have called support, but my method had the side effect of not making me wait forever for a fix):</p>
<p>I restored the device to the factory state (by using the preinstalled Acronis True Image residing on a hidden partition), exported the registry settings, reinstalled Vista (at which time the calibration error resurfaced), imported the .reg-File and rebooted.</p>
<p>This solved the problem - the calibration was as smooth as ever.</p>
<p>Now, I'm not sure if the calibration data is valid for the whole series or even defined per device, but here is <a href="http://www.lipfi.ch/tabletcalib.reg">my calibration data</a> in case you have the same problem as I had.</p>
<p>If the settings are per device or you have a non-LE-1700, I strongly advise you to <em>export that registry key before clean-installing</em></p>
<p>Obviously I would have loved to know this beforehand, but... oh well.</p>
