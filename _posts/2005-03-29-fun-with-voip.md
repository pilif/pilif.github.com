---
layout: post
title: Fun with VoIP
tags:
- Free Software
- Unix
- VoIP
status: publish
type: post
published: true
meta: {}

---
<p>When I read for then n-th time about <a href="http://www.asterisk.org">Asterisk</a>, an Open Source PBX solution, I deceided to team up with Christoph and tame the beast.</p>
<p>I have actually two problems with asterisk as it stands now:</p>
<ol>
 <li>There's not much really useful newbie-documentation or tutorials. There are some sample configurations, but they are not very useful because...</li>
  <li>the tool has a incredibly intransparent and difficult to understand syntax for it's main configuration file (<tt>extension.conf</tt>). I't just like it's with sendmail: Many extremely low-level things to care of for getting complex high-level results.</li>
</ol>
<p>I thought, that teamed up with Christoph, we'll more likely to see some results.</p>
<p>The first thing was defining the parameters of our experiment. Here's what we wanted to do:</p>
<ul>
 <li>Act as a SIP-Proxy, so two softphones (we did not want to buy too much actual hardware yet) could talk to each other.</li>
 <li>Provide a gateway to the ISDN-Network, so both SIP-Phones can dial out to the rest of the world.</li>
 <li>The same gateway should be able to receive incoming calls and direct them to one of the Phones (just one for now).</li>
</ul>
<p>In the next session, we want more advanced features, like voicemail and waiting music. A third session should provide us with a webbased frontend (I know there are some). But for now, we wanted to concentrate on the basics.</p>
<p>The next step was to get the required hardware. I already have <a href="http://www.gentoo.org">Gentoo</a> running on my Thinkpad, so that was a good base. Furthermore, we needed any ISDN-Solution being supported by Asterisk. As we had a plain old BRI interface and a very limited budget (it was just an experiment after all), we went with the <a href="http://www.avm.de/en/index.php3?Produkte/FRITZ/FRITZ_Card_USB/index.js.html">Fritz Card USB</a> by AVM which has Linux CAPI drivers, albeit only binary ones (we could also have used the PCMCIA-version, but this is three times as expensive as the USB one).</p>
<p>Said piece of hardware proved to be a real pearl: It's very compact, does not need a power adaptor and was very easily installed under Linux. I would not be using this for a real-world solution (which most likely requires PRI support and absolutely would require open sourced drivers), but for our test, this was very, very nice.</p>
<p>Installing the needed software is where gentoo really shined as everything needed was already in the distribution: After hooking up all the stuff, we emerged <tt>net-dialup/fritzcapi</tt>, <tt>net-misc/asterisk</tt> and <tt>net-misc/asterisk-chan_capi</tt> which suked in some more dependencies.</p>
<p>The next step is to reconfigure the kernel for the CAPI-stuff to work. Just include everything you find under "Device Drivers / ISDN Support / CAPI" - even the one option marked as Experimental (as the CAPIFS is needed and only available when enabling "CAPI2.0 Middleware support")</p>
<p>Then, we made sure that CAPI (a common ISDN access API) was running by issuing <tt>capiinit start</tt>.</p>
<p>Then we went on to asterisk.</p>
<p>The fist thing, you have to do is to set up the phones you're using. As we worked with SIP-Phones, we used <tt>sip.conf</tt>:
<pre class="code">
[general]
port = 5060
bindaddr = 0.0.0.0
tos = none
realm = sen.work
srvlookup = yes

[12345]
context = theflintstones
dtmfmode = rfc2833
disallow = all
allow = gsm
callerid = "Fred Flintstone" &lt;12345&gt;
secret = blah
auth = md5
host = dynamic
reinvite = no
canreinvite = no
nat = no
qualify = 1000
type = friend

[12346]
accountcode = 12346
dmtfmode = rfc2833
host = dynamic
auth = md5
secret = blah
canreinvite = no
context = theflintstones
qualify = 2000
type = friend
disallow = all
allow = gsm
</pre>

<p>This worked with our two test-phones running <a href="http://www.xten.com/index.php?menu=products&smenu=download">X-Lite</a></p>
<p>Interesting are the following settings:</p>
<table border="0">
 <tr>
    <td><b>realm</b></td><td>The realm. I used our internal domain here. The default is asterisk. Your VoIP-Address will be identifier@[realm].</td>
  </tr>
 <tr>
    <td><b>accountcode</b></td><td>This is the username you're going to use on the phone</td>
  </tr>
 <tr>
    <td><b>context</b></td><td>The context will be used when we create the dial plan in the feared <tt>extension.conf</tt></td>
  </tr>
</table>

<p>Then, we configured CAPI in <tt>capi.conf</tt></p>

<pre class="code">
[general]
nationalprefix=0
internationalprefix=00
rxgain=0.8
txgain=0.8

[interfaces]
msn=44260XXXX
incomingmsn=*
controller=1
softdtmf=1
accountcode=
context=demo
devices=2
</pre>
<p>Those settings are said to work in Switzerland.  Interesting is the setting for <tt>msn</tt>. This is where you enter the MSNs (phone numbers) assigned to your NT. I somewhat X-ed it out. Just don't use any leading zeroes in most countries. You can enter up to five using commas as separator.</p>
<p>The next thing is to update <tt>modules.conf</tt>. In the <tt>[modules]</tt>-Section, add <tt>load => chan_capi.so</tt>, in the <tt>[global]</tt>-section, add <tt>chan_capi.so=yes</tt>.</p>
<p>Without those entries, asterisk will complain about unresolved symbols when loading the CAPI modules and will finally terminate with a "broken pipe"-Error. Thrust us. We tried. ;-)</p>
<p>The best thing now is that you can already test your setup so far. Launch asterisk with <tt>asterisk -vvvvvc</tt> (each v adds a bit of verbosity, while -c tells it not to detach from the console). If it works well, you'll end up at a console. If not, make sure, that capiinit did not report any error and that you've really added those lines to module.conf.</p>
<p>Now for the fun of it, call one of your MSNs with any phone.</p>
<p>Asterisk should answer and provide you with a demo-menu</p>
<p>The next step is configuring <tt>extensions.conf</tt>. This is somewhat complex and I will go into more detail, as soon as I've figured out, what's wrong with our test-configuration. We've added this to the end:</p>
<pre class="code">
[ch-fest-netz]
exten => _0[1-9].,1,Dial(CAPI/44260XXXX:b${EXTEN},30)
exten => _0[1-9].,2,Hangup

[theflintstones]
include => ch-fest-netz
</pre>
<p>Just look that you enter one of the MSNs you have configured in <tt>capi.conf</tt>.</p>
<p>Now what this configuration <em>should</em> do is to allow those SIP-phones (recognize the "context" we used in sip.conf?) to dial out via CAPI.</p>
<p>You best learn how to configure this beast by calling the demo-voicebox and then comparing the log output of Asterisk with the entries in extension.conf. Basically, <tt>exten =&gt;</tt> defines a dial plan to execute. Then comes the pattern of numbers dialed to recognize. After that comes a (BASIC-like) sequence-number, followed by the action to execute.</p>
<p>The format of the number-pattern is explained in one of the comments in extension.conf</p>
<p>Now, this configuration does not work for us: When I dial on the SIP-Phone, Asterisk notices this, actually connects the ISDN-line (the target phone actually rings), but does not seem to notice when the target phone is answered.</p>
<p>If I answer the phone, it's just silence in the line. The SIP-phone is still in the "trying to connect"-state.</p>
<p>This stays this way until I cancel the dial attempt in the SIP-phone. After that, asterisk prints more log entries - one of them the notice that the connection was successfully established.</p>
<p>A question in the malinglist was promptly answered: My configuration is correct, but maybe I'm running into a bug of Kernel 2.6.11. I was told to downgrade to 2.6.10, which is what I'm going to do next.</p>
<p>After this, I will extend the dial plan so I can call the internal SIP-phones both from another softphone or from a real phone over the ISDN</p>
<p>It's hacky, it's just somewhat working, but it's a lot of fun!</p>
<p>I'll keep you updated.</p>
