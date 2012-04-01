---
layout: post
title: Altering the terminal title bar in Mac OS X
tags:
- Mac
- solution
- Solutions
- zsh
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
<p>After one year of owning a MacBook Pro, I finally got around to fix my <tt>precmd()</tt> ZSH-hack to really make the current directory and stuff appear in the title bar of Terminal.app and iTerm.app.</p>
<p>This is the code to add to your .zshrc:</p>
{% highlight bash %}
case $TERM in
    *xterm*|ansi)
		function settab { print -Pn "\e]1;%n@%m: %~\a" }
		function settitle { print -Pn "\e]2;%n@%m: %~\a" }
		function chpwd { settab;settitle }
		settab;settitle
        ;;
esac
{% endhighlight %}
<p><tt>settab</tt> sets the tab contents in iTerm and <tt>settitle</tt> does the same thing for the title bar both in Terminal.app and iTerm.</p>
<p>The sample also shows the variables ZSH replaces in the strings (the parameter -P to print lets ZSH do prompt expansion. See <tt>zshmisc(1)</tt> for a list of all variables): %n is the currently logged on user, %m the hostname up until the first dot and %~ is displaying the current directory or ~ if you are in $HOME. You can certainly add any other environment variable of your choice if you need more options, but this more or less does it for me.</p>
<p>Usually, the guides in the internet make you use <tt>precmd</tt> to set the title bar, but somehow, Terminal wasn't pleased with that method and constantly kept overwriting the title with the default string.</p>
<p>And this is how it looks in both iTerm (above) and Terminal (below):</p>
<center><!-- s9ymdb:23 --><img width='330' height='129' style="border: 0px;" src="/uploads/titlebars.png" alt="" /></center>
<br />
