---
layout: post
title: when in doubt - SSL
categories:
- sysadmin
- programming
tags:
- programming
- sysadmin
- ssl
status: publish
type: post
published: true
---

Since 2006, as part of our product, we are offering barcode scanners
with GSM support to either send orders directly to the vendor or to
transmit products into the web frontend where you can further edit them.

Even though the devices (Windows Mobile. Crappy. In progress of
updating) do support WiFi, we really only support GSM because that means we don't have to share the end users infrastructure.

This is a huge plus because it means that no matter how locked-down the
customer's infrastructure, no matter how crappy the proxy, no matter the IDS in use, we'll always be able to communicate with our server.

Until, of course, the mobile carrier most used by our customers decides
to add a "transparent" (do note the quotes) proxy to the mix.

We were quite stomped last week when we got reports of an HTTP error 408 to be reported by the mobile devices, especially because we were not seeing error 408 in our logs.

Worse, using `tcpdump` has clearly shown how we were getting a RST
packet from the client, sometimes before sending data, sometimes while
sending data.

Strange: Client is showing 408, server is seeing a RST from the client.
Doesnt' make sense.

Tethering my Mac using the iPhones personal hotspot feature and a SIM
card of the mobile provider in question made it clear: No longer are we
talking directly to our server. No. What the client receives is a 408
[HTML formatted error message](/assets/stuff/408.txt) by a proxy server.

Do note the "DELETE THIS LINE" and "your organization here" comments.
What a nice touch. Somebody was really spending alot of time getting
this up and running.

Now granted, taking 20 seconds before being able to produce a response
is a bit on the longer side, but unfortunately, some versions of the
scanner software require gzip compression and gzip compression needs to
know the full size of the body to compress, so we have to prepare the
full response (40 megs uncompressed) before being able to send anything
- that just takes a while.

But consider long-polling or [server sent events](http://dev.w3.org/html5/eventsource/) - receiving a 408 after
just 20 seconds? That's annoying, wasting resources and probably not
something you're prepared for.

Worse, nobody was notified of this change. For 7 years, the clients
were able to connect directly to our server. Then one day it changes
and now they aren't. No communication, no time to prepare and
*certainly* too strict limits in order to not affect anything (not
just us - see my remark about long polling).

The solution in the end is, like so often, to use SSL. SSL connections
are opaque to any reverse proxy. A proxy can't decrypt the data without
the client noticing. An SSL connection can't be inspected and an SSL
connection can't be messed with.

Sure enough: The exact same request that fails with that 408 over HTTP
goes through nicely using HTTPS.

This trick works every time when somebody is messing with your
connection. Something f'ing up your WebSocket connection? Use SSL!
Something messing with your long-polling? Use SSL. Something
decompressing your response but not stripping off the Content-Encoding
header (yes. that happend to me once)? Use SSL. Something replacing
arbitrary numbers in your response with asterisks (yepp. happened too)?
You guessed it: Use SSL.

Of course, there are three things to keep in mind:

1. Due to the lack of SNI in the world's most used OS and Browser
combination (any IE under Windows XP), every SSL site you host requires
one dedicated IP address. Which is bad considering that we are running
out of addresses.

2. All of the bigger mobile carriers have their CA in the browsers
trusted list. Aside of ethics, there is no reason what so ever for them
to not start doing all the crap I described and just re-encrypting the
connection, faking a certificate using their trusted ones.

3. failing that, they still might just block SSL at some point, but as
more and more sites are going SSL only (partially for above reasons no
doubt), outright blocking SSL is going to be more and more unlikely to
happen.

So. Yes. When in doubt: Use SSL. Not only does that help your users
privacy, it also fixes a ton of technical issues created by practically
non-authorized third-party messing with you.