---
layout: post
title: Delete-Key in zsh
tags:
- Free Software
- Unix
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
I'm a big fan of <a href="http://www.zsh.org">zsh</a>. Besides it having an awful amount of features, it was <a href="http://zsh.sourceforge.net/Guide/zshguide.html">this guide</a> (called "User-friendly user guide") that brought me up to speed on unix-shell matters back then.

So it's only logical that my default shell is the one the guide is about ;-)

What annoyed me majorly was that in Gentoo Linux, the delete key did not work in zsh (unless of course you count outputing ~ instead of forward-deleting as "working").

Finally I got around to fixing that.

Adding
<pre class="code">bindkey    "^[[3~"          delete-char
bindkey    "^[3;5~"         delete-char</pre>
to your <tt>.zshrc</tt> enables your delete key on every thinkable keyboard. Finally!
