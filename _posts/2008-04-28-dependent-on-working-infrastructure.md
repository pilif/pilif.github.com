---
layout: post
title: Dependent on working infrastructure
tags:
- bug
- Free Software
- lighttpd
- Programming
- Software
- sysadmin
- webdev
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
If you create and later deploy and run a web application, then you are dependent on a working infrastructure: You need a working web server, you need a working application server and in most cases, you'll need a working database server.

Also, you'd want a solution that always and consistently works.

We've been using lighttpd/FastCGI/PHP for our deployment needs lately. I've preferred this to apache due to the easier configuration possible with lighty (out of the box automated virtual hosting for example), the potentially higher performance (due to long-running FastCGI processes) and the smaller amount of memory consumed by lighttpd.

But last week, I had to learn the price of walking off the beaten path (Apache, mod_php).

In one particular constellation, the lighty, fastcgi, php combination, running on a Gentoo box sometimes (read: 50% of the time) a certain script didn't output all the data it should have. Instead, lighty randomly sent out RST packets. This without any indication of what could be wrong in any of the involved log files.

Naturally, I looked everywhere.

I read the source code of PHP. I've created reduced test cases. I've tried workarounds.

The problem didn't go away until I tested the same script with Apache.

This is where I'm getting pragmatic: I depend on a working infrastructure. I need it to work. Our customers need it to work. I don't care who is to blame. Is it PHP? Is it lighty? Is it Gentoo? Is it the ISP (though it would have to be on the senders end as I've seen the described failure with different ISPs)?

I don't care.

My interest is in developing a web application. Not in deploying one. Not really, anyways.

I'm willing (<a href="/2007/07/php-stream-filters-bzip2compress/">and able</a>) to fix bugs in my development environment. I may even be able to fix bugs in my deployment platform. But I'm certainly not willing to. Not if there is a competing platform that works.

So after quite some time with lighty and fastcgi, it's back to Apache. The prospect of having a consistently working backed largely outweighs the theoretical benefits of memory savings, I'm afraid.
