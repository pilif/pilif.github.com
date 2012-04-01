---
layout: post
title: RAM doubler ;-)
categories:
- Solutions
- Unix
status: publish
type: post
published: true
meta: {}

---
<p>I have a server (running gnegg.ch) with 1.5 GBytes of RAM and I'm running <a href="http://www.getoo.org">Gentoo Linux</a> (another candidate for my <a href="http://www.gnegg.ch/archives/138-All-time-favourite-Tools.html">all-time favourites list</a>, but it's still too soon for that. I'm only working with it for a little bit more than one year). And as I wanted the thing to be as secure as possible, I created a kernel from scratch <b>without module support</b>.</p>
<p>
What I've always asked myself is why the heck "free" just lists 896 Mbytes of available memory:</p>
<pre style="font-size: 10px; background-color: #DEDEDE; border: 1px solid #6E6E6E; padding: 4px;">
galadriel root # free -m
             total       used       free     shared    buffers     cached
Mem:           885        193        692          0          6         69
-/+ buffers/cache:        117        768
Swap:          976          0        976
</pre>
<p>At first I had a BIOS problem in mind, bit after having seen GRUB recognizing the whole amount of memory, I came to the conclusion that there must be some problem in the kernel</p>
<p>
As 2.6 is still quite new, I waited for the next <tt>gentoo-dev-sources</tt> to be released which happened somewhere around today. With the new kernel the problem still existed, so I dug deeper</p>
<p>
<tt>dmesg</tt> output something like this in its first lines:</p>
<pre>
Warning only 896MB will be used.
Use a HIGHMEM enabled kernel.
</pre>
<p>Though I misread the second line as a status message (stating that HIGHMEM is being used) instead of a request, I entered the above message to <a href="http://groups.google.com">Google Groups</a> and found out that the second line indeed is the solution to the problem</p>
<p>In <tt> Processor type and features</tt>, set <tt>High Memory Support</tt> to <tt>4GB</tt> and recompile your kernel.</p>
<p>What I don't understand: I'm having this problem with 1.5GB of RAM and this option seemed to me like talking about 4 GB. But Google was helpful like most of the time, enabling me to virtually double the available RAM</p>
<pre style="font-size: 10px; background-color: #DEDEDE; border: 1px solid #6E6E6E; padding: 4px;">
galadriel root # free -m
             total       used       free     shared    buffers     cached
Mem:          1520        333       1186          0         12        158
-/+ buffers/cache:        162       1358
Swap:          976          0        976
</pre>
<p>Nice! Isn't it?</p>
<p><b>Update:</b> For those that have not yet noticed it: The title of this entry does hint at products like <a href="http://ramdefrag.sourceforge.net">this</a>, though this one is at least honest in its description.</p>
