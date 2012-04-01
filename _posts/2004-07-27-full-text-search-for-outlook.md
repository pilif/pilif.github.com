---
layout: post
title: Full text search for outlook
tags:
- Software
status: publish
type: post
published: true
meta: {}

---
<p>
As you <a href="http://www.gnegg.ch/archives/63-Each-problem-has-a-solution....html">may know</a>, we are using Exchange and Outlook for our Email and groupware needs. The thing just works and has some really useful groupware features while - in contrast to all those PHP-solutions - still being well integrated in the usual working area (read: has a windows client). And even better: Using Outlook / Exchange, even synchronizing the PDA works out of the box without that much of tweaking.
</p>
<p>But with all this greatness, there are two problems: First, Outlook is not what I'd call a <a href="http://www.gnegg.ch/archives/34-Mail-for-Windows-as-I-like-it.html">good email client</a>, but it gets near. I still can't use it for mailinglist consumption (bad threading, no qote highlighting,...), but for the rest it's usable. The second problem is the search function. It's so incredibly slow, even when you create a full text index on the Exchange-Server (without it's even slower). And besides being slow, it looks like it's searching forwards. When I enter some search term, it walks through the messages from the oldest to the nweset which is quite inpractical</p>

<p>So for reading mailinglists and for searching, I used <a href="http://www.mozilla.org/products/thunderbird/">Thunderbird</a></p>

<p>Then I found <a href="http://www.lookoutsoft.com/Lookout/">Lookout</a> which was recently bought by Microsoft and released as freeware. This wonderful Outlook Add-In builds a fulltext index of all your Outlook folders and actually uses it (in contrast to outlook and the indexes on the exchange server). Additionally it has quite a powerful query language.</p>

<p>And with "fast" I mean <b>fast</b>: It takes just about 0.1 seconds to search my about 33'000 mails for this one message containing a certain word. This is great.</p>

<p>I've actually only two small problems with the tool:</p>

<ol>
 <li>It uses the .NET Framework which must be loaded each time I start Outlook. This increases the already long startup time</li>
 <li>It uses it's own window to display the search result. Outlook's "Look for" function does this better and reuses the message list.</li>
</ol>
<p>Besides that: Great tool!</p>
