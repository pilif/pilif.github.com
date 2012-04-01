---
layout: post
title: Upscaling video
categories:
- ffdshow
- hd
- Solutions
- upscale
- vista
status: publish
type: post
published: true
meta: {}

---
<p>I have an <a href="http://catalog2.panasonic.com/webapp/wcs/stores/servlet/ModelDetail?displayTab=O&storeId=11201&catalogId=13051&itemId=102052&catGroupId=21360&surfModel=PT-AE1000U">awesome Full-HD projector</a> and I have a lot of non-HD video material, ranging from <a href="/archives/330-DVD-ripping,-second-edition.html">DVD-rips</a> to <a href="/archives/142-Console-game-Videos.html">speedruns</a> of older consoles and I'm using a Mac Mini running Windows (first Vista RC2, then XP and now Vista again) connected to said projector to access the material.</p>
<p>The question was: How do I get the best picture quality out of this setup.</p>
<p>The answer boils down to the question of what device should do the scaling of the picture:</p>
<p>Without any configuration work, the video is scaled by your graphics card which usually does quite a bad job at it unless it provides some special upscaling support which the intel chip in my Mac Mini seems not to.</p>
<p>Then you could let the projector do the scaling which would require the MCE application to change the screen resolution to the resolution of the file played. It would also mean that the projector has to support the different resolutions the files are stored in which is hardly the case as there are some very strange resolutions here and then (think game boy's native 140x102 resolution).</p>
<p>The last option is to let your CPU do the scaling - at least to some degree.</p>
<p>This is a very interesting option, especially as my Mac Mini comes with one of these nice dual core CPUs we can try and leverage for this task. Then, there are a lot of algorithms out there that are made exactly for the purpose of scaling video, some of which are very expensive to implement in specialized hardware like GPUs or the firmware of a projector.</p>
<p>So I went around and finally found <a href="http://www.avsforum.com/avs-vb/showthread.php?t=719041">this post</a> outlining the steps needed to configure ffdshow to do its thing.</p>
<p>I used the basic setting and modified it just a bit to keep the original aspect ratio of the source material and to only do the resizing up to the resolution of 1280x720. If the source is larger than this, there's no need to shrink the video just to use the graphics chip to upscale it again to the projectors native 1920x1280 resolution (*sigh*).</p>
<p>Also, I didn't want ffdshow to upscale 1280x720 to the full 1920x1280. At first I tried that, but I failed to see a difference in picture quality, but I had the odd frame drop here and then, so I'm running at the limits of my current setup.</p>
<p>Finally, I compared the picture quality of a <a href="http://www.amazon.com/Columbo-Mystery-Movie-Collection-1989/dp/B000MV9OMM/ref=pd_bbs_sr_1/002-8839861-8394406?ie=UTF8&s=dvd&qid=1181859576&sr=8-1">Columbo</a> (non-referal link to Amazon - the package arrived last week) DVD rip with and without the resizing enabled.</p>
<p>The difference in quality is immense. The software-enhanced picture looks nearly like a real 720p movie - sure: Some details are washed-up, but the overall quality is <em>worlds</em> better than what I got with plain ffdshow and no scaling.</p>
<p>Sure. The CPU usage is quite a bit higher than before, but that's what the CPUs are for - to be used.</p>
<p>I highly recommend you taking the 10 minutes needed to set up the ffdshow video decoder to do the scaling. Sure: The UI is awful and I didn't completely understand many of the settings, but the increased quality more than made up the work it took to configure the thing.</p>
<p>Heck! Even the 240x160 pixel sized <a href="http://tasvideos.org/893M.html">Pokémon Sapphire run</a> looked much better after going through ffdshow with software scaling enabled.</p>
<p>Highly recommended!</p>
<p>By the way: This only works in MCE for video files as MCE refuses to use ffdshow for MPEG2 decoding which is needed for DVD or TV playback. But 100% of the video I watch are video files anyways, so this doesn't bother me at all.</p>
