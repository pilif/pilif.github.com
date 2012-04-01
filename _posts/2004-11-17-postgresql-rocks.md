---
layout: post
title: PostgreSQL rocks!
categories:
- Free Software
status: publish
type: post
published: true
meta: {}

---
<p>I <a href="http://www.gnegg.ch/archives/138-All-time-favourite-Tools.html">told so before</a>, but I have to again: <a href="http://www.postgresql.org">PostgreSQL</a> is incredibly cool.</p>
<p>Today I had this job of importing around 11'000'000 datasets distributed to 15 tables. 10 millions of them went into one big table. And after importing the whole thing should still respond fast to queries involving JOINS with this large table.</p>
<p>What surprises me: After a bit tweaking of the settings (one of them would be moving the beast to a partition where there's enough space on to store the indexes ;-) ), the queries I did on a much smaller amount of data before, remain as fast as ever. PostgreSQL really makes great use of its indexes</p>
<p>Granted: Importing all those datasets was somewhat slow (I could and can not use COPY because I'm just receiving differences), but tweaking around with the indexes helped a lot (tip: drop them while inserting)</p>
<p>While processing the import, Postgres still was as responsive as ever while working with other parts of the database. </p>
<p>I know that all this is nothing fancy - I mean: I expect nothing less from a good RDBMS, but still... it's amazing how good and flawless this worked and how fast it is.</p>
<p>Maybe, I could get faster INSERT/UPDATE performance if I'd be using MySQL instead, but I absolutely want to use all those features a real database should have that MySQL lacks: Views, referential integrity, subselects (still using 4.0 until Gentoo releases a more current ebuild).</p>
<p>Yes. Postgres is just great.</p>
<p>Just for your interest:</p>
<pre class="code">
pilif@fangorn /home % sudo du -chs pgdata
1.8G    pgdata
1.8G    total
</pre>
<p>And it's still as fast as your common little webboard-application. I still cannot quite believe it.</p>
