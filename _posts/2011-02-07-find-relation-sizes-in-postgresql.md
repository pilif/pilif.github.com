---
layout: post
title: Find relation sizes in PostgreSQL
categories:
- postgres
- Programming
- Software
- solution
- Solutions
- sql
status: publish
type: post
published: true
meta:
  _flattr_post_language: en_GB
  _flattr_post_category: text
  _flattr_post_hidden: "0"
  _flattr_btn_disabled: ""
  _edit_last: "1"
  _wp_old_slug: ""
---
Like so many times before, today I was yet again in the situation where I wanted to know which tables/indexes take the most disk space in a particular PostgreSQL database.

My usual procedure in this case was to <code>\dt+</code> in psql and scan the sizes by eye (this being on my development machine, trying to find out the biggest tables I could clean out to make room).

But once you've done that a few times and considering that <code>\dt+</code> does nothing but query some PostgreSQL internal tables, I thought that I want this solved in an easier way that also is less error prone. In the end I just wanted the output of \dt+ sorted by size.

The lead to some digging in the source code of psql itself (<code>src/bin/psql</code>) where I quickly found the function that builds the query (<code>listTables</code> in <code>describe.c</code>), so from now on, this is what I'm using when I need to get an overview over all relation sizes ordered by size in descending order:
{% highlight sql %}select
  n.nspname as "Schema",
  c.relname as "Name",
  case c.relkind
     when 'r' then 'table'
     when 'v' then 'view'
     when 'i' then 'index'
     when 'S' then 'sequence'
     when 's' then 'special'
  end as "Type",
  pg_catalog.pg_get_userbyid(c.relowner) as "Owner",
  pg_catalog.pg_size_pretty(pg_catalog.pg_relation_size(c.oid)) as "Size"
from pg_catalog.pg_class c
 left join pg_catalog.pg_namespace n on n.oid = c.relnamespace
where c.relkind IN ('r', 'v', 'i')
order by pg_catalog.pg_relation_size(c.oid) desc;{% endhighlight %}
Of course I could have come up with this without source code digging, but honestly, I didn't know about relkind s, about pg_size_pretty and pg_relation_size (I would have thought that one to be stored in some system view), so figuring all of this out would have taken much more time than just reading the source code.

Now it's here so I remember it next time I need it.
