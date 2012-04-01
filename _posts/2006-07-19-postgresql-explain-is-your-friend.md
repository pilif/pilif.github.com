---
layout: post
title: "PostgreSQL: Explain is your friend"
tags:
- Software
status: publish
type: post
published: true
meta: {}

---
<p>Batch updates to a database are a tricky thing because of multiple aspects. For one, many databases are optimized for fast read access (though not as optimized as say LDAP). Then, when you are importing a lot of data, you are changing the structure of the data already in there which means that it's very well possible that the query analyzer/optimizer has to change its plan in mid-batch. Also, even if a batch import is allowed to take a few minutes when running in the background, it must not take too long either.</p>
<p><a href="http://www.popscan.ch">PopScan</a> often relies heavily on large bulk imports into its database: As the applications feature set increased in time, it has become impossible to match all of the applications features to a database which may already be running at the vendors side.</p>
<p>And sometimes, there is no database to work with. Sometimes, you're getting quite rough exports from whatever legacy system may be working at the other end.</p>
<p>All this is what forces me to work with large bulk amounts of data coming in in one of many possible formats: Other databases, text files, XML files, you name it.</p>
<p>Because of a lot of bookkeeping and especially tracking of changes in the data to allow to synchronize only changed datasets to our external components (Windows Client, Windows CE Scanner), I can't just use COPY to read in a complete dump. I have to work with UPDATE/INSERT which doesn't exactly help at speeding up the process.</p>
<p>Now what's interesting is how indexes come into play when working with bulk transfers: I had it both now: Sometimes it's faster if you drop them before starting the bulk process. Sometimes you must not drop them if you want the process to finish this century.</p>
<p><tt>EXPLAIN</tt> (and <tt>top</tt> - if your postgres process is sitting there with constant 100% CPU usage, it's full-table-scanning) is your friend in such situations. That and an open eye. Sometimes, like yesterday, it was obvious that something was going wrong: That particular Import I was working with slowed down the more data it processed. We all know: If speed is dependent of the quantity of data, something is wrong with your indexes.</p>
<p>Funny thing was: There was one index too many in that table: The primary key.</p>
<p>The query optimizer in PostgreSQL thought that using the primary key for one condition and then filtering for the other conditions was faster. But it was dead wrong as the condition on which I checked the primary key yielded more data with every completed dataset.</p>
<p>That means that PostgreSQL had to sequentially scan more and more data with every completed dataset. Using the other index, one I specifically made for the other conditions to be checked, always would have yielded a constant amount of datasets (one to four) so filtering after the PK condition <em>after</em> using that other index would have been much faster. And constant in speed even with increasing amounts of imported datasets.</p>
<p>This is one of the times when I wish PostgreSQL had a way how to tell the optimizer what to do. To tell it: "Take index a for these conditions. Then filter after that condition.".</p>
<p>The only way to accomplish that so far is to drop the index that was used by accident. It's just that it feels bad, dropping primary keys. But here it was the only solution. To PostgreSQL's defense, let me add though: My 8.1 installation took the right approach. It was the 7.3 installation that screwed here.</p>
<p>OK. So just drop the indexes when making a bulk import. Right? Wrong.</p>
<p>Sometimes, you get a full dump to import, but you want to update only changed datasets (to mark only the ones that actually changed as updated). Or you get data which is said to have a unique key, but which doesn't. Or you get data which is said to have a foreign key, but which violates it.</p>
<p>In all these cases, you have to check your database for what's already there before you can actually import your dataset. Otherwise you wrongly mark a set as updated, or your transaction dies because of a primary key uniqueness violation or because of a foreign key violation.</p>
<p>In such cases, you <strong>must not</strong> remove the index your database would use in your query to check if something is already there.</p>
<p>Belive me: The cost of updating the index on each insert is MUCH lower than the cost of doing a full table scan on every dataset you are trying to import ;-)</p>
<p>So in conclusion let me tell this:</p>
<ul>
    <li>Bulk imports are interesting. Probably even more interesting than complex data selection queries.</li>
    <li>EXPLAIN is your best friend. Learn how to read it. Learn it now.</li>
    <li>So-called "rules of thumb" don't apply all the time.</li>
    <li>There are few things in life that beat the feeling of satisfaction you get after staring at the output for EXPLAIN for sometimes hours and optimizing the queries/indexes in question countless times, when your previously crawling imports begin to fly.</li>
</ul>
