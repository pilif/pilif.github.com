---
layout: post
title: Snow Leopard and PHP
tags:
- Mac
- PHP
- snow leopard
- Software
- Solutions
- Unix
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
Earlier versions of Mac OS X always had pretty outdated versions of PHP in their default installation, so what you usually did was to go to <a href="http://www.entropy.ch">entropy.ch</a> and fetch the packages provided there.

Now, after updating to Snow Leopard you'll notice that the entropy configuration has been removed and once you add it back in, you'll see Apache segfaulting and some missing symbol errors.

Entropy has not updated the packages to snow leopard yet, so you could have a look at PHP that came with stock snow leopard: This time it's even bleeding edge: Snow Leopard comes with PHP 5.3.0.

Unfortunately though, some vital extensions are missing, most notably for me, the PostgeSQL extension.

This time around though, Snow Leopard comes with a functioning PHP development toolset, so there's nothing stopping you to build it yourself, so here's how to get the official PostgreSQL extension working on Snow Leopard's stock php:
<ol>
	<li>Make sure that you have installed the current Xcode Tools. You'll need a working compiler for this.</li>
	<li>Make sure that you have installed PostgreSQL and know where it is on your machine. In my case, I've used the <a href="http://www.enterprisedb.com/products/pgdownload.do#osx">One-click installer</a> from EnterpriseDB (which persisted the update to 10.6).</li>
	<li>Now that Snow Leopard uses a full 64bit userspace, we'll have to make sure that the PostgreSQL client library is available as a 64 bit binary - or even better, as an universal binary.Unfortunately, that's not the case with the one-click installer, so we'll have to fix that first:
<ol>
	<li>Download the sources of the PostgreSQL version you have installed from postgresql.org</li>
	<li>Open a terminal and use the following commands:
{% highlight bash %}% tar xjf postgresql-[version].tar.bz2
% cd postgresql-[version]
% CFLAGS="-arch i386 -arch x86_64" ./configure --prefix=/usr/local/mypostgres
% make{% endhighlight %}
make will fail sooner or later because you the postgres build scripts can't handle building an universal binary server, but the compile will progress enough for us to now build libpq. Let's do this:
{% highlight bash %}% make -C src/interfaces
% sudo make -C src/interfaces install
% make -C src/include
% sudo make -C src/include install
% make -C src/bin
% sudo make -C src/bin install
{% endhighlight %}
</li>
</ol>
</li>
	<li>Download the php 5.3.0 source code from their website. I used the bzipped version.</li>
	<li>Open your Terminal and cd to the location of the download. Then use the following commands:
{% highlight bash %}% tar -xjf php-5.3.0.tar.bz2
% cd php-5.3.0/ext/pgsql
% phpize
% ./configure --with-pgsql=/usr/local/mypostgres
% make -j8 # in case of one of these nice 8 core macs :p
% sudo make install
% cd /etc
% cp php.ini-default php.ini{% endhighlight %}
</li>
	<li>Now edit your new php.ini and add the line <code>extension=pgsql.so</code></li>
</ol>
And that's it. Restart Apache (using apachectl or the System Preferences) and you'll have PostgreSQL support.

All in all this is a tedious process and it's the price us early adopters have to pay constantly.

If you want an honest recommendation on how to run PHP with PostgreSQL support on Snow Leopard, I'd say: Don't. Wait for the various 3rd party packages to get updated.
