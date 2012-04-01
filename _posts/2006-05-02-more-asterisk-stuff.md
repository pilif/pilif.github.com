---
layout: post
title: More Asterisk stuff
categories:
- Free Software
- Solutions
- VoIP
status: publish
type: post
published: true
meta: {}

---
<p>I thought I'd give a little update on what's going on in my Asterisk installation as some of the stuff might be useful for you:</p>

<a name="speeddial"></a>
<h3>Speed Dial</h3>
<p>If you have <a href="http://www.snom.com">Snom Phones</a> and want to program the function keys to dial a certain number, be sure to select "Speed Dial" and not "Destination" when entering the number.</p>
<p>Destination was used in earlier firmwares but it now used to not only make the phone dial that number, but also subscribe to the line to make the LED light up when the line is used.</p>
<p>This obviously makes no sense at all with external numbers and requires some configuration for internal ones (see below). The additional benefit is that buttons with "Speed Dial" assigned don't turn on the LED.</p>

<a name="dialbyclick"></a>
<h3>Dial by click</h3>
<p>You can dial a number from the Mac OS X address book aswell. Asterisk will make your phone ring and redirect the call once you pick up (just like <a href="http://sourceforge.net/projects/asttapi/">AstTapi</a> on Windows). I had the best experience with <a href="http://mezzo.net/asterisk/app_notify.html">app_notify</a>. I don't quite like the way how it notifies clients of incoming calls (hard-coding IP-Addresses of clients is NOT how I want my network to operate), but maybe there will be a better solution later on. Currently, I'm not using this feature.</p>
<p>Dialing works though.</p>
<p>You don't have to modify manager.conf, btw, if you already have the entry for the AstTapi-Solution. app_notify will ask for username (manager context) and password when it launches the first time.</p>

<h3>Subscription</h3>
<p>As noted above, your Snom Phone can be advised to monitor a line. The corresponding LED will blink (asterisk 1.2+) when it's ringing and light up when the line is busy.</p>
<p>Snom-wise, you'll have to configure a function key to a "Destination" and enter the extension you like to monitor.</p>
<p>Asterisk-wise you have to make various changes:</p>
<p><b>sip.conf</b><br />
<ul>
    <li>Add <tt>subscribecontext=[context]</tt>, where context is the context in extensions.conf where the corresponding SNOM phone is configured in. I've put this to the [general]-Section because all phones are sharing the same context (<tt>internal</tt>).</li>
    <li>Add <tt>notifyringing=yes</tt> if you have Asterisk &gt;= 1.2 and want to make the LEDs blink when the line is ringing.</li>
</ul>
</p>
<p>
<b>extensions.conf</b><br />
This is a bit hacky: In the sip-context add a <tt>notify</tt> extension for every line you want to be allowed to be monitored. Unfortunately, you can't use macros or variables here, so it's messy.</p>
<p>On my configuration it's:</p>
<code>[internal]
exten =&gt; 61,hint,SIP/61
exten =&gt; 62,hint,SIP/62
exten =&gt; 63,hint,SIP/63
exten =&gt; 64,hint,SIP/64
exten =&gt; _6[1-9],1,Dial(SIP/${EXTEN},,tWw)
</code>
<p>While I would have preferred</p>
<code>[internal]
exten =&gt; _6[1-9],hint,SIP/${EXTEN}
exten =&gt; _6[1-9],1,Dial(SIP/${EXTEN},,tWw)
</code>
<p>Though this may have been fixed with 1.2.2, but I'm not sure just yet.</p>
<p>You may have to reboot your phone after making the configuration change there. To check the registration in asterisk use <tt>SIP show subscriptions</tt>.</p>
<p>You should get something like this:</p>
<code>asterisk*CLI&gt; SIP show subscriptions
Peer             User   Call ID      Extension  Last state     Type
192.168.2.152    62     3c26700b57e  61         Idle           dialog-info+xml
1 active SIP subscription
</code>
<p>This is not quite tested as of yet because the guy at extension 61 is currently in his office and I don't want to bother him ;-)</p>
<p>Update while editing/correcting this text: It works. They guy has left and I checked it.</p>
