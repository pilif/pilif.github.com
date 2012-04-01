---
layout: post
title: On the search of a text editor
tags:
- Programming
status: publish
type: post
published: true
meta: {}

---
<p>When I began with this blog, <a href="/archives/3-Why-I-like-jEdit.html">I was using</a> <a href="http://www.jedit.org">jEdit</a> because of its wonderful list of countless features directly optimized for the programmers needs.</p>
<p>It was lacking one thing though: PHP support. While it provides (excellent) syntax highlighting, there's nothing more. No code completition, no parameter hints, no code browser. While many people tick those things off as useful but not needed, I tend to disagree:</p>
<p>Sometime around autumn 2003, I gave the Zend Studio another try. And it has matured quite a lot since its first release. The speed problems were fixed, some editing features came back... nice.</p>
<p>What made me stick to Zend Studio is the above features: Code completition and parameter hints.</p>
<p>I know that you can just look the order of a functions parameter up in either your (or someone elses) code or in the manual, but it always interrupts your work. Not only that, you have to actually know where to look. Is it in the PHP manual? In code file a? In file b? Maybe in some library installed in /usr/lib/php (PEAR)? Zend Studio provides me with the parameter hints regardless of where the file is stored - provided it can read them.</p>
<p>This is a killer-feature. It immensely increases ones productivity. Whatever editor I'm ever going to use: It must have parameter-hinting for PHP. And it has to work as good as it does in the Zend IDE.</p>
<p>The Zend IDE has other problems though. What it has in parameter hinting, it lacks in basic editing features. Remove whitespace at the end of lines? Comment out a block? Smart autoindent (another thing where jEdit shines)? Splitting the editing window? No. Neither of them.</p>
<p>What pisses me off most (besides the whitespace problem as that creates very ugly SVN commits) is the font renedering though. Now that I finally <a href="http://www.gnegg.ch/archives/254-Nice-font....html">found a font</a> I really like, I'm unable to use it in the mostly used editor environement. Like many other Java applications Zend Studio does not support cleartype. And if you hack around a bit to run ZDE in a Java 1.6 alpha, the whole application will use cleartype - the whole application except the editing window, of course. Consolas looks really bad without ClearType.</p>
<p>Actually, any of the fonts I do like for programming (basically any besides Courier New) looks bad without ClearType, which means that I'm programming PHP with Courier as my font.</p>
<p>PHP of course is my main language at this time, so I'm doing most of my work in an environement that is not to my liking at all.</p>
<p>So... time for a new editor. Here's what I've tried:</p>
<ul>
  <li>jEdit again. Now has a PHP parser plugin, which is completely unusable unfortunately: It parses while you are typing and as soon as it detects a syntax error (which is bound to happen while you are writing a line), it puts the keyboard focus to the error list(!!!!). This means that I have to type like this: function gnegg([TAB]$param1,[TAB]$param2){[TAB], the [TAB] meaning me hitting tab to get the focus back to where it belongs. Additionally, there's no parameter hint, which is a must for me. As much as I'd like to use jEdit. It's not possible like this. Sorry. (even though jEdit actually renders Consolas quite right with its own implementation of subpixel hinting).</li>
 <li><a href="http://www.phpeclipse.de">PHPEclipse</a>: An Eclipse plugin (even though Eclipse is written in Java, it uses SWT and thus the native font rendering of the underlying platform, meaning that cleartype is usable) teaching the JAVA IDE how to do PHP. Unfortunately, many of the great features in eclipse are part of the JDT plugin suite, so every language has to redo the stuff in there. PHPEclipse is seriously lacking in the features departement and the parameter completition is missing aswell.</li>
 <li>UEStudio. Well... let's try it with a commercial offering. UEStudio is a enhanced version of UltraEdit. They emphasize on their PHP support. You guessed right: No parameter hints.</li>
 <li>phpEd, Maguma Studio, ... I did not even try them again. My last experience was very, very painful. While Delphi is a RAD tool allowing to make quick progress, you have to be as careful with memory allocation as in every other native-compiled language. None of those Windows-Only-PHP-Editors seem to care about that, so they crash all the time. No alternative.</li>
</ul>
<p>Well... that's it for now. Please. Anyone! What are you working with? Is there a editor with the editing features of jEdit, the font rendering of eclipse and the PHP-specific features of Zend Studio (auto completition and <b>parameter hinting</b>)? I don't need no profiler. No debugger. Just a good editor.</p>
<p>Am I doomed to write PHP with Courier New for the rest of my life?</p>
