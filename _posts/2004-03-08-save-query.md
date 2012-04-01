---
layout: post
title: Save query
tags:
- Usability
status: publish
type: post
published: true
meta: {}

---
By the way: The Gnome guys are the ones trying to simplify everything by removing "interface bloat", if I remeber correctly.

Then please explain me what this "If you don't save changes from <strong>the last 23 seconds</strong> will be definitively lost" in <a href="http://www.gnegg.ch/archives/gedit_save.jpg">this</a> dialog box has to say? I mean tracking this value costs a little bit of performance, putting it on this message uses valuable screen real estate and thus makes the dialog less readable and finally the thing has no real value.

What if I've opened the editor an hour ago to enter some temporary text snippet and then forgot it and now that I've finished working I'm closing my apps down.

The counter would be insanely high, suggesting a lot of unsaved changes which is neither correct nor are the changes valuable.

What if I've fixed a important bug in my program code by just changing one line which takes me about two seconds to do. Now the counter would be low but the changes would be very significant.

What I want to say: This counter has no real-world value. It's just a geeky thing. Not that I don't like geeky things, but adding geeky bloated things to a GNOME application seems quite hypocritical.

Doing something like: "You have quite a lot of unsaved changes in this document. Are you really sure?" (appearing depending of the real size of the changes, not the time you used editing) would be friendlier and more useful but - of course - would mean an even bigger overhead for tracking it.

But then again: I think, this message is read about once. Every later time, the user knows what it says and presses the buttons without reading. So it would seen to be better just letting the message be static so the user is not forced to re-read a semantically unchanged message - assuming her sub-conscience detects the slightly different look of the familiar looking dialog and thus causing it to be actively re-read.

PS: Please don't get me wrong about this nit-picking: GNOME and KDE both are great projects. Both have their problems and both have their unique solutions. This just sprung to my eye and whenever I find something in any other app I surely will write about it.
