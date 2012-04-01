---
layout: post
title: "The return of Expect: 100-continue"
categories:
- http
- lighttpd
- PHP
- Solutions
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
<p>Yesterday I had to work with a PHP-application using the CURL library to send a HTTP POST request to a <a href="http://www.lighttpd.net/">lighttpd server</a>.</p>
<p>Strangely enough I seemed unable to get anything back from the server when using PHP and I got the correct answer when I was using wget as a reference.</p>
<p>This made me check the lightpd log and I <a href="/2006/09/lighttpd-net-httpwebrequest/">once more</a> (I recommend you to read that entry as this is very much dependent on it) came across the friendly error 417</p>
<p>A quick check with <a href="http://www.wireshark.org/">Wireshark</a> confirmed: curl was sending the Expect: 100-continue header.</p>
<p>Personally, I think that 100-continue thing is a good thing and it even seems to me that the curl library is intelligent about it and only does that thing when the size of the data to send is larger than a certain threshold.</p>
<p>Also, even though people are complaining about it, I think lighttpd does the right thing. The expect-header is mandatory and if lighttpd doesn't support this particular header, the error 417 is the only viable option.</p>
<p>What I think though is that the libraries should detect that automatically.</p>
<p>This is because they are creating a behavior that's not consistent to the other types of request: GET, DELETE and HEAD requests all follow a fire-and-forget paradigm and the libraries employ a 1:1 mapping: Set up the request. Send it. Return the received data.</p>
<p>With POST (and maybe PUT), the library changes that paradigm and in fact sends two request to the wire while actually pretending in the interface that it's only sending one request.</p>
<p>If it does that, then it should at least be capable enough to handle the cases where their scheme of transparently changing semantics breaks.</p>
<p>Anyways: The fix for the curl-library in PHP is:</p>
<pre class="code">curl_setopt($ch, CURLOPT_HTTPHEADER, array('Expect:'));</pre>
<p>Though I'm not sure how pure this solution is.</p>
