---
layout: post
title: Debugging PocketPCs
categories:
- .net
- Hardware
- Programming
- rant
- scanner
status: publish
type: post
published: true
meta: {}

---
<p>Currently I'm working with Windows Mobile based barcode scanning devices. With .NET 2.0, actually developing real-world applications for the mobile devices using .NET has become a viable alternative.</p>
<p>.NET 2.0 combines sufficient speed at runtime (though you have to often test for possible performance regressions) with a very powerful development library (really usable - as compared to .NET 1.0 on smart devices) and unbeatable development time.</p>
<p>All in all, I'm quite happy with this.</p>
<p>There's one problem though: The debugger.</p>
<p>When debugging, I have two alternatives and both suck:</p>
<ol>
    <li><p>Use the debugger to connect to the real hardware. This is actually quite fast and works flawlessly, but whenever I need to forcibly terminate the application (for example when an exception happened or when I'm pressing the Stop-Button in the debugger), the hardware crashes somewhere in the driver for the barcode scanner.</p><p>Parts of the application stay in memory and are completely unkillable. The screen freezes</p><p>To get out of this, I have to soft-reset the machine and wait half a century for it to boot up again.</p></li>
    <li><p>Use the emulator. This has the advantage of not crashing, but it's so <em>slow</em>.</p><p>From the moment of starting the application in VS until the screen of the application is loaded in the emulator, nearly three minutes pass. <strong>That</strong> slow.</p></li>
</ol>
<p>So programming for mobile devices mainly contains of waiting. Waiting for reboots or waiting for the emulator. This is wearing me down.</p>
<p>Usually, I change some 10 lines or so and then run the application to test what I've just written. That's how I work and it works very well because I get immediate feedback and it helps me to write code what's working in the first place.</p>
<p>Unfortunately, with these prohibitive long startup times, I'm forced to write more and more code in one batch which means even more time wasted with debugging.</p>
<p>*sigh*</p>
