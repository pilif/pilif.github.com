---
layout: post
title: Responding to search-strings
tags:
- Delphi
- Programming
status: publish
type: post
published: true
meta: {}

---
I've just looked at the logs of this webserver and - under the search strings used to find this page, found this: <blockquote>delphi cannot debug anymore</blockquote>It happens that tough I have not written about this particular topic, I certainly have some hints to this fellow searcher (although, they possibly come to late now):

<ul>
 <li>Have you compiled your project with debug information? (Project/Options/Compiler).</li>
 <li>Have you rebuilt your project after changing above settings?</li>
 <li>Do your files by any chance have Unix-Lineendings? If so, the debugger won't work</li>
 <li>Have you restarted your PC? Sometimes this works too.</li>
</ul>

I'm quite sure there are more things that could make the debugger unusable, but unfortunatly I can't currently think of any more of them. Maybe becuase just the ones listed above are common enough that I remeber them? Delphi is very nice, but sometimes it can be <a href="http://www.gnegg.ch/archives/70-The-anatomy-of-a-delphi-crash.html">so unstable</a><br /><br />
