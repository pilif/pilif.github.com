---
layout: post
title: Fun with Logitech
tags:
- Hardware
- Software
status: publish
type: post
published: true
meta: {}

---
I recently bought the <a href="http://www.logitech.com/index.cfm?page=products/details&CRID=486&CONTENTID=7321&countryid=16&languageid=1">diNovo Media Desktop</a> from Logitech: I really liked it's design and the bluetooth-support as this is the only really usable way for wireless equipement (no problems with multiple devices per room, encryption, ... you name it)

The problem was: The driver on the CD-ROM installed just another Widcomm Bluetooth-stack which despite being the same piece (down to the version) of software that was installed with my think pad's internal bluetooth-adaptor (you will have to update to version 1.4 on IBM's webpage to use the HID-profile), was not compatible with the prior Widcomm-Software (which is a political/legal problem and has no technical reasons at all).

So, when using the diNovo-drivers, the internal bluetooth-adaptor does not work (too bad when trying to use your cellphone to connect to the internet when other means of connectivity are not availabe), and when not using them, I cannot configure the special keys and the media-player support (which is stupid anyway as it does not support Winamp).

My final solution was to revert back to only IBM's internal driver and pair the logitech devices whith that one (hint: the mouse uses the key 0000). Installing set point which would work perfectly well with IBM's BT-stack (as it's the same as logitechs), was not possible beacuse the logitech BT adaptor could not be found. Ergo: No media keys, but at least a really nice keyboard and mouse together with a working BT-support.

Talk about BT-interoperability...

I really look forward to the Windows-integrated BT-stack (which probably will be the widcomm one too - just look at the stack of Windows Mobile 2003)
