---
layout: post
title: Tweaking Mac OS X for the Linux/Windows user
tags:
- Mac
- Unix
status: publish
type: post
published: true
meta: {}

---
<p>As you no doubt know by now, I'm gradually switching over from using Windows to using Mac OS X.</p>
<p>I have quite some experience with using Unix and I'd love to have the power of the command-line combined with the simplicity of a GUI here and then.</p>
<p>OSX provides that advantage to me: For one, I'm getting a very styled and time-tested UI, the ability to run most applications I need (this is where Linux still has some problems) and on the other hand, I'm getting a nice well-known (to me) command line-environment.</p>
<p>Of course, in my process of switching over, I made some tweaks to the system, I'm sure some of my readers may find useful:</p>
<ul>
	<li>Use a useful default shell: I very much prefer <a href="http://www.zsh.org">ZSH</a>, so <tt>chsh -s /bin/zsh</tt> was the first thing I did.</li>
	<li>Use a useful configuration for said shell: I'm using <a href="http://www.lipfi.ch/zshrc">this .zshrc</a>. It configures some options, enables a nice prompt, fixes the delete-key, sets the path and does other small cosmetical things.</li>
	<li>Install the developer tools. They are on your install DVD(s).</li>
	<li>Go and install <a href="http://fink.sf.net">Fink</a>. No UNIX without some GNU utilities and other small tools.  The current source-distribution works perfectly well with the intel macs.</li>
	<li>Fix the <a href="http://macromates.com/blog/archives/2005/07/05/key-bindings-for-switchers/">Home- and End-Keys</a>.</li>
	<li>Tweak the terminal: Open the Window-Settings, chose "Display", use a reasonable cursor (underline) and set your terminal to Latin-1 (I had numerous problems using UTF with ZSH). If you want, enable Anti-Aliasing. Then chose "Color", use the "White on Black" preselection and play with the transparency slider. Use the settings as default.</li>
	<li>Install <a href="http://www.videolan.org">VLC</a> - your solution for every thinkable multimedia need. Watch out to get the Intel nightly if you have an Intel Mac.</li>
	<li>I never use sleep-mode because it feels "wrong" not to shut the machine down completely. That's why I entered <tt>sudo pmset -a hibernatemode 1</tt> to make the "Sleep" option in the Apple-Menu work like Hibernate in Windows.</li>
</ul>
<p>If you are a web developer on an intel mac and consider using PostgreSQL, don't use the <a href="http://www.entropy.ch/software/macosx/postgresql/">premade builds</a> on entropy.ch because they are still built for PPC. You may use the <a href="http://www2.entropy.ch/download/pgsql-startupitem-1.2.pkg.tar.gz">StartupItem</a> which is provided there though. If you do, call PostgreSQL's <tt>configure</tt> like this to get the paths right:</p>
<div><code>./configure --prefix=/usr/local/pgsql --bindir=/usr/local/bin --with-openssl \
            --with-pam --with-perl --with-readline --with-libs=/sw/lib\
            --with-includes=/sw/include
</code></div>
<p>This is after you've installed readline using fink. OS X itself does not come with readline and <tt>psql</tt> without readline sucks.</p>
<p>After installing PostgreSQL with <tt>make install</tt>, the paths are set correctly for the premade StartupItem, which makes PostgreSQL start when you turn on your machine.</p>
<p>Furthermore, I created my own customized PHP-installation (5.1.2) using the following configure line:</p>
<div>
<code>./configure --enable-cli --prefix=/usr/local --with-pear --with-libxml-dir=/sw \
            --with-apxs=/usr/sbin/apxs --enable-soap --with-pgsql=/usr/local/pgsql \
            --with-readline=/sw --with-pdo-pgsql=/usr/local/pgsql --enable-pcntl \
            --with-curl=/usr --enable-ftp --with-gd --with-png-dir=/sw --with-jpeg-dir=/sw \
            --with-zlib-dir=/usr --with-freetype-dir=/usr/X11R6 --with-bz2
</code></div>
<p>Use fink to install <tt>libxml2</tt>, <tt>libjpeg</tt> and <tt>libpng</tt></p>
<p>Using the hints provided here, you'll get a configuration which makes working with the machine <em>much</em> easier for a UNIX/Windows guy. I hope it's of some use for you.</p>
