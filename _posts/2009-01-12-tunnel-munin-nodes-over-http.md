---
layout: post
title: Tunnel munin nodes over HTTP
categories:
- Free Software
- http
- munin
- Software
- solution
- Solutions
- tunnel
- Unix
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
<a href="/2009/01/monitoring-servers-with-munin/">Last time</a> I've talked about Munin, the one system monitoring tool I feel working well enough for me to actually bother to work with. Harsh words, I know, but the key to every solution is simplicity. And simple Munin is. Simple, but still powerful enough to do everything I would want it to do.

The one problem I had with it is that the querying of remote nodes works over a custom TCP port (4949) which doesn't work behind firewalls.

There are some<a href="http://munin.projects.linpro.no/wiki/MuninSSHTunneling"> SSH tunneling solutions</a> around, but what do you do if even SSH is no option because the remote access method provided to you relies on some kind of VPN technology or access token.

Even if you could keep a long-running VPN connection, it's a very performance intensive solution as it requires resources on the VPN gateway. But this point is moot anyways because nearly all VPNs terminate long running connections. If re-establishing the connection requires physical interaction, then you are basically done here.

This is why I have created a neat little solution which tunnels the munin traffic over HTTP. It works with a local proxy server your munin monitoring process will connect to and a little CGI-script on the remote end.

This will cause multiple HTTP connections per query interval (the proxy uses Keep-Alive though so it's not TCP connections we are talking about - it's just hits in the access.log you'll have to filter out somehow) because it's impossible for a CGI script to keep the connection open and send data both ways - at least not if your server-side is running plain PHP which is the case in the setup I was designing this for.

Aynways - the solution works flawlessly and helps me to monitor a server behind one hell of a firewall <em>and </em>behind a reverse proxy.

You'll find the code <a href="http://github.com/pilif/munin-http-tunnel">here</a> (on GitHub as usual) and some explanation on how to use it <a href="http://github.com/pilif/munin-http-tunnel/tree/master/README.markdown">is here</a>.

Licensed under the MIT license as usual.
