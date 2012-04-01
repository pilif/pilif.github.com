---
layout: post
title: PostgreSQL 7.3 - it works
categories:
- Free Software
status: publish
type: post
published: true
meta: {}

---
I've installed the new release of my favourite database, <a href="http://www.postgresql.org">PostgreSQL</a> today and I can happily announce that the upgrade from 7.2.3 went without any problems (a strange thing to announce when having my luk with software in mind ;-).

I've not yet had the time to check out all the wonderful new features (Schemas, Domains, a very extended ALTER TABLE and much more), but I will try it somewhere this week.

What I've noticed during the update: The current <a href="http://www.webmin.com/">Webmin</a>-Module (1.030) for administering Postgres' users does not work with the current format of <tt>pg_hba.conf</tt> but editing the file by hand is quite straightforward - more so because of the very extensive comments in the file.
