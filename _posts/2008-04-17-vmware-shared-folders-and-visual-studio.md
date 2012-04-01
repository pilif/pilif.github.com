---
layout: post
title: VMware shared folders and Visual Studio
categories:
- Troubleshooting
tags:
- .net
- networking
- Programming
- Software
- solution
- Solutions
- windev
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
ver since <a href="http://www.gnegg.ch/2008/03/impressed-by-git/">I've seen the light</a>, I'm using git for every possible situation. Subversion is ok, but git is fun. It changed the way how I do developement. It allowed me to create ever so many fun-features for our product. Even in spare-time - without the fear of never completing and thus wasting them.

I have so many branches of all our projects - every one of them containing useful, but just not ready for prime-time feature. But when the time is right, I will be able to use that work. No more wasting it away because a bugfix touches the same file.

The day I dared to use git was the day that changed how I work.

Now naturally, I wanted to use all that freedom for my windows work aswell, but as you know, git just isn't quite there yet. In fact, I had an awful lot of trouble with it, mainly because of it's integrated SSH client that doesn't work with my putty pageant-setup and stuff.

So I resorted to storing my windows development stuff on my mac file system and using VMware Fusion's shared folder feature to access the source files.

Unfortunately, it didn't work very well at first as this is what I got:

<a href="http://www.gnegg.ch/wp-content/uploads/2008/04/nottrusted.png"><img class="aligncenter size-medium wp-image-402" title="The project location is not trusted" src="http://www.gnegg.ch/wp-content/uploads/2008/04/nottrusted-300x156.png" alt="Error message saying that the 'Project location is not trusted'" width="300" height="156" /></a>

I didn't even try to find out what happens when I compile and run the project from there, so I pressed F1 and followed the instructions given there to get rid of the message that the "Project location is not trusted".

I followed them, but it didn't help.

I tried adding various UNC paths to the intranet zone, but neither worked.

Then I tried sharing the folder via Mac OS X's built in SMB server. This time, the path I've set up using mscorcfg.msc actually seemed to do something. Visual Studio stopped complaining. And then I found out:

Windows treats host names containing a dot (.) as internet resources. Hostnames without dots are considered to be intranet resouces.

\\celes\windev worked in mscorcfg.msc because celes, not containing a dot, was counted as an intranet resource.

\\.host contains a dot and this is counted to be an internet resource.

This means that to make the .NET framework trust your VMWare shared folder, you have to add the path to the "Internet_Zone". Not the "LocalIntranet_Zone", because the framework loader doesn't even look there.

Once I've changed that configuration, Visual Studio complained that it was unable to parse the host name - it seems to assume them not starting with a dot.

This was fixed by mapping the path to a drive letter like we did centuries ago.

Now VS is happy and I can have the best of all worlds:
<ul>
	<li>I can keep my windows development work in a git repository</li>
	<li>I have a useful (and working) shell and ssh-agent to actually "git svn dcommit" my work</li>
	<li>I don't have to export any folders of my mac via SMB</li>
	<li>Time Machine now also backs up my Windows Work which I had to do manually until now.</li>
</ul>
Very nice indeed, but now back to work (with git :-) ).
