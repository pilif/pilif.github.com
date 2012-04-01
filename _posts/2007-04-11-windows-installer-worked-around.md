---
layout: post
title: Windows Installer - Worked around
tags:
- development
- msi
- Programming
- rant
- windows
status: publish
type: post
published: true
meta: {}

---
<p>I've talked about Windows Installer (the tool that parses these .MSI files) before and I've never really convinced that this technology really does its job. Just have a look at these previous articles: <a href="/archives/107-Why-o-why-is-my-harddrive-so-small.html">Why o why is my hard-drive so small?</a>, <a href="/archives/174-A-look-at-Windows-Installer.html">A look at Windows Installer</a> and <a href="/archives/261-The-myth-of-XCOPY-deployment.html">The myth of XCOPY deployment</a></p>
<p>Yesterday I had a look at the Delphi 2007 installation process and it dawned me that I'm going to have to write yet another blog entry.</p>
<p>It's my gut-feeling that 80% of all bigger software packages in Windows can't live with MSIs default feature set and they have to work around inherent flaws in the design of that tool. Here's what I found installers doing (in increasing order of stupidity):</p>
<ol>
    <li>Use a .EXE-stub to install the MSI engine. These days this really doesn't make sense any more as 99% of all windows installation already have MSI installed and the ones that don't, you don't want to support anyways (Windows Update requires MSI).</li>
    <li>Use a .EXE-stub that checks for availability and thereafter installs a bunch of prerequisites - sometimes even <em>other MSI packages</em>. This isn't caused by MSI-files unable to detect the presence of prerequisites - it's because MSI-files are unable to install other MSI files and the workaround (using merge packages) doesn't work because most of the third party libraries to install don't come as merge packages.</li>
    <li>Create a MSI-file which contains a traditional .EXE-Setup, unpack that to a temporary location and run it. This is what I call the "I want a Windows-Logo, but have no clue how to author MSI files"-type of installation (and I completely understand the motivation behind that) which just defeats all the purposes MSI files ever had. Still: Due to inherent limitations in the MSI engine, this is often times the only way to go.</li>
    <li>Create MSI-files that extract a vendor specific DLL, a setup script and all files to deploy (or even just an archive) and then use that vendor specific DLL to run the install script. This is what InstallShield does at least some of the time. This is another version of the "I have no clue how to author a MSI file"-installation with the additional "benefit" of being totally vendor-locked.</li>
    <li>Create a custom installer that installs all files and registry keys and then launch the windows installer with a temporary .MSI-file to register your installation work in the MSI-installer. This is what Delphi 2007 does. I feel this is another workaround for Microsoft's policy that only MSI-driven software can get a windows-logo, but this time it's vendor-locked and totally unnecessary and I'm not even sure if such a behavior is consistent with any kind of specification.</li>
</ol>
<p>Only a small minority of installations really use pure MSI and these installations usually are installations of small software packages and as my previous articles show: The technology is far from fool-proof. While I see that Windows should provide a generalized means for driving software installations, MSI can't be the solution as evidenced by the majority of packages using workarounds to get by the inherent flaws of the technology.</p>
<p>*sigh*</p>
