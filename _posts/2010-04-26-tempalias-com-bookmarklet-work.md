---
layout: post
title: tempalias.com - bookmarklet work
tags:
- bookmarklet
- javascript
- jquery
- Programming
- Software
- tempalias
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
While the user experience on tempalias.com is already really streamlined, compared to other services that encode the expiration settings and sometimes even the target) into the email address (and are thus exploitable and in some cases requiring you to have an account with them), it loses in that, when you have to register on some site, you will have to open the tempalias.com website in its own window and then manually create the alias.

Wouldn't it be nice if this worked without having to visit the site?

This video is showing how I want this to work and how the <a href="http://github.com/pilif/tempalias/tree/bookmarklet">bookmarklet branch</a> on the github project page is already working:

<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="505" height="410" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0"><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="src" value="http://vimeo.com/moogaloop.swf?clip_id=11193192&amp;server=vimeo.com&amp;show_title=1&amp;show_byline=0&amp;show_portrait=0&amp;color=00ADEF&amp;fullscreen=1" /><embed type="application/x-shockwave-flash" width="505" height="410" src="http://vimeo.com/moogaloop.swf?clip_id=11193192&amp;server=vimeo.com&amp;show_title=1&amp;show_byline=0&amp;show_portrait=0&amp;color=00ADEF&amp;fullscreen=1" allowscriptaccess="always" allowfullscreen="true"></embed></object>

The workflow will be that you create your first (and probably only) alias manually. In the confirmation screen, you will be presented with a bookmarklet that you can drag to your bookmark bar and that will generate more aliases like the one just generated. This works independently of cookies or user accounts, so it would even work across browsers if you are synchronizing bookmarks between machines.

The actual bookmarklet is just a very small stub that will contain all the configuration for alias creation (so the actual bookmarklet will be the minified version of <a href="http://github.com/pilif/tempalias/blob/bookmarklet/util/bookmarklet_launcher_test.js">this file here</a>). The bookmarklet, when executed will add a script tag to the page that actually does the heavy lifting.

The <a href="http://github.com/pilif/tempalias/blob/bookmarklet/public/bookmarklet.js">script</a> that's running in the video above tries really hard to be a good citizen as it's run in the context of a third party webpage beyond my control:
<ul>
	<li>it doesn't pollute the global namespace. It has to add one function, window.$__tempalias_com,  so it doesn't reload all the script if you click the bookmark button multiple times.</li>
	<li>while it depends on jQuery (I'm not doing this in pure DOM), it tries really hard to be a good citizen:
<ul>
	<li>if jQuery 1.4.2 is already used on the site, it uses that.</li>
	<li>if any other jQuery version is installed, it loads 1.4.2 but restores window.jQuery to what it was before.</li>
	<li>if no jQuery is installed, it loads 1.4.2</li>
	<li>In all cases, it calls jQuery.noConflict if $ is bound to anything.</li>
</ul>
</li>
	<li>All DOM manipulation uses really unique class names and event namespaces</li>
</ul>
While implementing, I noticed that you can't unbind live events with just their name, so $().die('.ta') didn't work an I had to provide all events I'm live-binding to. I'm using live here because the bubbling up delegation model works better in a case where there might be many matching elements on any particular page.

Now the next step will be to add some design to the whole thing and then it can go live.
