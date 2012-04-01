---
layout: post
title: XP on the MacBook Pro
categories:
- Mac
status: publish
type: post
published: true
meta: {}

---
<p>As I've <a href="/archives/270-Powerbook-runs-XP.html">announced earlier</a>, I've bought myself a MacBook Pro with the intention of running Windows XP on it (see that other post for the reasoning behind that), thought I changed my mind considering the multimedia capabilities: <a href="http://www.videolan.org">VLC</a> (the preview for intel macs) plays whatever I throw at it, has a nice GUI and does NOT use 100% CPU time all the time.</p>
<p>One day after I made that blog post, I actually got my machine and immediately used the <a href="http://www.onmac.net">XOM EFI-Hack</a> to actually install XP.</p>
<p>The process went quite smoothly despite it being quite a hack. The installation process actually was one of the fastest I've ever seen so far.</p>
<p>The problem with the XOM solution is the lack of drivers where it hurts the most: Power Management and Graphics</p>
<p>Having no graphics driver means: No acceleration, no DVI, no 2560 pixels resolution.</p>
<p>Useless for my purpose.</p>
<p>Yesterday, Apple announced <a href="http://www.apple.com/bootcamp">Bootcamp</a>, their solution for installing XP (or any other x86 OS for that matter) on the Intel Macs. Bootcamp requires a firmware update on the Macs which actually does nothing more but adding a real BIOS compatibility layer, allowing to install any non-EFI system.</p>
<p>Bootcamp itself is a graphical partitioning tool with the capability of resizing HFS+ paritions without data loss. And it comes fully packed with drivers for most of the integrated hardware (only iSight, the harddisk shock protection and the keyboard backlight don't work)</p>
<p>As installing that driver package on a XOM solution sounded risky to me (and does not work as I've learned afterwards), I've installed the whole thing from scratch, deleting the former two paritions and letting bootcamp create new ones.</p>
<p>Installing XP was fast as ever and installing the drivers was one of the most pleasant experiences: Just doubleclick that large MSI and let it do it's work. Reboot. Done.</p>
<p>Here's my desktop in full 2560x1600 resolution (warning: The linked full-size picture is <em>large</em>) of my 30-inch cinema display, showing some CPU specs, the resolution control panel applet and the tool for selecting the default OS which was installed by Apple'a driver package.</p>
<div align="center">
 <a href="/img/desktop.png"><img src="/img/desktop_thumb.png" width="370" height="231" /></a>
</div>
<p>The OS you select there is booted by default, but you can hold the Alt-Key while booting to bring up a boot manager.</p>
<p>I'm very plesed by the speed and low noise of the machine. Now the only thing I'm still whishing for is a docking solution as I now have to plug in three (DVI, USB, Power) or four (if I want ethernet) cables each day.</p>
<p>Well done, Apple. And: Thanks!</p>
<p><b>Update</b>: This is a screenshot of the same machine running OS X. The installation is quite fresh still, but the most important things are installed already: Textmate, X11 and <a href="http://www.sshkeychain.org/">SSHKeychain</a>.</p>
<div align="center">
 <a href="/img/macdesk.png"><img src="/img/macdesk_thumb.png" width="370" height="231" /></a>
</div>
<br />
