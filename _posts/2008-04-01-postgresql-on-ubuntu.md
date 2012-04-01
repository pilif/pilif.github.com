---
layout: post
title: PostgreSQL on Ubuntu
categories:
- Free Software
- gentoo
- postgres
- solution
- Solutions
- ubuntu
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
Today, it was time to provision another virtual machine. While I'm a large fan of <a href="http://www.gnetoo.org">Gentoo</a>, there were some reasons that made me decide to gradually start switching over to Ubuntu Linux for our servers:
<ul>
	<li>One of the large advantages of Gentoo is that it's possible to get bleeding edge packages. Or at least you are supposed to. Lately, it's taking longer and longer for an ebuild of an updated version to finally become available. Take PostgreSQL for example: It took about 8 months for 8.2 to become available and it looks like history is repeating itself for 8.3</li>
	<li>It seems like there are more flamewars than real development going on in Gentoo-Land lately (which in the end leads to above problems)</li>
	<li>Sometimes, init-scripts and stuff changes over time and there is not always a clear upgrade-path. <tt>emerge -u</tt> world once, then forget to <tt>etc-update</tt> and on next reboot, hell will break loose.</li>
	<li>Installing a new system takes ages due to the manual installation process. I'm not saying it's hard. It's just time-intensive</li>
</ul>
Earlier, the advantage of having current packages greatly outweighted the issues coming with Gentoo, but lately, due to the current state of the project, it's taking longer and longer for packages to become available. So that advantage fades away, leaving me with only the disadvantages.

So at least for now, I'm sorry to say, Gentoo has outlived it's usefulness on my productive servers and has been replaced by Ubuntu, which albeit not being bleeding-edge with packages, at least provides a very clean update-path and is installed quickly.

But back to the topic which is the installation of PostgreSQL on Ubuntu.

(it's ironic, btw, that Postgres 8.3 actually is in the current hardy beta, together with a framework to concurrently use multiple versions whereas it's still nowhere to be seen for Gentoo. Granted: An experimental overlay exists, but that's mainly untested and I had some headaches installing it on a dev machine)

After installing the packages, you may wonder how to get it running. At least I wondered.
<pre class="code">/etc/init.d/postgresql-8.3 start</pre>
did nothing (not very nice a thing to do, btw). initdb wasn't in the path. This was a real WTF moment for me and I assumed some problem in the package installation.

But in the end, it turned out to be an (underdocumented) feature: Ubuntu comes with a really nice framework to keep multiple versions of PostgreSQL running at the same time. And it comes with scripts helping to set up that configuration.

So what I had to do was to create a cluster with
<pre class="code">pg_createcluster --lc-collate=de_CH --lc-ctype=de_CH -e utf-8 8.3 main</pre>
(your settings my vary - especially the locale settings)

Then it worked flawlessly.

I do have some issues with this process though:
<ul>
	<li>it's underdocumented. Good thing I speak perl and bash, so I could use the source to figure this out.</li>
	<li>in contrast to about every other package in Ubuntu, the default installation does not come with a working installation. You have to manually create the cluster after installing the packages</li>
	<li>pg_createcluster --help bails out with an error</li>
	<li>I had /var/lib/postgresql on its own partition and forgot to remount it after a reboot which caused the init-script to fail with a couple of uninitialized value errors in perl itself. This should be handeled cleaner.</li>
</ul>
Still. It's a nice configuration scheme and a real progress from gentoo. The only thing left for me now is to report these issues to the bugtracker and hope to see this fixed eventually. And it it isn't, there is this post here to remind me and my visitors.
