---
layout: post
title: VMWare Server 2.0
tags:
- linux
- torrent
- ubuntu
- vmware
status: publish
type: post
published: true
meta: {}

---
<p>Now that the <a href="http://www.gnegg.ch/archives/377-shion-died.html">time has come</a> to upgrade <a href="/archives/291-Computers-under-my-command-Issue-1-shion.html">shion</a>'s hardware, and now that I'm running a x86 based platform (well, it's the 64 bit server install of <a href="http://www.ubuntu.com">Ubuntu</a> Gutsy), I guessed it was time to have a look at my current bittorrent solution.</p> <p>Of all the torrent clients out there, so far, I had the most painless experience with uTorrent: Acceptable download speeds, a very nice web interface and a nice looking user interface. The only drawback is that it requires Windows to run and I had no constant-running Windows-PC at home.</p> <p>In fact, I didn't even have a Windows-PC <em>at all</em>. VMWare Fusion came to the rescue as it allowed me to install Windows on a virtual machine and run that on my main mac at home. I chose fusion as opposed to parallels because I always knew that I was going to update shion sooner or later, so I wanted the portability of the VMWare virtual machines (they run everywhere VMWare runs on - no conversion, no nothing).</p> <p>And now that I did replace shion, I've installed the latest beta version of VMWare Server 2.0 and moved the virtual machine over to the newly born shion 2.0 which means that I now have a constantly running "Windows-PC" at home.</p> <p>The move was painless as expected, but the whole process of installing VMWare server or the web interface was not as painless. VMWare Server feels exactly like every other proprietary Unix application I ever had to deal with. Problems with shared libraries (PAM, Gentoo, 32bit emulation and vmware server 1.0 is pure hell), problems with init-scripts not working, problems with incomprehensible error messages, you name it.</p> <p>And once I actually got the thing to run, the first thing I had to do was to configure a whole bunch of iptables-rules because it seems impossible to bind all the 7 ports the web interface opens to localhost only (shion also is my access router, so I certainly don't want the vmware-stuff exposed on eth1).</p> <p>And actually using the web interface means forwarding all the 7 ports. In VMWare Server 1, it sufficed to forward the one port the console application used.</p> <p>All this to finally end up without a working console access - the browser plugin they use for this seems not to work with Mac OS X and adding all the 7 ports to putty in my client windows VM, frankly, was more complicated than what I could get out of it.</p> <p>Before this goes final with the expectation of being as useful as version 1 was, they need to give us back a native client and a smaller number of ports to forward.</p>
