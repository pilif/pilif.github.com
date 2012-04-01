---
layout: post
title: Just another debian install
categories:
- Free Software
- Solutions
status: publish
type: post
published: true
meta: {}

---
Today I was going to install <a href="http://www.debian.org">Debian Linux</a> on another of those <a href="http://www-132.ibm.com/webapp/wcs/stores/servlet/CategoryDisplay?catalogId=-840&storeId=1&categoryId=2559454&langId=-1&dualCurrId=73">IBM xSeries 345</a> servers.

I really like those products as they are quite powerful and use only two units in your rack anyway. And they are rack-mountable without screws which makes the whole process quite a pleasure.

The problem when installing those machines is that Debian 3.0 does not support the built in ServeRAID controller. There is an extended boot-floppy on <a href="http://people.debian.org/~blade/install/preload/">http://people.debian.org/~blade/install/preload/</a>, but unfortuantly, today people.debian.org is down.

My solution was to <tt>apt-get install kernel-headers-2.4.18-bf2.4</tt> (on another debian machine), to download vanilla 2.4.18 kernel sources, to copy over <tt>/usr/src/kernel-headers-2.4.18-bf2.4/.config</tt> to the directory where I unpacked the vanilla sources, to <tt>make oldconfig</tt>, to <tt>make menuconfig</tt>, to select Support for IBM ServeRAID in the configuration tool and finally to <tt>make modules</tt>.

I then copied the compiled <tt>ips.o</tt> to a blank disk in a directory called <tt>/boot</tt>. I could later on use this disk in the debian installation process (booted from CDROM with bf42 on the bootprompt) when I can "Load essential modules from disk".

I did the about same thing for the e1000 driver, the built in ethernet chipset requires:
<ul>
 <li>Download it <a href="ftp://aiedownload.intel.com/df-support/2897/eng/e1000-5.1.13.tar.gz">here</a> and uncompress it.
 <li>Hack src/Makefile to use the kernel-sources above.
 <li><tt>make</tt>
 <li>ignore the warning that a module not matching the current kernel will be built (because that's what I want)
 <li>Copy <tt>e1000.o</tt> to the disk
</ul>

Now it installs flawlessly and I'm quite happy...
