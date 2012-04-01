---
layout: post
title: Linux, PowerPC, gcc, segmentation fault
categories:
- Free Software
- Solutions
- Unix
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
If you ask of me me to name the one machine in my possession I love the most, that'll be my Mac Mini.

It's an old PPC one, I bought a bit more than a year ago with the intention of installing Linux on it and using it as home-server/router. It's not the quickest machine there is, but it's the most quiet and it does its job like no other machine I ever had: Its Samba file server, <a href="http://www.gnegg.ch/archives/242-Lots-of-fun-with-OpenVPN.html">OpenVPN Gateway</a>, bittorrent client, <a href="http://www.jinzora.org/">mp3 streaming server</a>, <a href="http://www.slimp3.com">SlimServer</a>, just all you could ever use a home server for.

From the beginning, it was clear to me: The distribution I'm going to install on the beauty was to be <a href="http://www.gnetoo.org">Gentoo Linux</a>. This decision was based on multiple reasons, from hard facts like always current software to soft facts like nice command-prompts.

Basically, the machine just sat there after I installed it, doing its job. Until this week when I wanted to install some software on it - mainly the unrar command to extract some file right on one of the external HDs I plugged in (shion - that's what the machine is called - is connected to about 1TB worth of external HDs).

Unfortunately, <tt>emerge unrar</tt> failed.

It failed hard with a SIGSEGV in gcc (or its cousin cc1).

Naturally I assumed there to be some bug in the gcc I originally installed (3.3 something - as I said: I did not touch the installation for a year now) and I tried to reemerge gcc.

... which ALSO failed with a segmentation fault.

I had no interest what so ever in reinstalling the box - I invested much too much time in its configuration. Cron jobs here, certificates there, home grown scripts everywhere. Even with all the backups I had in mind - I did not want to do that kind of job. Besides: Who tells me if it's really a software problem? Maybe the hardware is at fault which would mean that my work was in vain.

Searching for "gcc segmentation fault ppc" in google is... interesting... but not really something you can do if you actually want a solution for this problem.

In the end, I mentally prepared myself to go on with the reinstallation - still hoping it'd be a software problem.

And by accident, I came across the <a href="http://www.gentoo.org/doc/en/gentoo-ppc-faq.xml">Gentoo PPC FAQ</a> which I more or less read out of pure interest while waiting for the ISO to be burned.

To my biggest delight, said FAQ was really helpful though as it had a question that went "<a href="http://www.gentoo.org/doc/en/gentoo-ppc-faq.xml#gccsegfaults">Why does gcc keep segfaulting during ebuilds?</a>"

So it is a kernel problem! Of course I had preemption enabled! And that option - while working perfectly on all my x86 boxes - causes cache corruption on PPC.

Now that I knew what the problem was, I had two possible ways to go on: Quick and dirty or slow, but safe and clean:
<ol>
	<li>Recompile the kernel on the obviously defective machine, hoping the cache corruption would not hit or at least would not lead to a non-bootable kernel to be compiled.</li>
	<li>Boot from a Gentoo live-CD, <tt>chroot</tt> into my installation, recompile the kernel.</li>
</ol>
Obviously, I took the option 1.

I had to repeat the <tt>make</tt> command about 20 times as it continued to fail with a segmentation fault here and then. Usually I got away with just repeating the command - the cache corruption is random after all.

I was unable to get past the compilation of reiserfs though - thank god I'm using ext3, so I could just remove that from the kernel and continue with my make-loop.

Rebooting that kernel felt like doing something really dangerous. I mean: If the cache corruption leads to a SIGSEGV, that's fine. But what if it leads to a corrupted binary? And I was going to boot from it...

To my delight, this worked flawlessly though and I'm writing this blog entry behind the rebooted MacMini-router. This time, even compiling the all new gcc 4.1.1 worked as expected, so I guess the fix really helped and the hardware's ok.

Personally, I think fixing this felt great. And in retrospect, I guess I was lucky as hell to have read that FAQ - without it, I would have gone ahead with the reinstallation, compiling yet another kernel with preemption enabled which would have led to just the same problems as before.

Maybe the (very talented) Gentoo Hanbook guys should add a big, fat, red (and maybe even blinking) warning to the handbook to tell the user not to enable preemption in the kernel.

I know it's in the FAQ, but why is it not in the installation handboook? That's the place you are reading anyways when installing Gentoo.

Still: Problem solved. Happy.
