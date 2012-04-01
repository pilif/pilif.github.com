---
layout: post
title: "My new friend: git rebase -i"
categories:
- Programming
tags:
- Free Software
- git
- Programming
- scm
- Software
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
Last summer, I was into <a href="/2008/07/beautifying-commits-with-git/">making git commits look nice</a> with the intent of pushing a really nice and consistent set of patches to the remote repository.

The idea is that a clean remote history is a convenience for my fellow developers and for myself. A clean history means very well-defined patches - should a merge of a branch be neccesary in the future. It also means much easier hunting for regressions and generally more fun doing some archeology in the code.

My last post was about using <code>git add -i</code> to refine the commits going into the repository. But what if you screw up the commit anyways? What if you forget to add a new file and notice it only some commits later?

This is where <code>git rebase -i</code> comes into play as this allows you to reorder your local commits and to selectively squash multiple commits into one.

Let's see how we would add a forgotten file to a commit a couple of commits ago.
<ol>
	<li>You add the forgotten file and commit it. The commit message doesn't really matter here.</li>
	<li>You use <code>git log</code> or <code>gitk</code> to find the commit id before the one you want to amend this new file to. Let's say it's 6bd80e12707c9b51c5f552cdba042b7d78ea2824</li>
	<li>Pick the first few characters (or the whole ID) and pass them to git rebase -i.</li>
</ol>
<pre> % git rebase -i 6bd80e12</pre>
git will now open your favorite editor displaying your list of commits since the revision you have given. This could look like this.
<pre>pick 6bd80e1 some commit message. This is where I have forgotten the file
pick 4c1d210 one more commit message
pick 5d2f4ed this is my forgotten file

# Rebase fc9a0c6..5d2f4ed onto fc9a0c6
#
# Commands:
#  p, pick = use commit
#  e, edit = use commit, but stop for amending
#  s, squash = use commit, but meld into previous commit
#
# If you remove a line here THAT COMMIT WILL BE LOST.
# However, if you remove everything, the rebase will be aborted.
#</pre>
The comment in the file says it all - just reorder the first three (or how many there are in your case) to look like this:
<pre>pick 6bd80e1 some commit message. This is where I have forgotten the file
squash 5d2f4ed this is my forgotten file
pick 4c1d210 one more commit message</pre>
Save the file. Git will now do some magic and open the text editor again where you can amend the commit message for the commit you squashed your file into. If it's really just a forgotten file, you'll probably keep the message the same.

One word of caution though: Do not do this on branches you have already pushed to a remote machine or otherwise shared with somebody else. git gets badly confused if it has to pull altered history.

Isn't it nice that after moths you still find new awesomeness in your tool of choice?

I guess I'll have to update my <a href="/2004/06/all-time-favourite-tools/">all-time favorite tools</a> list. It's from 2004, so it's probably ripe for that update.

Git rules.
