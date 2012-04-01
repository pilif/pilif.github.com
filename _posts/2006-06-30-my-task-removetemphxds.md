---
layout: post
title: "My task: RemoveTempHxDs"
categories:
- Usability
status: publish
type: post
published: true
meta: {}

---
<p>Le'ts say, you want to inform your user about what's going on (which is a nice thing to do).</p>
<p>This is an example of how not to do it:</p>
<center><a href="/uploads/installer.png" class="thickbox"><img width='400' height='304' border='0' src='/uploads/installer-thumb.png' alt='' /></a></center>
<p>What exactly is that "RemoveTempHxDs", the installer is doing right there? And why is the progress bar at 100% for more than three minutes when I made the screenshot?</p>
<p>If you are unable to provide meaningful progress information, don't provide it at all. Make your program display a "neutral" progress bar (some spinning wheel or something like that) and make it tell the user it's "Doing stuff...". Why expose useless internals?</p>
<p>While I see some value in displaying information like that if it's to have more information when you are trying to support the application. But in that case, a log file of some kind is much more valuable as it both gives YOU as developer the information you need and does not confuse your user.</p>
