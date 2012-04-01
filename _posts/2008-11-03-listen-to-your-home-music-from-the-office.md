---
layout: post
title: Listen to your home music from the office
categories:
- Troubleshooting
tags:
- itunes
- Mac
- mp3
- music
- Personal
- Software
- Solutions
- Unix
- vpn
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
My MP3 collection is safely stored on <a href="/2006/07/computers-under-my-command-issue-1-shion/">shion</a>, on a drobo mounted as /nas. Naturally, I want to listen to said music from the office - especially considering my <a href="/2005/05/lots-of-fun-with-openvpn/">fully routed VPN access</a> between the office and my home infrastructure and the upstream which suffices for at least 10 concurrent 128bit streams (boy - technology has changed in the last few years - I remember the times where you couldn't reliably stream 128 bit streams - let alone my 160/320 mp3s).

I've tried many things so far to make this happen:
<ul>
	<li>serve the files with a tool like <a href="http://www.jinzora.org">jinzora</a>. This works, but I don't really like jinzora's web interface and I was never able to get it to work correctly on my Ubuntu box. I was able to trace it down to null bytes read from their tag parser, but the code is very convoluted and practically unreadable without putting quite some effort into that. Considering that I didn't much like the interface in the first place, I didn't want to invest time into that.</li>
	<li>Use a SlimServer (now <a href="http://www.slimdevices.com/pi_features.html">Squeezecenter</a>) with a softsqueeze player. Even though I don't use my squeezebox (an original model with the original slimdevices brand, not the newer Logitech one) any more because the integrated amplifier in the Sonos players works much better for my current setup. This solution worked quite ok, but the audio tends to stutter a bit at the beginning of tracks, indicating some buffering issues.</li>
	<li>Use iTune's integrated library sharing feature. This seemed both undoable and unpractical. Unpractical because it would force me to keep my main mac running all the time and undoable because iTunes sharing can't pass subnet boundaries. Aside of that, it's a wonderful solution as audio doesn't stutter, I already know the interface and access is very quick and convenient.</li>
</ul>
But then I found out how to make the iTunes thing both very much doable and practical.

The network boundary problem can be solved using <a href="http://www.chaoticsoftware.com/ProductPages/NetworkBeacon.html">Network Beacon</a>, a ZeroConf proxy. Start the application, create a new beacon. Chose any service name, use «_daap._tcp.» as service type, set the port number to 3689, enable the host proxy, keep the host name clear and enter the IP address of the system running iTunes (or firefly - see below).

Oh, and the target iTunes refuses to serve out data to machines in different subnets, so to be able to directly access a remote iTunes, you'd also have to set up an SSH tunnel.

Using Network Beacon, ZeroConf quickly begins working across any subnet boundaries.

The next problem was about the fact that I was forced to keep my main workstation running at home. I fixed that with <a href="http://www.fireflymediaserver.org/">Firefly Media Server </a>for which even a pretty recent prebuilt package exists for Ubuntu (apt-get install mt-daapd).

I've installed that, configured iptables to drop packets for port 3689 on the external interface, configured Firefly to use the music share (which basically is a current backup of the itunes library of my main workstation - rsync for the win).

Firefly in this case even detects the existing iTunes playlists (as the music share is just a backup copy of my iTunes library - including the iTunes Library.xml), though smart playists don't work, but can easily be recreated in the firefly web interface.

This means that I can access my complete home mp3 library from the office, stutter free, using an interface I'm well used to, without being forced to keep my main machine running all the time.

And it isn't even that much of a hack and thus easy to rebuild should the need arise.

I'd love to not be forced to do the Network Beacon thing, but avahi doesn't relay ZeroConf information across VPN interfaces.
