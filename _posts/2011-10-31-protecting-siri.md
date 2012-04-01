---
layout: post
title: protecting siri
tags:
- programming
- apple
status: publish
type: post
published: true
---
Over the last weekend, 9to5mac.com <a href="http://9to5mac.com/2011/10/29/siri-hacked-to-fully-run-on-the-iphone-4-and-ipod-touch-iphone-4s-vs-iphone-4-siri-showdown-video-interview/">posted about a hack</a> which shows that it's possible to run Siri on a iPhone 4 and
an iPod Touch 4g and possibly even oder devices - considering how much of Siri
is running on Apple's servers.

We've always suspected that the decision to restrict Siri to the 4S is
basically a marketing decision and I don't really care about this either.
Nobody is forcing you to use Siri and thus nobody is forcing you to update to
anything.

Siri is Apple's product and so are the various iPhones. It's their decision
whom they want to sell what to.

What I find more interesting is that it was even possible to have a hacked
Siri on a non 4S-phone talk to Apple's servers. If I were in Apple's shoes, I
would have made that (practically) impossible.

And here's how:

Having a device that you put into users hands and trusting it is always a very
hard, if impossible thing to do as the device can (more or less) easily be
tampered with.

So to solve this problem, we need some component that we know reasonably well
to be safe from the user's tampering and we need to find a way for that
component to prove to the server that indeed the component is available and
healthy.

I would do that using public key crypto and specialized hardware that works
like a TPM. So that would be a chip that contains a private key embedded in
hardware, likely not updatable. Also, that private key will never leave that
device. There is no API to read it.

The only API the chip provides is either a relatively high-level API to sign
an arbitrary binary blob or, more likely, a lower level one to encrypt some
small input (a SHA1 hash for example) with the private key.

OK. Now we have that device (also, it's likely that the iPhone already has
something like that for its secured boot process). What's next?

Next you make sure that the initial handshake with your servers requires that
device. Have the server post a challenge to the phone. Have the phone solve it
and have the response signed by that crypto device.

On your server, you will have the matching public key. If the signature checks
out, you talk to the device. If not, you don't.

Now, it is possible using very expensive hardware to extract that key from the
hardware (by opening the chip's casing and using a microscope and a lot of
skills). If you are really concerned about this, give each device a unique
private key. If a key gets compromised, blacklist it.

This greatly complicates the manufacturing process of course, so you might go
ahead with just one private key per hardware type and hope that cracking the
key will take longer than the lifetime of the hardware (which is very likely).

This isn't at all specific to Siri of course. Whenever you have to trust a
device that you put into consumers hands, this is the way to go and I'm sure
we'll be seeing more of this in the future (imagine the uses for copy
protection - let's hope we don't end up there).

I'm not particularly happy that this is possible, but I'd rather talk about it
than to hope that it's never going to happen - it will and <a href="/2011/09/asking-for-permission/">I'll be pissed</a>.

For now I'm just wondering why Apple wasn't doing it to protect Siri.