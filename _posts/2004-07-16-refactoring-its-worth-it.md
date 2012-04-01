---
layout: post
title: Refactoring - It's worth it
tags:
- Delphi
- Opinions
- Programming
status: publish
type: post
published: true
meta: {}

---
<p>
Just shortly after <a href="http://www.gnegg.ch/archives/146-Refactoring-If-only-Id-had-time.html">complaining</a> about not having time to do some refactoring, I reached a place in my code where it was absolutely impossible to add feature x without cleaning up the mess I created three years ago. And - what's even better: I had the time do really fix it. Cleanly</p>
<p>
What I did was to sit down and recreate the whole module in a new Delphi project. I  knew what features I wanted to have when finished and I somewhat knew the interface I had to comply to. The latter proofed inpractical, so I did some modifications to the interface itself (the thing was hacky too). Redoing the whole module took about a week (it's about downloading stuff, exctracting and then XML-parsing it - everything in a thread while still providing feedback to the main thread), but it was absolutely worth it:</p>
 <ul>
  <li>The code is clean. And with clean I mean so clean that adding further features will still be clean, depite not being needed as the new framework I've created is extremely powerful.</li>
  <li>The thing is fast. Twelve times faster than the old version. I'm processing 7000 datasets in just 20 seconds now (including time needed for downloading and decompressing) which took me four minutes before.</li>
  <li>The thing is more usable. Status reporting to the end user went from nearly nothing to everything the user may need. And she can now cancel the process - of course.</li>
</ul>
<p>A task fully worth of undertaking. I've not been that pleased with my code for quite some time now</p>
