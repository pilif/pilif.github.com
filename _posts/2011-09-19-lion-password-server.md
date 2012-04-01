---
layout: post
title: Lion Server authentication issues
categories:
- solutions
- programming
- macos
- lion
status: publish
type: post
published: true
---
Lately I was having an issue with a Lion Server that refused logins of users stored in OpenDirectory. A quick check of `/var/log/opendirectoryd.log` revealed an issue with the «Password Server»:

    Module: AppleODClient - unable to send command to Password Server - sendmsg() on socket fd 16 failed: Broken pipe (5205)

As this message apparently doesn't appear on Google yet, there's my contribution to solving this.

The fix was to kill -9 the kerberos authentication daemon:

    sudo killall kpasswdd

which in fact didn't help (sometimes [even sudo isn't enough](http://xkcd.com/149/)), so I had to be more persuasive to get rid of the apparently badly hanging process:

    sudo killall -9 kpasswdd

This time the process was really killed and subsequently instantly restarted by launchd.

After that, the problem went away.