---
layout: post
title: pptp + linux = much fun.
categories:
- Software
- Unix
status: publish
type: post
published: true
meta: {}

---
Actually it's not that bad. Its just another of those things-that-work-stop-working-and-it-takes-ages-to-find-out-why-things.

For about four weeks I had a problem that LAN-Connections did not work after resuming from hibernation and I was unable to access my pptp-server in the office from home. On the linux side a got a timeout while waiting for LCP-Resonse (or something like that) and on the windows-side, the whole process stopped while validating my (long and thus quite secure despite the flaws in the pptp-protocol) password.

Who would have thought that those problems share one thing: The common cause ;-)

For accessing another server of a client behind a cisco-router, they provided me with the "CISCO VPN Dialer" which, when connected provides an option called "Stateful firewall (Always On)". I confess. The "always on" suggest that this not-so-well working firewall (have I said that I hate desktop-firewalls, especially those by <a href="http://www.zonelabs.com">ZoneLabs</a> which this VPN Dialer obviously uses) also is running when the applicatoin is not, but then again: Who could think, that something stays running even though there is not GUI indication (and no way to turn it off, besides re-dialing) whatsoever?

I found this out when I tried to ping my workstation form a Linux-Server within our network, which I tried after seeing that VMWare stopped working too (incredibly useful for making screenshots of strange OSes).

So my expirience with this cool CISCO VPN-Dialer is as follows:

<ul>
 <li>Breaks well-working applications (VMWare)
 <li>Makes me unable to use my own network while connected (despite the checkbox telling me otherwise)
 <li>Breaks PPTP (and I already suspected Linux)
 <lI>Is incompatible with the Hibernation Mode that comes with Win 2000 and later
 <li>Is an usability nightmare as it does not provide any visual feedback of being running despite the fact that an always running firewall and a VPN-Dialer do have nearly nothing in common.
 <li>Is an even worse usability nightmare as there is no way to turn that firewally thing off besides building up the VPN-Connection which has even less to do with a firewall than the tool alone.
 <li>Is insecure: Everyting besides the PPTP-Connection was well working when using WLAN to connect to the network - even the ping from the server to my machine.
</ul>

Great product indeed.
