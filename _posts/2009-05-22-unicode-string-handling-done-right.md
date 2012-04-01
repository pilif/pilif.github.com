---
layout: post
title: (Unicode-)String handling done right
tags:
- opinion
- Opinions
- Programming
- python
- unicode
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
Today, found myself reading the <a href="http://diveintopython3.org/strings.html">chapter about strings</a> on <a href="http://diveintopython3.org">diveintopython3.org</a>.

Now, I'm no Python programmer by any means. Sure. I know my share of Python and I really like many of the concepts behind the language. I have even written some smaller scripts in Python, but it's not my day-to-day language.

That chapter about string handling really really impressed me though.

In my opinion, handling Unicode strings they way python 3 is doing is exactly how it should be done in every development environment: Keep strings and collections of bytes completely separate and provide explicit conversion functions to convert from one to the other.

And hide the actual implementation from the user of the language! A string is a collection of characters. I don't have to care how these characters are stored in memory and how they are accessed. When I need that information, I will have to convert that string to a collection of bytes, giving an explicit encoding how I want that to be done.

This is exactly how it should work, but implementation details leaking into the language are mushing this up in every other environment I know of making it a real pain to deal with multibyte character sets.

Features like this is what convinces me to look into new stuff. Maybe it IS time to do more python after all.
