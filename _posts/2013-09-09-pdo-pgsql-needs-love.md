---
layout: post
title: pdo_pgsql needs some love
categories:
- php
- programming
tags:
- programming
- php
- postgres
status: publish
type: post
published: true
---

Today, [PostgreSQL 9.3 was released](http://www.postgresql.org/about/news/1481/).
September is always the month of PostgreSQL as every September a new
Major Release with awesome new feature is released and every September
I have to fight the urgue to run and immediately update the production
systems to the new version of my
[favorite](/2009/02/all-time-favourite-tools-update/) [toy](/2004/06/all-time-favourite-tools/)

As every year, I want to talk the awesome guys (and girls I hope) that
make PostgreSQL one of my favorite pieces of software overall and for
certain my most favorite database system.

That said, there's another aspect of PostgreSQL that needs some serious
love: While back in the days PHP was known for its robust database
client libraries, over time other language environments have caught up
and long since surpassed what's possible in PHP.

To be honest, the PostgreSQL client libraries as they are currently
available in PHP are in serious need of some love.

If you want to connect to a PostgreSQL database, you have two options:
Either you use the thin wrapper over libpq, the [pgsql extension](http://www.php.net/pgsql),
or you go PDO at which point, you'd use [pdo_pgsql](http://www.php.net/pdo_pgsql)

Both solutions are, unfortunately, quite inadequate solutions that fail
to expose most of the awesomeness that is PostgreSQL to the user:

## pgsql

On the positive side, being a small wrapper around libpq, the pgsql
extension knows quite a bit about Postgres' internals: It has excellent
support for COPY, it knows about a result sets data types (but doesn't
use that knowledge as you'll see below), it has `pg_quote_identifier`
to correctly quote identifiers, it support asynchronous queries and it
supports NOTIFY.

But, while pgsql knows a lot about Postgres' specifics, to this day,
the `pg_fetch_*` functions convert all columns into strings. Numeric
types? String. Dates? String. Booleans? Yes. String too ('t' or 'f',
both trueish values to PHP).

To this day, while the extension supports prepared statements, their
use is terribly inconvenient, forcing you to name your statements and
to manually free them.

To this day, the `pg_fetch_*` functions load the whole result set into
an internal buffer, making it impossible to stream results out to the
client using an iterator pattern. Well. Of course it's still possible,
but you waste the memory for that internal buffer, forcing you to
manually play with DECLARE CURSOR and friends.

There is zero support for advanced data types in Postgres and the
library doesn't help at all with todays best practices for accessing a
database (prepared statements).

There are other things that make the extension unpractical for me, but
they are not the extensions fault, so I won't spend any time explaining
them here (like the lack of support by newrelic - but, as I said,
that's not the extensions fault)

## pdo_pgsql

pdo_pgsql gets a lot of stuff right that the pgsql extension doesn't:
It doesn't read the whole result set into memory, it knows a bit about
data types, preserving numbers and booleans and, being a PDO driver, it
follows the generic PDO paradigms, giving a unified API with other PDO
modules.

It also has good support for prepared statements (not perfect, but
that's PDOs fault).

But it also has some warts:

* There's no way to safely quote an identifier. Yes. That's a PDO
shortcoming, but still. It should be there.
* While it knows about numbers and booleans, it doesn't know about any of the other more advanced data types.
* Getting metadata about a query result actually makes it query the
database - once per column, even though the information is right there
in libpq, available to use (look at the
[source](https://github.com/php/php-src/blob/master/ext/pdo_pgsql/pgsql_statement.c#L571)
of `PDOStatement::getColumnMeta`). This makes it impossible to fix above issue in userland.
* It has zero support for COPY

## If only

Imagine the joy of having a pdo_pgsql that actually cares about
Postgres. Imagine how selecting a JSON column would give you its data
already decoded, ready to use in userland (or at least an option to).

Imagine how selecting dates would at least give you the option of
getting them as a `DateTime` (there's loss of precision though -
Postgres' `TIMESTAMP` has more precision than `DateTime`)

Imagine how selecting an array type in postgres would actually give you
back an array in PHP. The string that you have to deal with now is
notoriously hard to parse. Yes. There now is `array_to_json` in
Postgres, but hat shouldn't be needed.

Imagine how selecting a HSTORE would give you an associative array.

Imagine using COPY with pdo_pgsql for very quickly moving bulk data.

Wouldn't that be fun? Wouldn't that save us from having to type so much
boilerplate all day?

Honestly, what I think should happen is somebody should create a
`pdo_pgsql2` that breaks backwards compatibility and adds all these
features.

Have `getColumnMeta` just return the OID instead of querying the
database. Have a `quoteIdentifier` method (yes. That should be in PDO
itself, but let's fix it where we can).

Have `fetch()` return Arrays or Objects for JSON columns. Have it
return Arrays for arrays and HSTOREs. Have it optionally return
`DateTime`s instead of strings.

Wouldn't that be great?

Unfortunately, while I can write *some* C, I'm not nearly good enough
to produce something that I could live with other people using, so any
progress I can achieve will be slow.

I'm also unsure of whether this would ever have a chance to land in PHP
itself. Internals are very adverse to adding new features to stuff that
already "works" and no matter how good the proposal, you need a very
thick skin if you want to ever get something merged, no matter whether
you can actually offer patches or not.

Would people be using an external pdo_pgsql2? Would it have a chance as
a pecl extension? Do other people see a need for this? Is somebody
willing to help me? I really think something needs to be done and I'm
willing to get my hands dirty - I just have my doubts about the quality
of the result I'm capable of producing. But I can certainly try.

And I will.
