---
layout: post
title: Easier to use? Cheaper because of that? Dream on!
categories:
- Personal
- Usability
status: publish
type: post
published: true
meta: {}

---
The Exchange Server I already had <a href="http://www.gnegg.ch/archives/18-Things-I-hate.html">strange problems</a> [read this and related postings there] with, today had another one of them. I had to give reading-permission to some public folder to some users (although the GUI to do that from within Outlook is *really* easy to use, some people rely on me doing that for them because that's even easier).

The Exchange Server Manager threw a strange message at me whenever I tried to expand the folder-list in the tree. The text was useless as ever and nothing was posted to the event-logs - as ever. Why is there a logging-framework if it is not used? (besides, if it would have been used, the message would have been just as un-understandable as the one I was getting).

This time, I was lucky: I got an error number along with the message that was even known to the knowledgebase. The error was 80040e19 and the knowledgebase article was Q328659.

The problem was easy to fix and had something to do with some "security-tool" that got installed alongside the IIS-Lockdown tool which itself got installed alongside the common Windows-Update procedure. Nice to know that just updating the system via such an easy procedure can bring essential functions down without any warning.

Microsoft always emphasises the ease of use of their products and the better support you are getting when using their closed source solutions. Granted: The "ease of use"-thing can sometimes really be true (many things just work out-of-the box with not nearly as much work as I would have when using a common linux distribution), but when something does not work, fixing microsofts server software is much more difficult than fixing equivalent linux software as the fixes are un-obvious and the error messages are unusable.

The level of support for me is just the same as with comparable open-source software: Use google, enter the error message you get and pray someone had a fix for it posted somewhere. If not, I see virtually no solution in Microsoft land (besides paying a lot of money for support) whereas in the open-source land I would be able to fix the problem sometime later as I have readable error-messages and if that does not help I could try to understand the problem by reading the sourcecode.

That's why I usually prefer open solutions. Or have you ever seen software working flawlessly?
