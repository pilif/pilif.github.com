---
layout: post
title: "This month's find: jna and applet-launcher"
tags:
- applet
- Hardware
- java
- jna
- jni
- Programming
- Software
- webdev
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
Way way back, I was talking about <a href="http://www.gnegg.ch/2004/01/java-and-native-libraries/">java applets and native libraries</a> and the things you need to consider when writing applets that need access to native libraries (mostly for hardware access). And let's be honest - considering how far HTML and JavaScript have come, native hardware access is probably the only thing you still needs applets for.

Java is slow and bloated and users generally don't seem to like it very much, but the moment you need access to specific hardware - or even just to specific files on the users filesystem, Java becomes an interesting option as it is the only technology readily available on multiple platforms and browsers.

Flash only works for hardware Adobe has put an API in (cameras and microphones) and doesn't allow access to arbitrary files. .NET doesn't work on browsers (it works on IE, but the solution at hand should work on browsers too) and ActiveX is generally horrible, doesn't work in browsers and additionally only works under windows (.NET works in theory on Unixes and Macs as well).

Which leaves us with Java.

Because applets are scriptable, you get away with hiding the awful user interface that is Swing (or, god forbid, AWT) and writing a nice integrated GUI using web technologies.

But there's still the issue with native libraries.

First, your applet needs to be signed - no way around that. Then, you need to manually transfer all the native libraries and extension libraries. Also, you'll need to put them in certain predefined places - some of which require administration privileges to be written into.

And don't get me started about JNI. Contrary to .NET, you can't just call into native libraries. You'll have to write your own glue layer between the native OS and the JRE. That glue layer is platform specific of course, so you better have your C compiler ready - and the plattforms you intend to run on, of course.

So even if Java is the only way, it still sucks.

Complex deployment, administrative privileges and antiquated glue layers. Is this what you would want to work with?

Fortunately, I've just discovered two real pearls completely solving the two problems leaving me with the hassle that is Java itself, but it's always nice to keep some practice in multiple programming languages, as long as it doesn't involve C *shudder*.

The first component I'm going to talk about is JNA (<a href="https://jna.dev.java.net/">Java Native Access</a>) which is for Java what P/Invoke is for .NET: A way for directly calling into the native API from your Java code. No JNI and thus no custom glue code and C compiler needed. Translating the native calls and structures into what JNA wants still isn't as convenient as P/Invoke, but it sure as hell beats JNI.

In my case, I needed to get find the directory corresponding to CSIDL_LOCAL_APPDATA when running under Windows. While I could have hacked something together, the only really reliable way of getting the correct path is to query the Windows API, for which JNA proved to be the perfect fit.

JNA of course comes with its own glue layer (available in precompiled form for more plattforms than I would ever want to support in the first place), so this leads us directly to the second issue: Native libraries and applets don't go very well together.

This is where <a href="https://applet-launcher.dev.java.net/">applet-launcher</a> comes into play. Actually, applet-launcher's functionality is even <a href="https://jdk6.dev.java.net/plugin2/jnlp/">built into the JRE itself</a> - provided you target JRE 1.6 Update 10 and later, which isn't realistic in most cases (just today I was handling a case where an applet had to work with JRE 1.3 which was superseded in 2002), so for now, applet-launcher which works with JRE 1.4.2 and later is probably the way to go.

The idea is that you embed the applet-launcher applet instead of the applet you want to embed in the first place. The launcher will download a JNLP file from the server, download and extract external JNI glue libraries and finally load your applet.

When compared with the native 1.6 method, this has the problem that the library which uses the JNI glue has to have some special hooks in place, but it works like a charm and fixes all the issues I've previously had with native libraries in applets.

These two components renewed my interest in Java as a glue layer between the webbrowser where your application logic resides and the hardware the user is depending upon. While earlier methods kind of worked but were either hacky or a real pain to implement, this is as clean as it gets and works like a charm.

And next time we'll learn about scripting Java applets.
