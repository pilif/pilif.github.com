---
layout: post
title: A praise to VMWare Server
categories:
- Software
status: publish
type: post
published: true
meta: {}

---
<div align="center">
<a href="http://www.gnegg.ch/archives/putty.png"><img alt="putty.png" src="http://www.gnegg.ch/archives/putty-thumb.png" width="370" height="231" /></a>
</div>
<p>This is putty, showing the output of <tt>top</tt> on one of our servers. You may see that there are three processes running which are obviously <a href="http://www.vmware.com">VMWare</a> related.</p>
<p>What's running there is their new <a href="http://www.vmware.com/products/server/">VMWare Server</a>. Here's a screenshot of the web-interface which gives an overview over all running virtual machines and allowing to attach a remote console to anyone of them:</p>
<div align="center">
<a href="http://www.gnegg.ch/archives/web.png"><img alt="web.png" src="http://www.gnegg.ch/archives/web-thumb.png" width="370" height="344" /></a>
</div>
<p>As you can see, that server (which is not a very top-notch one) has more than enough capacity to do the work for three servers: A gentoo test machine and a Windows 2003 Server machine doing some reporting work.</p>
<p>Even under high load on the host machine or the two virtual machines, the whole system remains stable and responsive. And there's so much work needed to even get the VM's to high load, so that this configuration could even be used in production right now.</p>
<p>Well... what's so great about this, you might ask.</p>
<p>Running production servers in virtual machines has some very nice advantages:</p>
<ul>
 <li>It's hardware independant. You need more processing power? More ram? Just copy the machine to a new machine. No downtime, no reinstallation.</li>
 <li>Need to move your servers to a new location? Easy. Just move one or two machines instead for five or more.</li>
 <li>It's much easier to administer. Kernel update with the system not booting any more? typing "shutdown -h" instead of "shutdown -r" (both happened to me)? Well... just attach the remote console. No visiting the housing center anymore</li>
 <li>Cost advantage. The host-server you see is not one of the largest ones ever. Still it's able to handle real-world-traffic for three servers and we still have reserve for at least two more virtual machines. Why buy expensive hardware?</li>
 <li>Set up new machines in no time: Just copy over the template VM-folder and you're done.</li>
</ul>
<p>And in case you wonder about the performance? Well, the VM's don't feel the slightest bit slower than the host (I've not benchmarked anything yet though). </p>
<p>We're currently testing this to put a configuration like this into real production use, but what I've seen so far looks very, very promising.</p>
<p>Even though I don't think we're going to need support for this (it's really straight-forward and stable), I'm more than willing to pay for a fine product like this one (the basic product will be free, while you pay for the support).</p>
<p>Now, please add a native 64bit edition ;-)</p>
