---
layout: post
title: A look at Windows Installer
categories:
- Programming
- Software
status: publish
type: post
published: true
meta: {}

---
<p>
Before I begin, let me put this disclaimer: <a href="http://www.gnegg.ch/archives/138-All-time-favourite-Tools.html">I'm biased</a>, so this is maybe not objective, but it's something I wanted to say. And who knows: Maybe you even think the same.
</p>
<p>As you may know, Microsoft would really like to see all software using <a href="http://msdn.microsoft.com/library/default.asp?url=/library/en-us/msi/setup/windows_installer_start_page.asp">Windows Installer</a> for its deployment needs. Windows Installer is a complex piece of technology, evaluating some kind of database that's stored in those .MSI-Files.</p>
<p>Windows 2000 Server and later, namely with its Active Directory, provides the system Administrator with the ability to automatically install and update MSI based applications on the client computers, which definitely is a good thing. Additionally, MSI should provide end users with clean uninstalls, automatical repair and the solutions to <em>COM</em>mon [;-)] problems. Sound's like a good thing, doesn't it?
</p>
<p>It would - if there was not quite a heap of problems associated with Windows Installer</p>
<ul>
 <li>First, the thing is intransparent and <a href="http://www.gnegg.ch/archives/107-Why-o-why-is-my-harddrive-so-small.html">messy</a>.</li>
 <li>I have migrated my user profile to <a href="http://www.gnegg.ch/archives/166-IBM-Thinkpad-42.html">another machine</a>, where not all the software I had on the previous machine has been installed. So the control panel was full of software that was not installed on the machine. Hitting "Remove" caused MSI to request the original installation MSI file (why the heck?) and with me failing to provide it (why should I redownload something just to remove traces of it from my machine if I don't want it in the first place) and hitting "Cancel" removed the entry, but it reappeared when reloading the control panel applet. Cleaning the registry did help, but tell me of an end user capable of doing that.</li>
 <li>Whenever I drop an URL from my Browser to the desktop, MSI pops up and wants to repair some software I've already removed. For this it asks me to provide the path to the original media. Why?</li>
 <li>Creating Update-Packages is a pain in the ass: You have three possibiliteis:
       <ol>
         <li>Create a "full update" which will first uninstall the existing version. That way you have to go great lengths to preserve the user's data because it's not that easy detecting whether the uninstall happens because of the upgrade or just is a normal uninstall. This, I want to add, is the recommended way of updating an application deployed by MSI</li>
         <li>Create some update-package. This often needs quite a bit of hacking to the MSI-File, leading to problems like MSI-Dialogs popping up asking for some files.</li>
        <li>Create a patch-File (.MSP). In MSI pre 3.0 this is a pain in the ass if you want to prevent the user from having the original MSI-File ready. Too bad, MSI 3.0 runs only on Win2k and later</li>
      </ol></li>
</ul>
<p>
Windows Installer is very tightly integrated into the system. Even small problems here and there (non-clean uninstallation or whatever) can cause major problems that are not really fixable. This is not what I call an end-user friendly technology.</p>

<p>And it does not end there: Have you ever tried engineering a MSI-File? You may begin by reading the SDK documentation I linked to above, but you will soon be overwhelmed - the beast is incredibly complex. But with complexity does not come feature-richness. For example, it's impossible to install the .NET framework from an MSI based installation as only one of them may be running at the same time.</p>
<p>Because of this and many other problems, it's the general oppinion to create a self extracting .EXE installing the prerequisities and then passing the control over to the MSI-File which still isn't capable enough to do many things, setup authors today are used to do.</p>
<p>
Big tool Vendors like <a href="http://www.wisesolutions.com">WISE Solutions</a> or <a href="http://www.installshield.com">InstallShield</a> go great lengths to hide the comlexity of MSI and to add features not there in the basic version, while sometimes breaking validity of the generated packages or even the one big advantage of MSI's: Transactional functionality. Thus, taking away the last benefits, MSI may have.</p>
<p>Conventional Installer Tools are availbable for free (<a href="http://www.jrsoftware.org/isinfo.php">InnoSetup</a>, <a href="http://nsis.sourceforge.net/">NSIS</a>) and have a much more pleasant user experience: No silly questions for source packages, no confusing breakage and more.</p>
<p>Of course: Some things those conventional tools will never be able to provide:</p>
<ul>
 <li>Advertized Features (and Shortcuts)</li>
 <li>Automatical Self-Repair</li>
 <li>Advertized Installations (which allow restricted users to install certain packages)
</ul>
<p>But to be honest: Which one of those features provides real value to the end user? I know many people that have installed MS Office, for example and no one of them - absolutely no one has instructed setup to install features on demand - nobody wants to insert the office CD at random events.
</p><p>
In contrast: Everyone I know simply hates those Windows Installer dialogs popping up, requesting the source image. Lukas for example is unable to remove PGP Deskop becuase the uninstaller requires the installer package which can't be provided as it's packaged in a self extracting .EXE using a proprietary format. Simply reinstalling from this .EXE isn't possible either because the extracted MSI detects the existing installation and want's to uninstall but still does not recognize the extracted original MSI. Bad luck.</p>
<p>So in the end MSI looks to me like an administrators thing, but not like a tool making the live easier for the end user. With tools like InnoSetup, I can create an user expirience that even non-tech-savy users understand and that even has no further problems popping up later. Granted: More advanced tasks are better integrated into MSI (Installations per User/Per System), but can be done with the conventional tools, if some thought is put into the installation.</p>
<p>
For now, I will definitely stay with InnoSetup and keep my supporting work focused on real application issues, not wierd MSI problems. For Administrators, installing <a href="http://www.popscan.ch/wholesale.html">PopScan</a> for their users, we provide a detailed documentation describing, which file goes where and what the installer does, thus providing the administrator with the means of either create an MSI (which can be done automatically these days. The result is not optimized, but it does it's job. Combined with our documentation, this can be a real alternative) or use other technologies to deploy the software.</p>
