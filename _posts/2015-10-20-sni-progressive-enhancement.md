---
layout: post
title: SNI progressive enhancment
categories:
- networking
- ssl
- internet
tags:
- networking
- ssl
- internet
status: publish
type: post
published: false
---

Today marks another big milestone in the availabilibty of ubuquitous SSL encryption: The «Let's Encrypt» project [got their cross-signature](https://letsencrypt.org/2015/10/19/lets-encrypt-is-trusted.html), so come a few more weeks, they will be ready for the public to use.

However, with an unlimited amount of available free SSL certificates, we get another problem: Because back in the day nobody thought about name based virtual hosting, the initial implementation of SSL didn't support the client telling the server what host it's trying to connect to. This means that the server didn't know what certificate to present when multiple host names were to be used for the same address.

This meant that for every site you wanted to offer over SSL, you needed an IP address, which are harder to get as time moves on and we're running out of them. 

«[SNI](https://en.wikipedia.org/wiki/Server_Name_Indication)» is a protocol extension that allows the client to tell the server the host-name it's connecting to, so the server can chose the correct certificate to serve. This fixes above issue and finally allows virtual hosting based on the host name even over SSL.

Unfortunately, SNI isn't as widely supported as we'd like: Older Android devices and all IEs under Windows XP (which still is a sizeable portion of our users) dont' support SNI.

What's also tricky is that you don't know a client doesn't support SNI until it's too late: They connect to your port 443, don't send a host name and now the server needs to a) answer and b) send a server certificate. So unless the client accidentally hit the correct host name, the client will get a certificate mismatch and it will thus display the usual SSL error message.

This is of course not very good UX as you don't even get to tell the user what's wrong before they see the browser-specific error message.

However, I still want to support SSL for all my sites wherever I can. If I could have non-SNI-supporting clients on an unencrypted site and then adding encryption only if they support SNI, then encryption would become a progressive enhancement. The sites I'm dealing with aren't that far in the «needs encryption» territory, so offering encryption only for good (read: non-outdated) browsers is a viable option, especially as I want to offer this for free for the sites I'm hosting and I only have so many IP addresses at my disposal right now.

Generally, the advice to do that is to [do user agent sniffing](http://serverfault.com/a/389818) but that's error-prone. I'd much rather feature detect.

So after a bit of thinking, I came up with this (it requires JS though):

* Over port 80, serve the normal site unencrypted instead of just redirecting to https.
* On that regular site do a jsonp request for some beacon file on your site over https. 
* If that beacon loads properly, then your client is obviously SNI compliant, so redirect to the https version of your site using JS.
* If the beacon doesn't load, then the browser probably doesn't support SNI, so keep them on the unencrypted page. If you want to, you can set a cookie to prevent further probing on subsequent requests.
* On port 443, serve a [HSTS header](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security), so next time the browser visits, they'll use HTTPS from the start.

IE8 will still show the page correctly but also show a warning that it has blocked content for your own security, so you might want to immediately redirect again (with the cookie set) in order to get rid of the warning.

Contrary to the normal immediate redirect to HTTPS, this means that the first page-view even of compliant browsers will be unencrypted, so absolutely make sure that you serve all your cookies with the `secure` flag. This also means that in order to get to the encrypted version of the page, you need JavaScript enabled - at least for the first time.

Maybe you can come up with some crazy hack using frames, but this method seems to be the cleanest.
