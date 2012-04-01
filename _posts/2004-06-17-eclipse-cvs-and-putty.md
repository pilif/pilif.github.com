---
layout: post
title: Eclipse, CVS and putty
tags:
- Programming
- Solutions
status: publish
type: post
published: true
meta: {}

---
<p>I'm a really big fan of <a href="http://www.eclipse.org">Eclipse</a>. This Java-IDE has many great features I have never come across in other IDEs so far. The new context based syntax-highlighting comes to mind (it analyzes your sourcecode and can - for example distinguish between local variables and constants)</p>

<p>Actually, it's only because of Eclipse that I now can write fairly good Java code. The thing was incredibly helpful during my first struggle to get something to work, so I made quite some progress in a quite small timeframe.
</p>

<p>There is one thing though, I never got to work: CVS integration</p>

<p>I'm using CVS strictly over SSH, with the help of Putty, Pageant and Public Key authentication. Despite the fact I've entered the correct settings for the "ext" method (using Puttys plink.exe as CVS_RSH) in Eclipse, it never worked (it failed with various messages)</p>

<p>Of course there is the new extssh-Method, but this is non-standard. Where I can access the CVS-Server using extssh from eclipse, it does not really help because then the command line tools and <a href="">TortoiseCVS</a> stop working because they don't understand extssh</p>

<p>Finally I found the solution: Even though it doesn't make sense, you have to enter "cvs" under CVS_SERVER in the CVS-Settings. I don't know why. It's just that way. So to use Eclipse together with the command line tools and Tortoise to access the CVS-Repository from the same working copy, this is what you have to enter under Window/Preferences/Team/CVS/Ext Connection Method:</p>

<table>
  <tr>
    <th>CVS_RSH</th><td><tt>your\full\path\to\plink.exe</tt></td>
   </tr>
  <tr>
    <th>Parameters</th><td><tt>{user}@{host}</tt></td>
   </tr>
  <tr>
    <th>CVS_SERVER</th><td><tt>cvs</tt></td>
   </tr>
</table>

<p>Then you add a repository in the repository-view using the following settings:</p>

<table>
  <tr>
    <th>Host</th><td><tt>your.host.name</tt></td>
   </tr>
  <tr>
    <th>Repository path</th><td><tt>/path/to/repos</tt></td>
   </tr>
  <tr>
    <th>User</th><td><tt>username</tt></td>
   </tr>
  <tr>
    <th>Password</th><td>empty</td>
   </tr>
  <tr>
    <th>Connection type</th><td>ext</td>
   </tr>
</table>

<p>Before you finally click "Finish", open up a command line window and log in to your CVS-Server using plink:</p>
<pre>
plink user@host
</pre>
<p>Maybe you are asked to store the host key in plinks database. Do so. Then make sure that you can login without a Password-Request popping up (Pageant must be running, your key must be loaded and authorized on the server). If that works, click "Finish" in Eclipse.
</p>
