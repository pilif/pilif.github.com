---
layout: post
title: My favourite asterisk feature
categories:
- asterisk
- fun
- prank
- Software
- VoIP
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
I've just included this into the context of the dialplan where the calls from and to our internal phones live.
<pre>[intercom]
exten =&gt; _55[6-8][1-9],1,SIPAddHeader("Call-Info: sip:asterisk\;<strong>answer-after=0</strong>")
exten =&gt; _55[6-8][1-9],2,Dial(SIP/${EXTEN:2})</pre>
this is as useless as it is fun.

Too bad softphones are getting some real attention in the office lately, as they don't support the answer-after feature and even if they did, where is the fun of just making yourself heard on the headphones of the victim as opposed to doing that directy on their speaker - loud enough to be heard in the whole office.

VoIP is fun and it's about time I do more to our asterisk config but just watch it work and never fail.
