---
layout: post
title: Geek heaven
categories:
- isp
- sysadmin
- ipv6
- opinion
tags:
- isp
- sysadmin
- ipv6
- review
- opinion
status: publish
type: post
published: true
---

If I had to make a list of attributes I would like the ISP of my dream to
have, then, I could write quite the list:

* I would really like to have native IPv6 support. Yes. IPv4 will be
sufficient for a very long time, but unless pepole start having access to
IPv6, it'll never see the wide deployment it needs if we want the internet
to continue to grow. An internet where addresses are only available to
people with a lot of money is not an internet we all want to be subjected to
(see my post [«asking for permission»](http://pilif.github.io/2011/09/asking-for-permission/))
* I would want my ISP to accept or even support network neutrality. For this
to be possible, the ISP of my dreams would need to be nothing but an ISP so
their motivations (provide better service) align with mine (getting better
service). ISPs who also sell content have all the motivation to provide
crappy Internet service in order to better sell their (higher-margin)
content.
* If I have technical issues, I want to be treated as somebody who obviously
has a certain level of technical knowledge. I'm by no means an expert in
networking technology, but I do know about powering it off and on again. If
I have to say «[shibboleet](http://xkcd.com/806/)» to get to a real
technicial, so be it, but if that's not needed, that's even better.
* The networking technology involved in getting me the connectivity I want
should be widely available and thus easily replacable if something breaks.
* The networking technology involved should be as simple as possible: The
more complex the hardware involved, the more stuff can break, especially
when you combine cost-pressure for end-users with the need for high
complexity.
* The network equipment I'm installing at my home and which has thus access
to my LAN needs to be equipment I own and I control fully. I do not accept
leased equipment to which I do not have full access to.
* And last but not least, I would really like to have as much bandwidth as possible

I'm sure I'm not alone with these wishes, even though, for «normal people»
they might seem strange.

But honestly: They just don't know it, but they too have the same interests.
Nobody wants an internet that works like TV where you pay for access to a
curated small list of "approved" sites (see network neutrality and IPv6
support).

Nobody wants to get up and reboot their modem here and then because it
crashed. Nobody wants to be charged with downloading illegal content
because their Wifi equipment was suddenly repurposed as an open access point
for other customers of an ISP.

Most of the wishes I list above are the basis needed for these horror
scenarios never coming to pass, however unlikely the might seem now (though
getting up and rebooting the modem/router is something we already have to
deal with today).

So yes. While it's getting rarer and rarer to get all the points of my list
fulfilled, to the point where I though this to be impossible to get all of
it, I'm happy to say that here in Switzerland, there is at least one ISP that
does all of this and more.

I'm talking about [Init7](http://init7.ch) and especially their
[awesome FTTH offering Fiber7](https://www.fiber7.ch/) which very recently
became available in my area.

Let's deal with the technology aspect first as this really isn't the
important point of this post: What you get from them is pure 1Gbit/s
Ethernet. Yes, they do sell you a router box if you want one, but you can
just as well just get a simple media converter, or just an SFP module to plug
into any (managed) switch (with SFP port).

If you have your own routing equipment, be it a linux router like my
[shion](/2006/07/computers-under-my-command-issue-1-shion/) or be it any
Wifi Router, there's no need to add any kind of additional complexity to
your setup.

No additional component that can crash, no software running in your home to
which you don't have your password to and certainly no sneakily opened
public WLANs (I'm looking at you,
[cablecom](http://www.upc-cablecom.ch/de/support/tools/wi-free/)).

Of course you get native IPv6 (a /48 which incidentally is room for
281474976710656 whole internets in your apartment) too.

But what's really remarkable about Init7 isn't the technical aspect (though,
again, it's bloody amazing), but everything else:

* Init7 was one of the first ISPs in Switzerland to offer IPv6 to end users.
* Init7 doesn't just [support network neutrality](http://www.init7.net/en/about/sozial).
They actively [fight for it](http://webapp.sonntagszeitung.ch/read/sz_29_06_2014/gesellschaft/Gegen-das-Goliath-Gehabe-8963)
* They [explicitly state](https://fiber7.ch/fiber7-technologie/fiber7-tripleplay/)
that they are not selling content and they don't intend to start doing so. They are just an ISP and as such their motivations totally align with mine.

There are a lot of geeky soft factors too:

* Their press releases are written in Open Office (check the PDF properties
of [this one](https://fiber7.ch/documents/20/20140908_111tage_fiber7-medienmitteilung_final.pdf)
for example)
* I got an email from a technical person on their end that was written using
f'ing [Claws Mail](http://www.claws-mail.org/) on Linux
* Judging from the `Recieved` headers of their Email, they are using IPv6 in
their internal LAN - down to the desktop workstations. And related to that:
* The machines in their LAN respond to ICMPv6 pings which is utterly crazy
cool. Yes. They are firewalled (*cough* I had to try. Sorry.), but they let
ICMP through. For the not as technical readers here: This is as good an
internet citizen as you will ever see and it's extremely unexpected these
days.

If you are a geek like me and if your ideals align with the ones I listed
above, there is no question: You have to support them. If you can have their
Fiber offering in your area, this is a no-brainer. You can't get synchronous
1GBit/s for CHF 64ish per month anywhere else and even if you did, it
wouldn't be plain Ethernet either.

If you can't have their fiber offering, it's still worth considering their
other offers. They do have some DSL based plans which of course are
technically inferior to plain ethernet over fiber, but you would still
support one of the few remaining pure ISPs.

It doesn't have to be Init7 either. For all I know there are many others,
maybe even here in Switzerland. Init7 is what I decided to go with initially
because of the Gbit, but the more I leared about their philosophy, the less
important the bandwith got.

We need to support companies like these because companies like these are
what ensures that the internet of the future will be as awesome as the
internet is today.
