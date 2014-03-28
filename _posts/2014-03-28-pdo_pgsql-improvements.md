---
layout: post
title: pdo_pgsql improvements
categories:
- programming
- php
- postgres
tags:
- programming
- php
- postgres
status: publish
type: post
published: true
---

Last autumn, I was [talking about](/2013/09/pdo-pgsql-needs-love) how I would
like to see pdo_pgsql for PHP to be improved.

Over the last few days I had time to seriously start looking into making sure
I get my wish. Even though my C is very rusty and I have next to no
experience in dealing with the PHP/Zend API, I made quite a bit of progress
over the last few days.

First, JSON support

![screenshot showing off json support](/assets/images/json.png)

If you have the json extension enabled in your PHP install (it's enabled by
default), then any column of data type `json` will be automatically parsed
and returned to you as an array.

No need to constantly repeat yourself with `json_parse()`. This works, of
course, with directly selected json columns or with any expression that
returns json (like `array_to_json` or the direct typecast shown in the
screenshot).

This is off by default and can be enabled on a per-connection or a per-
statement level as to not break backwards compatibility (I'll need it off
until I get a chance to clean up PopScan for example).

Next, array support:

![screenshot showing off array support](/assets/images/array.png)

Just like with JSON, this will automatically turn any array expression (of the
built-in array types) into an array to use from PHP.

As I'm writing this blog entry here, this only works for `text[]` and it's
always enabled.

Once I have an elegant way to deal with the various types of arrays and
convert them into the correct PHP types, I'll work on making this
turnoffable (technical term) too.

I'll probably combine this and the automatic JSON parsing into just one
setting which will include various extended data types both Postgres and PHP
know about.

Once I've done that, I'll look into more points on my wishlist (better error
reporting with 9.3 and later and a way to quote identifiers comes to mind) and
then I'll probably try to write a proper RFC and propose this for inclusion
into PHP itself (though don't get your hopes up - they are a conservative
bunch).

If you want to follow along with my work, have a look at my
[pdo_pgsql-improvements](https://github.com/pilif/php-src/tree/pdo_pgsql-improvements)
branch on github (tracks to PHP-5.5)
