---
layout: post
title: Why o why is my harddrive so small?
tags:
- Programming
status: publish
type: post
published: true
meta: {}

---
<p>
I have the whole windows profile on its own NTFS-Partition that I've mounted to the "Documents and Settings"-Folder, so I can easily copy my clean windows image over the current system partition without losing any data. So my profile is about a year old where the system partition is quite clean.
</p><p>
Yesterday I've asekd myself why my the free space on my profile partition is shrinking and shrinking over time without me installing that much stuff (and removing it from time to time). Just per accident I found out: It's windows installer: Whenever I'm installing one of those .msi-Files (or .EXE-Based InstallShield installers using MSI technology), a whole lot of junk gets into my profile and is never removed:
</p>
<ul>
 <li>*.msp: msp-Files are like MSI-Files, but are used to patch an existing installation. I currently have 253 MB's worth of msp-Patches in my profile (<tt>Local Settings\Temp</tt>. Value: Unknown because Windows Installer is not nearly documented enough</li>
 <li>msi*.log: Logfiles of MSI-Installations. No value whatsoever. I have 106 MB worth of MSI-Logfiles in my profile.</li>
  <li>*.msi: Whenever I install and MSI-File (or an exe-based MSI-Installer), the MSI-File is copied somewhere. Although it's  not in the profile, I've 217 MB worth of spare .MSI-Files on my harddrive - not counting the ones I have downloaded to my download-directory.
 </li>
</ul>
<p>
So: I have about 600 MB worth of data which hs no real purpose on my computer and I don't know whether I can delete it or not as MSI is not really documented (there's just some technical documentation for developers available).
</p><p>
Another nice sample of how strange Windows Installer can be: All CHM-based help-files recently stopped working with an Windows Installer Message asking me to provide the path to pgadmin2.msi - a postgres frontend which I have already deletetd ages ago - just now that I have removed the msi-installer from the original download directory, MSI wants to access it when doing things that don't even remotely have to do with the file it asks for. Why?
</p><p>
Microsoft: If you sell us your installer technology as the non-plus-ultra solution for the old problems with overwritten dlls, incomplete installations and such: Please fix your tool or at least document it enough!
</p>
