---
layout: post
title: Ruby on Rails
tags:
- Free Software
status: publish
type: post
published: true
meta: {}

---
<p>Today, our first project done in Ruby on Rails went live.</p>
<p>Christoph has done a wonderful job on it. The only thing I had to do was to fix up some CSS buglets in IE and install a deployment environement (developement was done using the Rails-integrated WEBRick server)</p>
<p>Personally, I think I'd have preferred using <a href="http://www.lighttpd.net/">LightTPD</a> with FastCGI instead of Apache, but the current setup pretty much prevented me from doing so.</p>
<p>Which is why I've installed mod_fastcgi on apache which was very, very easy on <a href="http://www.gentoo.org">Gentoo</a> (<tt>emerge mod_fastcgi</tt> - as usual).</p>
<p>Once I've corrected the interpreter path in <tt>dispatch.fcgi</tt> (which was set to the location of Christophs developement environment), the thing began working quite nicely.</p>
<p>And fast.</p>
<p>Considering the incredible amount of magic rails does behind the scenes, those 73.15 requests per second I got are very, very impressive (<tt>ab -n 100 -c 5</tt>). And actually so much faster than a comparable PHP application running using mod_php on a little faster server (19.36 req/s, same ab call).</p>
<p>The results have to be taken with a grain of salt as it's different machines, different load and a different application.</p>
<p>But it's similar enough to be comparable for me: the PHP application is running on a framework somewhat similar to rails with lesser optimization but also with lesser complexity. Both benchmarks ran against the unauthenticated start page which comes pretty much down to including some files and rendering a template. No relevant database queries.</p>
<p>I wonder how much of this higher speed is caused by FastCGI (a very convincing technology) instead of running the code in the apache server itself and how much is just rails being faster.</p>
<p>I will set up a test environement which is better defined to actually allow an accurate performance comparison: Comparable application in mod_php, php-fastcgi and rails-fastcgi. And if I have time, I'm going to run the two fastcgi-tests on LightTPD aswell.</p>
<p>Benchmarking is fun. Time-consuming, but fun.</p>
<p>For now, I'm content with the knowledge that an application that took a very small effort to write (even considering that Christoph had to learn the rails environment first) is running fast enough for its intended purpose.</p>
<p>As Christoph said: Rails Rules</p>
<p><em>thanks, guys</em></p>
