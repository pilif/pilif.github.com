---
layout: post
title: OS X 10.4.8 - Update gone wrong
categories:
- fix
- Mac
- osx
- Solutions
- update
status: publish
type: post
published: true
meta: {}

---
<p>Today, Software Update popped up and offered me to upgrade the OS to 10.4.8.</p>
<p>Usually I'm turning down such offers as I don't want to reboot my system in mid-day, but it felt like a good time to do it none the less. This is why I accepted.</p>
<p>After the installation, the update asked me to reboot which I accepted.</p>
<p>What came afterwards was as scary as it was ironic: The system rebooted into Windows XP.</p>
<p>But not worries: The 10.4.8 update isn't a windows installation in disguise: The Windows installation that greeted me was the one I have on a second partition - mostly to play WoW (which <a href="/archives/321-Correlation-between-gnegg.ch-and-WoW.html">I don't any more</a>).</p>
<p>A quick reboot showed me even more trouble: Whenever my MacBook tried to boot from the MacOS partition, it showed the folder-with-question-mark icon for a few seconds and then the EFI BIOS emulation kicked in and booted from the MBR, which is why I was seeing Windows on my screen.</p>
<p>Now, I'd gladly explain here what has gone wrong and how I fixed it, but as I was in a state of panic, so I have not exactly documented my fix and as I tried many steps at once without getting confirmation if the step has fixed the problem, I don't even know what was wrong (which certainly doesn't stop me from guessing).</p>
<p>Anyways.</p>
<p>I booted from the MacBook DVD and first selected disk utility in the tools menu and let it check the disk for errors (none found as I have expected) and then let it repair permissions (tons of errors found, but I doubt this was the problem).</p>
<p>Then I quit the disk utility and launched terminal.</p>
<p>Beside the fact that I had some trouble actually entering commands (how do I set the keyboard layout in that pre-install-terminal?), I quickly went to <tt>/System/Libary</tt>, deleted the Extensions cache (Extensions.kextcache), went to <tt>/System/Library/Exentsions</tt> and removed all Extensions installed by Parallels (which I suspected being responsible for the problem).</p>
<p>I think the list was vmmain.kext, helper.kext, Pvsnet.kext and hypervisor.kext. You have to remove them with <tt>rm -r</tt> as they are bundles (directories)</p>
<p>After that, I rebooted the system and the question-mark-on-a-folder disappeared and the updating process completed.</p>
<p>I can't tell you how scared I was: My OS X installation is tweaked to oblivion and I'd really, really hate to lose all the stuff. Don't mind the data - it's configuration files and utilities and of course fink.</p>
<p>*shudder*</p>
<p>As I have not tried to reboot after completing each of the steps above, I'm unable to say what actually caused the problem. I doubt it was Parallels though as I'm currently running 10.4.8 and Parallels (which I had to reinstall of course). I also doubt it was the permissions issue as wrong permissions are unlikely to cause boot-failure.</p>
<p>So it probably was a corrupted Extension cache. Or the update process not able to cope with the Parallels extensions.</p>
<p>Me being in the dark makes me unable to place blame, so you won't find any statement about how a more or less forced OS update should never cause a failure like this...</p>
<p>For all I know, this could have happened without the update anyways.</p>
<p>The good news on the other hand is that I'm slowly reaching a state where I am as good at fixing macs as I am good at fixing Windows and Linux. Just don't tell this to my friends who have macs.</p>
