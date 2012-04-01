---
layout: post
title: VMWare Server, chrony and slow clocks
tags:
- chrony
- linux
- Software
- solution
- Solutions
- vmware
status: publish
type: post
published: true
meta: {}

---
<p>We have quite many virtual machines running under VMWare server. Some for testing purposes, some for quite real systems serving real webpages.</p>
<p>It's wonderful. Need a new server? Just <tt>cp -r</tt> the template I created. Need more RAM in your server? No problem. Just add it via the virtual machine configuration file. Move to another machine? No problem at all. Power down the virtual machine and move the file where you want it to be.</p>
<p>Today I noticed something strange: The clocks on the virtual machines were <em>way</em> slow.</p>
<p>One virtual second was about ten real seconds.</p>
<p>This was so slow that chrony which I used on the virtual machines thought that the data sent from the time servers was incorrect, so chrony was of no use.</p>
<p>After a bit of digging around, I learned that VMware server needs access to /dev/rtc to provide the virtual machines with an usable time signal (usable as in "not too slow").</p>
<p>The host's /var/log/messages was full of lines like this (you'll notice that I found yet another girl from a console RPG to name that host):</p>
<pre class="code">
Dec 15 16:12:58 rikku /dev/vmmon[6307]: /dev/rtc open failed: -16
Dec 15 16:13:08 rikku /dev/vmmon[6307]: host clock rate change request 501 -> 500
</pre>
<p>-16 means "device busy"</p>
<p>The fix was to stop chrony from running on the host machine so VMWare could open /dev/rtc. This made the error messages vanish and additionally it allowed the clocks of the virtual machines to work correctly.</p>
<p>Problem solved. Maybe it's useful for you too.</p>
