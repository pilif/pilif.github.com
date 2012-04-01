---
layout: post
title: Windows 2008  / NAT / Direct connections
categories:
- troubleshooting
tags:
- networking
- routing
- Software
- solution
- Solutions
- windows
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
Yesterday I ran into an interesting problem with Windows 2008's implementation of NAT (don't ask - this was the best solution - I certainly don't recommend using Windows for this purpose).

Whenever I enabled the NAT service, I was unable to reliably connect to the machine via remote desktop or even any other service that machine was offering. Packets sent to the machine were dropped as if a firewall was in between, but it wasn't and the Windows firewall was configured to allow remote desktop connections.

Strangely, <em>sometimes</em> and from <em>some hosts</em> I was able to make a connection, but not consistently.

After some digging, this turned out to be a problem with the interface metrics and the server tried to respond over the interface with the private address that wasn't routed.

So if you are in the same boat, configure the interface metrics of both interfaces manually. Set the metric of the private interface to a high value and the metrics of the public (routed) one to a low value.

At least for me, this instantly fixed the problem.

<a href="http://www.gnegg.ch/wp-content/uploads/2010/06/interface-metric.png"><img class="aligncenter size-medium wp-image-739" title="interface-metric" src="http://www.gnegg.ch/wp-content/uploads/2010/06/interface-metric-253x300.png" alt="" width="253" height="300" /></a>
