---
layout: post
title: "Once more: PHP and SOAP"
categories:
- Free Software
- PHP
- Programming
- Solutions
status: publish
type: post
published: true
meta: {}

---
<p>I can't reist: I made my third attempt at getting a SOAP-Server in PHP to work (I only documented my <a href="http://www.gnegg.ch/archives/49-SOAP-needs-soap.html">first try</a> here on the blog).</p>
<p>My first try was a little more than two years ago. That one failed miserably.</p>
<p>The next try was last november. I came somewhat further than I did my first time, but Visual Studio was unable to import the WSDL correctly as soon as I was passing arrays of structs around</p>
<p>And now I tried again - this time with PEAR SOAP 0.9.1</p>
<p>This time all looks so much better. First of all, I do this because I really have to: For one of our <a href="http://www.popscan.ch">PopScan</a> customers, we are accessing their IBM DB2 database - currently using a Perl-based server that's nearing the end of its maintainability, so I deceided to redo it with PHP (PHP-code is somewhat cleaner than Perl code and I'm more fluent in PHP than in Perl)</p>
<p>The DB2-client (especially the one needed for that old 7.1 database) is clumsy, a bit unstable and really not something I want to link into our Apache-Server that serves all our clients.</p>
<p>So the idea was to compile another apache, run it on another port, bound to localhost only. Add PHP with the DB2-client. Access this combo via some way of RPC with  the nice DB2-free standard-installation.</p>
<p>Well. And instead of once again designing a custom protocol (like I did for the Perl-Server), I though: Maybe give SOAP another shot.</p>
<p>In contrast to previous experience, this time, it was the Server that worked and the client that was failing. Using PEAR SOAP 0.9.1, creating the server (which creates the dreaded WSDL) went without flaw. This time I was even able to import the WSDL into VS 2003, which I tried just for fun.</p>
<p>Passing around arrays of structs of structs was no problem at all. After building  the <tt>self::$__typedef</tt> and <tt>self::$__dispatch_map</tt> arrays, passing around those data types has become really intuitive: Just create arrays of arrays in PHP and return them. No problem.</p>
<p>Well done, PEAR team!</p>
<p>This time I've had problems with the PEAR SOAP Client. It insisted in passing around ints as strings which the server (correctly) did not like.</p>
<p>Instead of using lots and lots of time debugging that, I went the pragmatical way and used PHP5's build in <tt>SoapClient</tt> functionality. No problems there.</p>
<p>And then it suddenly broke</p>
<p>My test-client was written for the CLI version of php which was version 5.0.4. The apache-module of the live-server was 5.0.3.</p>
<p>All I got with 5.0.3 was a HTTP Client Error (SoapFault exception: [HTTP] Client Error).</p>
<p>Whatever I did, it did not go away, but to my delight I have seen that PHP did not even connect to the server to fetch the WSDL. This was good as I was able to debug much quicker that way.</p>
<p>In the end it was the URL of the WSDL. Every version of PHP5 (even the 5.1 betas)  - besides 5.0.4 - does not like this:</p>
<pre class="code">http://be.sen.work:5436/?wsdl</pre>
<p>it prefers this</p>
<pre class="code">http://be.sen.work:5436/index.php?wsdl</pre>
<p>I ask now: Why is that this way? The first version is a valid URL aswell. The served WSDL is correct - it's the same file that gets called and it returns totally the same content. This is so strange.</p>
<p>After all, I have to say. SOAP with PHP - after two years - still is not ready for prime time. It's still in the state of "sometimes working - sometimes not". But as I now have an environement where it's known to be working and as I'm in total control of said environement, I will go with SOAP none-the-less. It's so much cleaner (and more secure: more people than just me are looking at the SOAP-code) than designing yet another protocol and server.</p>
<p>Oh. And the bottom line is: Never trust protocols that call themselves "simple" or "lightweight" ;-)</p>
