---
layout: post
title: SQLite on .NET CF
categories:
- Programming
- Software
- Solutions
status: publish
type: post
published: true
meta: {}

---
<p><a href="http://www.sqlite.org">SQLite</a> just doesn't stop to amaze me. First, we <a href="http://www.gnegg.ch/archives/177-Extreme-fun-with-Linux.html">got it to compile</a> on our small ucLinux based barcode scanner where it not only works flawlessly, but extremely fast too.</p>
<p>Now I thought about using SQLite in a little PocketPC application I intend to write using the .NET compact framework. This after some very bad expirience with SQL Server CE</p>
<ul>
  <li>There is no useful frontend to modify the data in the sdf-File: There is no tool for the desktop (besides using SQL-Server and then replicating the data to the device which I actually got to work this march or so, but it was a major pain in the ass to set up and is no solution to me. I mean: Why should I install a whole SQL-Server just to get some test-data to a smart device?) and the little frontend on the PocketPC suffers from the small screen and the lack of a keyboard.</li>
  <li>Despite everyone claiming it's fast, it isn't (though this certainly is relative. I'm sure, the marketing departement of MS is still conviced that it's fast). Where some operations may be, others are not. Searching for strings is an example of extreme slowness.</li>
  <li>Starting an application using SQL Server CE takes about a minute on a usual 400 Mhz PocketPC. <b>Way</b> too long to be used in production with customers.</li>
</ul>
<p>So, using a leightweight local SQL-engine which is fast even on a 66 Mhz CPU without MMU sounded quite appealing to me. Just: How much work would it be? How well would I be able to integrate SQLite into .NET?</p>
<p>Knowing about the lack of features in P/Invoke on the compact framework and knowing that the SQLite API uses callback functions, I feared the worst, but fortunately, I googled before getting to work.</p>
<p>So, I found <a href="http://sourceforge.net/projects/adodotnetsqlite/">this project</a>.</p>
<p>They provide you with a full-fledged ADO.NET driver for SQLite, so you can use all the database classes and components you are used to, while still profiting from the advantages of SQLite</p>
<p>Compiling it was easy (while they provide pre-built binaries of sqlite.dll and the P/Invoke-Wrapper sqlite_wrapper.dll, they do so only for ARM and the desktop version of Windows for x86, so if you want to use the emulator for developement, you have to build those two DLLs yourself - using eVC4) and a quick look (it's already late now - I got up more than 17 hours ago, so I'm quite tired now) using the sample project <a href="http://www.eggheadcafe.com/PrintSearchContent.asp?LINKID=720">here</a> was quite successful: The application started (instantly, no wait) and displayed the data inside the SQLite-File.</p>
<p>So, the speed-problem is solved. What about the frontend? While I don't know any Windows GUI frontends for SQLite (though I know they exist), I have already worked with the <a href="http://www.ch-werner.de/sqliteodbc/">SQLite ODBC driver</a> (it's funny to think of that: Usually ODBC-drivers are just a middleware between the Application and the dtabase, but in case of sqliteodbc, the database engine is <b>linked into</b> the ODBC-driver. Strange) and of course the command line tool and the PHP extension. So for my purposes, I'm going to create the database using a PHP-Script on Linux and copy the .db-File to the PocketPC. As seamless as possible. No replication, no installation of servers, no nothing. Just plain old copy.</p>
