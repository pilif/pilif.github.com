---
layout: post
title: eAccelerator
categories: []

status: publish
type: post
published: true
meta: {}

---
<p>Maybe, you remember turck-mmcache, a bytcode-cache for PHP, released under the GNU GPL which was said to be extremely fast.</p>
<p>It's author got employed by Zend (the maker of another bytecode-cache, but a commercial one) and turck-mmcache was lingering around unmaintained since then (about a year ago).</p>
<p>Then PHP5 was released and truck-mmcache stopped working.</p>
<p>Finally, last month, some guys forked the dead mmcache and created <a href="http://eaccelerator.sf.net">eAccelerator</a>, first fixing up the cache and optimizer to work with PHP5</p>
<p>And today, I gave it a shot on our developement-server, just to see, if this magical cache-thing really works.</p>
<p>I run <tt>ab</tt> on one of the most calculating intensive pages of my current project (which makes heavy use of PHP5s new object oriented language features).</p>
<p>Most interesting would be the "Requests per second" value:</p>
<p>Without eAccelerator: Requests per second:    7.89 [#/sec] (mean)
<br />
With eAccelerator: Requests per second:    24.77 [#/sec] (mean)
</p>
<p>Which is a factor 3 speed increase.</p>
<p>Please note that the absolute values are somewhat irrelevant as this server is quite a weak developement server and DB, Application and ab all run on this same machine. Anyway. The relative three-fold speed-increase is quite cool. As soon as I have more confidence in eAccelerator, I think I'm going to deploy it in the productive environement.</p>
<p>Btw: if your are trying this out for yourselves: Your mileage may vary somewhat. The tested application uses quite many classes all separated into different files, so this is a case where a bytecode-cache can help greatly.</p>
