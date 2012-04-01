---
layout: post
title: The price of abstraction
tags:
- Opinions
- Programming
status: publish
type: post
published: true
meta: {}

---
<p>
<a href="http://www.osnews.com/story.php?news_id=7324">This article</a> was featured on Slashdot today. It's about the current state-of-the-art Linux-Desktop being quite demanding in Hardware - even more demanding than the arc-nemesis Windows XP.</p>
<p>And it's true.</p>
<p>I see one of the problems in the basics of the Unix philosophy: Use small tools to do a specific task and another in the OpenSource-Philosophy: Write clean code.</p>
<p>These two approaches create wonderful architectures and abstractions of small tools doing their work.
</p><p>What nobody seems to recognize: This so wonderful and well thought-out architecture is bloated per se.  Let's say you are playing a Video-File in a KDE-Video-Player running in KDE. This is what's running on your system to acomplish this task (I hope I get all the (bigger) components really running - maybe there are more (or less) of them):
</p>
<ul>
 <li>Linux Kernel</li>
 <li>KDE-Sound-Server</li>
 <li>X-Window-Server (complete with un-used network transparency which would not work with the video anyway</li>
 <li>The whole QT-Library</li>
  <li>Some basic KDE-Abstractions (kdelibs)</li>
  <li>Your media player</li>
</ul>
<p>
Every one component ist cleanly seperated from each other - every one can be replaced without disturbing other components. Every one is designed cleanly using many abstractions to provide this replacability even for internal components.</p>
<p>But it get's even more complicated: Many of the acting components are independant processes which creates the need for quite a bit of IPC wich is always slower than direct calls.</p>
<p>No wonder this is slow!</p>
<p>In Windows for example quite a lot of the stuff described above is actually running in the kernel or at least very close to it, maybe using undocumented interfaces to the kernel.
</p><p> Playing a video mostly depends on DirectX which uses mostly in-process calls. It's dirty, it's unstable (maybe), but it's fast, doesn't flicker and happens to just work (the less independant components involved, the less can go wrong).</p>
<p>Of course that's not how software should be written. It's how it <em>is</em> written when fast and impressive resuslts are requested.</p>
