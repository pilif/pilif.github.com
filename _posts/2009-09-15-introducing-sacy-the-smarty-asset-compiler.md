---
layout: post
title: Introducing sacy, the Smarty Asset Compiler
categories:
- Programming
tags:
- Free Software
- PHP
- Programming
- Solutions
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
We all know how beneficial to the performance of a web application it can be to serve assets like CSS files and JavaScript files in larger chunks as opposed to smaller ones.

The main reason behind this is the latency incurring from requesting a resource from the server plus the additional bandwidth of the request metadata which can grow quite large when you take cookies into account.

But knowing this, we also want to keep files separate during development to help us with the debugging and development process. We also want the deployment to not increase too much in difficulty, so we naturally dislike solutions that require additional scripts to run at deployment time.

And we certainly don't want to mess with the client-side caching that HTTP provides.

And maybe we're using Smarty and PHP.

So this is where <a href="http://github.com/pilif/sacy">sacy</a>, the <a href="http://github.com/pilif/sacy">Smarty Asset Compiler</a> plugin comes in.

The only thing (besides a one-time configuration of the plugin) you have to do during development is to wrap all your &lt;link&gt;-Tags with {asset_compile}....{/asset_compile} and the plugin will do everything else for you, where everything includes:
<ul>
	<li>automatic detection of actually linked files</li>
	<li>automatic detection of changed files</li>
	<li>automatic minimizing of linked files</li>
	<li>compilation of all linked files into one big file</li>
	<li>linking that big file for your clients to consume. Because the file is still served by your webserver, there's no need for complicated handling of client-side caching methods (ETag, If-Modified-Since and friends): Your webserver does all that for you.</li>
	<li>Because the cached file gets a new URL every time any of the corresponding source files change, you can be sure that requesting clients will retrieve the correct, up-to-date version of your assets.</li>
	<li>sacy handles concurrency, without even blocking while one process is writing the compiled file (and of course without corrputing said file).</li>
</ul>
sacy is released under the MIT license and ready to be used (though it currently only handles CSS files and ignores the media-attribute - stuff I'm going to change over the next few days).

Interested? Visit the <a href="http://github.com/pilif/sacy">project's page on GitHub</a> or even better, fork it and help improving it!
