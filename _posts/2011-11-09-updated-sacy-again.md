---
layout: post
title: updated sacy - now with external tools
tags:
- programming
- php
- smarty
- sacy
status: publish
type: post
published: true
---
I've just updated the <a href="https://github.com/pilif/sacy">sacy repository</a> again and tagged a v0.3-beta1 release.

The main feature since yesterday is support for the official compilers and
tools if you can provide them on the target machine.

The drawback is that these things come with hefty dependencies at times (I
don't think you'd find a shared hoster willing to install node.js or Ruby for
you), but if you can provide the tools, you can get some really nice
advantages over the PHP ports of the various compilers:

* the PHP port of sass has [an issue](http://code.google.com/p/phamlp/issues/detail?id=116) that prevents
  @import from working. sacy's build script does patch that, but the way they
  were parsing the file names doesn't inspire confidence in the library. You
  might get a more robust solution by using the official tool.

* uglifier-js is a bit faster than JSMin, produces significantly smaller
  output and comes with a better license (JSMin isn't strictly free software
  as it has this "do no evil" clause)

* coffee script is under very heavy development, so I'd much rather use the
  upstream source than some experimental fun project. So far I haven't seen
  issues with coffeescript-php, but then I haven't been using it much yet.

Absent from the list you'll find less and css minification:

* the PHP native [CSSMin](http://code.google.com/p/cssmin/) is really good and
  there's no single official external tool out that demonstrably better (maybe
  the YUI compressor, but I'm not going to support something that requires me
  to deal with Java)

* [lessphp](http://leafo.net/lessphp/) is very lightweight and yet very full
  featured and very actively developed. It also has a nice advantage over the
  native solution in that the currently released native compiler does not
  support reading its input from STDIN, so if you want to use the official
  less, you have to go with the git HEAD.

Feel free to try this out (and/or send me a patch)!

Oh and by the way: If you want to use uglifier or the original coffee script
and you need node but can't install it, have a look at the 
[static binary](http://pilif.github.com/2011/11/node-to-go/) I created