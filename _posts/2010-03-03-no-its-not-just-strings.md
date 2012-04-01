---
layout: post
title: "No. It's not \xC2\xABjust\xC2\xBB strings"
tags:
- encoding
- Programming
- Software
- strings
- unicode
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
On <a href="http://news.ycombinator.com/item?id=1162122">Hacker News</a>, I came across <a href="http://github.com/candlerb/string19/raw/47b0cba0a2047eca0612b4e24a540f011cf2cac3/soapbox.rb">this rant about strings</a> in Ruby 1.9 where a developer was complaining about the new string handling in Ruby. Now, I'm no Ruby developer by even a long shot, but I am really interested in strings and string encoding which is why I posted the following comment which I reprint here as it's too big to just be a comment:

Rants about strings and character sets that contain words of the following spirit are usually neither correct nor worth of any further thought:
<blockquote>It's a +String+ for crying out loud!  What other language requires you to understand this
level of complexity just to work with strings?!</blockquote>
Clearly the author lives in his ivory tower of English language environments where he is able to use the word "just" right next to "strings" and he probably also can say that he "switched to UTF-8" without actually really having done so because the parts of UTF-8 he uses work exactly the same as the ASCII he used before.

But the rest of the world works differently.

Data can appear in all kinds of encodings and can be required to be in different other kinds of encodings. Some of those can be converted into each other, others can't.

Some Japanese encodings (Ruby's creator is Japanese) can't be converted to a unicode representation for example.

Nowadays, as a programming language, you have three options of handling strings:

1) pretend they are bytes.

This is what older languages have done and what Ruby 1.8 does. This of course means that your application has to keep track of encodings. Basically for every string you keep in your application, you need to also keep track what it is encoded in. When concatenating a string of encoding a to another string you already have that is in encoding b, you must do the conversion manually.

Additionally, because strings are bytes and the programming language doesn't care about encoding, you basically can't use any of the built-in string handling routines because they assume each byte representing one character.

Of course, if you are one of these lucky english UTF-8 users, getting data in ASCII and english text in UTF-8, you can easily "switch" your application to UTF-8 by still pretending strings to be bytes because, well, they are. For all intents and purposes, your UTF-8 is just ASCII called UTF-8.

This is what the author of the linked post wanted.

2) use an internal unicode representation

This is what Python 3 does and what I feel to be a very elegant solution if it works for you: A String is just a collection of Unicode code points. Strings don't worry about encoding. String operations don't worry about it. Only I/O worries about encoding. So whenever you get data from the outside, you need to know what encoding it is in and then you decode it to convert it to a string. Conversely, whenever you want to actually output one of these strings, you need to know in what encoding you need the data and then encode that sequence of Unicode code points to any of these encodings.

You will never be able to convert a bunch of bytes into a string or vice versa without going through some explicit encoding/decoding.

This of course has some overhead associated with it, as you always have to do the encoding and because operations on that internal collection of unicode code points might be slower than the simple array-of-byte-based approach, especially if you are using some kind of variable-length encoding (which you probably are to save memory).

Interestingly, whenever you receive data in an encoding that cannot be represented with Unicode code points and whenever you need to send out data in that encoding, then, <strong>you are screwed</strong>.

This is a defficiency in the Unicode standard. Unicode was specifically made so that it can be used to represent every encoding, but it turns out that it can't correctly represent some Japanese encodings.

3) The third option is to store an encoding with each string and expose both the strings contents and the encoding to your users

This is what Ruby 1.9 does. It combines methods 1 and 2: It allows you to chose whatever internal encoding you need, it allows you to convert from one encoding to the other and it removes the need to externally keep book of every strings encoding because it does that for you. It also makes sure that you don't intermix encodings, but I'm getting ahead of myself.

You can still use the languages string library functions because they are aware of the encoding and usually do the right thing (minus, of course, bugs)

As this method is independent of the (broken?) Unicode standard, you would never get into the situation where just reading data in some encoding makes you unable to write the same data back in the same encoding as in this case, you would just create a string using this problematic encoding and do your stuff on that.

Nothing prevents the author of the linked post to use Ruby 1.9's facility to do exactly what Python 3 does (of course, again, ignoring the Unicode issue) by internally keeping all strings in, say, UTF-16 (you can't keep strings in "Unicode" - Unicode is no encoding - but that's for another post). You would transcode all incoming and outgoing data to and from that encoding. You would do all string operations on that application-internal representation.

A language throwing an exception when you concatenate a Latin 1-String to a UTF-8 string is <em>a good thing</em>! You see: Once that concatenation happened by accident, it's really hard to detect and fix.

At least it's fixable though because not every Latin1-String is also a UTF-8 string. But if it so happens that you concatenate, say Latin1 and Latin8 by accident, then you are really screwed and there's no way to find out where Latin1 ends and Latin8 begins as every valid Latin 1 string is also a valid Latin 8 string. Both are arrays of bytes with values between 0 and 255 (minus some holes).

In todays small world, you <em>want</em> that exception to be thrown.

In conclusion, what I find really amazing about this complicated problem of character encoding is the fact that nobody feels it's complicated because it usually just works - especially method 1 described above that has constantly been used in years past and also is very convenient to work with.

<span style="color: #000000;">Also, it still works.

Until your application leaves your country and gets used in countries where people don't speak ASCII (or Latin1). Then all these interesting problems arise.

Until then, you are annoyed by every of the methods I described but method 1.

Then, you will understand what great service Python 3 has done for you and you'll switch to Python 3 which has very clear rules and seems to work for you.

And then you'll have to deal with the japanese encoding problem and you'll have to use binary bytes all over the place and have to stop using strings altogether because just reading input data destroys it.

And then you might finally see the light and begin to care for the seemingly complicated method 3.

</span>
