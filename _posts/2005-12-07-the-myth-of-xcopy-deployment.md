---
layout: post
title: The myth of XCOPY deployment
categories:
- Delphi
- Opinions
- Programming
status: publish
type: post
published: true
meta: {}

---
<p>Since the advent of .NET, everyone is talking about XCOPY deployment.</p>
<p>XCOPY deployment means that the applications are distributabe without a setup routine. Just copy the file(s) where you want them and that's it.</p>
<p>We are being told that this is much easier and safer than the previous non-.NET approaches which - as they continue - always required a setup program.</p>
<p>The problem with those statements is that they are all false.</p>
<p>First the ease of use: Think of it: Say you want to install <a href="http://blogs.geekdojo.net/brian/articles/Cropper.aspx">Cropper</a> (which made me write this entry. I found that screenshot utility via <a href="http://miksovsky.blogs.com/flowstate/2005/12/elegant_cropper.html">flow|state</a>). What you are getting is a ZIP-File, containing 5 files and a folder (containing another 6 files). Nearly all the files are needed for the application to run.</p>
<p>XCOPY deployment in this case means: Create a folder somewhere (Windows guidelines advocate you create that in c:\Program Files which is a folder windows does not want you to mess with and per default does not display its contents) and copy over all those files, being aware not to forget a file or the folder in the archive. </p>
<p>But it does not end there: As you have to launch the application and going all the way through those folders, you will want to have a shortcut in the start menu or on the desktop. With this new and "better" method of deployment, you'll have to do that yourself.</p>
<p>This is a tedious task involving lots of clicks and browsing. An unexperienced user may not be able to do this at all.</p>
<p>What an unexperienced user will want to do is to copy that application right to the desktop. But in this case this does not work well as the whole application consits of multiple interdependant parts. Copying only the .EXE will break the thing.</p>
<p>Compare this with Mac OS X</p>
<p>In Mac OS X, application <em>also</em> consist of multiple parts. But the shell is built with XCOPY deployment (not called like this, of course. As a matter of fact, it does not have a name at all) in mind: In OS X, you can create a special kind of folder which is a folder only on the file system. The shell displays it to the user as a single file - the application.</p>
<p>Whenever you move that "file" around, OS X will move the whole folder. When you double click the "file", the application will launch (the binary is a file somewhere in this special folder. The shell is intelligent enough to find and launch that). When you delete it, the shell will delete the folder including it's contents (of course).</p>
<p>This makes XCOPY deployment possible as the applications become one piece. You want it on the desktop? Drag it there. In the Application folder (without warnings about not being allowed to mess with its contents, btw)? Drag it there? On an USB-Stick? Drag it there.</p>
<p>Well. There's one other thing: It's the users data and the applications data. Most of the applications will be used to create data with them. And all application somehow create their own data (for saving things like the window state or position for example). As all modern OSes are multiuser ones where a user does not necessarily have to have write access everywhere, there's the concept of the home directory. That one is yours. You may store whatever you want in there.</p>
<p>So naturally, this is the place where the applications should store data to0.</p>
<p>User data goes to a specific folder of the users choice. Per default, applications should suggest some Documents-Folder. Like "My Documents" in Windows or "Documents" in Mac OS. In most of the cases you don't want to delete that on uninstall.</p>
<p>Application settings are in Windows stored in the Registry (under HKEY_CURRENT_USER - a hive that belongs to the current user like his home folder does. And actually, the file behind that is stored in the home folder aswell (USER.DAT)) or in the Application Data folder below the users home folder.</p>
<p>Mac OS X Applications are advised to use the Preferences-Folder inside the Library Folder inside the users home directory<./p>
<p>Now. Application data is something you want to remove when you uninstall the application (which means deleting a bunch of files in Windows or one "File" in Mac OS). Application data is created by the application, for the application. No need to keep that.</p>
<p>In Mac OS, you can do that by going into the folder I've described above and delete the files - mostly named after your application. There are no warnings, no questions, no nothing. Just delete.</p>
<p>In Windows, editing the registry is off-limits for end-users and very, very tedious to do for experienced users (due to the suboptimal interface of regedit and because the whole thing is just too large to navigate it easily), so you generally let the stuff stick there. Deleting the Application Data in the same-named folder is also impossible for the end user: That folder is hidden by default. Explorer does not display it. And it's hard as hell to find, as you have to manually navigate into your home directory - there's not easy GUI-access to that. So that sticks too.</p>
<p>All in all, this means that windows is - at least in its current state - very unsuited for XCOPY deployment:</p>
<ul>
 <li>It does not help at keeping together things that must be together</li>
 <li>Its complex file system structure makes it hard to copy the application where windows wants it to be</li>
 <li>Manually creating shortcuts is not feasible for an unexperienced user</li>
 <li>Uninstallation of Application Data is impossible</li>
</ul>
<p>So, we found out that XCOPY deployment is not easy at all. Now let's find out how it's not true that only .NET enabled you to do this.</p>
<p>Ever since there is <a href="http://www.borland.com/delphi">Delphi</a>, there theoretically is XCOPY deployment.</p>
<p>Delphi is very good at creating self-contained executables.</p>
<p>With delphi it's a breeze to create one single .EXE containing all the functionality you need. That one single .EXE can be moved around as a whole (obviously), can be deleted, can even be put right into the start menu (if you want that). It can even create the start menu shourcuts, delete application data - basically configure and clean itself</p>
<p>It can even uninstall itself (embed an uninstaller, launch that with CreateProcess and set the flag to delete the .exe after it ran). And it can contain all it's image and video and sound data it needs.</p>
<p>Just because nobody did it does not mean it was not possible.</p>
<p>Face it: Windows users are used to fancy installers. Windows users are not at all used to dragging and dropping an application somewhere. And currently Windows users are not even able to do so as dragging and dropping will break the application.</p>
<p>OS X and <a href="http://klik.atekon.de/">now</a> Linux allow for true XCOPY deployment of desktop applications.</p>
<p>Well, you say... then maybe XCOPY deployment is just for those fancy ASP.NET web applications?</p>
<p>Maybe. But after XCOPY you need to configure your webserver - at least create a virtual directory or host. A good installer could do that for you - if you want it to.</p>
<p>Microsoft too has seen that this XCOPY thingie is not as great as everyone expected, so they added the new "One-Click Install" technology, which is not much more than a brushed-up MSI file which does a old-fashioned install.</p>
<p>To really make XCOPY deployment a reality (btw, I'm a big fan of depolying software like this), there must be some changes within Windows itself. Microsoft, copy that application bundle feature from OSX. That one works really, really good.</p>
<p>Btw: Am I the only one that thinks "XCOPY deployment" is a very bad term? What is XCOPY? Who the hell still uses XCOPY these days? And when we are using the command line: COPY would be enough.</p>
