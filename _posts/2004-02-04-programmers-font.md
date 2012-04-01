---
layout: post
title: Programmers Font
categories:
- Programming
- Solutions
status: publish
type: post
published: true
meta: {}

---
When writing code here and then, you usually use a monospaced font for better alignment of the characters. The default in Windows is Courier New which is quite readable, but its characters are a bit wide.

My favourite so far has been Lucida Console which comes with Windows XP and maybe Microsoft Office. The fonts characters are a bit less wide than those in Courier New. This is my default-font in <a href="http://www.google.com/url?sa=U&start=1&q=http://www.chiark.greenend.org.uk/~sgtatham/putty/&e=7415">Putty</a> as it's very readable (for a monospaced font) and doesn't use as much space as Courier does.

Somewhere on the web, I came across <a href="http://www.tobias-jung.de/seekingprofont/">ProFont</a> which is a modified version of Monaco, the mac users have as default monospaced font. ProFont is optimized to be used by programmers, can be set to a very small size (lots of code visible without scrolling) and is very very readable.

On the page you'll find a bitmap and a truetype version. The latter looks quite badly on Windows XP with ClearType and the former doesn't work in Java-Applications. Unfortunatly <a href="http://www.jedit.org">jEdit</a> is indeed written in Java, so I have to use the TT variant.

Then again, Delphi and Putty are not written in Java, so I want to use the bitmap version.

Unfortunatly, it's not possible to install both fonts at the same time as the are both named the same, so the TT version always wins.

My solution: I've opened the bitmap-font with a hex editor and changed all ocurrences of <tt>ProFontWindows</tt> to something else which finally allowed me to install both fonts at the same time.

Get the hacked version <a href="/files/profont.zip">here</a>. Note that I've only hacked the fontname. All its copyright belong to the author of the page above.
