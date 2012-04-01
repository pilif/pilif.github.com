---
layout: post
title: DNSSEC to fix the SSL mess?
tags:
- Opinions
status: publish
type: post
published: true
meta:
  _flattr_post_language: en_GB
  _flattr_post_category: text
  _flattr_post_hidden: "0"
  _flattr_btn_disabled: ""
  _edit_last: "1"
---
After <a href="http://codebutler.com/firesheep">Firesheep</a> it has become clear that there's no way around SSL.

But still many people (and I'm including myself) are unhappy with the fact that to roll out SSL, you basically have to pay a sometimes significant premium for the certificate. And that's not all: You have to pay the same fee every n years (and while you could say that the CA does some work the first time, every following year, it's plain sucking money from you) and you have to remember to actually do it unless you want <a href="http://forum.skype.com/index.php?showtopic=784971">embarrassing warnings</a> pop up to your users.

The usual suggestion is to make browsers accept self-signed certificates without complaining, but that doesn't really work to prevent a Firesheep style attack and is arguably even worse as it would allow not only your session id, but also your password to leak from sites that use the traditional SSL-for-login-HTTP-afterwards mechanism.

See <a href="http://news.ycombinator.com/item?id=2348836">my comment on HackerNews</a> for more details.

To make matters worse, last week news about a CA being compromised and issuing fraudulent (but still trusted) certificates made the rounds, so now even with the current CA based security mechanism, we still can't completely trust the infrastructure.

Thinking about this, I had an idea.

Let's assume that one day, one glorious day, DNSSEC will actually be deployed.

If that's the case, then if I was the owner of gnegg.ch, I could just publish the certificate (or its fingerprint or a link to the certificate over SSL) in the DNS as a TXT record. DNSSEC would ensure that it was the owner of the domain who created the TXT entry and that the domain is the real one and not a faked one.

So if that entry says that gnegg.ch is supposed to serve a certificate with the fingerprint 0xdeadbeef, then a connecting browser would be sure that if the site is serving that certificate (and has the matching private key), then the connection would be secure and not man-in-the-middle'd.

Even better: If I lose the private key of gnegg.ch, I would just update the TXT record, making the old key useless. No non-working CRL or OCSP. Just one additional DNS query.

And you know what? It would put CAs out of business for signing of site certificates as a self-signed certificate would be as good as an official one (they would still be needed to sign your DNSSEC zone file of course, but that could be done by the TLD owners).

Oh and by the way: I could create my certificate with an incredibly long (if ever) expiration time: If I want the certificate to be invalid, I remove or change the TXT record and I'm done. As simple as that. No more embarrassing warnings. No more fear of missing the deadline.

Now, this feels so incredibly simple that there <strong>must</strong> be something I'm missing. What is it? Is it just that politics is preventing DNSSEC from ever being real? Is there an error in my thinking?

&nbsp;
