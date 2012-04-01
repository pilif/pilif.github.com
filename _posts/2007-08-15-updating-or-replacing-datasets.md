---
layout: post
title: Updating or replacing datasets
tags:
- database
- performance
- Programming
- solution
- Solutions
- sql
status: publish
type: post
published: true
meta: {}

---
<p>This is maybe the most obvious trick in the world but I see people not doing it all over the place, so I guess it's time to write about it.</p>
<p>Let's say you have a certain set of data you need to enter into your RDBMS. Let's further assume that you don't know whether the data is already there or not, so you don't know whether to use INSERT or UPDATE</p>
<p>Some databases provide us with something like REPLACE or "INSERT OR REPLACE", but others do not. Now the question is, how to do this efficiently?</p>
<p>What I always see is something like this (pseudo-code):</p>
<ol>
 <li>select count(*) from xxx where primary_key = xxx</li>
 <li>if (count > 0) update; else insert;</li>
</ol>
<p>This means that for every dataset you will have to do two queries. This can be reduced to only one query in some cases by using this little trick:</p>
<ol>
 <li>update xxx set yyy where primary_key = xxx</li>
 <li>if (affected_rows(query) == 0) insert;</li>
</ol>
<p>This method just goes ahead with the update, assuming that data is already there (which usually is the right assumption anyways). Then it checks if an update has been made. If not, it goes ahead and inserts the data set.</p>
<p>This means that in cases where the data is already there in the database, you can reduce the work on the database to one single query.</p>
<p>Additionally, doing a SELECT and then an UPDATE essentially does the select twice as the update will cause the database to select the rows to update anyways. Depending on your optimizer and/or query cache, this can be optimized away of course, but there are no guarantees.</p>
