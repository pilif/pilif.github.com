---
layout: post
title: Sorry. Connection's down
tags:
- Usability
status: publish
type: post
published: true
meta: {}

---
<p>We all know it: Network connections are unreliable. This is ok and I have no problem whatsoever with that. Connections can go down. Nothing serious, nothing special.</p>
<p>There are multiple ways how software can let you know that a connection dropped:</p>
<ul>
 <li>Crash. This is the second worst way to handle it. At least the user knows what to do: Restart the application and it will (hopefully) work again.</li>
<li><em>Connection failed: Software caused the connection to abort</em>. Somewhat incorrect, too much information, a bit scary for the enduser, but common for many Winsock-Applications as this is the default error-message you can ask windows to provide you with given a specific error-code</li>
 <li><em>Sorry. The connection somehow went down. Should I try to connect again?</em>. Correct, not technical, not scary. This is how I try to explain it to my users.</li>
</ul>
<p>Well... and then there's the IBM DB2 client:</p>
<blockquote>
SQL30081N  A communication error has been detected.  Communication protocol being used: "TCP/IP".  Communication API being used: "SOCKETS".  Location where the error was detected: "3.134.144.87".  Communication function detecting the error: "send".  Protocol specific error code(s): "104", "*", "0".  SQLSTATE=08001
</blockquote>
<p>What the hell?</p>
