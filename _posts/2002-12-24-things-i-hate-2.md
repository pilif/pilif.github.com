---
layout: post
title: Things I hate (2)
tags:
- Personal
status: publish
type: post
published: true
meta: {}

---
I got it to work.

The <tt>/disasterrecovery</tt>-Option for the Setup.exe of the exchange-server was not enough. Searching more in google finally brought the solution: <a href="http://support.microsoft.com/default.aspx?scid=KB;en-us;267573&">Q267573</a>.

I've created a .reg-File so you don't have to make 5000 clicks when in the same situation:

<pre>
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Rpc\ClientProtocols]
"ncacg_ip_udp"="rpcrt4.dll"
"ncacn_http"="rpcrt4.dll"
"ncacn_nb_tcp"="rpcrt4.dll"
"ncacn_ip_tcp"="rpcrt4.dll"
"ncacn_np"="rpcrt4.dll"
</pre>

If somebody can tell me why the dedicated disaster-recovery-option of the setup program does not create those entries, please tell me here and now!

I will now make some tests with an Outlook-Client and then finally go home (it's 1:30am localtime)
