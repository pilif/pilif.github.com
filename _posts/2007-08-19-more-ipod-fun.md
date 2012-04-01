---
layout: post
title: More iPod fun
categories:
- audiobook
- hack
- ipod
- Programming
- solution
- Solutions
status: publish
type: post
published: true
meta: {}

---
<p>Last time I explained <a href="/archives/369-Cheating-with-OGG-podcasts.html">how to get .OGG-feeds to your iPod</a>.</p>
<p>Today I'll show you one possible direction one could go to greatly increase the usability of non-official (read: not bought at audible.com) audiobooks you may have lying around in .MP3 format.</p>
<p>You see, your iPod threats every MP3-File of your library as music, regardless of length and content. This can be annoying as the iPod (rightly so) forgets the position in the file when you stop playback. So if you return to the file, you'll have to start from the beginning and seek through the file.</p>
<p>This is a real pain in case of longer audiobooks and / or radio plays of which I have a <strong>ton</strong></p>
<p>One way is to convert your audiobooks to AAC and rename the file to .m4b which will convince iTunes to internally tag the files as audiobooks and then enable the additional features (storing the position and providing UI to change play speed).</p>
<p>Of course this would have meant converting a considerable part of my MP3 library to the AAC-format which is not yet as widely deployed (not to speak of the quality-loss I'd have to endure when converting a lossy format into another lossy format).</p>
<p>It dawned me that there's another way to make the iPod store the position - even with MP3-files: Podcasts.</p>
<p>So the idea was to create a script that reads my MP3-Library and outputs RSS to make iTunes think it's working with a Podcast.</p>
<p>And thus, <a href="http://www.lipfi.ch/audiobook2cast.phps">audiobook2cast.php</a> was born.</p>
<p>The script is very much tailored to my directory structure and probably won't work at your end, but I hope it'll provide you with something to work with.</p>
<p>In the script, I can only point out two interesting points:</p>
<ul>
	<li>When checking a podcast, iTunes ignores the type-attribute of the enclosure when determining whether a file can be played or not. So I had to add the fake .mp3-extension.</li>
	<li>I'm outputting a totally fake pubDate-Element in the &lt;item&gt;-Tag to force iTunes to sort the audiobooks in ascending order.</li>
</ul>
<p>As I said: This is probably not useful to you out-of-the-box, but it's certainly an interesting solution to an interesting problem.</p>
