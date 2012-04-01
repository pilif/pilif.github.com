---
layout: post
title: Howto kill your mac? Use Acrobat!
tags:
- Mac
status: publish
type: post
published: true
meta: {}

---
<p>Today I though I'd lost my mac.</p>
<p>I was creating a PDF from Word using Adobe Acrobat. While Mac OS provides a built-in method to generate PDFs, I was under the impression that using the distiller word macro will generate better PDFs - mostly because the macro knows meta information about the text it converts and thus can create links and other PDF hints.</p>
<p>The system completely locked up.</p>
<p>I was able to still move the mouse, but the rest was dead.</p>
<p>I did the 4 seconds power button trick to restart the machine in the hope that this was just the usual flakiness of distiller on intel macs</p>
<p>Unfortunately, the system just froze again after a short wile (seconds)</p>
<p>And on every restart, the freeze happened earlier till I could not even log in in the end.</p>
<p>Using bootcamp (which I'm only using for playing World of Warcraft currently) I determined that it was no hardware problem (Windows had no lockups) which made me considerably happier.</p>
<p>I also learned that you have to press and hold shift on boot until that progress indicator is displayed to boot in some kind of Safe Mode</p>
<p>Using that, I was able to boot, log in and even work in OSX without the crash. I began stripping my system.</p>
<p>I've uninstalled the newly released RC of Parallels, removed all startup items (/Library/StartupItems, /Users/pilif/Library/StartupItems) - thinking that one of those things may have caused the problem.</p>
<p>A reboot showed no improvement unfortunately. The system still locked up. The error log did not show anything of interest.</p>
<p>Googling about "lockup macbook pro" after rebooting yet again in safe mode (which takes AGES), showed me lots of people having this problem after the recent security update released by Apple.</p>
<p>Usually the hint was to reinstall the OS (like in the old days of windows...) and to skip installing that securtiy update. Unfortunately that was no option at all as I did not have the CDs in range and I'm completely against not installing a security relevant patch.</p>
<p>Remembering the crash first happening when using Acrobat, I opened the printer setup utility and got the message that no printer was installed.</p>
<p>This made me notice that Safe Mode also seemed to disable printers, giving me some hope that maybe Acrobat was the problem: More stuff to disable is always a good thing when debugging something like this.</p>
<p>The printer setup utility has a nice feature. It's called "Reset printing system..." and it's placed in the application menu.</p>
<p>The feature works exactly as advertized, thus removing that acrobat printer (and all other printers *sigh*).</p>
<p>I rebooted once more and... it worked.</p>
<p>That recent security update did something to Rosetta (I'm guessing, but the same lockups seem to happen with Adobe Version Cue and they don't happen on PPC systems) causing these lockups. And probably the printing system reinitializes the printer drivers after the updated.</p>
<p>And as I did not print after installing the update until now, the problem was triggered only just now.</p>
<p>While I'm happy that everything is working again, I'm certainly pissed right now.</p>
<p>A security update should never render your system unusable. I don't mind who screwed up here (Apple, Adobe, Rosetta), but something like this must not happen.</p>
<p>The only good thing is that I'm quite experienced with situations like this. But still: This is my first mac. It was sheer luck that I found out how to fix this.</p>
<p>If such situations can't be averted then please, please provide meaningful error reporting or just logging. Were there lines like 'initializing printers' in some logfile, I'd have known where the problem was.
</p>
<p>But no. It just crashes with no way what so ever to just kill the hanging process. Why does failing to load a printer driver crash my whole system? Granted. The problem is probably in Rosetta, but something like this still MUST NOT happen.</p>
<p>The emulation layer stops responding? Easy: Kill and restart it.</p>
<p>This is majorly unpleasant. And it took away nearly two hours of my time which I'd have preferred to use for more useful stuff.</p>
