---
layout: post
title: lighttpd, .NET, HttpWebRequest
categories:
- Programming
- Solutions
status: publish
type: post
published: true
meta: {}

---
<p>Yesterday, when I deployed the server for my PocketPC-Application to an environment running <a href="http://www.lighttpd.net">lighttpd</a> and PHP with FastCGI SAPI, I found out that the communication between the device and the server didn't work.</p>
<p>All I got on the client was an Exception because the server sent back error 417: Precondition failed.</p>
<p>Of course there was nothing in lighttpd's error log, which made this a job for <strike>Ethereal</strike><a href="http://www.wireshark.org/">Wireshark</a>.</p>
<p>The response from the server had no body explaining what was going on, but in the request-header, something interesting was going on:</p>
<pre class="code">
Expect: 100-continue
</pre>
<p>Additionally, the request body was empty.</p>
<p>It looks like HttpWebRequest, with the help of the compact framework's ServicePointManager is doing something really intelligent which lighttpd doesn't support:</p>
<p>By first sending the POST request with an empty body and that <tt>Expect: 100-continue</tt>-header, HttpWebRequest basically gives the server the chance to do some checks based on the request header (like: Is the client authorized to access the URL? Is there a resource available at that URL?) without the client having to transmit the whole request body first (which can be quite big).</p>
<p>The idea is that the server does the checks based on the header and then either sends a error response (like 401, 403 or 404) or it advises the client to go ahead and send the request body (code 100).</p>
<p>Lighttpd doesn't support this, so it sends that 417 error back.</p>
<p>The fix is to set <a href="http://msdn.microsoft.com/library/default.asp?url=/library/en-us/cpref/html/frlrfsystemnetservicepointmanagerclassexpect100continuetopic.asp">Expect100Continue</a> of <tt>System.Net.ServicePointManager</tt> to false before getting a HttpWebRequest instance.</p>
<p>That way, the .NET Framework goes back to plain old POST and sends the complete request body.</p>
<p>In my case that's no big disadvantage because if the server is actually reachable, the requested URL is guaranteed to be there and ready to accept the data on HTTP-level (of course there may be some errors on the application level, but there has to be a request body for them to be detected).</p>
