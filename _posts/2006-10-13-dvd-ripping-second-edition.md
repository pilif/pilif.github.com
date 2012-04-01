---
layout: post
title: DVD ripping, second edition
tags:
- dvd
- Mac
- Software
- solution
status: publish
type: post
published: true
meta: {}

---
<p><a href="http://handbrake.m0k.org/">HandBrake</a> is a tool with the worst website possible: The screenshot that's presented on the index page leaves behind a completely wrong image of the application.</p>
<p>When you just look at the screenshot, you will get the impression that the tool is fairly limited and totally optimized for creating movies for handheld devices.</p>
<p>That's not true though. The screenshot is the screenshot of a light edition of the tool. The real thing is actually quite capable and only lacks the capability to store subtitles in the container format.</p>
<p>And it doesn't know about Matroska.</p>
<p>And it refuses to store x264 encoded video in the OGM container.</p>
<p>Another tool I found after my first <a href="/archives/329-ripping-DVDs.html">very bad experience</a> with ripping DVDs last time is <a href="http://ogmrip.sourceforge.net/">OGMrip</a>. The tool is a frontend for mencoder (of <a href="http://www.mplayerhq.hu/">mplayer</a> fame) and has all the features you'd ever want from a ripping tool, while still being easy to use.</p>
<p>It even provides a command line interface, allowing to process your movies from the console.</p>
<p>It has one inherent flaw though: It's single threaded.</p>
<p>HandBrake on the other hand, can split the encoding work (yes. the actual encoding) over multiple threads and thus can profit <em>a lot</em> of SMP machines.</p>
<p>Here's what I found in matters of encoding speed. I encoded the same video (from a DVD ISO image) with the same settings (x264, 1079kbit/s, 112kbit mp3 audio, 640x480 resolution at 30fps) on different machines:</p>
<ul>
 <li>1.4Ghz, G4 Mac mini, running Gentoo Linux with OGMrip: 3fps</li>
 <li>Thinkpad T43, running Ubuntu Edgy Eft, 1.6Ghz Centrino, OGMRip: 8fps</li>
 <li>MacBook Pro, 2Ghz Core Duo, HandBrake: 22fps (both cores at 100%)</li>
 <li>Mac Pro, Dual Dual Core 2.66Ghz, HandBrake: 110fps(!!), 80% total cpu usage (hdd io seems to limit the process)</li>
</ul>
<p>This means that encoding the whole 47 minutes A-Team episode takes:</p>
<ul>
  <li>OGMRip on Mac mini G4: 7.8 hours</li>
  <li>OGMRip on Thinkpad: 2.35 hours per episode</li>
  <li>HandBrake on MacBook Pro: 1.6 hours per episode</li>
  <li>HandBrake on MacPro: 0.2 hours (12 minutes) per episode</li>
</ul>
<p>Needless to say what method I'm using. Screw subtitles and Matroska - I want to finish ripping my collection this century!</p>
<p>On an additional closing note, I'd like to add that even after 3 hours of encoding video, the MacPro stayed very, very quiet. The only thing I could hear was the hard drive - the fans either didn't run or were quieter than the harddrive (which is quiet too)</p>
