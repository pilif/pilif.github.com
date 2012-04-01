---
layout: post
title: "Windows Media Encoder: File not found"
categories:
- Troubleshooting
tags:
- bug
- encoder
- error
- Software
- Solutions
- windowsmedia
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
Today I have come across an installation of a Windows Media Encoder that refused to actually encode media. Whenever I started the encoding process, the encoder quit with the error 0x80070002 and gave the very helpful unformation that "the system cannot find the file specified".

The problem appeared quite suddenly after working perfectly fine for the last three months. As the system is behind a very air-tight firewall and is the only machine in the network segment (aside of some IP cameras), the system hasn't even been updated via Windows Update. So I have to conclude, that the problem appeared out of the blue. One day it worked, the next it stopped working.

I've tried everything to fix this (the encoder in question was encoding a live stream for a client of ours): From reinstalling the Axis capture driver to reinstalling Windows Media Encoder - nothing worked - the error message stayed the same.

Even googling proved all but helpful: There are quite many pages apparently mirroring all and the same MSDN forum on which someone actually posted the same problem but never got an answer. How annoying is that? You find 10 or more hits, everyone having your problem right in the title and everyone on a different page, but in the end, it's all the same posting mirrored by different sites and plastered with advertisements.

On a hunch though, I have deleted "%Localappdata%\Microsoft\Windows Media" and "%Localappdata%\Microsoft\Windows Media Player" seeing that these folders stayed intact after a reinstallation while also being somewhat Windows media related.

Of course that helped!

So if you ever are in the same problem and Media Encoder suddenly stops encoding, it's maybe caused by a corrupted cache of sorts. In that case, remove the cache and be encoding again, but note though, that if you are on a client machine with all your media on, removing these folders may be unwise as they could contain some meta information about your media.

In my case that didn't matter though.
