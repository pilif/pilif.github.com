---
layout: post
title: tempalias.com - learning CSS
tags:
- css
- html
- Programming
- Software
- tempalias
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
This is one more episode in the development diary outlining the creation of a node.js based web service. You can <a href="/2010/04/tempalias-com-sysadmin-work/">read the previous installment here</a>.

Today I could finally start with creating the HTML and CSS that will become the web frontend of the tempalias.com site. On Sunday, when I initially wanted to start, I was <a href="/2010/04/tempalias-com-rewrites/">hindered</a> by strangeness and overengineering of the express framework and yesterday it was general breakage in the redis client library for node.

But today I had no excuse and I started doing the HTML and CSS work with the intention of converting Richard's awesome Photoshop designs into real-world HTML.

My main issue with this task: <strong>I plain don't know CSS</strong>. Of course I know the syntax and how it should work in general, but there's a huge difference between being able to read the syntax and writing basic code and actually being able to understand all the minor details and tricks that make it possible to achieve what you want in a reasonable time frame.

In contrast to real programming languages where you are usually developing for one target (sure - there might be plattform differences, but even nowaways, while learning, you can get away with restricting yourself to one plattform), HTML and CSS provide the additional difficulty that you have to develop for multiple moving targets, all of which containing different subtle bugs.

Combine that with the fact that more than basic CSS definitely isn't part of my daily work and you'll understand why I was struggling.

In the end I seem to have gotten into the thinking that's needed to make elements appear in the general vicinity of where you suppose they should end up. I even got used to the IMHO very non-intuitive way of having margin and border be part of the elements dimensions in addition to their padding so all the pixel calculations fell into place and the whole thing looks more or less acceptable.

Until you begin changing the text size of course. But there's so much manual pixel painting involved in the various backgrounds (gradient support isn't quite there yet  - even in browsers) that it's probably impossible to create a really well-scaling layout anyways, so what I currently have is what I'm content with.

You want to have a peek?

I didn't upload anything to the public site yet because there's no functionality and I wouldn't want to confuse users reaching the site by accident, so a screenshot will have to do. Or you clone <a href="http://github.com/pilif/tempalias">my repository on github</a> and run it yourself.

Here it is:

<a href="http://www.gnegg.ch/wp-content/uploads/2010/04/Screen-shot-2010-04-21-at-00.25.40.png"><img class="aligncenter size-medium wp-image-700" title="tempalias HTML running in Chrome" src="http://www.gnegg.ch/wp-content/uploads/2010/04/Screen-shot-2010-04-21-at-00.25.40-297x300.png" alt="Screenshot of tempalias HTML running in Chrome" width="297" height="300" /></a>

The really tricky thing and conversely the thing I'm really the most proud of is the alignment of both the spy and the reflection of the main page content. You witness some really creative margin- and background positioning at work there. Oh. And I just don't want to know in what glorious ways the non-browser IE butchers this layout.

I. just. plain. don't. care. This is supposed to be a FUNproject.

Tomorrow: Hooking in Sammy to add links to all the static pages.

It looks now as if we are going live this week :-)
