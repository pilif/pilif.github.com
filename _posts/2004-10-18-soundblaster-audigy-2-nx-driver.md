---
layout: post
title: Soundblaster Audigy 2 NX Driver
tags:
- Software
status: publish
type: post
published: true
meta: {}

---
<p>If you are like me, then you certainly throw away or lose CDs containing drivers for your hardware. I mean: Why should you not? These days, every hardware vendor has the most current drivers on it's webpage, ready to be downloaded.</p>
<p>Actually, using the drivers on the CD often does not even work... You know - little or now quality management.</p>
<p>But then, there is my Audigy 2 NX card. I bought it, so I can hook my AC3-Receiver to my ThinkPad when watching an occasional DivX movie with AC3-Sound. For that matter, I have not used the little silvery box for the last five months or so. As I noted before, I have long lost the driver CD.</p>
<p>You can certianly imagine how annoyed I was when I saw that Creative Labs only provides driver <b>updates</b> requiring the original driver to be already installed.</p>
<p>I don't even want to think what I would have to do to get back to a CD or a full installer. I can well imagine that the support - if it even answers my calls for help - would really like to see me buy another package - just for a new driver CD (which I will lose again - eventually)</p>
<p>So, I needed another solution.</p>
<p>This is what I did:</p>
<ol>
 <li>Plug in your the Audigy and turn it on</li>
<li>Download and run the driver installer (the older of both versions)</li>
 <li>Wait for it to tell you that the software must be installed</li>
  <li>Go to <tt>[Path_to_profile]\Local Settings\Temp</tt> (mostly c:\Documents and Settings\[your username]) and look for a folder just created. If you don't want to search, use <a href="http://www.sysinternals.com/ntw2k/freeware/procexp.shtml">Process Explorer</a> and look what handles the installer has opened.</li>
 <li>In this directory, you'll find a folder named "Drivers". Copy that to somewhere else</li>
 <li>Open the Device Manager (Start - Settings - Control Panel - System - Hardware - Device Manager or much faster Windows-Pause)</li>
  <li>Right-Click on your Soundcard (either not recognized or recognized as "USB Audio Device"), select "Update Driver..."</li>
  <li>Don't let the assistant install anything automatically</li>
  <li>Provide the path where you copied the <tt>Drivers</tt> directory to in step 5</li>
  <li>Windows will install the driver which creative's installer would not have let you to</li>
  <li>Click "OK" in the installer from Creative. It'll think that the original software ist installed, re-install your manually installed driver, flash the card's firmware and exit nicely</li>
</ol>
<p>This saved me from a lot of stupid asking-arond or even re-buying a piece of hardware I already own.</p>
<p>I can't understand why Creative Lab's does not provide un-crippled installers for their drivers. This procedure is far from obvious and many non-geeks are probably not able to do this. If this policy should be a new business-case in selling more products, I don't really see how this will work in the long run...</p>
<p>Anyway. I could get it to work and I will now please myself watching this DivX-Video using my beamer and my AC3-Receiver. ;-)</p>
