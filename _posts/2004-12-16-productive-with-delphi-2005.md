---
layout: post
title: Productive with Delphi 2005
categories:
- Delphi
status: publish
type: post
published: true
meta: {}

---
<p>Yesterday and today, I finally had the opportunity to do some real work on PopScan with Delphi 2005. Here's what I really like besides the <a href="http://www.gnegg.ch/archives/204-Delphi-2005.html">obvious</a>:</p>
<ul>
 <li>Those <tt>.bdsproj</tt>-Files are incredibly useful. They replace the old DSK and DOF-Files, have a convenient XML-format and are the new project file, you open with in Delphi. This is very nice as the old project file (.dpr) is actually program code and does not contain any project metadata. This is what those .dof and .dsk-Files where used for, but I never understood which setting is in which and the format has not been XML either. So this consolidation really is convinient.</li>
 <li>The history-feature really saved my day. With me hitting Ctrl-S on nearly every line I write, the older .~pas-approach wasn't very useful and CVS was no help either because I don't commit as often as something could go wrong in the code. </li>
 <li>The new exception catching-dialog of the debugger is really nice. I like this "Dont halt on this exception again"-Checkbox.</li>
 <li>While it makes the application significantly slower under the debugger, the new "event log" is great.</li>
 <li>Speaking of debugging: The "Local Variables"-Window is great too.</li>
 <li>Delphi now distinguishes between a "Default Layout" and a "Debug Layout". You can configure both of them as you like and Delphi automatically switches between them. This is much more intuitive than before.</li>
 <li>Maybe I'm the only person on earth, but I like the single-window-approch: It's much cleaner than before. No more tons of clutter on the screen and the important screens are always wisible. No more Ctrl-Alt-F11 either.</li>
</ul>
<p>Additionally, I don't have as much speed problems as others seem to have: While starting the IDE takes it's time, working with Delphi when it's open goes quite smoothly.</p>
<p>My only problem is opening the form designer. This definitely takes too long, but not long enough for me to switch back to the undocked layout.</p>
<p>Memory usage is of no concern to me. I have 1 GB of RAM and even after a day of using delphi, my Thinkpad remains responsive even though not only delphi, but also eclipse, Zend Studio, Firefox and many other programs are running. For me the figure the task manager tells me is not nearly as important as the responsiveness. If delphi uses 500 MB of RAM, fine - as long as my PC stays responsive.</p>
<p>All in all, I really like this new Delphi and I already have uninstalled D7 (thus <a href="http://www.bradsoft.com/forums/shwmessage.aspx?ForumID=1&MessageID=7482">breaking FeedDaemon</a>).</p>
