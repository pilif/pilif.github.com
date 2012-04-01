---
layout: post
title: Is that still POP3?
categories:
- Opinions
status: publish
type: post
published: true
meta: {}

---
<p>
My mobile phone provider here is <a href="http://www.sunrise.ch">sunrise</a>. I am subscribed to what they call "Onebox", a unified messageing solution.
</p>
<p>I did that because I have access to my voice mailbox via their web-interface which is much more comfortable (and cheaper) than to use the mobile phone.</p>
<p>Unfortunately, their interface does not allow forwarding those messages to another address. While they say they do, entering a forwarding-address actually forwards the emails sent to the sunrise mailbox, but the voice messages stay where they are.</p>
<p>Today I though about accessing the box via <a href="http://catb.org/~esr/fetchmail/">fetchmail</a> and sending it to my regular mailbox.</p>
<p>While this turned out to work extremely well (even the simple notification flag gets cleard on my handset when the fetchmail job forwards the message), the protocol the server speaks is awfully strange. It's supposed to be POP3 passing around RFC2822 messages, it's actually something else... Just have a look:</p>

<pre class="code">
pilif@galadriel ~ % telnet um.sunrise.ch pop3
Trying 212.161.159.6...
Connected to um.sunrise.ch.
Escape character is '^]'.
 1 +OK POP3 umsi3-c04d2.mysunrise.ch vUMSI v1.6.0.0 (UM2 Build 030408) server ready
 2 user [phonenumber]
 3 +OK User name accepted, password please
 4 pass [password]
 5 +OK Mailbox open, 1 messages
 6 stat
 7 +OK 1 192931
 8 retr 1
 9 +OK 1421099 octets
10 From: [calling number] <[calling number]@mysunrise.ch>
11 To: -                      <[phonenumber]@mysunrise.ch>
12 Date: 04 Oct 2004  09:29 +0200
13 Message-id: 0xe97d4b80-0x40-0x3735-0x50
14 Subject: Voice Message
15 Mime-Version: 1.0 (Voice Version 2.0)
16 Content-Type: multipart/voice-message;
17   boundary="2448314160_4000_141330_5000.04102004_0929"
18 Sensitivity: Normal
19 Importance: Normal
20 X-Priebity: 1 (Highest)
21 Content-Duration: 64
22 X-UMSI-Transferred: Server-Id="1"; Server-Type="INFINITY";
23     Profile="[phonenumber]@4:6";
24     Original-Message-UID="244831416 004 005 14133"
</pre>
<p>
(I've added the line numbers myself)
</p>
<p>Line 7: Oh nice. There's a message and it's about 188 KiB large</p>
<p>Line 9: Wait a minute... 1300 KiB? Didn't they say otherwise in Line 7? Actually it's the server decompressing the Voice message and converting it to WAV just after the <tt>retr</tt></p>
<p>Line 13: Is that supposed to be a valid Message-ID? Don't think so</p>
<p>Line 15: What's that? That's not a valid Mime-Version Header</p>
<p>Line 18+19: Are those really valid message headers?</p>
<p>Line 21: What the heck is "Priebity"? That's not an english word.. Maybe they mean "Priority"?</p>
<p>Line 22: Is this a valid header?</p>
<p>I pity the developers of mail user agents: They must cope with such rubbish and in the end, they are blamed if they do not. It's never the vendors of the brolen servers because those are not visible to the end users.</p>
<p>Different question: Why is it always closed source commercial software doing such stupid things? They get paid to create working software and what you see above is not what I'd call "working".</p>
<p>When I'm writing software communicating with some other component not written by me, I follow the defined protocol <em>to the character</em> whether the software is going to be publically released or not. It's just <em>polite</em>.</p>
