---
layout: post
title: Playing Worms Armageddon on a Mac
categories:
- Games
- Mac
- solution
- Solutions
- virtualbox
- virtualization
- worms
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
Last weekend, I had a real blast with the Xbox 360 Arcade version of worms. Even after so many years, this game still rules them all, especially (if not only) in multiplayer mode.

The only drawback of the 360 version is the lack of weapons.

While the provided set is all well, the game is just not the same without the Super Banana Bomb or the Super Sheep.

<a href="http://www.gnegg.ch/wp-content/uploads/2009/04/worms.png"><img class="aligncenter size-full wp-image-547" title="Worms Screenshot" src="http://www.gnegg.ch/wp-content/uploads/2009/04/worms.png" alt="Worms Screenshot" width="464" height="273" /></a>

So this is why I looked for my old Worms Armageddon CD and tried to get it to work on todays hardware.

Making it work under plain Vista was easy enough (get the latest beta patch for armageddon, by the way):

Right-Click the Icon, select the compatibility tab, chose Windows XP, Disable Themes and Desktop composition and run the game with administrative privileges.

You may get away with not using one option or the other, but this one worked consistently.

To be really useful though, I wanted to make the game run under OS X as this is my main environment and I really dislike going through the lengthy booting process that is bootcamp.

I tried the various virtualization solutions around - something that should work seeing that the game doesn't really need much in terms of hardware support.

But unfortunately, this was way harder than anticipated:
<ul>
	<li>The initial try was done using VMWare Fusion which looked very good at first, but failed miserably later on: While I was able to launch (and actually use) the games frontend, the actual game was a flickery mess with no known workaround.</li>
	<li>Parallels failed by displaying a black menu. It was still clickable, but there was nothing on the screen but blackness and a white square border. Googling around a bit led to the idea to set SlowFrontendWorkaround in the registry to 0 which actually made the launcher work, but the game itself crashed consistenly without error message.</li>
</ul>
In the end, I've achieved success using <a href="http://virtualbox.org">VirtualBox</a>. The SlowFrontendWorkaround is still needed to make the launcher work and the mouse helper of the VirtualBox guest tools needs to be disabled (on the Machine menu, the game still runs with the helper enabled, but you won't be able to actually control the mouse pointer consistently), but after that, the game runs flawlessly.

Flickerless and with a decent frame rate. And with sound, of course.

To enable the workaround I talked about, use <a href="http://www.pilif.ch/wormsvboxfix.reg">this .reg file</a>.

Now the slaughter of worms can begin :-)
