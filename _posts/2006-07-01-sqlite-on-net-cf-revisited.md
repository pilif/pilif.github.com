---
layout: post
title: SQLite on .NET CF - Revisited
tags:
- Free Software
- Programming
status: publish
type: post
published: true
meta: {}

---
<p>Another year, another posting.</p>
<p>Back in 2004, I <a href="http://www.gnegg.ch/archives/188-SQLite-on-.NET-CF.html">blogged about Finisar.SQLite</a>m which at the time was the way to go.</p>
<p>Today, I am in quite the same situation as I was back then, with the difference that this time, it's not about experimenting. It's a real-world will-go-life-thing. I'm quite excited to finally have a chance at doing some PocketPC / Windows Mobile stuff that will actually be seen by someone else than myself.</p>
<p>Anyways: The project I blogged about is quite dead now and does not even support the latest versions of SQLite (3.2 is the newest supported file format). Additionally, it's a ADO.NET 1.0 library and thus does not provide the latest bells and whistles.</p>
<p>Fortunately, someone stepped up and provided the world with
<a href="http://sqlite.phxsoftware.com/">ADO.NET SQLite</a>, which is what I'm currently trying out. The project is alive and kicking, supporting the latest versions of SQLite.</p>
<p>So, if you, like me, need a fast and small database engine for your PocketPC application, this project is the place to look I guess.</p>
