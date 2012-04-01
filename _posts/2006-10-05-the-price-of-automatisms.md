---
layout: post
title: The price of automatisms
categories:
- Programming
- rant
- sqlite
- wince
status: publish
type: post
published: true
meta: {}

---
<p>Visual Studio 2005 and the .NET Framework 2.0 brought us the concept of table adapters and a nice visual designer for databases allowing you to quickly "write" (point and click) your data access layer.</p>
<p>Even when using the third party SQLite library, you can make use of this facility and it's true: Doing basic stuff works awfully well and quickly.</p>
<p>The problems start when what you intend to do is more complex. Then the tool becomes braindead.</p>
<p>The worst thing about it is that it's tailor-made for SQL-Server and that it insists on parsing your queries instead of letting the database or even the database driver do that.</p>
<p>If you add any feature to your query that is not supported by SQL-Server (keep in mind that I'm NOT working with SQL-Server - I don't even <em>have</em> a SQL-Server installed), the tool will complain about not being able to parse the query.</p>
<p>The dialog provides an option to ignore the error but it doesn't work like I would have hoped it should: "Ignore" doesn't mean: "Keep the old configuration". It means "work as if there wasn't any query at all".</p>
<p>This means that even when you want to do something simple as write "insert or replace" instead of "insert" (saves one query per batch item and I'm doing lots of batch items) or just add a limit clause "limit 20" will make the whole database designer unusable for you.</p>
<p>The ironic thing about the limit clause is that the designer certainly accepts "select top xxx from..." which will fail at run time due to SQLite not supporting that proprietary extension.</p>
<p>So in the end it's back to doing it manually.</p>
<p>But wait a minute: Doing it manually is even harder that it should be because the help, tutorials, books and even google all only talk about the automatic way, either unaware or not caring that it just won't work if you want to do more than example code.</p>
