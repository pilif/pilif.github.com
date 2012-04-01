---
layout: post
title: SOAP needs soap
tags:
- PHP
- Programming
- Solutions
status: publish
type: post
published: true
meta: {}

---
For our Web-Portal <a href="http://www.adsl.ch">superspeed</a>, I am working on a webservice to give some clients access to our provider/offer database.
<p>
As the whole portal is written in PHP, I deceided to write the Webservice (fully fledged using the SOAP-Protocol) in PHP too. After some searching, found <a href="http://dietrich.ganx4.com/nusoap/index.php">NuSOAP</a> and the SOAP-Package in <a href="http://pear.php.net/package-info.php?pacid=87">PEAR</a>.
<p>
Both packages have virtually no documentation, but the PEAR-package has some nicely documented samples (disco_server.php, example_server.php just to name the most interesting two).
<p>
While nuSOAP is very easy to handle, it doesn't have a way to autogenerate WSDL-output which would have forced me to learn writing WSDL. Unfortunatly I did not have time for this, so I went with the PEAR-Package which is able to create the WSDL for you.
<p>
The first tests using PHP as SOAP client worked very well.
<p>
tip: to increase "debugability" to an actually useful level, use something like the code here for debugging your server:

<pre>
// include the actual server class
require_once 'modules/ss3_Provider/xml_access.php';

if ($_SERVER['argv'][1] != 'direct'){
    // use the SOAP-Interface to our class
    include("SOAP/Client.php");
    $wsdl = new SOAP_WSDL("http://your.server.com/server.php?wsdl");
    $object = $wsdl->getProxy();
}else{
   // Use the class directly
    $object = new CProvServiceInfo_Class();
}
// do something with $object
</pre>

If the script is called with the "direct" parameter, the class will be used directly thus giving you back all the debug information you need without an XML-parser trying and failing to unserstand them.
<p>
As the customer for this service is going to use ASP.NET to access the webservice, the next step was to try accessing the service via Visual Studio.NET. This was not fun (pasting the complete error here in the hope that google will catch this and will help future users having my problem):
<p>
<tt>Custom tool warning: At least one import Binding for the ServiceDescription is an unsupported type and has been ignored.</tt>
<p>
The hairy thing: I have no expirience at all with VS.NET, so I first thought this was a minor problem and I was just too stupid to actually use the imported class. But sooner or later (after trying out importing the Google Webservice), I came to the conclusion that this warning actually is a grave error: Nothing got imported. Nothing at all.
<p>
Searching google did not yield any results.
<p>
The next step for me was to learn WSDL (which I did not want to in the first place ;-). Unfortunatly, the PHP generated WSDL-File seemed quite ok (besides the missing &lt;documentation&gt;-Tags).
<p>
I could not get VS to report a mor detailed/useful error message.
<p>
Just when I wanted to give up, i thought of this tool, <tt>wsdl.exe</tt> that gets installed with the .NET Framework SDK. Running <tt>wsdl &lt;filename.wsdl&gt;</tt> gave me the same error message, but with a note to look into the generated <tt>.cs</tt>-File.
<p>
This finally gave an usable error-message:
<p>
<tt>// CODEGEN: The binding 'SuperspeedProvidersBinding' from namespace 'urn:SuperspeedProviders' was ignored.  There is no SoapTransportImporter that understands the transport 'http://schemas.xmlsoap.org/soap/http/'.</tt>
<p>
A quick comparison of the &lt;soap:binding&gt-Tags showed:
<p>
Googles Version: <tt>http://schemas.xmlsoap.org/soap/http</tt><br>
PHP's Version: <tt>http://schemas.xmlsoap.org/soap/http/</tt>
<p>
Note the slash at the end.
<p>
I hate problems with simple solutions that are so awfully difficult to find because of un-usable error messages!
<p>
Just for reference: The following patch fixes the wrong Transport-URL in PEAR::SOAP (0.7.3 - I will report this to the author, so maybe it's fixed in later versions):

<pre>
--- Base.php    Thu Jun  5 13:16:03 2003
+++ -   Fri Jun  6 22:51:08 2003
@@ -91,7 +91,7 @@
 define('SCHEMA_DISCO_SCL',          'http://schemas.xmlsoap.org/disco/scl/');

 define('SCHEMA_SOAP',               'http://schemas.xmlsoap.org/wsdl/soap/');
-define('SCHEMA_SOAP_HTTP',          'http://schemas.xmlsoap.org/soap/http/');
+define('SCHEMA_SOAP_HTTP',          'http://schemas.xmlsoap.org/soap/http');
 define('SCHEMA_WSDL_HTTP',          'http://schemas.xmlsoap.org/wsdl/http/');
 define('SCHEMA_MIME',               'http://schemas.xmlsoap.org/wsdl/mime/');
 define('SCHEMA_WSDL',               'http://schemas.xmlsoap.org/wsdl/');
</pre>
<p>
As you can see, there are more URLs having a slash at the end - possibly more candidates? We'll see. At least I know now, how to debug such problems...
