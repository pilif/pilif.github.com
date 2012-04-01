---
layout: post
title: The best bittorrent client
categories:
- Software
status: publish
type: post
published: true
meta: {}

---
<p>
I have been looking for a decent <a href="http://bitconjurer.org/BitTorrent/">Bittorrent</a>-Client.
</p><p>
While the official one is quite nice for not-that-large files, its disadvantage of not being able to limit the upstream-bandwidth becomes deadly with large files: All connections I currently have access to for running bittorrent have a much smaller upstream than downstream and a saturated upstream will eventually kill off the downstream (as you most likely already know)
</p><p>
So I went looking and here's what I found so far:
</p>
<ul>
 <li><a href="http://ei.kefro.st/projects/btclient/">BitTorrent EXPERIMENTAL download client</a>: quite similar to the official client, but with the desired upload-limiting-feature. Unfortunatly quite out of date. I haven't tried it out because of that.</li>
 <li><a href="http://pingpong-abc.sourceforge.net/">ABC [ Yet Another Bittorrent Client ]</a>: written in Python - supports more than one torrent in one application window. While it has quite a decent feature set, it has a terribly geeky user interface (not necessarily a bad thing) ande it crashed on me about four times in just 12 hours, so I can't really recommend it</li>
 <li><a href="http://azureus.sourceforge.net/">Azureus</a>: Written in Java, but nice-looking (thanks to SWT), fast and with an extremely comprehensive feature-set. I can't just say a lot about its stability - the featureset (especially the cool graphs) have amazed me so much that I deceided to post this entry here...</li>
</ul>
<p>
Azureus is now about the third Java-Application I know of that not only works, but works so well that I recommend it over native counterparts (the other ones being <a href="http://www.jedit.org">jEdit</a> and <a href="http://www.eclipse.org">Eclipse</a>).
</p><p>
 I really think it's time to rethink the "java-is-crap-for-the-desktop" saying that was so incredibly popular the old days. Actually I do think that Java slowly begins to become a real alternative.
</p><p>
I mean: If you just stop thinking about the difficult (for end users) installation of the JRE and the (till now) slow speed, Java indeed has some advantages which make it <em>the</em> tool for desktop developement: It's platform independent (ok... nearly - at least the major ones are supported), it's (quite) easy to work with (I don't like it very much myself, but it's definitely much easier to work with than C, for example) and it has a very convinient memory management which makes it a bit more secure than your standard C-application (speaking of Buffer Overflows for example).
</p><p>
 In short: It's the optimal toolset to build applications for the desktop where a lot of features, fast developement and high security (unconcerned users, not admins are working with the software) are the key to success.
</p><p>
I really think that the big time for Java is just coming, not fading away.
</p>
