---
layout: post
title: Profiling PHP with Xdebug and KCacheGrind
categories:
- Free Software
- PHP
- Programming
status: publish
type: post
published: true
meta: {}

---
<a class='serendipity_image_link' href='/uploads/kcachegrind.png'><img width='110' height='91' border='0'  hspace="5" align='left' src='/uploads/kcachegrind.serendipityThumb.png' alt='' /></a>
<p>Profiling can provide real revelations.</p>
<p>Sometimes, you have that gut feeling that a certain code path is the performance bottleneck. Then you go ahead and fix that only to see, that the code is still slow.</p>
<p>This is when a profiler kicks in: It helps you determine the <em>real</em> bottlenecks, so you can start fixing <em>them</em></p>
<p>The PHP IDE I'm currently using, Zend Studio (it's the only PHP IDE filling <a href="http://www.gnegg.ch/archives/255-On-the-search-of-a-text-editor.html">my requirements</a> on the Mac currently) does have a built-in profiler, but it's a real bitch to set up.</p>
<p>You need to install some binary component into your web server. Then the IDE should be able to debug and profile your application.</p>
<p>Emphasis on "should".</p>
<p>I got it to work once, but it broke soon after and I never really felt inclined to put more effort into this - even more so as I'm from time to time working with a snapshot version of PHP for which the provided binary component may not work at all.</p>
<p>There's an open source solution that works much better both in terms of information you can get out of it and in terms of ease of setup and use.</p>
<p>It's <a href="http://www.xdebug.org">Xdebug</a>.</p>
<p>On gentoo, installing is a matter of <tt>emerge dev-php5/xdebug</tt> and on other systems, <tt>pear install xdebug</tt> might do the trick.</p>
<p>Configuration is easy too.</p>
<p>Xdebug generates profiling information in the same format as <a href="http://valgrind.org/">valgrind</a>, the incredible debugger the KDE people created.</p>
<p>And once you have that profiling information, you can use a tool like <a href="http://kcachegrind.sourceforge.net/cgi-bin/show.cgi">KCacheGrind</a> to evaluate the data you've collected.</p>
<p>The tool provides some incredibly useful views of your code, making finding performance problems a joyful experience.</p>
<p>Best of all though is that I was able to compile KCacheGrind along with its dependencies on my MacBook Pro - another big advantage of having a real UNIX backend on your desktop.</p>
<p>By the way: Xdebug also is a debugger for PHP, though I've never used it for that as I never felt the need to step through PHP code. Because you don't have to compile it, you are often faster by instrumenting the code and just running the thing - especially once the code is spreading over a multitude of files.</p>
