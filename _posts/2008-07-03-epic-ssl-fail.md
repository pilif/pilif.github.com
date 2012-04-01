---
layout: post
title: Epic SSL fail
categories:
- funny
- Software
- ssl
- web
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
Today when I tried to use the fancy SSL VPN access a customer provided me with, I came across this epic fail:

<a href="http://www.gnegg.ch/wp-content/uploads/2008/07/sslfail1.png"><img class="aligncenter size-full wp-image-425" title="SSL certificate failure" src="http://www.gnegg.ch/wp-content/uploads/2008/07/sslfail1.png" alt="" width="399" height="180" /></a>

Of *all* the things that can be wrong in a SSL certificate, this certificate manages to get them wrong. The self-signed(1) certificate was issued for the wrong host name(2) and it has expired(3) quite some time ago.

Granted: In this case the issue of trust is more or less constrained to the server to know who I am (I wasn't intending on transferring any amount of sensitive data), but still - when you self-sign your certificate, the cost of issuing one for the correct host or issuing one with a very long validity becomes a non-issue.

Anyways - I had a laugh. And now you can have one too.
