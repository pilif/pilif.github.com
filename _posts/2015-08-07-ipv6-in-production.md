---
layout: post
title: IPv6 in production
categories:
- networking
- ipv6
- internet
- opinion
tags:
- networking
- ipv6
- internet
- opinion
status: publish
type: post
published: false
---

Yesterday, I talked about [why we need IPv6](/2015/08/why-ipv6/) and to make that actually happend, I decided to do my part and make sure that all of our infrastructure is available over IPv6.

Here's a story of how that went:

First was to request an IPv6 allocation by our hosting provider: Thankfully our contract with them included a /64, but it was never enabled and when I asked for it, they initially tried to bill us CHF 12/mt extra, but after pointing them to the contract, they started to make IPv6 happen.

That this still took them multiple days to do was a pointer to me that they were not ready at all and by asking, I was forcing them into readyness. I think I have done a good deed there.

## dns

Before doing anything else, I made sure that our DNS servers are accessible over IPv6 and that IPv6 glue records existed for them. 

We're using PowerDNS, so actually supporting IPv6 connectivity was trivial, though there was a bit of tweaking needed to tell it about what interface to use for outgoing zone transfers.

Creating the glue records for the DNS servers was trivial too - [nic.ch](http://nic.ch) has a nice UI to handle the glue records. I've already had IPv4 glue records, so all I had to do was to add the V6 addresses.

## web properties

Making our web properties available over IPv6 was trivial. All I had to do was to assign an IPv6 address to our frontend load balancer.

I did not change any of the backend network though. That's still running IPv4 and it will probably for a long time to come as I have already carefully allocated addresses, configured DHCP and I even know IP addresses by heart. No need to change this.

I had to update the web application itself a tiny bit in order to copy with a `REMOTE_ADDR` that didn't quite look the same any more though:

* there were places where we are putting the remote address into the database. Thankfully, we are using PostgreSQL whose [native `inet` type](http://www.postgresql.org/docs/9.4/static/datatype-net-types.html) (it even supports [handy type specific operators](http://www.postgresql.org/docs/9.4/static/functions-net.html)) supports IPv6 since practically forever. If you're using another database and you're sotoring the address in a `VARCHAR`, be prepared to lengthen the columns as IPv6 addreses are much longer.
* There were some places where we were using CIDR matching for some privileged API calls we are allowing from the internal network. Of course, because I haven't changed the internal network, no code change was strictly needed, but I have updated the code (and unit tests) to deal with IPv6 too.

The last step was to add the AAAA record for our load balancer. 

From that moment on, our web properties were available via IPv6 and while there's not a lot of traffic from Switzerland, over in Germany, about 30% of all requests are happening over IPv6.

## email

Of the bunch, dealing with email was the most complicated step. Not so much for enabling IPv6 support in the MTA as that was supported since forever (we're [using Exim](/2004/06/all-time-favourite-tools/) (warning: very old post)).

The difficulty lied in getting everything else to work smoothly though - mostly in regards to SPAM filtering:

* Many RBLs don't support IPv6, so I had to make sure we weren't accidentally treating all mail delivered to us over IPv6 as spam.
* If you want to have *any* chance at your mail being accepted by remote parties, then you must have a valid PTR record for your mail server. This meant getting reverse DNS to work right for IPv6.
* Of course you also need to update the SPF record now that you are sending email over IPv6.

## PTR record

The PTR record was actually the crux of the matter.

In IPv4, it's inpractical or even impossible to get a reverse delegation for anything smaller than a /24, because of the way how reverse lookup works in DNS. There was [RFC 2317](https://www.ietf.org/rfc/rfc2317.txt) but that was just too much hassle for most ISPs to implement.

So the process normally was to let the ISP handle the few PTR records you wanted.

This changes with IPv6 in two ways: As the allocation is mostly fixed to a /64 or larger and because there are so many IPv6 addreses to allow splitting networks at byte boundaries without being stingy, it is trivially easy to do proper reverse delegation to customers.

And because there are so many addresses available for a customer (a /64 allocation is enough addresses to cover 2^32 whole internets), reverse delegation is the only way to make good use of all these addresses.

This is where I hit my next roadblock with the ISP though.

They were not at all set up for proper reverse delegation - the support ticket I have opened in November of 2014 took over 6 months to finally get closed in May of this year.

As an aside: This was a professional colocation provider for business customers that was, in 2014, not prepared to even just hand out IPv6 addresses and who required 6 months to get reverse delegation to work.

My [awesome ISP](https://fiber7.ch) was handing out IPv6 addresses since the late 90ies and they offer reverse delgation *for free* to anybody who asks. As a matter of fact, it was *them* to ask *me* whether I wanted a reverse delegation last year when I signed up with them. 

Of course I said yes :-)

This brought me to the paradoxical situation of having a fully working IPv6 setup at home while I had to wait for 6 months for my commercial business ISP to get there.

### it's done now

So after spending about 2 days learning about IPv6, after spending about 2 days updating our application, after spending one day convincing our ISP to give us the IPv6 allocation they promised in the contract and after waiting *6 months* for the reverse delegation, I can finally say that all our services are now accessible via IPv6.

Here are the headers of the very first Email we've transmitted via IPv6

![screenshot showing off array support](/assets/images/ipv6_headers.png)

And here's the achievement badge I waited so patiently (because of the PTR delegation) to finally earn 🎉

<a href="https://ipv6.he.net/certification/scoresheet.php?pass_name=pilif" target="_blank"><img src="https://ipv6.he.net/certification/create_badge.php?pass_name=pilif&amp;badge=1" style="border: 0; width: 128px; height: 128px" alt="IPv6 Certification Badge for pilif"></img></a>

I can't wait for the accompanying T-Shirt to arrive 😃
