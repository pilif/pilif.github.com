---
layout: post
title: "Mac Mail: Can software perform worse?"
tags:
- Mac
- Opinions
status: publish
type: post
published: true
meta: {}

---
<p>
I'm a fan of Mac Mail (Mail.app). It looks nice, it renders fonts very nicely it creates mails conforming to the relevant RFCs and it basically supports most of the <a href="/archives/34-Mail-for-Windows-as-I-like-it.html">requirements</a> I've posted back in 2003.
</p>

<p>
There are some drawbacks though. First one is no proper IMAP search support. This is not as bad as it sounds as the local full text index works very nicely (faster than our exchange server) and it's even integrated into Spotlight.</p>

<p>Then, the threading support sucks as it's not multi-level. This does not matter as much as back in 2003 though as my daily dose of technology-update now comes from RSS and blogs. Actually I'm currently not subscribed to any mailing list.</p>

<p>Everything else on that list is supported and the beautiful UI and font-rendering convince me to live with those two drawbacks and not use Mozilla Thunderbird for example which supports the whole set of features but looks foreign to OS X.</p>

<p>BUT. There's a big BUT</p>

<p>Performance is awful.</p>

<p>Even though I'm using IMAP, Mail.app insists on downloading all messages - probably to index them. I know that you can turn this behavior off, but then it doesn't download any message at all, rendering the program useless in offline situations. In Thunderbird you can make the program just download the messages as you read them and then use the contents of the cache for later offline display.</p>

<p>Then again: I have no problem with downloading and it even displays new mail while still downloading in the background. It does a better job at not blocking the UI than Thunderbird too.</p>

<p>What sucks is the performance while doing its thing.</p>

<p>I have around 3GB of mails on my IMAP server and before I could use Mail.app for the first time, the program downloaded the whole thing, utilizing 100% of one CPU core (it's not SMP capable ;-) ), forcing my MacBook Pro to turn on the fans - it was louder than after playing 4 hours of World of Warcraft in Windows (via Boot Camp - it's around twice as fast than the mac version).</p>

<p>It also took lots and lots of RAM making working with the machine a non-fun experience.</p>

<p>Later I decided to throw away two years worth of Cron-Emails containing a basic "Job done" which were filtered away on the server so I never noticed them. Deleting those ~22000 emails took two hours - again with 100% CPU usage on one core.</p>

<p>Even worse: Mail.app does not send an IMAP move command to move the messages to the trash (or just mark them as deleted). It actually manually copies the messages over! Message by Message. From the local copy to the server. Then it deletes them. And then begins the awful "Writing Changes to disk", completely killing the performance of my MacBook.</p>

<p>Also annoying: Mail.app does not support IMAP folder subscriptions. It insists to fetch all folders - if you have a full calendar on your exchange server, it's going to fetch all those (useless for Mail.app) entries aswell - and we know now how well Mail.app works with large folders.</p>

<p>My conclusion is: Mail.app is perfect for reading and writing your daily mail. It fails miserably at all mail administration jobs.</p>

<p>I'm going to stick with it none the less as reading my daily mail is what I'm doing most of the time. It's just a good thing that Thunderbird exists and I'm going to use that for the next round of cleanup (hoping that Mail.app picks up the changes and does not take too long to mirror them to its local store).</p>
