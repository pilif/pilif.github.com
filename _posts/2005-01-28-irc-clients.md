---
layout: post
title: IRC Clients
tags:
- irc
- nesvideos
- Software
- tas
- Unix
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
When my favourite <a href="http://bisqwit.iki.fi/nesvideos/">game movies site</a> (written about it <a href="http://www.gnegg.ch/archives/94-If-only-I-could-play-like-this.html">here</a> and <a href="http://www.gnegg.ch/archives/142-Console-game-Videos.html">here</a>) went offline last week, I ventured a look into its <a href="irc://irc.freenode.net/nesvideos">IRC channel</a> to find out what's going on.

Chatting with the guys there was so much fun that I deceided that it's time to get into IRC after all (I never really used it before, so I did not really have a big insight into this part of the net)

Soon after this decision, I began learning the ins and outs of IRC and the first thing I did was setting up a bouncer (IRC-proxy - let's you be logged into a channel despite your client machine being offline. Very useful for getting an overview on what happened while you were away). There are quite many available, but the only one that seems to be still maintained is <a href="http://jelmer.vernstok.nl/ctrlproxy/">ctrlproxy</a>

If you plan on using mIRC with it, go and install the current pre-release 2.7pre2. Older versions don't let you connect.

Next was the question which client to use.

While mIRC is nice it has two problems: a) it's single-platform. As I'm constantly using all three of Win/Mac/Linux, a single program would be nice so I don't have to relearn all the shortcuts for each platform. b) It does not look very polished and cannot be made to do so.

<a href="http://www.klient.com">Klient</a> looks much better, but is still single-platform and has problems recognizing the state when reconnecting to the ctrlproxy (it sometimes does not notice that you are already in a channel).

<a href="http://www.visualirc.net/">virc</a> looks better than mirc, but worse than Klient. Plus, it seemed a bit unstable to me. And it was slow displaying the backlog. Very slow. It's single-platform too (and written in Delphi it seems)

<a href="http://irssi.org/">irssi</a> is single-platform too, but I could work around that by running it on our webserver and using <tt>screen</tt>.

A program that warns with
<pre class="code">17:43 -!- Irssi: Looks like this is the first time you've run irssi.
17:43 -!- Irssi: This is just a reminder that you really should go read
17:43 -!- Irssi: startup-HOWTO if you haven't already. You can find it
17:43 -!- Irssi: and more irssi beginner info at http://irssi.org/help/
17:43 -!- Irssi:
17:43 -!- Irssi: For the truly impatient people who don't like any automatic
17:43 -!- Irssi: window creation or closing, just type: /MANUAL-WINDOWS</pre>
before starting it and with no obvious way to exit it (Ctrl-C, quit, exit - neither did work) is something I'm afraid of (quite like <tt>vim</tt>, though I learnt to love that one). So: no-go

Finally I ended up with <a href="http://www.xchat.org/">X-Chat</a>. It looks good, has all features I need, a big userbase, is maintained and is multiplatform after all.

There was this fuss about the windows version becoming shareware, but I can live with that as the tool is very, very good. For supporting it's author, I gladly payed those $20 (I see it as a packaging fee - just like with those linux distributions), though you can get a windows binary for free <a href="http://www.silverex.org/news/">here</a>.

So for me, it's X-Chat. And much fun in <tt>#nesvideos</tt>
