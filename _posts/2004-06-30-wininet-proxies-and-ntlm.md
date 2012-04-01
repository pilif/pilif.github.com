---
layout: post
title: WinInet, Proxies and NTLM
categories:
- Delphi
- Programming
- Solutions
status: publish
type: post
published: true
meta: {}

---
<p>For quite some time now I heard about customers telling me that PopScan seems to be having problems with proxy servers using NTLM authentication. I knew that and I told everyone that this is not supported.</p>

<p>But I could not understand it: Why did it not work. I mean, I went from my own HTTP-Routines to WinInet just to be able to use the system-wide proxy server settings and connections</p>

<p>When using WinInet and <tt>INTERNET_OPEN_TYPE_PRECONFIG</tt> with <tt>InternetOpen</tt>, the whole thing is supposed to just work - as long as IE itself does work. But in my application this wasn't the case and I had no idea why. As soon as NTLM was enabled at the proxy, I was just getting a 407 <tt>HTTP_PROXY_AUTHENTICATION_REQUIRED</tt> status from the proxy, despite the correct password being used
</p>
<p>MSDN was of help (taken from the documentation of <a href="http://msdn.microsoft.com/library/default.asp?url=/library/en-us/wininet/wininet/httpopenrequest.asp">InternetOpenRequest</a>):</p>
<blockquote>
If authentication is required, the INTERNET_FLAG_KEEP_CONNECTION flag should be used in the call to HttpOpenRequest. The INTERNET_FLAG_KEEP_CONNECTION flag is required for NTLM and other types of authentication in order to maintain the connection while completing the authentication process
</blockquote>
<p>I've added this flag (and some more - now that I already was at it), recompiled, tested and -yes- finally it does what it should: It works just out of the box. No more 407, no more entering password for the users. One more thing that switched its state from "not supported" to "supported and working splendidly".</p>

<p>This is with a NTLM-enabled Squid Proxy, but it should work with Microsoft ISA too.</p>
