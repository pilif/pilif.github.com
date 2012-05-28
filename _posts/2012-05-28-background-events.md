---
layout: post
title: background events
categories:
- programming
tags:
- programming
- popscan
- coffeescript
- javscript
- node
status: publish
type: post
published: true
---

Today is the day that one of the coolest things I had the pleasure to
develop so far in my life has gone live to production use.

One installation of [PopScan](http://www.popscan.com) is connected to
a SAP system that had at times really bad performance and yet it
needed to be connected even just to query for price information.

This is a problem because of features like our persistent shopping
basket or the users templates which cause a lot of products to be
displayed at once.

Up until now, PopScan synchronously queried for the prices and would
not render any products until all the product data has been assembled.

When you combine this with the sometimes bad performance of that SAP
system, you'll quickly see unhappy users waiting for the pages to
finally load.

We decided to fix this problem for the users.

Aside of the price, all product data is in PopScan's database anyways, so
while we need to wait for prices, everything else, we could display
immediately.

So that's what we do now: Whenever we load products and we don't have a price
yet, we'll launch a background job which asynchronously retrieves the prices.
The frontend will immediately get the rendered products minus the prices.

But of course, we still need to show the user the fully loaded products once
they become available and this is where the cool server based event framework
comes into play:

The JS client in PopScan now gets notified on arbitrary events that can happen
on the server (like "product data loaded", but also "GPRS scaner data
received"). The cool thing about this is that events are seemingly pushed
through instantly as they happen on the server giving the user the immediate
response they would want and lessening the load on the server as there's no
(well. only long-) polling going on.

{% highlight javascript %}
$(ServerEvents).bind('product-data', function(data){
    // product data has changed!
}
{% endhighlight %}

is all that we need on the client. The rest happens automatically.

Also remember though that PopScan is often used in technology-hostile
enterprise environments. Thus, features like web-sockets are out and in
general, we had to support ancient software all over the place.

We still managed to make it work and today this framework went to production
use for that one customer with the badly performing SAP system.

Over the course of the next few weeks, I might write in detail about how this
stuff works given the constratins (ancient client-software behind hostile
firewalls) and what software components we used.

Seeing this work go life fills me with joy: I've spend to many hours designing
this framework in a fool-proof way in order to not lose events and in order to
gracefully continue working as components in the big picture die.

Now it's finally live and already contributing to lower waiting times for all
users.
