---
layout: post
title: SQLite, Windows Mobile 2005, Performance
tags:
- Programming
- Solutions
- sqlite
- wince
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
As you know from <a href="/2006/07/sqlite-on-net-cf-revisited/">previous</a> <a href="/2004/10/sqlite-on-net-cf/">posts</a>, I'm working with SQLite on mobile devices which lately means Windows Mobile 2005 (there was a <a href="http://www.gnegg.ch/archives/177-Extreme-fun-with-Linux.html">Linux device</a> before that tough, but it was hit by the <a href="http://en.wikipedia.org/wiki/RoHS">RoHS</a> regulation of the European union).

In previous experiments with the older generation of devices (Windows CE 4.x / PocketPC 2003), I was surprised by the high performance SQLite is able to achieve, even in complex queries. But this time, something felt strange: Searching for a string in a table was very, very slow.

The problem is that CE5 (and with it Windows Mobile 2005) uses non-volatile flash for storage. This has the tremendous advantage that the devices don't lose their data when the battery runs out.

But compared to DRAM, Flash is slow. Very slow. Totally slow.

SQLite doesn't load the complete database into RAM, but only loads small chunks of the data. This in turn means that when you have to do a sequential table scan (which you have to do when you have a LIKE '%term%' condition), you are more or less dependant on the speed of the storage device.

This what caused SQLite to be slow when searching. It also caused synchronizing data to be slow because SQLite writes data out into checkpoint files during transactions.

The fix was to trade off launch speed (the application is nearly never started fresh) for operating speed by loading the data into an in-memory table and using that for all operations.
<pre class="code">attach ":memory:" as mem;

create table mem.prod as select * from prod;</pre>
Later on, the trick was to just refer to mem.prod instead of just prod.

Of course you'll have to take extra precaution when you store the data back to the file, but as SQLite even supports transactions, most of the time, you get away with
<pre class="code">begin work;

delete from prod;

insert into prod (select * from mem.prod);

commit;</pre>
So even if something goes wrong, you still have the state of the data of the time when it was loaded (which is perfectly fine for my usage scenario).

So in conclusion some hints about SQLite on a Windows Mobile 2005 device:
<ul>
	<li>It works like a charm</li>
	<li>It's very fast if it can use indexes</li>
	<li>It's terribly slow if it has to scan a table</li>
	<li>You can fix that limitation by loading the data into memory (you can even to it on a per-table basis)</li>
</ul>
