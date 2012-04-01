---
layout: post
title: PHP 5.3 and friends on Karmic
tags:
- Free Software
- karmic
- packages
- PHP
- PPA
- ubuntu
- Unix
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
I have been patient. For months I hoped that Ubuntu would sooner or later get PHP 5.3, a release I'm very much looking forward to, mainly because of the addition of anonymous inner functions to spell the death of create_function or even eval.

We didn't get 5.3 for Karmic and <a href="https://bugs.launchpad.net/ubuntu/+source/php5/+bug/394385">who knows about Lucid</a> even (it's crazy that nearly one year after the release of 5.3, there is still debate on whether to include it in the next version of Ubuntu that will be the current LTS release for the next four years. This is IMHO quite the disservice against PHP 5.3 adoption).

Anyways: We are in the process of releasing a huge update to PopScan that is heavily focussed on getting rid of cruft, increasing speed all over the place and increasing overall code quality. Especially the last part could benefit from having 5.3 and seeing that at this point PopScan already runs well on 5.3, I really wanted to upgrade.

In comes Al-Ubuntu-be, a coworker of mine and his awesome Debian packaging skills: Where there are already a few PPAs out there that contain a 5.3 package, Albe went the extra step and added not only PHP 5.3 but quite many other packages we depend upon that might also be useful to my readers. Packages like APC, memcache, imagick and xdebug for development.

While we can make no guarantees that these packages will be maintained heavily, they will get some security update treatment (though highly likely by version bumping as opposed to backporting).

So. If you are on Karmic (and later Lucid if it won't get 5.3) and want to run PHP 5.3 with APC and Memcache, head over to <a href="https://launchpad.net/~alberto-piai/+archive/ppa">Albe's PPA</a>.

Also, I'd like to take the opportunity to thank Albe for his efforts: Having a PPA with real .deb packages as opposed to just my self-compiled mess I would have done gives us a much nicer way of updating existing installations to 5.3 and even a much nicer path back to the original packages once they come out. Thanks a lot.
