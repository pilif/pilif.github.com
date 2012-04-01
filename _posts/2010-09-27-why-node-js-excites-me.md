---
layout: post
title: Why node.js excites me
categories:
- javascript
- opinion
- tempalias
status: publish
type: post
published: true
meta:
  _flattr_btn_disabled: ""
  _flattr_post_hidden: "0"
  _flattr_post_category: text
  _flattr_post_language: en_GB
  _edit_last: "1"
---
Today, on <a href="http://news.ycombinator.com">Hacker News</a>, an article named "<a href="http://www.eflorenzano.com/blog/post/why-node-disappoints-me/">Why node.js disappoints me</a>" appeared - right on the day I returned back from jsconf.eu (awesome conference. Best days of my life, I might add) where I was giving <a href="http://bit.ly/b4gsrL">a talk about using node.js for a real web application</a> that provides real use: <a href="http://tempalias.com">tempalias.com</a>

Time to write a rebuttal, I guess.

The main gripe Eric has with node is a gripe with the libraries that are available. It's not about performance. It's not about ease of deployment, or ease of development. In his opinion, the libraries that are out there at the moment don't provide anything new compared to what already exists.

On that level, I totally agree. The most obvious candidates for development and templating try to mimik what's already out there for other platforms. What's worse: There seems to be no real winner and node itself doesn't seem to make a recommendation or even include something with the base distribution.

<strong>This is inherently a good thing though</strong>. Node.js isn't your complete web development stack. Far from it.

Node is an awesome platform to very easily write very well performing servers. Node is an awesome platform to use for your daily shell scripting needs (allowing you to work in your favorite language even for these tasks). Node isn't about creating awesome websites. It's about giving you the power to easily build servers. Web, DNS, SMTP - we've seen all.

To help you with web servers and probably to show us users how it's done, node also provides a very good library to interact with the HTTP protocol. This isn't about generating web pages. This isn't about URL routing, or MVC or whatever. This is about writing a web server. About interracting with HTTP clients. Or HTTP servers. On the lowest level.

So when comparing node with other platforms, you must be careful to compare apple with apples. Don't compare pure node.js to rails. Compare it to mod_wsgi, to fastcgi, to a servlet container (if you must) or to mod_php (the module that allows a script of yours access to server internals. Not the language) or mod_perl.

In that case, consider this. With node.js you don't worry about performance, you don't worry about global locks (you do worry about never blocking though),<em> and you really, truly and most awesomely don't worry about race conditions</em>.

Assuming
{% highlight javascript %}    var a = 0;
    var f = function(){
        var t = a; // proving a point here. I know it's not needed
        a = t + 1;
    }
    setTimeout(f, 100);
    setTimeout(f, 100);{% endhighlight %}
you'd always end up with a === 2 once both timeouts have executed. There is no interruption between the assignment of t and the increment. No worries about threading. No hours wasted trying to find out why a suddenly (and depending on the load on your system) is either 1, 2 or 3.

In the years we got experience in programming, we learned that what f does in my example above is a bad thing. We feel strange when typing code like this - seeking for any method of locking, of specifying a critical section. <em>With node, there's no need to.</em>

<em>This</em> is why writing servers (remember: highly concurrent access to potentially the same code) is so much fun in node.

The perfect little helpers that were added to deal with the HTTP protocol are just the icing on the cake, but in so many other frameworks (*cough* WSGI *cough*) stuff like chunking, multipart parsing, even just reading the client's data from an input stream are hard if you do them on your own, or completely beyond your control if you let the libraries do them.

With node you get to the knobs to turn in the easiest way possible.

Now we know that we can easily write well performing servers (of any kind with special support for HTTP) in node, so let's build a web site.

In traditional frameworks, your first step would be to select a framework (because the HTTP libraries are so <em>effing</em> (technical term) hard to use).

You'd end up with something lightweight like, say, mnml or werkzeug in python or something more heavy  like rails for ruby (though rack isn't nearly as bad as wsgi) or django for python. You'd add some kind of database abstraction or even ORM layer - maybe something that comes with your framework.

Sure. You could do that in node too. There are frameworks around.

But remember: Node is an awesome tool for you to write highly specialized servers.

Do you need to build your whole site in node?

Do you see this as a black or white situation?

Over the last year, I've done two things.

One is to layout a way how to augment an existing application (PHP, PostgreSQL) with a WebSocket based service using node to greatly reduce the load on the existing application. I didn't have time to implement this yet, but it would work wonders.

The other thing was to prove a point and to implement a whole web application in node.

I built <a href="http://tempalias.com">tempalias.com</a>

At first I fell into the same trap that anybody coming from the "old world" would be falling. I selected what seemed to be the most used web framework (Express) and rolled with that, but I soon found out that I have it all backwards.

I don't want to write the 50iest web application. I wanted to do something else. Something new.

When you look at the <a href="http://github.com/pilif/tempalias">tempalias source code</a> (yeah - the whole service is open source so all of us can learn from it), you'll notice that <em>no single byte of HTML is dynamically generated</em>.

I ripped out Express. I built a RESTful API for the main functionality of the site: Creating aliases. I built a server that does just that and nothing more.

I leveraged all the nice features JavaScript as a language provides me with to build a really cool backend. I used all the power that node provides me with to build a really cool (and simple!) server to web-enable that API (posting and reading JSON to and from the server)

The web client itself is just a client to that API. No single byte of that client is dynamically generated. It's all static files. It's using <a href="http://code.quirkey.com/sammy/">Sammy</a>, <a href="http://jquery.com/">jQuery</a>, HTML and CSS to do its thing, but it doesn't do anything the API I built on node doesn't expose.

Because it's static HTML, I could serve that directly from nginx I'm running in front of node.

But because I wanted the service to be self-contained, I plugged in <a href="http://github.com/felixge/node-paperboy/">node-paperboy</a> to serve the static files from node too.

Paperboy is very special and very, very cool.

It's not trying to replace node's HTTP library. It's not trying to abstract away all the niceties of node's excellent HTTP support. It's not even trying to take over the creation of the actual HTTP server. Paperboy is just a function you call with the request and response object you got as part of node's HTTP support.

Whether you want to call it or not is your decision.

If you want to handle the request, you handle it.

If you don't, you pass it on to paperboy.

Or foobar.

Or whatever.

Node is the UNIX of the tools to build servers with: It provides small dedicated tools that to one task, but truly, utterly excel at doing so.

So the libraries you are looking for are not the huge frameworks that do everything but just the one bit you really need.

You are looking for the excellent small libraries that live the spirit of node. You are looking for libraries that do one thing well. You are looking for libraries like paperboy. And you are relying on the excellent HTTP support to build your own libraries where the need arises.

It's still very early in node's lifetime.

You can't expect everything to be there, ready to use it.

For some cases, that's true. Need a DNS server? You can do that. Need an SMTP daemon? Easy. You can do that. Need a HTTP server that understands the HTTP protocol really well and provides excellent support to add your own functionality? Go for it.

But above all: You want to write your server in a kick-ass language? You want to never have to care about race conditions when reading, modifying and writing to a variable? You want to be sure not to waste hours and hours of work debugging code that looks right but isn't?

Then node is for you.

It's no turnkey solution yet.

It's up to you to make the most out of it. To combine it with something more traditional. Or to build something new, maybe rethinking how you approach the problem. Node can help you to provide an awesome foundation to build upon. It alone will never provide you with a blog in 10 minutes. Supporting libraries don't at this time provide you with that blog.

But they empower you to build it in a way that withstands even the heaviest pounding, that makes the most out of the available resources and above all, they allow you to use your language of choice to do so.

JavaScript.
