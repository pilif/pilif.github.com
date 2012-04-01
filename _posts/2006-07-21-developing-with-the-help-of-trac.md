---
layout: post
title: Developing with the help of trac
categories: []

status: publish
type: post
published: true
meta: {}

---
<p><a href="http://trac.edgewall.org/">trac</a> rules.</p>
<p>If you have a small team working on a project that's getting bigger and bigger, if you need a system to track the progress of your project, a system to allow communications within your team in a way that keeps track of what you've talked about, if you need a kick-ass frontend to subversion - if you need anything of that, consider trac.</p>
<p>trac is a web based subversion frontend with the nicest addons: It provides a wiki, some project management features and a bug tracker. One that's actually usable for non-scientists as well (in contrast to bugzilla).</p>
<p>But the tools real strength comes from its networking features: All components are interconnected. You are looking at the svn history and you see links to your bugtracker. You are looking at the bugtracker und you see links to the wiki where you find more information about the bug. And you look at the wiki and you'll find links to individual changesets (SVN revisions). And so on.</p>
<p>All this is very nice in itself, but it's not what really made me write this post. The ease of use is. And the good looks.</p>
<p>The software, once it's running, looks very nice and is very, very easy to use. Some administration tasks require you to pay a visit to the command line, but all everyday tasks can be done from the web interface. In a completely hassle-free way.</p>
<p>No forms too complicated to understand for a normal person to be able to add a bug to the database. No complex customization needed to make these links between the modules work. And no ugly, bloated interface.</p>
<p>If you like the tool so far, be warned though: Installing the thing isn't exactly a piece of cake - at least if you want to integrate it into an existing apache installation. Still: The benefits far outweigh the hassle you have to go through to set the thing up.</p>
<p>Trac really is one nice piece of software.</p>
<p>Oh and in case you haven't noticed. Yepp. We are using it internally to manage our projects. One of them at least.</p>
