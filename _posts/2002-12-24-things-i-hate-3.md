---
layout: post
title: Things I hate (3)
tags:
- Personal
status: publish
type: post
published: true
meta: {}

---
Jepp. The test was successful. The installation is up and running again.

After many hours of stupid system administration work, I am thinking about what I have had to do if Linux would have been running on said server.

First of all, it would be highly unlikely that something like this i-will-not-boot-anymore would happen on a Linux-Server. the architecture is more straight-forward there and it cannot happen that the system destablizes itself without external intervention. But let's say, it happened anyway (stupid administrator or even a hardware defect (like defect ram causing currupted data to be written to the harddrive at an incorrect location).

If I cannot boot Linux (or whatever other UNIX-flavor you like), I just take a rescue disk and boot from it. Unlike the disk provided by Microsoft, I would get a full-fledged console allowing me to do everything I could do on the defective installation. The Windows disk provides me with a recovery console which does not allow much more than writing a new boot-record to the harddrive and an automated recovery procedure (actually two - one works better, the other worse. As usual, the better one is hidden (behind the "new installation" step)) which will do something intransparently which is supposed to fix your installation. And: I had to work with a german Windows installation disk and the translation is *really* bad. I would have preferred the english version, but the administrator does not have the choice there.

As always: Intransparence is bad. Where the boot-process of every Linux-Distribution is well-documented and *very* transparent and thus can be modified, debugged or even stripped down to the bare minimum (init=/bin/sh), the process in windows is very complex and cannot be altered at all. This forces the user to do unneccesary time-taking reinstallations as the software is not smart enough to fix the problem and the administration is not allowed to.

Debugging the problem: In UNIX/Linux I get most of the time a nice and understanable error-message. If I can't understand it, I can enter it to google and usually get answers. If not, I can even <tt>grep</tt> through the sourcecode and thus make me an image what it means.

Under Windows - at least some parts of the Windows-Servers, getting a really useful error-message is difficult: The Event-Viewer uses the same Error-Codes for completly different things and the same things may have the same error-message which renders google quite useless (and don't even try to understand those messages - they are *not* helpful at all). Greping through the sourcecode is no alternative at all.

So after all I think my odyssey with this crashed server would have taken much less time and work if the server would have been running Linux or a different flavor of UNIX. Too bad it isn't .

Now I am really going home
