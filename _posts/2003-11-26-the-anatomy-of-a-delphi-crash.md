---
layout: post
title: The anatomy of a delphi crash
categories:
- Programming
- Software
status: publish
type: post
published: true
meta: {}

---
Delphi has the habit of crashing on exit from time to time. This time it was quite resourceful in finidng different styles of error-messages:

<center>
<img alt="Harmless" src="http://www.gnegg.ch/archives/1harmless.png" width="399" height="126" border="0" />
<i>Quite ordinary</i>


<img alt="Overlay" src="http://www.gnegg.ch/archives/2overlay.png" width="399" height="126" border="0" />
<i>Overlay</i>


<img alt="Transparent" src="http://www.gnegg.ch/archives/3transparent.png" width="399" height="126" border="0" />
<i>Transparent</i>


<img alt="Captionless" src="http://www.gnegg.ch/archives/4captionless.png" width="399" height="126" border="0" />
And finally: <i>Captionless</i>
</center>

New messages popped out just after closing the previous one with "OK". Finally I had to close the <tt>delphi32.exe</tt> process using the Task Manager. Delphi would be the perfect piece of software if only it'd be more stable.
