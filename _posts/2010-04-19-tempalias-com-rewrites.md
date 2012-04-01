---
layout: post
title: tempalias.com - rewrites
categories:
- tempalias
tags:
- ab
- cache
- Free Software
- http
- nodejs
- Programming
- requests
- rewrite
- Software
- tempalias
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
This is yet another installment in my series of posts about building a web service in node.js. The <a href="/2010/04/tempalias-com-the-cake-is-a-lie/">previous post is here</a>.

Between the last post and current trunk of tempalias, there lie two substantial rewrites of core components of the service. One thing is that I completely misused Object.create() which takes an object to be the prototype of the object you are creating. I was of the wrong opinion that it works like Crockford's object.create() which is creating a clone of the object you are passing.

Also, I learned that only Function objects actually have a prototype.

Not knowing these two things made it impossible to actually deserialize the JSON representation of an alias that was previously stored in redis. This lead to the first rewrite - this time of <a href="http://github.com/pilif/tempalias/blob/master/lib/tempalias.js">lib/tempalias.js</a>. Now aliases work more like standard JS objects and require to be instantiated using the new operator, on the plus side though, they work as expected now.

Speaking of serialization. I learned that in V8 (and Safari)
{% highlight javascript %}isNan(Date.parse( (new Date()).toJSON() )) === true{% endhighlight %}
which, according to the ES5 spec is a bug. The spec states that Date.parse() should be able to parse a string created by Date.doISOStirng() which is what is used by toJSON.

This ended up with me doing an ugly hack (string replacement) and reporting a <a href="http://crbug.com/41754">bug in Chrome</a> (where the bug happens too).

Anyhow. Friday and Saturday I took off the project, but today I was on it again. This time, I was looking into serving static content. This is how we are going to serve the web site after all.

Express does provide a Static plugin, but it's fairly limited in that it doesn't do any client side caching which, even though Node.js is crazy fast, seems imperative to me. Also while allowing you to configure the file system path it should serve static content from, it insists on the static content's URL being /public/whatever, where I would much rather have kept the URL-Space together.

I tried to add If-Modified-Since-support to express' static plugin, but I hit some strange interraction in how express handles the HTTP request that caused some connections to never close - not what I want.

After two hours of investigating, I was looking at a different solution, which leads us to rewrite two:

tempalias trunk now doesn't depend on express any more. Instead, it serves the web service part of the URL space manually and for all the static requests, it uses <a href="http://github.com/felixge/node-paperboy">node-paperboy</a>. paperboy doesn't try to convert node into Rails and it provides nothing but a simple static file handler for your web server which also works completely inside node's standard method for handling web requests.

I prefer this solution by much because express was doing too much in some cases and too little in others: Express tries to somewhat imitate rails or any other web framework in that it not only provides request routing but also template rendering (in HAML and friends). It also abstracts away node's HTTP server module and it does so badly as eveidenced by this strange connection not-quite-ending problem.

On the other hand, it doesn't provide any help if you want to write something that doesn't return text/html.

Personally, if I'm doing a RESTful service anyways, I see no point in doing any server-side HTML generation. I'd much rather write a service that exposes an API at some URL endpoints and then also a static page that uses JavaScript / AJAX to consume said API. This is where express provides next to no help at all.

So if the question is whether to have a huge dependency which fails at some key points and doesn't provide any help with other key points or to have a smaller dependency that handles the stuff I'm not interested in, but otherwise doesn't interfer, I'd much prefer that solution to the first one.

This is why I went with this second rewrite.

Because I was already using a clean MVC separation (the "view" being the JSON I emit in the API - there's no view in the traditional sense yet), the rewrite was quite hassle-free and basically nothing but syntax work.

After completing that, I felt like removing the known issues from my blog post <a href="http://www.gnegg.ch/2010/04/tempalias-com-persistence/">where I was writing about persistence</a>: Alias generation is now race-free and alias length is stored in redis too. The architecture can still be improved in that I'm currently doing two requests to Redis per ALIAS I'm creating (SETNX and SET). By moving stuff around a little bit, I can get away with just the SETNX.

On the other hand, let me show you this picture here:

<a href="http://www.gnegg.ch/wp-content/uploads/2010/04/Screen-shot-2010-04-19-at-00.36.52.png"><img class="aligncenter size-medium wp-image-689" title="Screenshot of ab running" src="http://www.gnegg.ch/wp-content/uploads/2010/04/Screen-shot-2010-04-19-at-00.36.52-168x300.png" alt="Screenshot of ab running in a terminal" width="168" height="300" /></a>Considering that the current solution is already creating 1546 aliases per second at a concurrency of 100 requests, I can probably get away without changing the alias creation code any more.

And in case you ask: The static content is served with 3000 requests per second - again with a concurrency of 100.

Node is fast.

Really.

Tomorrow: Philip learns CSS - I'm already dreading this final step to enlightenment: Creating the HTML/CSS front-end UI according to the awesome design provided by Richard.
