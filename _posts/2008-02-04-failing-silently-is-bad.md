---
layout: post
title: Failing silently is bad
categories:
- databases
- Software
- typo3
- unicode
- webdev
status: publish
type: post
published: true
meta: {}

---
<p>Today, I've experienced the perfect example of why I prefer <a href="http://www.postgresql.org">PostgreSQL</a> (congratulations for a successful 8.3 release today, guys!) to <a href="http://www.mysql.com">MySQL</a>.</p> <p>Let me first give you some code, before we discuss it (assume that the data which gets placed in the database is - wrongly so - in ISO-8859-1):</p> <p>This is what PostgreSQL does:</p><pre class="code">bench ~ &gt; <strong>createdb -Upilif -E utf-8 pilif</strong>
CREATE DATABASE
bench ~ &gt; <strong>psql -Upilif</strong>
Welcome to psql 8.1.4, the PostgreSQL interactive terminal.

Type:  \copyright for distribution terms
       \h for help with SQL commands
       \? for help with psql commands
       \g or terminate with semicolon to execute query
       \q to quit

pilif=&gt; <strong>create table test (blah varchar(20) not null default '');</strong>
CREATE TABLE
pilif=&gt; <strong>insert into test values ('gnügg');</strong>
ERROR:  invalid byte sequence for encoding "UTF8": 0xfc676727293b
pilif=&gt;
</pre>
<p>and this is what MySQL does:</p><pre class="code">bench ~ &gt; <strong>mysql test</strong>
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 97
Server version: 5.0.44-log Gentoo Linux mysql-5.0.44-r2

Type 'help;' or '\h' for help. Type '\c' to clear the buffer.

mysql&gt; <strong>create table test( blah varchar(20) not null default '')</strong>
    -&gt; <strong>charset=utf8;</strong>
Query OK, 0 rows affected (0.01 sec)

mysql&gt; <strong>insert into test values ('gnügg');</strong>
Query OK, 1 row affected, 1 warning (0.00 sec)

mysql&gt; <strong>select * from test;</strong>
+------+
| blah |
+------+
| gn   |
+------+
1 row in set (0.00 sec)

mysql&gt;
</pre>
<p>Obvisouly it is wrong to try and place latin1 encoded data in an utf-8 formatted data store: While every valid utf-8 byte sequence is a valid latin1 byte sequence (latin1 does not restrict the validity of bytes, though some positions may be undefined), the reverse certainly is not true. The character ü from my example is 0xfc in latin1 and U+00fc in unicode which must be encoed as 0xc3 0xbc in utf-8. 0xfc alone is <em>no valid utf-8 byte sequence</em>.</p>
<p>So if you pass this invalid sequence to any entity accepting an utf-8 encoded byte stream, it will not be clear what to do with that data. It's not utf-8, that's for sure. But assuming that no character set is specified with the stream, it's impossible to guess what to translate the byte sequence into.</p>
<p>So PostgreSQL sees the error and bails out (if both the server and the client are set to utf-8 encoding and data is sent in non-utf8-format - otherwise it knows how to convert the data - conversion from any character set <strong>to</strong> utf-8 is possible all the time). MySQL on the other hand decides to fail silently and to try to fix up the invalid input.</p>
<p>Now while I could maybe live with the default of assuming latin1 encoding, just stopping to process the data without warning what so ever leads to <em>undetected loss of data</em>!</p>
<p>What if I'm not just entering one word? What if it's a blog-entry like this one? What if the entry is done by a non tech-savvy user? Remember: This mistake can easily be produced: Wrong Content-Type headers, old browsers, broken browsers... it's very easy to get Latin1 when you want utf-8. </p>
<p>While I agree that sanitization <em>must be done in the application tier</em> (preferably on the model), it's <strong>inacceptable</strong> for a database application to store different data than what it was ordered to store without warning the user in any way. This easily leads to data loss or data corruption.</p>
<p>There are many more little things like this where MySQL decides to silently fail where PostgreSQL (and any other database) bail out correctly. As a novice this can feel tedious for you. It can feel like PostgreSQL is pedantic and like you are faster with MySQL. But let's be honest: What do you prefer? An error message or lost data with no way of knowing that it's lost?</p>
<p>This, by the way, is the outcome of a lengthy debugging session on a Typo3 installation, which also, but not ultimately is to blame here. In a perfect world, MySQL would bail out, but Typo3 would either</p>
<ul>
<li>Not specify charset=utf8 when creating the table unless specifically asked to.
<li>Send a charset=utf-8 http-header, knowing that the database has been created as containing utf-8
<li>Sanitize user input before handing it over to the mysql-backend which is obviously broken in this instance.</li></ul>
<p>Now back to debugging real software on real databases *grin*</p>
