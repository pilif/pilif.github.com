---
layout: post
title: ServeRAID - Fun with GUI-Tools
categories:
- Hardware
- ipssend
- linux
- serveraid
- Solutions
status: publish
type: post
published: true
meta: {}

---
<p>We've recently bought three more drives for our in-house file server. Up until now, we had a RAID 5 array (using a IBM ServeRAID controller) spawning three 33GB drives. That array recently got very, very close to being full.</p>
<p>So today, I wanted to create a second array using the three new 140GB drives.</p>
<p>When you download the ServeRAID support CD image, you get access to a nice GUI-tool which is written in Java and can be used to create Arrays on these ServeRAID controllers.</p>
<p>Unfortunately, I wasn't able to run the GUI at first because somehow, the Apple X11 server wasn't willing/able to correctly display the GUI. I always got empty screens when I tried (the server is headless, so I had to use X11 forwarding via ssh).</p>
<p>Using a Windows machine with <a href="http://www.straightrunning.com/XmingNotes/">Xming</a> (which is very fast, working perfectly and totally free as in speech) worked though and I got the GUI running.</p>
<p>All three drives where recognized, but one was listed as "Standby" and could not be used for anything. Additionally, I wasn't able to find any way in the GUI to actually move the device from Standby to Ready.</p>
<p>Even removing and shuffling the drives around didn't help. That last drive was always recognized as "Standby", independant of the bay I plugged it into.</p>
<p>Checking the feature list of that controller showed nothing special - at first I feared that the controller just didn't support more than 5 drives. That fear was without reason though: The controller supports up to 32 devices - more than enough for the server's 6 drive bays.</p>
<p>Then, looking around on the internet, I didn't find a solution for my specific problem, but I found out about a tool called "ipssend" and there was documentation how to use it in an <a href="http://www.redbooks.ibm.com/redbooks/pdfs/sg245853.pdf">old manual</a> by IBM.</p>
<p>Unfortunately, newer CD images don't contain ipssend any more, Forcing you to use the GUI which in this case didn't work for me. It may be that there's a knob to turn somewhere, but I just failed to see it.</p>
<p>In the end, I found a very, very old archive at the IBM website which was called <a href="ftp://ftp.software.ibm.com/pc/pccbbs/pc_servers/linux_dumplog.tgz">dumplog</a> and contained that <tt>ipssend</tt> command in a handy little .tgz archive. Very useful.</p>
<p>Using that utility solved the problem for me:</p>
<pre class="code">
# ./ipssend setstate 1 1 5 RDY
</pre>
<p>No further questions asked.</p>
<p>Then I used the Java-GUI to actually create the second array.</p>
<p>Now I'm asking myself a few questions:</p>
<ul>
    <li>Why is the state "Standby" not documented anywhere (this is different from a drive in Ready state configured as Standby drive)?</li>
    <li>Why is there no obvious way to de-standby a drive with the GUI?</li>
    <li>Why isn't that cool little <tt>ipssend</tt> utility not officially available any more?</li>
    <li>Why is everyone complaining that command line is more complicated to use and that GUIs are so much better when obviously, the opposite is true?</li>
</ul>
