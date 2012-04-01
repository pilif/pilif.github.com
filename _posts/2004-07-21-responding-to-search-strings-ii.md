---
layout: post
title: Responding to  search-strings (II)
categories:
- Delphi
- Programming
status: publish
type: post
published: true
meta: {}

---
While looking through the logfile analysis of gnegg.ch I saw that someone came to this site searching with

<blockquote>
set ie proxy delphi
</blockquote>

<p>so I deceided that it's time for anther episode of "Responding to  search-strings" (the other being <a href="http://www.gnegg.ch/archives/89-Responding-to-search-strings.html">here</a>). This time it's about setting the IE's proxy server from a delphi application.</p>

<p>When you do it manually, you access the proxy server settings from Tools / Internet Options / Connections in Internet Explorer. Whatever you change there, is used not only by IE, but by every application on your system using the WinInet API function <a href="http://msdn.microsoft.com/library/default.asp?url=/library/en-us/wininet/wininet/internetopen.asp">InternetOpen</a> with the flag <tt>INTERNET_OPEN_TYPE_PRECONFIG</tt> set. Additionally, many applications use the WinInet-API to get the Proxy Server settings and then use their own routines to actually connect to the server via the proxy they got before</p>

<p>So, if you want to change the Internet Explorer Proxy settings, you actually change it for the bigger part of the wohle system</p>

<p>When you go to Tools / Internet Options / Connections, you will immediately see that setting the proxy is going to be quite a task: You don't just set one proxy server, you actually set one for LAN-Connections and one for each dialup connection that is installed on your system. Finally the proxy being used depends on the state of the radio buttons you see in the middle of the dialog because they define whether IE should even bother connecting to the LAN or just call one of the connections defined.</p>

<p>But it gets even more complicated: The proxy settings provided changed for each version of Internet Explorer. As always, it was an evolutionary process getting more complex in every iteration, so you will have to cope with that too.</p>

<p>But now to the details: While the settings are stored in the Registry, this is not the recommended way for changing them. Microsoft has created some API functions specifically for that, so you should use them as this is the only way guaranteed to be portable even for future versions of Windows.</p>

<p>The problem: The API is very painful to use - even more so because it is somewhat different for each version of IE (getting more complex along the proxy feature itself). Oh, and please don't ask me how to get the version of the installed IE - that I do not know.</p>

<p>All is about <a href="http://msdn.microsoft.com/library/default.asp?url=/library/en-us/wininet/wininet/internetsetoption.asp">InternetSetOption</a> and <a href="http://msdn.microsoft.com/library/default.asp?url=/library/en-us/wininet/wininet/internetqueryoption.asp">InternetQueryOption</a> respectivly. Both require a parameter to tell them which option you are interested in. Have a look at <tt>INTERNET_OPTION_PER_CONNECTION_OPTION</tt> (for IE5 and later), <tt>INTERNET_OPTION_PROXY</tt> and <tt>INTERNET_PER_CONN_OPTION</tt></p>

<p>In the end, you will be calling InternetQueryOption quite a lot of times and change some settings with InternetSetOption, but you will soon see that it's not actually worth it: There is always the possiblity that you have not anticipated some obscure setting a user may have which will distrub your application greatly</p>

<p>And additionally, changing the proxy server settings is a task for an adminitrator, not for a simple application. Before asking the question "How can I change the proxy server?", the question should be "Do I really have to change the proxy server? Isn't there a better way?"</p>
