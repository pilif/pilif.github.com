---
layout: post
title: Vista, AC3, S/PDIF
categories:
- ac3
- cinema
- solution
- Solutions
- vista
status: publish
type: post
published: true
meta: {}

---
<p>Since around December 31th last year, my home cinema is up and running. That day was the day when I finally had all the equipment needed to mount the screen that has arrived on December 29th.</p>
<p>It was a lot of work, but the installation just rocks. And I've <a href="http://www.gnegg.ch/archives/318-Upgrading-the-home-entertainment-system.html">already blogged</a> about the main components of the thing: The Gefen HDMI extender and the Denon AVR-4306.</p>
<p>The heart of the system consists of <a href="http://www.gnegg.ch/archives/291-Computers-under-my-command-Issue-1-shion.html">shion</a> serving content (thankfully, the TB harddrive was <a href="http://news.com.com/2100-1041_3-6147409.html">announced last week</a> - it's about time) and a brand new 1.8Ghz Mac Mini running Windows Vista (RC2) in BootCamp which is actually displaying the content.</p>
<p>I've connected a windows media center remote receiver which Microsoft sells to OEMs to use the old IR remote of my Shuttle MCE machine.</p>
<p>The mac mini is connected to the Denon receiver via a DVI to HDMI adaptor and optical digital cable for the audio.</p>
<p>And that last thing is what I'm talking about now.</p>
<p>The problem is that Microsoft changed a lot about how audio works in Vista and I had to learn it the hard way.</p>
<p>At first, I couldn't not hear any sound at all. That's because Vista treats all outputs of your sound card as separate entities and you can configure over which connector you want to hear which sounds.</p>
<p>The fix there was to set the S/PDIF connector as system default (in the sound applet of control panel) which fixed the standard windows sounds and stereo sound for me.</p>
<p>Actually, the properties screen of the S/PDIF connector already contains options for AC3 and DTS, complete with a nice testing feature allowing you to check your receiver's support for the different formats by actually playing some multichannel test sound.</p>
<p>The problem is that this new framework is mostly unsupported by the various video codecs out there.</p>
<p>This means that even if you get that control panel applet to play the test sound (which is easy enough), you won't get AC3 sound when you are playing a movie file. You <em>still</em> need to get a codec for that.</p>
<p>But most codecs don't work right any more in vista as the S/PDIF connector now is a separate entity and seems to be accessed differently than in XP.</p>
<p>Usually, the only thing I install on a new windows machine I need to play video with is <a href="http://en.wikipedia.org/wiki/FFmpeg">ffmpeg</a> which actually has some limited support for Vista's way of handing S/PDIF: In the audio settings dialog, you can select "Output" and then in the formats list for S/PDIF, you can check AC/3. Unfortunately, this unchecks the PCM formats.</p>
<p>This means that you will get sound in movies with an AC3 track, but no sound at all in every other movie - ffmpeg seems (emphasis on seems - I may just not have found a way yet) unable to either encode stereo to AC3 or output both PCM and AC3 without changing settings (not at the same time of course).</p>
<p><a href="http://ac3filter.net/">AC3filter</a> works better in that regard.</p>
<p>Depending on hour of the day (...), it's even able to work with the S/PDIF output without forcing it to encode stereo to AC3 (which AC3filter is capable to do).</p>
<p>So for me the solution to the whole mess was this:</p>
<ol>
	<li>Install the latest build of ffmpeg, but don't let it handle audio</li>
	<li>Install AC3filter</li>
	<li>Open the configuration tool and on the first page enable S/PDIF.</li>
	<li>On the system tab, enable passthrough for AC3 and DTS.</li>
</ol>
<p>This did the trick for me.</p>
<p>As time progresses, I'm certain that the various projects will work better and better with the new functionality in Vista which will make hassles like this go away.</p>
<p>Until then, I'm glad I found a workable solution.</p>
