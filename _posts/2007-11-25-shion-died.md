---
layout: post
title: shion died
tags:
- Hardware
- Personal
- pilif
status: publish
type: post
published: true
meta: {}

---
<p>After so many years of continued usage, <a href="/archives/291-Computers-under-my-command-Issue-1-shion.html">shion</a> (not the character from Xenosaga, my Mac Mini) died.</p>
<p>The few times it's actually capable of detecting its hard-drive at boot-time, it loses contact to it shortly after loading the kernel. And the hard drive makes an awful kind of noise which is a very good pointer at what's wrong.</p>
<p>Now, I could probably just replace the hard drive, but that old G4 processor, the 512 Megs of RAM and the two single USB-ports forcing me to cascade hub after hub all are good reasons to upgrade the hardware itself.</p>
<p>And thus, Shion 2.0 was born.</p>
<p>I grabbed an unused Mac Mini from the office and tried installing Ubuntu Gutsy on it, which worked well, but Leopard's "Startup Disk" preference pane didn't list the partition I installed Ubuntu on as a bootable partition. Booting Linux via pressing alt during pre-boot worked, but, hey, it's a server and I don't have a keyboard ready where shion is going to stand.</p>
<p>So I did it the brute-force way and just installed Ubuntu using the whole drive. It takes a hell of a lot of time for the EFI firmware to start missing the original GUID partition scheme and the original EFI parition, but when it does, it starts GRUB in the MBR partition, so I'm fine.</p>
<p>This does mean that I will be unable to install later firmware upgrades (due to the lack of a working OS X), but at least it means that I can reboot shion when needed without having to grab a keyboard.</p>
<p>This, provided that Domi will be able to solder me a <a href="http://www.mythic-beasts.com/support/macminicolo_howto.html">display adaptor</a> making the EFI BIOS emulation think that a display is connected.</p>
<p>All in all, I'm not totally happy with the next generation of shion. Not booting without a display attached, long boot times, non-working bios updates and, especially, no eSATA, but it's free, so I'll take it. I guess the old shion just chose a terribly inconvenient time to die.</p>
