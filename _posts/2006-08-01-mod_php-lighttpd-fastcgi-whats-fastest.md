---
layout: post
title: mod_php, LightTPD, FastCGI - What's fastest?
categories: []

status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
Remember last April where I <a href="http://www.gnegg.ch/archives/274-Ruby-on-Rails.html">found out</a> that Ruby on Rails was that quick compared to a PHP application? Remember when I told that it may be caused by FastCGI, but that I didn't have the time to benchmark the thing properly?

Well... today I needed to know.

This article is even larger than my usual articles, so I had to split it up and create an extended entry. I hope you don't mind.

<!--more-->
<p>You see, if you think of it, FastCGI has some advantages over the common mod_php in Apache scenario that's so widespread these days. Let me explain:</p>
<p>When you load PHP into Apache as a module (using mod_php), each Apache process you run will also contain a PHP interpreter which in turn will load all the compiled in libraries which themselves are not exactly small.</p>
<p>This means that even if the Apache process that just started will only serve images, it will contain a PHP interpreter with all assigned libraries. That in turn means that said Apache process uses a lot of memory and takes some time to start up (because PHP and all the shared libraries it's linked to need to be loaded). Wasted energy if the file that needs to be served in an image or a CSS file.</p>
<p>FastCGI in contrast loads the PHP interpreter into memory, <em>keeps it there</em> and Apache will only use these processes to serve the PHP requests.</p>
<p>That means that all the images and CSS, flashes and whatever other static content you may have can be served by a much smaller Apache process that does not contain a scripting language interpreter and that does not link in a bunch of extra libraries (think libxml, libmysqlclient, and so on).</p>
<p>Even if you only serve pages parsed by PHP - maybe because you process your stylesheets with PHP and because you do something with the served images - you are theoretically still better off with FastCGI as Apache will recycle its processes here and then (though that's configurable) while FastCGI processes <em>stay there</em>.</p>
<p>And if you go on and need to load-balance your application, FastCGI still can provide advantages: In the common load balancing scenario, you have a reverse proxy or a load balancer and a bunch of backend servers actually doing the work. In that case, if you use FastCGI, the backend servers will be running your PHP application and noting else. No web server loading an interpreter loading your script. Just the interpreter and your script. So you safe a whole lot of memory by not loading another web server in the backend (Yes. FastCGI works over the network).</p>
<p>And if all that does not convince you: You even get Unix rights separation for different virtual servers using a SuEXEC wrapper - a thing you don't get when you work with mod_php. In that case, all PHP scripts are run directly by the Apache process and thus share the permissions - even across vhosts.</p>
<p>There are some Apache 2+ MPMs that try to fix that, but neither of them is stable and all of them aren't really under development any more.</p>
<p>You can use SuEXEC with a standard CGI process, but the performance hit there is prohibitive.</p>
<p>Well, and if you continue all these thoughts, you'll end up with another possibility of optimization: Today's web applications don't need many of the features Apache provides: They don't need to parse server side image maps. They usually don't need server based authentication (they do it themselves using forms and cookies), they don't need multiple competing alias implementations and they certainly don't need fancy directory indexes.</p>
<p>So maybe, one can even remove Apache out of the equation and replace it with something with fewer features and optimized for raw performance? Maybe something like <a href="http://www.lighttpd.net/">LightTPD</a>.</p>
<p>All that theory sounded quite interesting to me. Is there a way to speed up PHP applications? Does FastCGI provide a viable way to run scrips of different vhosts as different Unix users? Is FastCGI really faster?</p>
<p>Questions over questions. And this time around, I went after the answers:</p>
<p>I created a VMWare Server based virtual machine running Gentoo Linux and tested (using <tt>ab -c5 -n100</tt>) a PHP application using various settings.</p>
<p>These are the preconditions:</p>
<ul>
 <li><p>The page I benchmarked was the unauthenticated start page of a fairly large PHP application using a framework that's quite similar to Ruby on Rails considering the levels of indirection and count of file inclusions going on.</p><p>I used the unauthenticated start page because building that one involves next to no database queries which was important as I wanted to test the performance of the web server and PHP, not the performance of the database.</p><p>I didn't use a simple test page, as I wanted real-life results, not canned ones.</p></li>
 <li>For each test, I completely rebuilt the server environment by resetting the virtual machine to a clean state.</li>
 <li>CFLAGS were conservative (-O2)</li>
 <li>I didn't tweak the configuration of the used programs at all. This was done because I know the involved programs to various degrees (Apache is well-known to me, while LightTPD isn't). So I trusted the OS package maintainer to provide a usable initial configuration. Also, this allows you to recreate the experiment easily and it saved me from quite a lot of work.</li>
 <li>All tests were done with <tt>ab -c5 -n100</tt>, which I ran six times. I removed the worst and the best result and took the median of the remaining 4 runs. I don't think that was necessary as the results were pretty constant over the runs.</li>
 <li>I used the following software components (all stock Gentoo):
     <table id="bench-art-comps" cellspacing="0">
       <tr>
         <th>Component</th>
         <th>Version</th>
         <th>USE-flags</th>
       </tr>
       <tr>
         <td>Apache</td>
         <td>2.0.58</td>
         <td><tt>-ssl mpm-worker threads</tt> and <tt>-ssl mpm-prefork</tt></td>
       </tr>
       <tr>
         <td>LightTPD</td>
         <td>1.4.11</td>
         <td><tt>-gdbm fastcgi -ssl php</tt></td>
       </tr>
       <tr>
         <td>PHP</td>
         <td>5.1.4-gentoo-r4</td>
         <td><tt>fastbuild -memlimit iconv postgres xml xmlreader tokenizer bzip2 pear -tiff -xpm cli ftp -berkdb curl bcmath curlwrappers -gdbm -jpeg -ncurses pcre -png -readline session simplexml -spell spl sqlite -truetype</tt> with <tt>apache2</tt> and <tt>-apache2 cgi force-cgi-redirect</tt> (cgi contains FastCGI support). The used flags are the minimum requirements of the tested application.</td>
       </tr>
       <tr>
         <td>mod_fcgid</td>
         <td>1.0.8</td>
         <td>-</td>
       </tr>
       <tr>
         <td>APC</td>
         <td>3.0.10</td>
         <td><tt>mmap</tt></td>
       </tr>
       </table>
      </li>
</ul>

<p>The results are as follows (in the order I made the tests. Winners are bolded):</p>

<table id="bench-art-res" cellspacing="0">
  <tr>
    <td>&nbsp;</td>
    <th>Requests/s</th>
    <th>Time per Request (mean, ms)</th>
    <th>Failures</th>
  </tr>
  <tr>
    <th>Apache (prefork), mod_php</th>
    <td align="right">4.59</td>
    <td align="right">1089.647</td>
    <td align="right">0</td>
  </tr>
  <tr>
    <th>Apache (prefork), mod_php, APC</th>
    <td align="right">11.05</td>
    <td align="right">452.485</td>
    <td align="right">0</td>
  </tr>
  <tr>
    <th>Apache (prefork), FastCGI, php</th>
    <td align="right">4.89</td>
    <td align="right">1022.645</td>
    <td align="right">11</td>
  </tr>
  <tr>
    <th>Apache (prefork), FastCGI, php, APC</th>
    <td align="right"><b>11.24</b></td>
    <td align="right"><b>444.905</b></td>
    <td align="right">4</td>
  </tr>
  <tr>
    <th>Apache (worker), FastCGI, php</th>
    <td align="right">4.99</td>
    <td align="right">1001.935</td>
    <td align="right">12</td>
  </tr>
  <tr>
    <th>Apache (worker), FastCGI, php, APC</th>
    <td align="right">11.12</td>
    <td align="right">449.818</td>
    <td align="right">0</td>
  </tr>
  <tr>
    <th>LightTPD, FastCGI, php</th>
    <td align="right">4.65</td>
    <td align="right">1075.088</td>
    <td align="right">0</td>
  </tr>
  <tr>
    <th>LightTPD, FastCGI, php, APC</th>
    <td align="right">11.24</td>
    <td align="right">444.919</td>
    <td align="right">0</td>
  </tr>
</table>
<p>Notes:</p>
 <ul>
 <li>The results you see here are not comparable to that other blog post I made as it's an entirely different configuration.</li>
 <li>As some libraries used by PHP extension are not thread save, one should not use mod_php with a threaded MPM. That's why I didn't either.</li>
 <li>The failed requests where caused by the fastcgi process not answering in the allotted time. In a mod_php scenario, Apache (and the user) keeps waiting, blocking the process and causing another one to start. This is an example of a place where some tweaking is needed.</li>
 <li>The glibc on the server wasn't compiled with NPTL enabled, so the worker MPM could be made a little faster I guess.</li>
 <li>LightTPD needs some configuration tweaking to both php.ini and the fastcgi.conf to make PATH_INFO work which the tested PHP application depended on. This is documented in the <a href="http://www.lighttpd.net/documentation/fastcgi.html">LightTPD manual</a>.</li>
 <li>My very rough notes (ab output anonymized) is <a href="http://www.lipfi.ch/gnegg-benchmark.txt">available</a>.</li>
</ul>
<p>So in conclusion, I can say this:</p>
<ul>
  <li>APC is a must for larger PHP applications and it's time that piece of software is integrated into PHP</li>
  <li>FastCGI is indeed faster than mod_php, but only by a very, very small difference. The positive things I said above do apply though: User separation and better memory management because of more lightweight httpd-processes.</li>
  <li>LightTPD is smaller compared to Apache, but the old school server is still faster.</li>
  <li>The speed-differences between servers and technologies are negligible, so there's no need for you to move away from mod_php right now (unless you are running out of RAM).</li>
  <li>FastCGI indeed is an alternative to mod_php which could be very interesting in shared hosting scenarios.</li>
  <li>Personally, before I did this test, I was certain that LightTPD would win the race. Obviously, large software which is perceived bloated not necessarily is.</li>
</ul>
<p>So, in the end, I hope, this was, is or will be useful for you. If you have any recommendations and suggestions on how to benchmark better, faster, shiny-er or whatever, please don't hesitate to leave a comment here!</p>
