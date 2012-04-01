---
layout: post
title: Internet Explorer, File Downloads, PHP
tags:
- PHP
- Programming
status: publish
type: post
published: true
meta: {}

---
<p>Have you ever tried sending a file to Internet Explorer, for which an internal displaying plugin is installed? Take a .CSV-File for example (or a PDF for that matter).</p>
<p>If so, then maybe you have noticed that IE in some versions just displays an error-message about not being able to find the file just downloaded whenever you have a call to session_start() in your script.</p>
<p>
The problem is with the Headers PHPs session management sends to the browser: It disallows any cahing and tells that the document expired somewhere around my year of birth (1981). It seems like IE takes that literaly and really does not cache the doument, but then naturally is unable to forward it to the plugin (or activex-control or whatever).</p>
<p>Fortunately, you may change PHPs default headers by just emitting some additional <tt>header()</tt>-calls:
</p>
<pre class="code">
    header('Content-Type:  application/csv');
    header('Pragma: cache');
    header('Cache-Control: public, must-revalidate, max-age=0');
    header('Connection: close');
    header('Expires: '.date('r', time()+60*60));
    header('Last-Modified: '.date('r', time()));
</pre>
<p>A short explanation of the headers sent:</p>
<ol>
 <li>The content-type tells the browser that there's a CSV file coming</li>
 <li>Pragma is an old HTTP/1.0-Header. This one allows caching of the resource</li>
 <li>Cache-Control is the new HTTP/1.1 header to replace Pragma. "public" means: Public proxies may cache the document (private would also work and would mean: Cache in the Browsers cache). must-revalidate advises proxy servers (and browsers) to check if the resource is modified whenever the document is older than max_age seconds.</li>
 <li>The connection-header tells the server and browser what to do with the connection when the resource has been transmitted. The old HTTP/1.0 behaviour is <tt>close</tt>. <tt>keep-alive</tt> would be the newer behaviour. I'm not sure whether this really is necessary here, but with this header, it definitely works.</li>
<li>The Expires-Header tells the browser when the document is going to expire. PHP default this to somewhere in 1981 and I think this is what causes the problem for IE. I set it to one hour in the future. If it were possible to just turn off those default-headers, I would simply send no Expires-header at all.</li>
<li>Last-Modified tells the browser when the resource was last modified. I could actually get a timestamp of the underlying data representation and output that so the browser would not have to redownload the resource when the data has not changed, but it's changing that often that this optimization is not worth the trouble, so I'm telling it just changed.</li>
</ol>
<p>I have confirmation that this solves the problems some clients where expecting before. Very nice.</p>
