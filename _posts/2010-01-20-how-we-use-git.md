---
layout: post
title: How we use git
categories:
- Programming
tags:
- development
- dvcs
- git
- popscan
- Programming
- Software
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
the following article was a <a href="http://news.ycombinator.com/item?id=1063392">comment I made</a> on <a href="http://news.ycombinator.com">Hacker News</a>, but as it's quite big and as I want to keep my stuff at a central place, I'm hereby reposting it and adding a bit of formating and shameless self-promotion (i.e. links):

<a href="http://www.sensational.ch">My company</a> is working on a - by now - quite <a href="http://www.popscan.com">large web application</a>. Initially (2004), I began with CVS and then moved to SVN and in the second half of last year, to git (after a one-year period of personal use of git-svn).

<span style="color: #000000;">We deploy the application for our customers - sometimes to our own servers (both self-hosted and in the cloud) and sometimes to their machines.</span>

Until middle year, as a consequence of SVN's really crappy handling of branches (it can branch, but it fails at merging), we did very incremental development, adding features on customer requests and bugfixes as needed, often times uploading specific fixes to different sites, committing them to trunk, but rarely ever updating existing applications to trunk to keep them stable.

<em>Huge mess.</em>

With the switch to git, we also initiated a real release management, doing one feature release every six months and keeping the released versions on strict maintenance (for all intents and purposes - the web application is highly customizable and we do make exceptions in the customized parts as to react to immediate feature-wishes of clients).

What we are doing git-wise is the reverse of what the article shows: Bug-fixes are (usually) done on the release-branches, while all feature development (except of these customizations) is done on the main branch (we just use the git default name "master").

We branch off of master when another release date nears and then tag a specific revision of that branch as the "official" release.

There is a central gitosis repository which contains what is the "official" repository, but every one of us (4 people working on this - so we're small compared to other projects I guess) has their own gitorious clone which we heavily use for code-sharing and code review ("hey - look at this feature I've done here: Pull branch foobar from my gitorious repo to see...").

With this strict policy of (for all intents and purposes) "fixes only" and especially "no schema changes", we can even auto-update customer installations to the head of their respective release-branches which keeps their installations bug-free. This is a huge advantage over the mess we had before.

Now. As master develops and bug-fixes usually happen on the branch(es), how do we integrate them back into the mainline?

This is where the concept of the "<em>Friday merge</em>" comes in.

On Friday, my coworker or I usually merge all changes in the release-branches upwards until they reach master. Because it's only a week worth of code, conflicts rarely happen and if they do, we remember what the issue was.

If we do a commit on a branch that doesn't make sense on master because master has sufficiently changed or a better fix for the problem is in master, then we mark these with [DONTMERGE] in the commit message and revert them as part of the merge commit.

On the other hand, in case we come across a bug during development on master and we see how it would affect production systems badly (like a security flaw - not that they happen often) and if we have already devised a simple fix that is save to apply to the branch(es), we fix those on master and then cherry-pick them on the branches.

This concept of course heavily depends upon clean patches, which is another feature git excels at: Using features like interactive rebase and interactive add, we can actually create commits that
<ul>
	<li>Either do whitespace or functional changes. Never both.</li>
	<li>Only touch the lines absolutely necessary for any specific feature or bug</li>
	<li>Do one thing and only one.</li>
	<li>Contain a very detailed commit message explaining exactly what the change encompasses.</li>
</ul>
This on the other hand, allows me to create extremely clean (and exhaustive) change logs and NEWS file entries.

Now some of these policies about commits were a bit painful to actually make everyone adhere to, but over time, I was able to convince everybody of the huge advantage clean commits provide even though it may take some time to get them into shape (also, you gain that time back once you have to do some blame-ing or other history digging).

Using branches with only bug-fixes and auto-deploying them, we can increase the quality of customer installations and using the concept of a "Friday merge", we make sure all bug-fixes end up in the development tree without each developer having to spend an awful long time to manually merge or without ending up in merge-hell where branches and master have diverged too much.

The addition of gitorious for easy exchange of half-baked features to make it easier to talk about code before it gets "official" helped to increase the code quality further.

git was a tremendous help with this and I would never in my life want to go back to the dark days.

<span style="color: #000000;">I hope this additional insight might be helpful for somebody still thinking that SVN is probably enough.</span>
