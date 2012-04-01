---
layout: post
title: tempalias.com - sysadmin work
categories:
- Free Software
- iptables
- linux
- nodejs
- Programming
- redis
- sysadmin
- tempalias
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
This is yet another episode in the development diary behind the creation of a new web service. <a href="/2010/04/tempalias-com-rewrites/">Read the previous installment here</a>.

Now that I<a href="/2010/04/tempalias-com-the-cake-is-a-lie/"> made the SMTP proxy do its thing</a> and that I'm <a href="/2010/04/tempalias-com-rewrites/">able to serve out static files</a>, I though it was time to actually set up the future production environment so that I can give it some more real-world testing and to check the general stability of the solution when exposed to the internet.

So I went ahead and set up a new VM using Ubuntu Lucid beta, running the latest (HEAD) redis and node and finally made it run the tempalias daemons (which I consolidated into one opening SMTP and HTTP ports at the same time for easier handling).

I always knew that deployment will be something of a problem to tackle. SMTP needs to run on port 25 (if you intend to be running on the machine listed as MX) and HTTP should run on port 80.

Both being sub 1024 in consequence require root privileges to listen on and I definitely didn't want to run the first ever node.js code I've written to run with root privileges (even though it's a VM - I don't like to hand out free root on a machine that's connected to the internet).

So additional infrastructure was needed and here's what I came up with:

The tempalias web server listens only on localhost on port 8080. A reverse <a href="http://nginx.org/">nginx</a> proxy listens on public port 80 and forwards the requests (all of them - node is easily fast enough to serve the static content). This solves another issue I had which is HTTP content compression: Providing compression (Content-Encoding: gzip) is imperative these days and yet not something I want to implement myself in my web application server.

Having the reverse proxy is a tremendous help as it can handle the more advanced webserver tasks - like compression.

I quickly noticed though that the stable nginx release provided with Ubuntu Lucid didn't seem to be willing to actually do the compression despite it being turned on. A bit of experimentation revealed that stable nginx, when comparing content-types for <code>gzip_types</code> checks the full response content-type including the charset header.

As node-paperboy adds the ";charset: UTF-8" to all requests it serves, the default setting didn't compress. Thankfully though, nginx could live with
<pre>gzip_types "text/javascript; charset: UTF-8" "text/html; charset: UTF-8"</pre>
so that settled the compression issue.

<strong>Update:</strong> of course it should be "charset<strong>=</strong>UTF-8" instread of "charset: UTF-8" - with the equal sign, nginx actually compresses correctly. My patch to paperboy has since been accepted by upstream, so you won't have to deal with this hassle.

Next was SMTP. As we are already an SMTP proxy and there are no further advantages of having incoming connections proxied further (no compression or anything), I wanted clients to somehow directly connect to the node daemon.

I quickly learned that even the most awesome iptables setup won't make the Linux kernel accept on the <code>lo</code> interface anything that didn't originate from <code>lo</code>, so no amount of NATing allows you to redirect a packet from a public interface to the local interface.

Hence I went by reconfiguring the SMTP server component of tempalias to listen on all interfaces, port 2525 and then redirect the port of packets on the public port from 25 to 2525.

This of course left the port 2525 open on the public interface which I don't like.

A quickly created iptables rule rejecting (as opposed to dropping - I don't want a casual port scanner to know that iptables magic is going on) any traffic going to 2525 also dropped the redirected traffic which of course wasn't much help.

In comes the MARK extension. Here's what I've done:
{% highlight bash %}# mark packets going to port 25
iptables -t mangle -A PREROUTING -i eth0 -p tcp --dport 25 -j MARK --set-mark 99

# redirect packets going to port 25 to 2525
iptables -t nat -A PREROUTING -p tcp -i eth0 --dport 25 -j REDIRECT --to-ports 2525

# drop all incoming packets to 2525 which are not marked
iptables -A INPUT -i eth0 -p tcp --dport 2525 -m mark ! --mark 99 -j REJECT{% endhighlight %}
So. Now the host responds on public port 25 (but not on public port 2525).

Next step was to configure DNS and tell Richard to create himself an alias using
{% highlight bash %}curl --no-keepalive -H "Content-Type: application/json" \
     --data-binary '{"target":"t@example.com","days": 3,"max-usage": 5}' \
     -qsS http://tempalias.com/aliases{% endhighlight %}
(yes. you too can do that right now - it's live baby!)

Of course it blew up the moment the redis connection timed out, taking the whole node server with it.

Which was the topic of yesterdays coding session: The redis-node-client library is very brittle what connection tracking and keeping is concerned. I needed something quick, so I hacked the library to provide an additional very explicit connection management method.

Then I began discussing the issues I was having with redis-node-client's author. He's such a nice guy and we had one hell of a nice discussion which is still ongoing, so I will probably have to rewrite the backend code once more once we found out how to do this the right way.

Between all that sysadmin and library-fixing time, unfortunately, I didn't yet have time to do all too much on the public facing website: <a href="http://tempalias.com">http://tempalias.com</a> at this point contains nothing but a gradient. But it's a really nice gradient. One of the best.

Today: More redis-node-client hacking (provided I get another answer from fictorial) or finally some real HTML/CSS work (which I'm not looking forward to).

This is taking shape.
