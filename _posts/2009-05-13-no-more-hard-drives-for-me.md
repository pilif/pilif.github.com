---
layout: post
title: No more hard drives for me!
categories:
- Hardware
tags:
- Hardware
- itunes
- Mac
- ssd
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
Last week I noticed that the <a href="http://www.digitec.ch">hardware store of my choice</a> had these fancy new (and fast) Intel SSDs in stock - reason enough for me to go ahead and buy two to try them out in my two MacPro desktop machines. <a href="http://en.wikipedia.org/wiki/KOS-MOS#KOS-MOS">Kos-Mos</a>, my home mac was the first to be converted.

But before that, there was this hardware problem to overcome. See: The SSDs are 2.5 inch drives whereas the MacPro has 3.5 inch slots. While the connectors (SATA) are compatible, the smaller form factor of the Intel drives prevents the usual drive sliders of the MacPro from working.

The solution was to buy <a href="http://www.maxupgrades.com/istore/index.cfm?fuseaction=product.display&amp;product_id=180">one of these adapters</a> for the SSDs. Before doing that, I read about other solutions, some of them involving duct tape, but this felt like it was the cleanest way and it was: The kits fit perfectly, so installing the drive was a real piece of cake.

The next problem was about logistics:
{% highlight bash %}pilif@kosmos /Volumes/Macintosh HD
 % df -h | grep Macintosh
/dev/disk2s2   365Gi  319Gi   46Gi    88%    /Volumes/Macintosh HD{% endhighlight %}
Whereas the largest Intel SSD available to date has just 160GB of capacity (149 "really usable"), so at least<em> some </em>kind of reorganization had to be done.

Seeing that the installation running on the traditional drive was ages old anyways (dating back to the last quarter of 2006), I decided that the sanest way to proceed was to just install another copy of Leopard to the new drive and use that as the boot device, coping over the applications and parts of the user profile I really needed.

Been there, done that.

I didn't do any real benchmark, but boot-time is now <em>sub 10 seconds</em>. Eclipse starts up in <em>sub 5 seconds</em>. The installation of all the updates since the pristine 10.5.1 that was on the DVDs that came with the machine took <em>less than three minutes - including the reboots </em>(I've installed the 10.5.7 update this morning and it took around 10 minutes on the same machine).

And to make things even better: The machine is significantly quieter than before - at least once the old hard drive powers down.

I will never, ever, again use non-SSD drives in any machine I'm working at from now on.

The perceived speedup was as significant as going from 8MB or RAM to 32MB back in the days. The machine basically feels like a new computer.

Of course I ran into one really bad issue:

The idea was to symlink  ~/Music to my old drive because my iTunes Library (mostly due to Podcasts and audio books) was too large to conveniently copy to the SSD. I renamed ~/Music to ~/Music.old, created the symlink and started iTunes for the first time, only to get screwed with an empty library.

According to the preferences though, iTunes did correctly follow the symlink and was pointing to the right path (WTF?). I tried to manually re-add the library folder which did kind of work, but screwed over all my podcasts - completely.

This is where I noticed that somehow iTunes still found ~/Music.old and used that one. A quick ps turned out my best friend, the iTunes helper was running, so I shut that one down and moved ~/Music.old away to /, just to be sure.

Restarted iTunes just to run into the very same problems again (now, this is a serious WTF).

The only way to get this to work was to quit iTunes (that includes killing the helper) and to completely remove all traces of that Music folder.

Now iTunes is finally using the Music folder on my traditional hard drive. This kind of work should not be needed and I seriously wonder what kind of magic was going on behind the scenes there - after killing the helper and renaming the folder, it should not have used it any more.

Still: SSDs are fun. And I would never again want to miss the kind of speed I'm now enjoying.

<a href="http://en.wikipedia.org/wiki/Celes#Celes">celes</a> in the office is next :-)
