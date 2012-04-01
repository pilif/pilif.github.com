---
layout: post
title: Beautifying commits with git
categories:
- Programming
tags:
- git
- Programming
- vcs
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
When you look at our Subversion log, you’d often see revisions containing multiple topics, which is something I don’t particularly like. The main problem is merging patches. The moment you cramp up multiple things into a single commit, you are doomed should you ever decide to merge one of the things into another branch.

Because it’s such an easy thing to do, I began committing really, really often in git, but whenever I was writing the changes back to subversion, I’ve used <tt>merge –squash</tt> as to not clutter the main revision history with abandoned attempts at fixing a problem or implementing a feature.

So in essence, this meant that by using git, I was working against my usual goals: The actual commits to SVN were larger than before which is the exact opposite thing of how I’d want the repository to look.

I’ve lived with that, until I learned about the interactive mode of <tt>git add</tt>.

Beginners with git (at least those coming from subversion and friends) always struggle to really <em>get </em>the concept of the index and usually just <tt>git commit –a</tt> when committing changes.

This does exactly the same thing as a svn commit would do: It takes all changes you made to your working copy and commits them to the repository. This also means that the smallest unit of change you can track is the state of the working copy itself.

To do finer grained commits, you can git add a file and commit that, which is the same as <tt>svn status</tt> followed by some grep and awk magic.

But even a file is too large a unit for a commit if you ask me. When you implement feature X, it’s possible if not very probable, that you fix bugs a and b and extend the interface I to make the feature Y work – a feature on which X depends.

Bugfixes, interface changes, subfeatures. A git <tt>commit –a</tt> will mash them all together. A <tt>git add</tt> per file will mash some of them together. Unless you are really really careful and cleanly only do one thing at a time, but in the end that’s now how reality works.

It may very well be that you discover bug b after having written a good amount of code for feature Y and that both Y and b are in the same file. Now you have to either back out b again, commit Y and reapply b or you just commit Y and b in one go, making it very hard to later just merge b into a maintenance branch because you’d also get Y which you would not want to.

But backing out already written code to make a commit? This is not a productive workflow. I could never make myself do something like that, let alone my coworkers. Aside of that, it’s yet another cause to create errors.

This is where the git index shines. Git tracks content. The index is a stage area where you store content you whish to later commit to the repository. Content isn’t bound to a file. It’s just content. By help of the index, you can incrementally collect single changes in different files, assemble them to a complete package and commit that to the repository.

As the index is tracking content and not files, you can add parts of files to it. This solves the problems outlined above.

So once I have completed Feature X, and assuming I could do it in one quick go, then I run <tt>git add</tt> with the –i argument. Now I see a list of changed files in my working copy. Using the patch-command, I can decide, hunk per hunk, whether it should be included in the index or not. Once I’m done, I exit the tool using 7. Then I run git commit<sup><a href="#note-1">1)</a></sup> to commit all the changes I’ve put into the index.

Remember: This is not done per file, but per line in the file. This way I can separate all the changes in my working copy, bug a and b, feature Y and X into single commits and commit them separately.

With a clean history like that, I can consequently merge the feature branch without —squash, thus keeping the history when dcommiting to subversion, finally producing something that can easily be merged around and tracked.

This is yet another feature of git that, after you get used to it, makes this VCS shine even more than everything else I’ve seen so far.

Git is fun indeed.
<p style="font-size: x-small"><a name="note-1"></a>1) and not <tt>git commit -a</tt> which would destroy all the fine-grained plucking of lines you just did - trust me: I know. Now.</p>
