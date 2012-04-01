---
layout: post
title: Debugging
tags:
- Delphi
- Personal
- Programming
status: publish
type: post
published: true
meta: {}

---
<p>
Debugging can be so much fun if you just know how to entertain yourself while doing it. I've taken the screenshot below when I did some debugging on a stupid AV and finally found why it happens. Then I've added a <a href="http://www.gexperts.org">Gexperts</a> Debug-Statement to visualize whether I was right.
</p>
<div align="center">
<img alt="debug_fun.png" src="http://www.gnegg.ch/archives/debug_fun.png" width="261" height="211" border="0" />
</div>
<p>
It seems, I was.... Talk about programs not knowing when it's time to die. If only Delphi itself could tell me before it's crashing...
</p>
<p>
 (read the thing from bottom to top: 19:00 'till 19:02 I was debugging and the app was crashing. Then I found the problem, added the debug-statement which checks for a NULL-Pointer and outputs the message if there's indeed one of them and at 19:02:42 I ran the thing again and it warned me that it's going to crash. At 19:05:46 it was fixed)
</p>
