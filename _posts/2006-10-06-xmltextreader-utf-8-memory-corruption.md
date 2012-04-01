---
layout: post
title: XmlTextReader, UTF-8, Memory Corruption
categories:
- feeling
- Programming
- rant
- solution
- wince
status: publish
type: post
published: true
meta: {}

---
<p>XmlTextReader on the .NET CF doesn't support anything but UTF-8 which can be a good thing as it can be a bad thing.</p>
<p>Good thing because UTF-8 is a very flexible character encoding giving access to the whole Unicode character range while still being compact and easy to handle.</p>
<p>Bad thing because PopScan doesn't do UTF-8. It was just never needed as its primary market is countries well within the range of ISO-8859-1. This means that the protocol between server and client so far was XML encoded in ISO-8859-1.</p>
<p>To be able to speak with the Windows Mobile application, the server had to convert the data to UTF-8.</p>
<p>And this is where a small bug occurred: Part of the data wasn't properly encoded and was transmitted as ISO-8859-1.</p>
<p>The correct thing a XML-Parser should do about obviously incorrect data is to bail out, which also is what the .NET CF DOM parser did.</p>
<p>XmlTextReader did something else though: It threw an uncatchable IndexOutOfRange exception either in Read() or ReadString(). And sometimes it miraculously changed its internal state - jumping from element to element even when just using ReadString().</p>
<p>To make things even worse, the exception happened at a location not even close to where the invalid character was in the stream.</p>
<p>In short, from what I have seen (undocumented and uncatchable exceptions being thrown at random places), it feels like the specific invalid character that was parsed in my particular situation caused memory corruption somewhere inside the parser.</p>
<p>Try to imagine how frustrating it was to find and fix this bug - it felt like the old days of manual memory allocation combined with stack corruption. And all because of one single bad byte in a stream of thousands of bytes.</p>
