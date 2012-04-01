---
layout: post
title: Wasted hours
categories: []

status: publish
type: post
published: true
meta: {}

---
<p>Today I wasted three hours finding a bug in my code: A server-side plugin of our PopScan-Server recently stopped working. Looking at the code, I've quickly seen that some queries to the customers MS SQL-Server seemed to fail.</p>

<p>Nothing helped. I did not even get a message what's going wrong. <tt>mssql_query()</tt> just returned false.</p>

<p>In the end, I created a small, reproducible testcase and reported a bug in PHP. And guess what: It's <a href="http://bugs.php.net/bug.php?id=31243">already fixed</a>.</p>

<p>This seems to have been introduced between 5.0.2 and 5.0.3 which is bad as I had to update because of the recent security problems. I really find it questionable that a security-update can introduce non-related bugs. But that's live. I'm happy for now.</p>

<p>This is the first time in the last 6 years I've been working with PHP so far that I've been hit by a bug in PHP itself in a critical situation. This also is the reason why I wasted three hours searching for the bug in my code instead of going after PHP. I just thrusted PHP more than myself.</p>
