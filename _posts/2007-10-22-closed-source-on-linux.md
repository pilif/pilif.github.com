---
layout: post
title: Closed Source on Linux
tags:
- distributions
- Free Software
- linux
- Opinions
- patching
- Unix
- upstream
status: publish
type: post
published: true
meta: {}

---
<p>One of the developers behind the Linux port of the new Flex Builder for Linux has a blog post about how building <a href="http://www.swaroopch.com/archives/2007/10/22/closed-for-business/">closed source software for linux is hard</a></p>
<p>Mostly, all the problems boil down to the fact that Linux distributors keep patching the upstream source to fit their needs which clearly is a problem rooted in the fact that open source software is, well, open sourced.</p>
<p>Don't get me wrong. I love the concepts behind free software and in fact, every piece of software I've written so far has been open source (aside of most of the code I'm doing for my eployer of course). I just don't see why every distribution feels the urgue to patch around upstream code, especially as this issue applies to both open- and closed source software projects.</p>
<p>And worse yet: Every distribution adds their own bits and pieces - sometimes doing the same stuff in different ways and thus making it impossible or at least very hard for a third party to create add-ons for a certain package.</p>
<p>What good is a plugin system if the interface works slightly different on each and every distribution?</p>
<p>And think of the time you waste learning configuration files over and over again. To make an example: Some time ago, SuSE delivered an apache server that was using a completely customized configuration file layout, thereby breaking every tutorial and documentation written out there because none of the directives where in the files they are supposed to be.</p>
<p>Other packages are deliberately broken up. Bind for example often comes in two flavors: The server and the client, even though officially, you just get one package. Additionally, every library package these days is broken up in the real library and the development headers. Sometimes the source of these packages may even get patched to support such breaking up.</p>
<p>This creates an incredible mess for all involved parties:</p>
<ul>
	<li>The upstream developer gets blamed for bugs she didn't cause because they were introduced by the packager.</li>
	<li>Third party developers can't rely on their plugins or whatever pluggable components to work across distributions if they work upstream</li>
	<li>Distributions have to do the same work over and over again as new upstream versions are released, thus wasting time better used for other improvements.</li>
	<li>End users suffer from the general disability of reliably installing precompiled third-party binaries (mysql recommends the use of their binaries, so this even affects open sourced software) and from the inability to follow online-tutorials not written for the particular distribution that's in use.</li>
</ul>
<p>This mess must come to an end.</p>
<p>Unfortunately, I don't know how.</p>
<p>You see: Not all patches created by distributions get merged upstream. Sometimes, political issues <a href="http://kohei.us/2007/10/02/history-of-calc-solver/">prevent a cool feature from being merged</a>, sometimes clear bugs are not recognized as such upstream and sometimes <a href="http://kohei.us/2007/10/02/history-of-calc-solver/">upstream is dead</a> - you get the idea.</p>
<p>Solution like FHS and LSB tried to standardize many aspects of how linux distributions should work in the hope of solving this problem. Bureaucracy and <a href="http://blog.koehntopp.de/archives/860-Webanwendungen-und-der-FHS.html">idiotic ideas</a> (german link, I'm sorry) are causing quite the bunch of problems lately, making it hard to impossible to implement the standards. And often the standards don't specify the latest and greatest parts of current technology.</p>
<p>Personally, I'm hoping that we'll either end up with one big distribution defining the "state of the art", with the others being 100% compatible or with distributions switching to pure upstream releases with only their own tools custom-made.</p>
<p>What do you think? What has to change in your opinion?</p>
