---
layout: post
title: PostgreSQL scales
tags:
- Free Software
status: publish
type: post
published: true
meta: {}

---
<p>Via <a href="http://people.planetpostgresql.org/xzilla/index.php?/archives/111-Thoughts-on-FeedLounge-Switching-to-PostgreSQL.html">zillablog</a>, I was notified of <a href="http://feedlounge.com/blog/2005/11/20/switched-to-postgresql/">FeedLounge switching to PostgreSQL</a></p>
<p>FeedLounge is just another in a serious of webbased services switching their RDBMS away from MySQL.</p>
<p>For one thing, it's the features that's driving this. Postgres just has more features and sometimes, you need to have them. Triggers? Views? Until very recently, those features were not available with MySQL.</p>
<p>And when they switch, they notice another thing: <a href="http://www.postgresql.org">PostgreSQL</a> scales very well.</p>
<p>While everyone says that MySQL is optimized for speed and that there's no database system as fast as MySQL, this is only true for small setups.</p>
<p>In small setups MySQL scores with its ease of use and administration. But as soon as you want more (more features, more users accessing), you will run into MySQL's limitations and - even more important: MySQL will slow down, it will use lots of RAM and disk space and it even will begin to <a href="http://www.google.com/search?hl=en&q=myi+error">corrupt it's tables</a> (a thing a RDBMS should never ever do - not even in case of broken hardware though that's unavoidable).</p>
<p>PostgreSQL does not have these flaws. It may be a little bit slower under low load, but it speed and reliability scales with its users.</p>
<p>PostgreSQL scales.</p>
