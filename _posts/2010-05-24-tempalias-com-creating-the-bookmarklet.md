---
layout: post
title: tempalias.com - creating the bookmarklet
categories:
- tempalias
tags:
- javascript
- jquery
- nodejs
- tempalias
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
Now that the bookmarklet feature is finished, let me take a few minutes to reflect on its creation, in the spirit of continuing the development diary.

The reason for the long silence after the launch is, believe it or not, the weather: Over the time I made the initial tempalias service, I began to really enjoy taking my 17inch MacBook Pro outside on the balcony and write code from there. In fact, I enjoyed it so much that I really wanted to continue that tradition when doing more work on the site.

Unfortunately from May first until May 21st it was raining constantly which made coding on the balcony kind of no-fun to do.

Now the weather was great and I could finish what I began way earlier.

So. How does one create a bookmarklet?

I didn't know much either, but in the end, the essence of a bookmarklet is JavaScript code that gets executed in the context of the page you are on when you are executing it. So that's something to work with.

Of course, you don't want to add <strong>all</strong> the code you need for your magic to work into that link target - that would be unmaintainable and there's some risk of breakage once the link gets too big - who knows at what size of the script browsers begin cutting off the code.

So you basically do nothing but creating a script tag sourcing the real script. This is what I'm doing too - the non-minified version of that code is in <a href="http://github.com/pilif/tempalias/blob/master/util/bookmarklet_launcher_test.js">util/bookmarklet_launcher_test.js</a>.

Looking at that file, you'll notice that the bookmarklet itself is configurable using that c variable (keeping the names short to keep the code as short as possible). The configuration is done on the results page that is shown once the alias has been generated (<a href="http://github.com/pilif/tempalias/blob/master/public/templates/result.template#L32">public/templates/result.template</a>).

Why the host name? Because the script that is injected (<a href="http://github.com/pilif/tempalias/blob/master/public/bookmarklet.js">public/bookmarklet.js</a>) doesn't know it - when it's sourced, window.location would still point to the site it was sourced on. The script is static code, so the server can't inject the correct host name either - in fact, all of tempalias is static code aside of that one RESTful endpoint (/aliases).

This is a blessing as it keeps the code clean and a curse as it makes stuff harder than usual at places - this time it's just the passing around of the host name (which I don't want to hard-code for easier deployment and development).

The next thing of note is how the heavy lifting script is doing its work: Because the DOM manipulation and event-hooking up needed to make this work is too hard for my patience, I decided that I wanted to use jQuery.

But the script is running in the context of the target site (where the form field should be filled out), so we neither can be sure that jQuery is available nor should we blindly load it.

So the script is really careful:
<ul>
	<li>if jQuery is available and of version 1.4.2, that one is used.</li>
	<li>If jQuery is available, but not of version 1.4.2, we load our own (well - the official one from Google's CDN) and use that, while restoring the old jQuery to the site.</li>
	<li>If jQuery is not available, we load our own, restoring window.$ if it pointed to something beforehand.</li>
</ul>
This procedure would never work if jQuery wasn't as careful as it is not to pollute the global namespace - juggling two values (window.$ and window.jQuery) is possible - anything more is breakage waiting to happen.

The last thing we need to take care of, finally, is the fact that the bookmarklet is now running in the context of the target site and, hence, cannot do AJAX requests to tempalias.com any more. This is what JSONp was invented for and I had to slightly modify the node backend to make JSONp work for the bookmarklet script (this would be commit <a href="http://github.com/pilif/tempalias/commit/1a6e8c0faca7826b8a49f2ba99faa3d3702f10bd">1a6e8c</a> - not something I'm proud of - tempalias_http.js needs some modularization now).

All in all, this was an interesting experience between cross domain restrictions and trying to be a good citizen on the target page. Also I'm sure the new knowledge will be of use in the future for similar projects.

Unfortunately, the weather is getting bad again, so the next few features will, again, have to wait. Ideas for the future are:
<ul>
	<li>use tempalias.com as MX and CNAME as to create your own aliases for our own domain</li>
	<li>create an iphone / android client app for the REST API (/aliases)</li>
	<li>daemonize the main code on its own without the help of some shell magic</li>
	<li>maybe find a way to still hook some minimal dynamic content generation into paperboy.</li>
</ul>
