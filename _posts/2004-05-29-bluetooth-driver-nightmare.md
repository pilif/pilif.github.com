---
layout: post
title: Bluetooth driver nightmare
tags:
- Solutions
status: publish
type: post
published: true
meta: {}

---
<p>Another post around  bluetooth - one I wanted to do for quite some time now, but I have not come around to yet.</p>

<p><a href="http://www.gnegg.ch/archives/101-Even-more-bluetooth.html">As you know</a>, Microsoft will bring its own Bluetooth-Implementation to Windows XP with Service Pack 2 (this and the better WLAN support are two strong reasons for me wanting to install it, but the current RC1 does not work with Delphi's debugger - I hear, this is fixed in RC2 to be released somewhere in June). What you may not know is that there is some Post-SP1-Fixup floating around that already has rudimentary BT support. I think, it initially came with Microsofts Bluetooth Accessories (Keyboards and Mice).
</p>

<p>The Problem with this rudimentary support is that it is not compatible at all with the WIDCOMM-Stack, which provides far more functionality that this MS-thingy does.</p>

<p>The problem gets even worse because this Fixup pack seems to be integrated in quite some OEM preinstallations these days, even if the devices themselfes come with a WIDCOMM stack</p>

<p>I came across this problem with two thinkpads: Initially they have BT disabled. The official way to get it enabled is to first install the Drivers provided by IBM (the WIDCOMM-Stack) and then Press Fn-F5 and click on "Enable"  in the bluetooth section. What then happens is that Windows detects the (USB-, though it's internal hardware, it's still USB) device and <em>installs its rudimentary support</em>.</p>

<p>The Widcomm-Tools never get to recognize the Bluetooth device - the Icon in the tray stays red. You are locked down to the limited (limited as in virtually no functionality at all) functionality of this Microsoft upgrade</p>

<p>The clou: I did not know this and the IBM-Support I've called could not help me either.</p>

<p>So, what's the solution? How to recognize this problem when it happened?</p>

<p>Recognizing is simple: If the BT-Icon is red despite bluetooth being enabled, this may be the problem. If you want to be sure, open Control Panel / System / Hardware / Device Manager and right-click on the BT-Drvice. Select properties. If Manufacturer is Microsoft, you ran into the trap.</p>

<p>So... how to fix it then?</p>

<p>In the window described above, go to the drivers-Tab, select Update Driver. Then follow these steps:
</p>
<ol>
 <li>Install from a list or specific location</li>
 <li>Don't search.</li>
 <li>Have Disk</li>
 <li>Enter <tt>c:\Program Files\&lt;WIDCOMM Installation dir&gt;\bin</tt></li>
  <li>OK</li>
  <li>Ignore the warning about drivers not being signed</li>
  <li>Complete the installation.</li>
</ol>

<p>Sometimes you must reboot, sometimes not. But now the Widcomm software will recognize the drvice and you will have access to the full functionality</p>

<p>Quite simple -  as soon as you have found out what the problem is</p>
