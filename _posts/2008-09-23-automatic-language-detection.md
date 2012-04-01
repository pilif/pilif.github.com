---
layout: post
title: Automatic language detection
tags:
- Programming
- rant
- Software
- Usability
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
If you write a website, do not use Geolocation to determine the language to display to your user.

If you write a desktop application, do not use the region setting to determine the language to display to your user.

This is incredibly annoying for some of us, especially for me which is why I'm ranting here.

The moment Google released their (awful) German translation for their RSS reader, I was served the German version just because I have a Swiss IP address.

Here in Switzerland, we actually speak one of three (or four, depending on who you ask) languages, so defaulting to German is probably not of much help for the people in the french speaking part.

Additionally, there are many users fluent in (at least reading) English. We always prefer the original language if at all possible because generally, translations never quite work. Even if you have the best translators at work, translated texts never feel fluid. Especially not when you are used to the original version.

So, Google, what were you thinking to switch me over to the German version of the reader? I have been using the English version for more than a year, so clearly, I understood enough of that language to be able to use it. More than 90% of the RSS feeds I'm subscribed to are, in fact, in English. Can you imagine how pissed I was to see the interface changed?

This is even worse on the iPhone/iPod frontend, because, there, you don't even provide an option to change the language aside of manually hacking the URL.

Or take desktop applications. I live in the German speaking parts of Switzerland. True. So <em>naturally</em> I have set my locale settings to Swiss German. You know: I want to have the correct number formatting, I want my weeks to start on Mondays. I want the correct currency. I want my 24 hours clock I'm used to.

Actually, I also want the German week and month names, because I will be using these in most of my letters and documents, which are, in fact, German too.

But my OS installation is English. I am used to English. I prefer English. Why do so many programs insist to use the locale setting to determine the display language? Do you developers think it's funny to have a mish-mash of languages on the screen? Don't you think that me using an English OS version may be an indication that <em>I do not</em> want to read your crappy German translation alongside the English user interface of my OS?

Don't you think that it feels really stupid to have a button in a German dialog box open another, English, dialog (the first one is from Chrome, the one that opens once you click "Zertifikate verwalten" (Manage certificates) is from Windows itself)?

<a href="http://www.gnegg.ch/wp-content/uploads/2008/09/langmix.png"><img class="aligncenter size-full wp-image-458" title="langmix" src="http://www.gnegg.ch/wp-content/uploads/2008/09/langmix.png" alt="" width="362" height="363" /></a>

In Chrome, I can at least fix the language - once I found the knob to turn. At first, it was easier for me to just delete the German localization file from the chrome installation because, due to being completely unused to German UIs, I was unable to find the right setting.

This is really annoying and I see this particular problem being neglected on an incredibly large scale. I know that I am a minority, but the problem is so terribly easy to fix:
<ul>
	<li>All current browsers send an Accept-Language header. In contrast to the earlier times, nowadays, it is actually correctly preset in all the common browsers. Use that. Don't use my IP-address.</li>
	<li>Instead of reading the locale setting in my OS, ask the OS for its UI language and use that to determine which localization to load (actually, this is the recommended way of doing things according to Microsoft's guidelines at least since Windows XP which was 2001).</li>
</ul>
Using these two simple tricks, you help a minority <em>without hindering the majority in any way</em> and without additional development overhead!

Actually, you'll be getting away a lot cheaper than before. GeoIP is expensive if you want it to be accurate (and you <strong>do</strong> want that. Don't you?), whereas there are ready-to-use libraries to determine the correct language even from the most complex Accept-Language-Header.

Asking the OS for the UI language isn't harder than asking it for the locale, so no overhead there either.

Please, developers, please have mercy! Stop the annoyance! Stop it now!
