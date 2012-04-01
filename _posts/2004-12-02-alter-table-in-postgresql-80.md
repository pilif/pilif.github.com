---
layout: post
title: ALTER TABLE in PostgreSQL 8.0
tags:
- Free Software
- Unix
status: publish
type: post
published: true
meta: {}

---
<p>I've just discovered my new favourite feature of the upcoming <a href="http://www.postgresql.org">PostgreSQL 8.0</a>: Let's say, you have forgotten a column when creating the schema of a table. Let's also say there already exist foreign kays referencing this table, so dropping and recreating it with the updated schema from your text-editor won't work (or force you to recreate all other tables too).</p>
<p>So, you need <tt>alter table</tt></p>
<p>Here's what Postgres < 8 needs to add a column <tt>cdate</tt> which must be <tt>not null</tt> and have a default-value of <tt>current_timestamp</tt>:</p>
<pre class="code">
alter table extart_prods add cdate timestamp;
update extart_prods set cdate = current_timestamp;
alter table extart_prods alter column cdate set not null;
alter table extart_prods alter column cdate set default current_timestamp;
</pre>
<p>And here's what it takes to do it in PostgreSQL 8:</p>
<pre class="code">
alter table extart_prods add cdate timestamp not null
    default current_timestamp;
</pre>
<p>When typing this into <tt>psql</tt>, you're so much faster. This is actually the only feature I really missed when going from MySQL to PostgreSQL for all bigger work</p>
<p>Oh and did I mention that in Postgres 8 (currently running Beta 4) the statement is executed noticably faster than in Postgres 7.4 (though this doesn't really matter - you should not be altering production tables anyway)</p>
