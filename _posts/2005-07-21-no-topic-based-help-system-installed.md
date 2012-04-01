---
layout: post
title: No topic-based help system installed
categories:
- Delphi
- Programming
- Solutions
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
Recently I had to do some Delphi-work again. To my surprise, the online help seemed to have stopped working. I always got this error message:
<blockquote>No topic-based help system installed</blockquote>
Programming without an online help is very tedious and sometimes nearly impossible.

When I had to look up in which Unit <code>TWinControl</code> is declared, I had two possibilities: Either look it up in the source code (Borland ships the full source code to their class library) or fix the help system once and for all.

I deceided to do the latter (searching after TWinControl is no fun).

Googling in the web turned out nothing. In Groups most of the time, the suggestion was to reinstall the whole thing

I absolutely did not have time for this, so I dug deeper.

The problem is caused by the installation of the VS2005 Beta which resets some AppID-GUUID. Afterwards delphi crashes while loading the IDE-package htmlhelp290 which in the end causes delphi to think that there's no help installed

I fixed it doing the following:
<ol>
	<li>Reset the help-viewer-appid. In the registry under HKEY_CLASSES_ROOT\AppID\DExplore.exe, set AppId to  {4A79114D-19E4-11d3-B86B-00C04F79F802}</li>
	<li>In HKEY_CURRENT_USER\Software\Borland\BDS\3.0\Disabled IDE Packages remove the entry for htmlhelp290 that has been created.</li>
	<li>Start Delphi and use the help again</li>
</ol>
What I don't know is if this has a negative effect to VS, but this does not matter for me: I need Delphi to work.

The whole thing is a consequence of the .NET orientation of delphi: Earlier, Delphi was as self-contained as the executables it can build: Drop it into a directory and run it. No problems, no questions asked.

With Delphi integrated into .NET and using .NET-Components, problems begin to rise: First there was a bug in D8 causing it to stop working after .NET 1.1 SP1, now this.

Hopefully, they find a way back to both .NET (for the acceptance in the buzzword-centered world where you can't have a dev-tool not .NET capable) and self-containment.
