---
layout: post
title: Praise to ZSH
categories:
- Free Software
- Unix
status: publish
type: post
published: true
meta: {}

---
<p>Jochen Maes <a href="http://blog.sejo.be/archives/23-Z-shell.html">talks about</a> <a href="http://www.zsh.org">zsh</a> today. (I found that blog via <a href="http://planet.gentoo.org">planet.gentoo.org</a>)</p>
<p>
I wholeheartly agree with Jochen here.
</p>
<p>
Finally someone else writing good stuff about zsh.
</p>
<p>
I'm using this shell since 2000 where I did my first serious steps with Unix. This mainly has three reasons:
</p>
<p>
One is the "User Friendly Users Guide" available <a href="http://zsh.sunsite.dk/Guide/">here</a>. Besides this being an excellent introduction to zsh it is one to unix shells in general. When you're learning unix shells using this guide, you'll somewhat automatically stay with zsh.
</p><p>
The other reason is the great flexibility and expandibility. Zsh had a programmable autocomplete-feature long before bash had (or at least long before it was generally known) and even better: It came with some autocompletition functions already enabled for some tools (like tar or even scp). Programmable autocompletition allows you create special autocompletitions depending on the context you are hitting <tt>tab</tt>.</p>
<p>So let's say if you are beginning to type</p>
<pre class="code">
$ scp gnegg.dat pilif@server.example.com:~/gn
</pre>
<p>and then hit <tt>tab</tt>, zsh will actually autocomplete on the remote server(!) and create</p>
<pre class="code">
$ scp gnegg.dat pilif@server.example.com:~/gnegg
</pre>
<p>for you (assuming that directory exists)</p>
<p>The same goes for tar (even with .gz or .bz2 compressed ones). Or cvs or svn</p>
<p>While gentoo provides <tt>bash-completition-config</tt> which does the same for bash, zsh was there first. And it provides many senseful completitions.</p>
<p>The third reason for me going with zsh is the syntax of the shell-scripts which can be configured to be much more intuitive to a C-programmer than the default-syntax, while still being more like ksh/bash than (t)csh.</p>
<p>So for me, switching from bash to zsh was a no-brainer back in 2000. And as with the text-editors: Once you use a certain tool, you will not change it afterwards.</p>
<p>I strongly recommend you to take a look at zsh too.</p>
