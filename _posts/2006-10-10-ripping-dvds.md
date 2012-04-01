---
layout: post
title: ripping DVDs
tags:
- dvd
- flat
- Free Software
- linux
- rant
- Software
status: publish
type: post
published: true
meta: {}

---
<p>I have plenty of DVDs in my possession: Some movies of dubious quality which I bought when I was still going to school (like "Deep Rising" - eeew) and many, many episodes of various series (Columbo, the complete Babylon 5 series, A-Team and other pearls).</p>
<p>As you may know, I'm soon to move into a new flat which I thought would be a nice opportunity to reorganize my library.</p>
<p><a href="/archives/291-Computers-under-my-command-Issue-1-shion.html">shion</a> has around 1.5TB of storage space and I can easily upgrade her capacity (shion is the only computer I own I'm using a female pronoun for - the machine is something really special to me - like the warships of old times) by plugging in yet another USB hub and USB hard drives.</p>
<p>It makes totally sense to use that unlimited amount of storage capacity to store all my movies - not only the ones I've downloaded (like <a href="http://speeddemosarchive.com/news.html">video game speed runs</a>). Spoiled by the ease of use of ripping CDs, I thought, that this would be just another little thing to do before moving.</p>
<p>You know: Enter the DVD, use the ripper, use the encoder, done.</p>
<p>Unfortunately, this is proving to be harder than it looked like in the first place:</p>
<ul>
 <li>Under Mac OS X, you can try to use the Unix tools with fink or some home-grown native tools. Whatever you do, you either get outdated software (fink) or not really working freeware tools documented in outdated tutorials. Nah.</li>
 <li><p>Under Windows, there are two kinds of utilities: On one hand, you have the single-click ones (like <a href="http://www.autogk.me.uk/">AutoGK</a>) which really do what I initially wanted. Unfortunately, they are limited in their use: They provide only a limited amount of output formats (like no x264) and they hard-code the subtitles into the movie stream. But they are easy to use. On the other hand, you have the hardcore tools like Gordian Knot or MeGUI or even StaxRip. These tools are frontends for other tools that work like Unix tools: Each does one thing, but tries to excel at that one thing.</p><p>This could be a good thing, but unfortunately, it fails at things like awful documentation, hard-coded paths to files everywhere and outdated tools.</p><p>I could not get any of the tools listed above to actually create a x264 AVI or MKV-File without either throwing a completely unusable error message ("Unknown exception ocurred") or just not working at all or missing things like subtitles.</p></li>
 <li>Linux has <a href="http://www.exit1.org/dvdrip/">dvd::rip</a> which is a really nice solution, but unfortunately, no solution for me as I don't have the right platform to run it on: My MCE machine is - well - running Windows MCE, my laptop is running Ubuntu (no luck with the debian packages and no ubuntu-packages). shion is running Gentoo, but she's headless, so I have to use a remote X-connection which is awfully slow and non-scriptable.</li>
 </ul>
<p>The solution I want works on the Linux (or MacOS X) console, is scriptable and - well - works.</p>
<p>I guess I'm going the hard-core way and use <a href="http://www.transcoding.org">transcode</a> which is what dvd::rip is using - provided I find good documentation (I'm more than willing to read and learn - if the documentation is current enough and actually documents the software that I'm running and not the software at the state of two years ago).</p>
<p>I'll keep you posted on how I'm progressing.</p>
