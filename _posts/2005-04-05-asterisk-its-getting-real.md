---
layout: post
title: Asterisk - it's getting real
tags:
- Free Software
- Unix
- VoIP
status: publish
type: post
published: true
meta: {}

---
<p><a href="http://www.gnegg.ch/archives/235-Fun-with-VoIP.html">Last week</a> I talked about me and Christoph installing <a href="http://www.asterisk.org">Asterisk</a> on my thinkpad to do a little VoIP-Experiment.</p>
<p>While we were able to create a should-be-working configuration, actually calling to the outside PSTN network did not work. Read the details in my other article.</p>
<p>Last saturday, we fixed that.</p>
<p>There seems to be a problem somehwere between the AVM CAPI Driver and the CAPI layer of the 2.6.11 kernel. After we downgraded to 2.6.10, the problem solved itself without we doing anything more.</p>
<p>So... this was getting interesting...</p>
<p>The first thing I did was to annoy my wonderful girlfriend:</p>
<div><code>
exten => s,1,Wait,1                     ; Wait a second, just for fun
exten => s,2,Answer
exten => s,3,MP3Player(/home/pilif/mp3/3.mp3)
</code></div>
<p>(included into or used as the default context)
<p>Where 3.mp3 is that endlessly stupid song "Tell me" (or whatever it's called) by britney spears (this is an insider-joke - both of us just hate that song). Then I told her to call that number...</p>
<p>While this example is completely pointless, it was fun to watch my girlfriend connecting and listening to the song (which soon ended in a disconnection log entry)</p>
<div><code>
exten => s,1,Wait,1
exten => s,2,Dial(SIP/12345,60,tr)
exten => s,3,Congestion
</code></div>
<p>This makes much more sense and directs all incoming calls to the SIP-Phone 12345 as configured in sip.conf. After 60 seconds, it sends back a congestion signal. The first entry would not be necessary, but I hate it when I call somewhere and the phone is answered just at the first ring. So in my PBX, the answering party will wait one second before directing to the sip-phone.</p>
<p>In <tt>musiconhold.conf</tt> I've configured madplay as my MP3-Player for music on hold:</p>
<div><code>
default => custom:/home/pilif/mp3/,/usr/bin/madplay --mono -R 8000 --output=raw:-
</code></div>
<p>madplay is much better than mpg123 used per default as it accepts VBR encoded input and bitrates > 128 kbit which is what nearly all of my MP3's are encoded with.</p>
<p>In <tt>zapata.conf</tt> enable music on hold with <tt>musiconhold=default</tt> in <tt>[channels]</tt></p>
<p>The next thing was an optimization of the SIP-Phone used...</p>
<p>X-Lite is nice, but in the end it's just a demo for other products by the same vendor. Call transferring is not possible for example, which is what we wanted to try next.</p>
<p>The best soft phone we've seen so far is <a href="http://www.sjlabs.com/">SJPhone</a>. A configuration guide is <a href="http://www.jimradford.com/asterisk/sjphone/">here</a>
<p>But the real clou is the <a href="http://www.zyxel.co.uk/Products.32+B6JnR4X1p5WEVMcHJvZHVjdHNfcGkxW3Nob3dVaWRdPTEzJmNIYXNoPTA4NWJjMjdlOTM_.0.html">Zyxel 2000W</a> phone that's currently on my desk: The phone has a WLAN interface (unfortunately no WPA support) and can perfectly well speak with asterisk.</p>
<p>The phone has some problems though: it's slow, it has no support for call transferring, nor holding, neraly every configuration change causes it to reboot,... In the end I really hope Zyxel will further improve the firmware, which is what they seem to be doing - the current release is from the end of february, so quite current.</p>
<p>The next thing will be trying to install a webbased frontend to asterisk and creating a real dialplan with voice mail. Then, our experiment will be over and we'll see how it can be put into practical use (like finally getting rid of the old, proprietary PBX from alcatel of our landlords)</p>
