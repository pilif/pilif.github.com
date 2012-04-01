---
layout: post
title: Java and native libraries
categories: []

status: publish
type: post
published: true
meta: {}

---
As you may know, I am working with barcode scanners - actually it's all about my companies product <a href="http://www.popscan.net">PopScan</a> which is a software-tool for accessing a nice little barcode scanner which is essentially a barcode scanner and nothing more and thus quite inexpensive.

We have two similar products: One is the enterprise version which is sort of a framework for implementing custom made barcode solutions. Two quite big companies here in Switzerland are already using it (just visit PopScan's webpage to learn more, I won't make any more sales-pitches here).

The other product - PopScan SMB - is a out-of-the-box solution for small and medium businesses which allows them to provide a easy to use barcode ordering system to their customers (ok. now I'm really finished sales-pitching. I'm coming to the technical aspects...)

PopScan SMB is largely webbased: On the client side we have a very little application that does nothing but hanging there and wait for a scanner to be connected. When that happens, it reads the scanned codes and displays (using the IE ActiveX control) the webpage with the filled shoppingcart - very nice and simple.

The drawback so far was that we could only support Windows with this solution (written in Delphi - but as a reader of this blog, you may know that already). The point is that we got quite some requests to get this to work on the Mac and additionally we have some ideas involving Linux....

As I wanted to learn Java for quite some time now, I deceided to rework the thing as a Java-Thing (Applet, Webstart, see below).

The first Problem was accessing the serial port where the scanner is connected to. Possible? Yes. Sun has created a specification for accessing serial and paralell ports and provided a <a href="http://java.sun.com/products/javacomm/index.jsp">sample implementation</a> for Windows and Solaris.

If you want support for all the other OSes and if you want a solution that is acutally working, I propose, you have a look at the library from <a href="http://www.serialio.com">SerialIO</a> which is what I'm using. Works like a charm and is definitely worth the money.

Next problem: How do we install the thing on the clients and how do we keep it upgraded? Two solutions come to my mind:

<ol>
 <li>Java WebStart: Just put a JNLP-File somewhere on your server and link to it. The browser downloads it and Java WebStart does the rest, meaning installing and keeping the software updated. The big advantage: The mechanism has explicit support for native libraries (what this blog entry is about) and works quite nicely. The disadvantages: 1) I'm not sure whether <tt>java.net.URLConnection</tt> does use appropriate preconfigured proxy servers which is a requirement for the solution to be usable (quite a lot of our possible customers have quite strict firewalls and forced proxies) and 2) it does not work on Mac OS &lt; X which has only Java 1.1
 <li>Java Applet: Put it on a wepage which the user opens and that's it. No installation necessary, Proxy-Support, Java 1.1 support - you name it. The optimal solution if there were not that small little problem: No support for native libraries (which I have to install to access the serial port). Anyhow: The applet is what I did
</ol>
(actually there is a third solution: Create a "normal" application and a platform-specific installer and let the user install and run it. This would work, but would force me to again create a special auto-update-mechanism and it would require quite a lot of user-intervention.

So it all can be broken down to the one question: How to handle native libraries with Java-Applets?`

The answer is as simple as the question:

<ol>
 <li>Write your code
 <li>When the library is accessed for the first time and can't be loaded, a <tt>java.lang.UnsatisfiedLinkError</tt> is thrown. Catch it and...
 <li>... download the required libraries to the local computer into the correct directory
 <li>Tell the user to restart the browser
</ol>

Of course your applet has to be signed for this to work, but this can be done quite nicely in a <a href="http://ant.apache.org/">Ant</a>-Task.

Where to download the file to?

Into some directory in <tt>java.library.path</tt>, where each platform has its preferred location (which is - by the way not what the SerialIO-Documentation suggests):

<table border=0>
 <tr>
  <td>Windows</td><td><tt>{java.home}/bin</tt></td>
 </tr>
 <tr>
  <td>OS X (Java 1.3)</td><td>somewhere under <tt>/System</tt> which is bad</td>
 </tr>
 <tr>
  <td>OS X (Java 1.4)</td><td><tt>~/Library/Java/Extensions</tt></td>
 </tr>
</table>
(I must check OS 9 later)

<a href="http://www.apple.com/safari">Safari </a> uses Java 1.4, where both IE and Mozilla (<a href="http://www.mozilla.org/products/camino/">Camino</a>, <a href="http://www.mozilla.org/products/firebird/">Firebird</a> and <a href="http://www.mozilla.org/products/mozilla1.x/">Mozilla</a> itself) use 1.3.

The problem with MacOS'es 1.3 library path is that it's never writable by the user currently logged in (not even she's in the <tt>admin</tt> group). To put a file there within the Finder, you must authenticate yourself as super-user (which calls <tt>sudo</tt> somewhere under the hood) which is not possible from within java.

The solution: The current directory "." is also in <tt>java.library.path</tt>. On Richards mac, . pointed to the root of the harddrive "Macintosh HD" (/), which is writable by users of the <tt>admin</tt> group. So for now installing the library under "." when using the 1.3 VM does work as long as the current user is an administrator, which is the same requirement like under windows and can be explained somewhere in the handbook or on the webpage. Problem solved (Safari users have the advantage of being able to use the applet even without the admin installing the native library first as a directory in the users homedir is in the library path in 1.4)

I really searched the web before writing this entry and I've not found anything about applets and native libraries (especially not under Mac OS). Maybe there is a simpler way to do what I am doing. I'd be glad to hear from you!
