---
layout: post
title: PostgreSQL vs. MySQL - a subjective view
tags:
- Free Software
status: publish
type: post
published: true
meta: {}

---
<p>Still quite enthusiastic about <a href="http://www.gnegg.ch/archives/201-PostgreSQL-rocks!.html">my success</a> with <a href="http://www.postgresql.org">PostgreSQL</a> erlier today and after reading the first comment on that entry, I think, it's time for a little list describing the highlights why I prefer PostgreSQL to mySQL and another one describing what mySQL does better:</p>
<h3>PostgreSQL</h3>
<ul>
  <li><tt>psql</tt>, the command line tool for accessing the database is much better than the mySQL pendant. What many don't seem to know is <tt>\x</tt>. Try it and you will ask yourself, why <tt>mysql</tt> can't do that. Also, I really like that a pager is invoked when dealing with large result sets. MySQL does not do that either</li>
  <li>The license. While I certailny prefer any free software license to any proprietary one, I much prefer the more free BSD one. But I better leave the flam^Wphilosophying about this to others...</li>
 <li>All those "professional" database-features like VIEWs, stored procedures (which can even be written in Perl or Python), triggers, rules, enforced referential integrity and all that stuff. I could never ever imagine going back to a database without VIEWs. Those things are so incredibly useful both for much friendlier interface to complex data and integrating different pieces of software.</li>
 <li> The community around PostgreSQL is very strong. Reading the "general" and "developers" mailinglists is very interesting and many times provides a very good insight in database design</li>
</ul>
<p>
Back in 2002 where I was working on the new adsl.ch, I used VIEWs to merge satisfy the needs both PostNuke and phpBB2 had concerning their table containing the user accounts. With a view and a little bit cusomized scripting I was able to integrate both without the need for any patching around in either of them which makes applying security-updates so much easier. This is where I deceided that I will never use anything else but PostgreSQL for my database needs.
</p>
<h3>The mySQL list</h3>
<ul>
  <li><tt>mysqli</tt> is an object oriented interface for PHP scripts directly built into the language (and thus fast). Too bad it requires MySQL 4.1 as Gentoo does not have fitting ebuilds yet. And don't get me wrong: Postgres' interface is not bad either.</li>
 <li>Seems easier to handle. Just install and run. ALTER TABLE is much more powerful than in PostgreSQL, so changing the structure after the fact is easy. Nothing must be configured to get quite the optimum performance</li>
 <li>Clustering built into the core of the database, though it's still a master-slave replication which provides fail-safety, but no (real) load balancing.</li>
</ul>
<p>ALTER TABLE in PostgreSQL 8 is about as powerful as the one of MySQL, but PostgreSQL 8 suffers from the same problem as MySQL 4.1: No Gentoo ebuild. Here, on my iMac I'm already running the latest BETA of 8.0</p>
<p>The decision to go with PostgreSQL is an easy one: None of the advantages of MySQL are big enough to outweigh the missing features. Oh and if you ask for benchmarks and tell me that PostgreSQL is slower than MySQL, let me tell you this: While I doubt that this statement is still true (mySQL got slower due to the transaction support and PostgreSQL got much faster), I can say one thing for certain: PostgreSQL is fast enough for my needs. What is it worth giving up data integrity and writing lots of dirty code that should really be stored directly in the database just because of a percent more performance or so?</p>
<p>Another thing is how those systems perform under high load. While I certainly know that PostgreSQL handles it well and stays fast for many more concurrent connections, I always hear problems form people using mySQL: Corrupted tables (sometimes beyond repair), hanging connections,...  Nothing I want to happen to me even if it would mean to live with one or two percent less performance under unrealistical-benchmarky load.</p>
<p>Oh and everything I told about performance is quite un-scientific. While I did some load-tests with Postgres, all my expirience with MySQL under same conditions comes from other people. I never tried it myself. Why should I? PostgreSQL is perfect.</p>
