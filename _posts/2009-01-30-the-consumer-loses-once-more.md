---
layout: post
title: The consumer loses once more
categories:
- Opinion
tags:
- opinion
- drm
- piracy
- gaming

status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
DRM strikes again. This time, apparently, the PC version of Gears of War <a href="http://arstechnica.com/gaming/news/2009/01/pc-gears-of-war-drm-causes-title-to-shut-down-starting-today.ars">stopped working</a>. This time it seems to be caused by an expired certificate.

Even though I do not play Gears of War, I take issue in this because of a multitude of problems:

First, it's another reason where DRM does nothing to stop piracy but punishes the honest user for buying the original - no doubt, the cracked versions of the game will continue to work due to the stripped out certificate check.

Second, using any form of DRM with any type of media is incredibly shortsighted if it requires any external support to work correctly. Be it a central authorization server, be it a correct clock - you name it. Sooner or later you won't sell any more of your media and thus you will shut your DRM servers down, screwing the most loyal of your customers.

This is especially apparent with the games market. Like no other market, there exists a really vivid and ever growing community of retro gamers. Like no other type of media, games seem to make users to want to go back to them and see them again - even after ever so many years.

Older games are <a href="http://speeddemosarchive.com/">speedrunned</a>, <a href="http://www.metroid2002.com/">discussed</a> and even <a href="http://tasvideos.org/NewMovies.html">utterly destroyed</a>. Even if the count in players declines over the years, it will never reach zero.

Now imagine DRM in all those old games once you turn off the DRM server or a certificate expires: No more speedruns. No more discussion forums. Nothing. The games are devalued and you as a game producer shut out your most loyal customers (those that keep playing your game after  many years).

And my last issue is with this Gears of War case in particular: A time limited certificate does not make any sense in this case. It's identity that must be checked. Let's say the AES key used to encrypt the game was encrypted with the private key of the publisher (thus the public key will be needed to decrypt it) and the public key is signed by the publishers CA, then, while you check the identity of the publishers certificate, checking the time certainly is not needed. If it was valid once, it's probably valid in the future as well.

Or better: A cracker with the ability to create certificates that look like they were signed by the publisher will highly likely also be able to make them with any timed validity.

This issue here is that Gears of War probably uses some library function to check for the certificate and this library function also checks the timestamp on the certificate. The person that issued the certificate either thought that "two years is well enough" or just used the default value in their software.

The person using the library function just uses that, not thinking about the timestamp at all.

Maybe, the game just calls some third-party DRM library which in turn calls the X.509 certificate validation routines and due to "security by obscurity" doesn't document how the DRM works, thus not even giving the developer (or certificate issuer) any chance to see that the game will stop working once the certificate runs out.

This is lazyness.

So it's not just monetary issues that would lead to DRMed stuff stop working. It's also lazyness and wrong sense of security.

DRM is doomed to fail and the industry finally needs to see that.
