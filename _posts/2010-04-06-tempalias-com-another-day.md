---
layout: post
title: tempalias.com - another day
categories:
- Free Software
- javascript
- nodejs
- Programming
- tempalias
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
This is the second installment of an article series about creating a web service for self-destructing email aliases. <a href="/2010/04/tempalias-com-development-diary/">Read part 1 here</a>.

Today, I spent a lot of thought and experimentation with two issues:
<ol>
	<li>How would I name and identify the temporary aliases?</li>
	<li>How would I store the temporary aliases</li>
</ol>
Naming and identifying sounds easy. One is inclined to just use an incrementing integer or something alike. But that won't work for security reasons. If the address you got is 12@tempalias.net, with any likelyhood, there will be an 11@ and a 13@.

Using that information, you could easily bring the whole service down (and endlessly annoy its users) by requesting an address to get the current ID and then sending a lot of mail to the neighboring IDs. If those were created without a mail count limitation, then you could spam the recipient for the whole validity period and if they were created with a count limitation, you could use up all allowed mails.

So the aliases need to be random.

Which leads to the question of how to ensure uniqueness.

Unique random numbers you ask? Isn't this what UUIDs were invented for?

True. But considering the length of an UUID, would you really want to have an alias in the form e8ea98ce-dabc-42f8-8fcd-c50d20b1f2c5@tempalias.net? That address is so long that it might even hit some length limitation of the target site, which of course is true even if you apply cheap tricks like removing the dashes.

Of course, using base16 to encode an UUID (basically an 128 bit integer) is hopelessly inefficient. By increasing the amount of characters we use, we might be able to decrease the amount of characters.

Keep in mind though, that the string in question is to be a local part of an email address and those tend to be case insensitive with not much guarantees that case is preserved over the process of delivering the message.

That, of course, limits the amount of characters we can use to basically 0-9 and A-Z (plus a few special characters like + . - and _).

This is what <a href="http://en.wikipedia.org/wiki/Base32">Base32</a> was invented for, but unfortunately, a base32 encoded UUID would still be around 26 characters in length. While that's a bit better, I still wouldn't want the email address scheme to be eda3u3rzcfer3fztdvvd6xnd3i@tempalias.com

So in the end, we need something way smaller (adding + . - and _ to the character space wouldn't help much - what comes out is about 20 characters in length).

In the end, I would probably have to create a elaborate scheme doing something like this:
<ul>
	<li>pick a UUID. Use the first n bytes.</li>
	<li>base32 encode.</li>
	<li>Check whether that ID is free. If not, add 1 to n and try again.</li>
	<li>Keep n around so that in the future, we can already start with taking bigger chunks.</li>
</ul>
So the moment we reach the first collision, we increase the keyspace eight-fold. That feels sufficiently safe from collisions to me, but of course it increases the maintenance burden somewhat.

The next question was how to get UUIDs and how to base32 encode them from JavaScript.

I tried different aspects, one of which even included using <a href="http://bitbucket.org/nikhilm/uuidjs/">uuidjs</a> and doing the b32 encoding/decoding in C. The good part about that: I now have a general idea of how to extend nodejs with C++ code (yeah. it has to be C++ and my b32 code was C, so I had to do a bit of trickery there too).

In the end though, considering that I can't use UUIDs anyways, we can go forward using <a href="http://www.broofa.com/Tools/Math.uuid.js">Math.uuid.js</a> and use their call using both len and radix (with the additional change of only using lowercase to encode the data), increasing the length as we hit collisions.

So the next issue is storage: How to store the alias data? How to access it?

This will be part of the next posting here.
