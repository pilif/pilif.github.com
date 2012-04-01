---
layout: post
title: Impressed by git
categories:
- git
- Programming
- Software
- Solutions
- svn
- Unix
- vcs
- webdev
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
The company I'm working with is a Subversion shop. It has been for a long time - since fall of 2004 actually where I finally decided that the time for CVS is over and that I was going to move to subversion. As I was the only developer back then and as the whole infrastructure mainly consisted of CVS and <a href="http://www.viewvc.org">ViewVC</a> (cvsweb back then), this move was an easy one.

Now, we are a team of three developers, heavy <a href="http://trac.edgewall.org">trac</a> users and truly dependant on <a href="http://subversion.tigris.org">Subversion</a> which is - mainly due to the amount of infrastructure that we built around it - not going away anytime soon.

But none the less: We (mainly I) were feeling the shortcomings of subversion:
<ul>
	<li>Branching is not something you do easily. I tried working with branches before, but merging them really hurt, thus making it somewhat prohibitive to branch often.</li>
	<li>Sometimes, half-finished stuff ends up in the repository. This is unavoidable considering the option of having a bucket load of uncommitted changes in the working copy.</li>
	<li>Code review is difficult as actually trying out patches is a real pain to do due to the process of sending, applying and reverting patches being a manual kind of work.</li>
	<li>A pet-peeve of mine though is untested, experimental features developed out of sheer interest. Stuff like that lies in the working copy, waiting to be reviewed or even just having its real-life use discussed. Sooner or later, a needed change must go in and you have the two options of either sneaking in the change (bad), manually diffing out the change (hard to do sometimes) or just forget it and <tt>svn revert</tt> it (a real shame).</li>
</ul>
Ever since the Linux kernel first began using Bitkeeper to track development, I knew that there is no technical reason for these problems. I knew that a solution for all this existed and that I just wasn't ready to try it.

Last weekend, I finally had a look at the different distributed revision control systems out there. Due to the insane amount of infrastructure built around Subversion and not to scare off my team members, I wanted something that integrated into subversion, using that repository as the official place where official code ends up while still giving us the freedom to fix all the problems listed above.

I had a closer look at both Mercurial and git, though in the end, the nicely working SVN integration of git was what made me have a closer look at that.

Contrary to what everyone is saying, I have no problem with the interface of the tool - once you learn the terminology of stuff, it's quite easy to get used to the system. So far, I did a lot of testing with both live repositories and test repositories - everything working out very nicely. I've already seen the impressive branch merging abilities of git (to think that in subversion you actually have to a) find out at which revision a branch was created and to b) remember every patch you cherry-picked.... crazy) and I'm getting into the details more and more.

On our trac installation, I've written a tutorial on how we could use git in conjunction with the central Subversion server which allowed me to learn quite a lot about how git works and what it can do for us.

So for me it's git-all-the-way now and I'm already looking forward to being able to create many little branches containing many little experimental features.

If you have the time and you are interested in gaining many unexpected freedoms in matters of source code management, you too should have a look at git. Also consider that on the side of the subversion backend, no change is needed at all, meaning that even if you are forced to use subversion, you can privately use git to help you manage your work. Nobody would ever have to know.

Very, very nice.
