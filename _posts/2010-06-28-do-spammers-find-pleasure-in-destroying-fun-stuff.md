---
layout: post
title: Do spammers find pleasure in destroying fun stuff?
tags:
- mail
- Personal
- Programming
- rbl
- Software
- Solutions
- spam
- tempalias
status: publish
type: post
published: true
meta:
  _edit_last: "1"
  _wp_old_slug: ""
---
Recently, while reading through the log file of the mail relay used by <a href="http://tempalias.com">tempalias</a>, I noticed a disturbing trend: Apparently, SPAM was being sent through tempalias.

I've seen various behaviours. One was to strangely create an alias per second to the same target and then delivering email there.

While I completely fail to understand this scheme, the other one was even more disturbing: Bots were registering {max-usage: 1, days: null} aliases and then sending one mail to them - probably to get around RBL checks they'd hit when sending SPAM directly.

Aside of the fact that I do not want to be helping spammers, this also posed a technical issue: node.js head which I was running back when I developed the service tended to leak memory at times forcing me to restart the service here and then.

Now the additional huge load created by the bots forced me to do that way more often than I wanted to. Of course, the old code didn't run on current node any more.

Hence I had to take tempalias down for maintenance.

<a href="http://www.gnegg.ch/wp-content/uploads/2010/06/tempalias-down.png"><img class="aligncenter size-medium wp-image-747" title="tempalias-down" src="http://www.gnegg.ch/wp-content/uploads/2010/06/tempalias-down-300x188.png" alt="" width="300" height="188" /></a>

A quick look at <a href="http://github.com/pilif/tempalias/commits/master">my commits on GitHub</a> will show you what I have done:
<ul>
	<li>the tempalias SMTP daemon now does RBL checks and immediately disconnects if the connected host is listed.</li>
	<li>the tempalias HTTP daemon also does RBL checks on alias creation, but it doesn't check the various DUL lists as the most likely alias creators are most certainly listed in a DUL</li>
	<li>Per IP, aliases can only be generated every 30 seconds.</li>
</ul>
This should be some help. In addition, right now, the mail relay is configured to skip sender-checks and <a href="http://marc.merlins.org/linux/exim/sa.html">sa-exim</a> scans (Spam Assassin on SMTP time as to reject spam before even accepting it into the system) for hosts where relaying is allowed. I intend to change that so that sa-exim and sender verify is done regardless if the connecting host is the tempalias proxy.

Looking at the mail log, I've seen the spam count drop to near-zero, so I'm happy, but I know that this is just a temporary victory. Spammers will find ways around the current protection and I'll have to think of something else (I do have some options, but I don't want to pre-announce them here for obvious reasons).

On a more happy note: During maintenance I also fixed a few issues with the Bookmarklet which should now do a better job at not coloring all text fields green eventually and at using the target site's jQuery if available.
