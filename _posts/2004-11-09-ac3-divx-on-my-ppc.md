---
layout: post
title: AC3-Divx on my PPC
tags:
- Free Software
- Software
- Solutions
status: publish
type: post
published: true
meta: {}

---
<p>As I've written in the <a href="http://www.gnegg.ch/archives/196-My-hx4700.html">review</a> of my hx4700 PDA, the thing really shines when it comes to displaying XViD videos.</p>
<p>The single big problem about <a href="http://betaplayer.corecodec.org">Betaplayer</a> is that it lacks support for decoding AC3-streams. This is bad, as most of my movies have an AC3 audio stream (always looking for the optimum quality). So I was on the lookout for a solution.</p>
<p>
I quickly found <a href="http://divx.ppccool.com/">PockedDivxEncode</a> which comes with nice presets for encoding videos for a PocketPC</p>
<p>The problem was that the current version always insists to recoding the video stream when converting the video file, thus reducing the overall quality (it's no use compressing two times) and needing a long time to do its job (about 50% realtime or slower. Haven't tried).</p>
<p>Then, on the download-page I found this not-so-visible link to the the current <a href="http://www.l2ita.net/PDE/PocketDivXEncoder_0.3.51_RC7.exe">beta test version</a>, which has - under "Advanced Settings" an option to leave the video stream alone and just work on the audio stream.</p>
<p>Using this configuration, recoding just the AC3 stream becomes possible. As it's leaving the video alone, it's reasonably fast too - about 4 times realtime on my thinkpad.</p>
<p>This is a usable solution until Betaplayer gets AC3-Support.</p>
