---
layout: post
title: Mysql in Acrobat 8
tags:
- acrobat
- adobe
- gpl
- Software
- violation
status: publish
type: post
published: true
meta: {}

---
<p>I have Acrobat 8 running on my Mac. And look what I've found by accident:</p>
<p>I had console.log open to check something, when I found these lines:</p>
<tt><p>061115  9:57:48 [Warning] Can't open and lock time zone table: Table 'mysql.time_zone_leap_second' doesn't exist trying to live without them</p>
<p>/Applications/Adobe Acrobat 8 Professional/Adobe Acrobat Professional.app/Contents/MacOS/mysqld: ready for connections.</p>
<p>Version: '4.1.18-standard'  socket: '/Users/pilif/Library/Caches/Acrobat/8.0_x86/Organizer70'  port: 0  MySQL Community Edition - Standard (GPL)</p></tt>
<p>MySQL shipped with Acrobat? Interesting.</p>
<p>The GPL-Version shipped with Acrobat? IMHO a clear license breach.</p>
<p>Of course, I peeked into the Acrobat bundle:</p>
<pre class="code">% pwd
/Applications/Adobe Acrobat 8 Professional/Adobe Acrobat Professional.app/Contents/MacOS
% dir mysql*
-rwxrwxr-x    1 pilif    admin     2260448 Feb 20  2006 mysqladmin
-rwxrwxr-x    1 pilif    admin     8879076 Feb 20  2006 mysqld
</pre>
<p>Interesting. Shouldn't the commercial edition <em>not</em> print "Community Edition (GPL)"? Even if Adobe doesn't violate the license (because they are just shipping the GPLed server and have bought the client library (which is GPL too) or written their own client), the GPL clearly states that I can get the sourcecode and a copy of the license. I couldn't find these anywhere though...</p>
<p>I guess I should ask at mysql what's going on here.</p>
