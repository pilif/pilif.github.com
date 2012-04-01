---
layout: post
title: New MacMini (early 09) and Linux
categories:
- Troubleshooting
tags:
- Free Software
- Hardware
- linux
- Mac
- shion
- solution
- Solutions
- ubuntu
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
The new MacMinis that were announced this week come with a Firewire 800 port which was reason enough for me to update shion yet again (keeping the host name of course).

All my media she's serving to my various systems is stored on a second generation Drobo which is currently connected via USB2, but has a lingering FW800 port.

Of course the upgrade to FW800 will not double the transfer rate to and from the drobo, but it should increase it significantly, so I went ahead and got one of the new Minis.

As usual, I entered the Ubuntu (Intrepid) CD, hold c while turning the device on and completed the installation.

This left the Mini in an unbootable state.

It seems that this newest generation of Mac Hardware isn't capable of booting from an MBR partitioned harddrive. Earlier Macs complained a bit if the harddrive wasn't correctly partitioned, but then went ahead and booted the other OS anyways.

Not so much with the new boxes it seems.

To finally achieve what I wanted I had to do the following complicated procedure:
<ol>
	<li>Install <a href="http://refit.sourceforge.net/">rEFIt</a> (just download the package and install the .mpkg file)</li>
	<li>Use the Bootcamp assistant to repartition the drive.</li>
	<li>Reboot with the Ubuntu Desktop CD and run parted (the partitioning could probably be accomplished using the console installer, but I didn't manage to do it correctly).</li>
	<li>Resize the FAT32-partition which was created by the Bootcamp partitioner to make room at the end for the swap partition.</li>
	<li>Create the swap partition.</li>
	<li>Format the FAT32-partition with something useful (ext3)</li>
	<li>Restart and enter the rEFIt partitioner tool (it's in the boot menu)</li>
	<li>Allow it to resync the MBR</li>
	<li>Insert the Ubuntu Server CD, reboot holding the C key</li>
	<li>Install Ubuntu normally, but don't change the partition layout - just use the existing partitions.</li>
	<li>Reboot and repeat steps 7 and 8</li>
	<li>Start Linux.</li>
</ol>
Additionally, you will have to keep using rEFIt as the boot device control panel item does not recognize the linux partitions any more, so can't boot from them.

Now to find out whether that stupid resistor is still needed to make the new mini boot headless.
