---
layout: post
title: Shell history stats
categories:
- Personal
- shell
- Unix
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
It seems to be cool nowadays to <a href="http://jimmac.musichall.cz/log/?p=427">post</a> the output of a certain unix command to ones blogs. So here I come:
<pre class="code">pilif@celes ~
 % fc -l 0 -1 |awk '{a[$2]++ } END{for(i in a){print a[i] " " i}}'|sort -rn|head
467 svn
369 cd
271 mate
243 git
209 ssh
199 sudo
184 grep
158 scp
124 rm
115 ./clitest.sh</pre>
clitest.sh is a small little wrapper around wget which I use to do protocol level debugging of the <a href="http://www.popscan.ch">PopScan</a> Server.
