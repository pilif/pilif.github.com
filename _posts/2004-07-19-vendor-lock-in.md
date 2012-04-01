---
layout: post
title: Vendor lock-in
tags:
- Opinions
status: publish
type: post
published: true
meta: {}

---
<blockquote>
But, as Tom Kyte points out in his latest book, Effective Oracle by Design (Oracle Press), database dependence should be your real goal because you maximize your investment in that technology. If you make generic access to Oracle, whether through ODBC or Perl's DBI library, you'll miss out on features other databases don't have. What's more, optimizing queries is different in each database.
</blockquote>
<p>
Needless to say on what vendors webpage I've seen <a href="http://otn.oracle.com/pub/articles/hull_asp.html?_template=/ocom/technology/content/print">the article</a> the quote is coming from.  One thing you learn in the practical live is that it's extremely difficult to switch databases one you begin using the proprietary features. And you <strong>will</strong> have to switch. Sooner or later. Be it unsufficient functionality (as I've seen it with MySQL. I am still cursing the day when I began using SETs) or vendors going out of service or even political reasons.</p>
<p>While I certainly see some value in using proprietary features, let me tell you: Use them with care. Always be on the lookout for the availability of different approaches to do the same thing. If there are none, don't do it (don't use SETs in MySQL for example).</p>
<p>And if you can only get the full performance out of your RDBMS by relying on proprietary features, don't use the RDBMS at all as it's quite obviously not the right system. Performance must be available without being forced to use proprietary features. At least without relying on features in the query language itself - optimizations in the backend are ok for me.</p>
<p>This is one of the reasons I don't use oracle, by the way. The other being <a href="http://www.gnegg.ch/archives/138-All-time-favourite-Tools.html">this</a> ;-)</p>
