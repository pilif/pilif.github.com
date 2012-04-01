---
layout: post
title: serialize() output is binary data!
tags:
- PHP
- solutions
- programming
status: publish
type: post
published: true
---
When you call [serialize()](http://www.php.net/serialize) in PHP, to serialize a value into something that you store for later use with [unserialize()](http://www.php.net/unserialize), then be very careful what you are doing with that data.

When you look at the output, you'd be tempted to assume that it's text data:

    php > $a = array('foo' => 'bar');
    php > echo serialize($a);
    a:1:{s:3:"foo";s:3:"bar";}
    php >

and as such, you'd be tempted to treat this as text data (i.e. store it in a TEXT column in your database).

But what looks like text on first glance isn't text data at all. Assume that my terminal is in ISO-8859-1 encoding:

    php > echo serialize(array('foo' => 'bär'));
    a:1:{s:3:"foo";s:3:"bär";}
    
and now assume it's in UTF-8 encoding:
    
    php > echo serialize(array('foo' => 'bär'));
    a:1:{s:3:"foo";s:4:"bär";}
    
You will notice that the format encodes the strings length together with the string. And because PHP is inherently not unicode capable, it's not encoding the strings character length, but its *byte-length*.

unserialize() checks whether the encoded length matches the actual delimited strings length. This means that if you treat the serialized output as text and your databases's encoding changes along the way, that the retrieved string can't be unserialized any more.

I just learned that the hard way (even though it's obvious in hindsight) while migrating [PopScan](http://www.popscan.ch) from ISO-8859-1 to UTF-8:

The databases of existing systems now contain a lot of output from serialize() which was run over ISO strings but now that the client-encoding in the database client is set to utf-8, the data will be retrieved as UTF-8 and because the serialize() output was stored in a TEXT column, it happily gets UTF-8 encoded.

If we remove the database from the picture and express the problem in code, this is what's going on:

    unserialize(utf8encode(serialize('data with 8bit chàracters')));

i.e the data gets altered after serializing and the way it gets altered is a way that unserialize can't deal with the data any more.

So, for everybody else not yet in this dead end:

The output of serialize() is *binary data*. It looks like textual data, bit it isn't. Treat it as binary. If you store it somewhere, make sure that the medium you store it to treats the data as binary. No transformation what so ever must ever be made on it.

Of course, that leaves you with a problem later on if you switch character sets and you have to unserialize, but at least you get to unserialize then. I have to go great lengths now to salvage the old data.
