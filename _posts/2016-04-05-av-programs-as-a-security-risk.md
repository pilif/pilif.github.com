---
layout: post
title: AV Programs as a Security Risk
categories:
- av
- security
- software
- opinion
tags:
- av
- security
- software
- opinion
status: publish
type: post
published: true
---

Imagine you were logged into your machine as an administrator. Imagine you're going to double-click every single attachment in every single email you get. Imagine you're going to launch every single file your browser downloads. Imagine you answer affirmative on every single prompt to install the latest whatever. Imagine you unpack every single archive sent to you and you launch ever single file in those archives.

This is the position that AV programs put themselves on your machine if they want to have any chance at being able to actually detect malware. Just checking whether a file contains a known byte signature has stopped being a reliable method for detecting viruses long ago.

It makes sense. If I'm going to re-distribute some well-known piece of malware, all I have to do is to obfuscate it a little bit or encrypt it with a static key and my piece of malware will naturally not match any signature of any existing malware.

The loader-stub might, but if I'm using any of the existing installer packagers, then I don't look any different than any other setup utility for any other piece of software. No AV vendor can yet affort to black-list all installers.

So the only reliable way to know whether a piece of software is malware or not, is to start running it in order to at least get it to extract/decrypt itself.

So here we are in a position where a anti malware program either [is useless placebo](http://www.attactics.org/2016/03/bypassing-antivirus-with-10-lines-of.html) or it has to put itself into the position I have started this article with.

Personally, I think it is impossible to safely run a piece of software in a way that it cannot do any harm to the host machine. 

AV vendors could certainly try to make it as hard as possible for malware to take over a host machine, but here we are in 2016 where most of the existing AV programs are based on projects started in the 90ies where software quality and correctness was even less of a focus than it is today.

We see AV programs [disabling OS security features](http://krebsonsecurity.com/2010/08/anti-virus-products-mostly-ignore-windows-security-features/), [installing and starting VNC servers](https://bugs.chromium.org/p/project-zero/issues/detail?id=703) and providing any malicious web site with [full shell access to the local machine](https://bugs.chromium.org/p/project-zero/issues/detail?id=693). Or allow malware to  [completely take over a machine](http://googleprojectzero.blogspot.ch/2015/06/analysis-and-exploitation-of-eset.html) if a few bytes are read no matter where from.

This doesn't cover the [privacy issues](http://www.engadget.com/2015/09/19/avg-privacy-policy-update/) yet which are caused by more and more price-pressure the various AV vendors are subject to. If you have to sell the software too cheap to pay for its development (or even give it away for free), then you need to open other revenue streams.

Being placed in such a privileged position like AV tools are, it's no wonder what kinds of revenue streams are now in process of being tapped…

AV programs by definition put themselves into an extremely dangerous spot on your machine: In order to read every file your OS wants to access, it has to run with adminitrative rights and in order to actually protect you it has to understand many, many more file formats than what you have applications for on your machine. 

AV software has to support every existing archive format, even long obsolete ones because who knows - you might have some application somewhere that can unpack it; it has to support every possibly existing container format and it has to support all kinds of malformed files.

If you try to open a malformed file with some application, then the application has the freedom to crash. An AV program must keep going and try even harder to see into the file to make sure it's just corrupt and not somehow malicious.

And as stated above: Once it finally got to some executable payload, it often has no chance but to actually execute it, at least partially.

This must be some of the most difficult thing to get right in all of engineering: Being placed at a highly privileged spot and being tasked to then deal with content that's malicious per definitionem is an incredibly difficult task and when combined with obviously bad security practices (see above), I come to the conclusion that installing AV programs is actually **lowering the overall security of your machines**.

Given a fully patched OS, installing an AV tool will greatly widen the attack surface as now you're putting a piece of software on your machine that will try and make sense of every single byte going in and out of your machine, something your normal OS will not do.

AV tools have the choice of doing nothing against any but the most common threats if they decide to do pure signature matching, or of potentially putting your machine at risk.

AV these days might provide a very small bit of additional security against well-known threats (though against those you're also protected if you apply the latest OS patches and don't work as an admin) but they open your installation wide for all kinds of targeted attacks or really nasty 0-day exploits that can bring down your network without any user-interaction what so ever.

If asked what to do these days, I would give the strong recommendation to not install AV tools. Keep all the software you're running up to date and white-list the applications you want your users to run. Make use of white-listing by code-signatures to, say, allow everything by a specific vendor. Or all OS components.

If your users are more tech-savy (like developers or sys admins), don't whitelist but also don't install AV on their machines. They are normally good enough to not accidentally run malware and the risk of them screwing up is much lower than the risk of somebody exploiting the latest flaw in your runs-as-admin-and-launches-every-binary piece of security software.
