---
layout: post
title: Somewhere around 9588...
categories: []

status: publish
type: post
published: true
meta: {}

---
<p>OK. This has a definite technical reason and is neither wrong nor in any other way special. It's just funny and reminds me of school where in a short presentation, someone did the same thing, so I though I can pot it anyway...</p>
<p>In <a href="http://www.postgresql.org">PostgreSQL</a> you can help the query optimizer to do it's work even better by calling "VACUUM ANALYZE" - especially after inserting tons and tons of data.</p>
<p>I did that and found this status message:</p>
<pre class="code">
INFO:  "art_pf": 209 pages, 3000 rows sampled, 9588 estimated total rows
</pre>
<p>What's funny about that is that PostgreSQL actually counted the rows (I did a full analyze) and still talks about having estimated the count. And 9588 definitely is not what we humans call an estimation. When we estimate we talk in tens or even hunderts like "9000 estimated total rows or so".
</p>
<p>In the presentation I talked about at the beginning, the colleague of mine talked about a weather station "<em>about</em> 987.6 meters over sea level" which falls into the same category ;-)</p>
