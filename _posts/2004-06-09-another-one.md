---
layout: post
title: Another one...
categories:
- Usability
status: publish
type: post
published: true
meta: {}

---
<p>
Now that bluetooth-support gets integrated into the Windows OS, I thought, maybe Logitech created a new driver for it's diNovo Package that does not <a href="http://www.gnegg.ch/archives/72-Fun-with-Logitech.html">insist</a> in the Logitech Hub being installed.
</p><p>This time the driver did not complain about the hub not being installed, so maybe this is a good sign (I have not rebooted yet), but the installer presented me with this screenshot which has such a bad wording that it's worth blogging about:</p>
<div align="center">
<a href="http://www.gnegg.ch/archives/setpoint.html" onclick="window.open('http://www.gnegg.ch/archives/setpoint.html','popup','width=504,height=260,scrollbars=no,resizable=no,toolbar=no,directories=no,location=no,menubar=no,status=no,left=0,top=0'); return false"><img src="http://www.gnegg.ch/archives/setpoint-thumb.png" width="320" height="165" border="0" /></a><br />(I cut out some empty space at the bottom and created red overlays to highlight my point)
</div>
<p>This thing not only has one flaw, it has many:</p>
<ul>
 <li>The text speaks about check boxes, but there are radio buttons</li>
 <li>The text suggest it's possible to select more than one item in the list below. It isn't</li>
  <li>There is no way to install Keyboard, Tackball <b>and</b> mice support</li>
  <li>I don't have a trackball plugged for now - the option is still there</li>
  <li>The list is extremely badly readable as it combines options to install in one point: "Keyboard and Mouse". The approach with Checkboxes would be much easier to understand</li>
</ul>
<p>A fix would be to actually do what the text says: Use Checkboxes. If it's not possible to install both mice and trackball drivers (why is that so? Older drivers did not have that limitation), uncheck the other box, or even better, create one Checkbox and two radio buttons:</p>
<pre>
 Please chose what drivers to install:

 [ ] Keyboard
 ( ) Mouse
 ( ) Trackball
</pre>
<p>The problem is that the used installer (<a href="http://www.installshield.com">InstallShield</a>) is extremely bloated and though it has the features necessary to create a dialog like the one I described above, it's that complicated that a seperate developer is needed just for the installer and often there's  no time to do that.</p>
<p>Which leads to me finding <a href="http://support.installshield.com/kb/view.asp?articleid=Q105444">this</a> even more hypocritical than it already is - even more so that the Installer the end user sees is not by InstallShield, but by the respective developer - the final installer is as good as it's created, not as the tool creating it</p>
<p>If you ask me what a good installer may be, I'll answer <a href="http://www.jrsoftware.org">InnoSetup</a>. It's small, simple, fast and extremely powerful.</p>
