---
layout: post
title: Broken by design
tags:
- Free Software
- harmony
- homecinema
- Unix
- Usability
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
The concept sounds nice: To control all the various remote controllable devices you accumulate in your home cinema, why not just use one programmable remote? With enough intelligence, I would even be able to do much more than provide some way of switching personality.

I mean: Press one button and you have a remote for your receiver, press another and it'll be for your media center, but losing its receiver functionality.

Why not put it in "Media Mode" where it controls the volume by sending commands the receiver understands while still providing full navigation support for your media center.

Logitech's <a href="http://www.logitech.com/index.cfm/remotes/universal_remotes">Harmony family</a> promises to provide that functionality.

Unfortunately, it's broken by design as
<ul>
	<li>it tries to be intelligent while it is completely stupid. For example, I can add a "Music Player"-Functionality, with the intention of it sending commands to a Squeezebox, but as soon as you add a media center, it insists to use that to play music without a way to change that.</li>
	<li>The web based programming interface is awful. It forces you through multi step assistants, each time reloading the (ugly) pages, asking questions which could easily be placed on one screen.</li>
	<li>It only works on Mac and Windows (no Linux support)</li>
</ul>
Especially the first point rendered this interesting concept completely unusable for me.

Now, Engadget just had <a href="http://www.engadget.com/2008/05/05/concordance-enables-logitech-harmony-programming-in-unix-linux/">an article</a> about project <a href="http://www.phildev.net/harmony/">Concordance</a>, a free software project allowing to access the functionality (the whole functionality) from any UNIX machine using a command line tool, while also providing a library (with Perl and Python bindings) for us to write a useful GUI for.

I can't wait to try this out as this easily circumvents the awful UI and may actually provide me with means to make Harmony work for my setup.

Also, it's a real shame to see a very interesting project be made completely unusable by bad UI design.
