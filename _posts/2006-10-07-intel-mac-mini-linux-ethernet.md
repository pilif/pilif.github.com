---
layout: post
title: Intel Mac Mini, Linux, Ethernet
categories:
- linux
- Mac
- sky2
- solution
- Solutions
- Unix
status: publish
type: post
published: true
meta: {}

---
<p>If you have one of these new Intel Macs, you will sooner or later find yourself in the situation of having to run Linux on one of them. (Ok. Granted: The situation may be coming sooner for some than for others).</p>
<p>Last weekend, I was in that situation: I had to install Linux on an Intel Mac Mini.</p>
<p>The whole thing is quite easy to do and if you don't need Mac OS X, you can just go ahead and install Linux like you would on any other x86 machine (provided the hardware is sufficiently new to have the BIOS emulation layer already installed - otherwise you have to install the Firmware Update first - you'll notice by the mac not booting from the CD despite holding c during the initial boot sequence).</p>
<p>You can partition the disk to your liking - the Mac bootloader will notice that there's something fishy with the parition layout (the question-mark-on-a-folder icon will blink one or two times) before passing control to the BIOS emulation which will be able to boot Linux from the partitions you created during installation.</p>
<p>Don't use grub as bootloader though.</p>
<p>I don't know if it's something grub does to the BIOS or if it's something about the partition table, but grub can't launch stage 1.5 and thus is unable to boot your installation.</p>
<p>lilo works fine though (use plain lilo when using the BIOS emulation for the boot process, not elilo)</p>
<p>When you are done with the installation process, something bad will happen sooner or later though: Ethernet will stop working.</p>
<p>This is what syslog has to say about it:</p>
<pre class="ccode">NETDEV WATCHDOG: eth0: transmit timed out
sky2 eth0: tx timeout
sky2 eth0: transmit ring 60 .. 37 report=60 done=60
sky2 hardware hung? flushing</pre>
<p>When I pulled the cable and plugged it in again, the kernel even oops'ed.</p>
<p>The macs have a Marvel Yukon ethernet chipset. This is what lspci has to tell us: <tt>01:00.0 Ethernet controller: Marvell Technology Group Ltd. 88E8053 PCI-E Gigabit Ethernet Controller (rev 22)</tt>. The driver to use in the kernel config is "SysKonnect Yukon2 support (EXPERIMENTAL)" (CONFIG_SKY2)</p>
<p>I guess the EXPERIMENTAL tag is warranted for once.</p>
<p>The good news is, that this problem is fixable. The bad news is: It's tricky to do.</p>
<p>Basically, you have to update the driver with the version that is in the repository of what's going to be kernel 2.6.19</p>
<p>Getting a current version of sky.c and sky.h is  not that difficult. Unfortunately though, the new driver won't compile with the current 2.6.18 kernel (and upgrading to a pre-rc is out of the question - even more so considering the ton of stuff going into 2.6.19).</p>
<p>So first, we have to patch in <a href="http://www.kernel.org/git/?p=linux/kernel/git/torvalds/linux-2.6.git;a=commit;h=84fa7933a33f806bbbaae6775e87459b1ec584c0">this changeset</a> to make the current release of sky compile.</p>
<p>Put the patch to /usr/src/linux and patch with <tt>patch -p1</tt></p>
<p>Then fetch the current revision of sky2.c and sky2.h and overwrite the existing files. I used the web interface to git for that as I have no idea how the command line tools work.</p>
<p>Recompile the thing and reboot.</p>
<p>For me, this fixed the problem with the sky2 driver: The machine in question is now running for a whole week without any networking lockups - despite heavy network load at times.</p>
<p>While happy to see this fixed, my <a href="http://www.gnegg.ch/archives/6-Fun-with-Linux-and-new-Hardware.html">statement about not buying too new hardware</a> (posting number 6 here on gnegg.ch - ages ago) if you intend to use Linux on it seems to continue to apply.</p>
