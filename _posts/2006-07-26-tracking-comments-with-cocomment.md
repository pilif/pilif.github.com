---
layout: post
title: Tracking comments with cocomment
categories:
- Software
- Solutions
status: publish
type: post
published: true
meta: {}

---
<p>I'm subscribed to quite a long list of feeds lately. Most of them are blogs and almost all of them allow users to comment on posts.</p>
<p>I often leave comments on these blogs. Many times, they are as rich as a posting here as I got lots to say once you make me open my mouth. Many times, I quietly hope for people to respond to my comments. And I'm certainly eager to read these responses and to participate in a real discussion.</p>
<p>Now this is a problem: Some of the feeds I read are aggregated feeds (like PlanetGnome or PlanetPHP or whatever) and it's practically impossible to find the entry in question again.</p>
<p>Up until now, I had multiple workarounds: Some blogs (mainly those using the incredibly powerful <a href="http://www.s9y.org">Serendipity</a> engine) provide the commenter with a way to subscribe to an entry, so you get notified per Email when new comments are posted.</p>
<p>For all non-s9y-blogs, I usually dragged the link to the site to my desktop and tried to remember to visit them again to check if replies to my comments where posted (or maybe another interesting comment).</p>
<p>While the email method was somewhat comfortable to use, the link-to-desktop one was not: My desktop is enough cluttered with icons without these additional links anyways. And I often forgot to check them none the less (making a bookmark would guarantee myself forgetting them. The desktop link at least provides me with a slim chance of not forgetting).</p>
<p>Now, by accident, I came across <a href="http://www.cocomment.com/">cocomment</a>.</p>
<p>cocomment is interesting from multiple standpoints. For one, it just solves my problem as it allows you to track discussions on various blog entries - even if they share no affiliation at all with cocomment itself.</p>
<p>This means that I finally have a centralized place where I can store all my comments I post and I can even check if I got a response on a comment of mine.</p>
<p>No more links on the desktop, no more using bandwidth of the blog owners mail server.</p>
<p>As a blog owner, you can add a javascript-snippet to your template so cocomment is always enabled for every commenter. Or you just keep your blog unmodified. In that case, your visitors will use a bookmarklet provided by cocomment which does the job.</p>
<p>Cocomment will crawl the page in question to learn if more comments were posted (or it will be notified automatically if the blog owner added that javascript snippet). Now, crawling sounds like they waste the blog owners bandwidth. True. In a way. But on the other hand: It's way better if one centralized service checks your blog once than if 100 different users each check your blog once. Isn't it?</p>
<p>Anyways. The other thing that impresses me about cocomment is how much you can do with JavaScript these days.</p>
<p>You see, even if the blog owner does not add that snippet, you can still use the service by clicking on that bookmarklet. And once you do that, so many impressive things happen: In-Page popups, additional UI elements appear right below the comment field (how the hell do they do that? I'll need to do some research on that), and so on.</p>
<p>The service itself currently seems a bit slow to me, but I guess that's because they are getting a lot of hits currently. I just hope, they can keep up, as the service they are providing is really, really useful. For me and I imagine for others aswell.</p>
