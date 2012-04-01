---
layout: post
title: Converting Java keytool-certificates
categories:
- Troubleshooting
tags:
- codesign
- java
- Programming
- solution
- Solutions
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
To be able to read barcodes from connected barcode-scanners into the webbased version of <a href="http://www.popscan.ch">PopScan</a>, we have to use a signed applet - there is no other way for getting the needed level of hardware access without signing your applet.

The signature, by the way, doesn't at all prevent any developer from doing bad stuff - it just puts their signature below it (literally), so it kind of raises the bar to distribute malware that way - after all, the checks when applying for a certificate usually are very rigid, so there is no way anybody could forge their application, so the origin of any piece of code is very tracable.

But there is no validation done of the actual code to be signed and I doubt that the certificate authorities out there actually revoke certificates used to certify malware, thought that remains to be seen.

Anyways. Back to the topic.

In addition to the Java Applet, we also develop the windows client frontend to the PopScan server. And we have a small frontend to run on Windows CE (or Windows Mobile) based barcode capable devices. Traditionally, both of these were never signed.

But lately with Vista and Windows Mobile 6, signing becomes more and more important: Both systems complain in variable loudness about unsigned code, so I naturally prefer the code to be signed - we DO have a code signing certificate after all - for our Applet.

Now the thing is that keytool, Java's way of handling code signing keys doesn't allow a private key to be exported. This means that there was no obvious way for me to ever use the certificate we got for our applet to sign Windows EXEs.

Going back to the CA and ask them to send over an additional certificate was no option for me: Aside of the fact that it would certainly have cost another two years fee, this would have ment to prove our identity all over again - one year too early as our current certificate is valid till 2009.

But then, I found a solution. Here's how you convert a java keystore certificate to something you can use with Microsoft's Authenticode:
<ol>
	<li>Start <a href="http://yellowcat1.free.fr/keytool_iui.html">KeyTool GUI</a></li>
	<li>In the Treeview, click "Export", "Private Key"</li>
	<li>Select your java keystore-file</li>
	<li>Enter two trarget file names for your key and the certificate chain (and select PEM format)</li>
	<li>Click OK</li>
</ol>
Now you will have two more files. One is your private key (I've named it key.pem), the other is the certificate chain (named cert.pem in my case). Now, use OpenSSL to covert this into something Microsoft likes to see:
<pre class="code">% openssl pkcs12 -inkey key.pem -in cert.pem -out keypair.pfx -export</pre>
openssl will ask for a password to encrypt the pfx file with and you'll be done. Now you can use the pfx-file like any other pfx file you recived from your certificate authority (double click it to install it or use it with signcode.exe to directly sign your code).

Remember to delete key.pem as it's the unencrypted private key!
