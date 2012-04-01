---
layout: post
title: "WoW: Language Hacking"
categories:
- Games
- Solutions
status: publish
type: post
published: true
meta: {}

---
<p>
As I explained in my <a href="http://www.gnegg.ch/archives/229-World-of-Warcraft.html">previous posting</a>, I very much like to play World of Warcraft in the english version.
</p>
<p>Now I got my hands on the US-version and installed it (after uninstalling the german version).</p>
<p>The problem came after patching to the current version: My account was not recognized anymore - no wonder: The game was connecting to the US servers while my account is on the european ones.</p>
<p>A bit searching for worldofwarcraft.com in the games directory revealed the string <tt>set realmlist [something]</tt> in <tt>base.mpq</tt></p>
<p>As always, google was my friend and showed me the solution: Add</p>

<pre class="code">SET realmlist "eu1.wow.battle.net"</pre>

<p>to the file <tt>config.wtf</tt> in the directory <tt>WTF</tt> of your WoW installation.</p>
<p>This lets you login to the european servers where your account is recognized.</p>
<p>Works well (at least until the next patch is released ;-)</p>
<p><b>Update:</b> if you have a file called <tt>realmlist.wtf</tt> in the main installation directory, change that one, not the <tt>config.wtf</tt> as it will get overwritten on every launch. And additionally, you should set the server to <tt>eu.logon.worldofwarcraft.com</tt> instead - the older one was for the beta.</p>
