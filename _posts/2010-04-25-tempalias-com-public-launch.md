---
layout: post
title: tempalias.com - Public launch
categories:
- fun
- launch
- nodejs
- tempalias
- twitter
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
After announcing <a href="http://tempalias.com">tempalias.com</a> here on my blog and sleeping over it, hoping the live server wouldn't die over night, last friday I first implemented a <a href="http://github.com/pilif/tempalias/blob/master/garbage_collect.js">garbage collection facility</a> to prune expired aliases and then publicly announced tempalias.com on both <a href="http://news.ycombinator.com/item?id=1287874">Haker News</a> and <a href="http://www.reddit.com/r/programming/comments/bv41i/ask_reddit_please_review_my_nodejs_based_fun/">Reddit</a>.

The echo was overall positive and in the first two hours after the announcment, I fixed a lot of small things based upon suggestions of people posting to my announcement:
<ul>
	<li>I now serve a <a href="http://tempalias.com/images/shortcut.png">shortcut icon</a>.</li>
	<li>While I'm expiring aliases, <a href="http://github.com/pilif/tempalias/commit/6caa488fef0611f005ccc3fab028862db82eace8">I'm also making sure that once used aliases are never reused</a>.</li>
	<li>Node's HTTP parser throws under some circumstances and it's impossible to catch these errors which is why I had to greate a handler for the uncaughtException event as to keep the server up and running.</li>
</ul>
During the first day after its announcement, I had 4700 visits and in the second day it was still 1403 which might be some indication of the service being used by some people. As of right now, there are 652 valid aliases in redis.

During peak time, I got around 20 concurrent requests which the server handled easily (load of 0.01).

What was most interesting to me was that the announcement also generated quite a bit of traffic (3000 visits, so 75% conversion from the service to the blog which is nice) on this blog here and what I liked even more was the fact that the various entries in my development diary were read and sometimes commented upon which in turn lead to, drumroll please, 3 more twitter followers.

The project on github now has 22 watchers and on release day has seen 1496 page views according to their stats.

One question I was asked a lot is why I was writing an SMTP proxy instead of just hooking into an existing MTA. In retrospect, I was a bit unclear when I stated in the <a href="http://www.gnegg.ch/2010/04/tempalias-com-development-diary/">first entry of the diary</a>:
<blockquote>Of course this old solution had one big problem: It required a mail server on the receiving end and it required you as a possible user to hook the script into that mailserver (also, I never managed to do just that with exim before losing interest, but by now, I would probably know how to do it).</blockquote>
My reasoning behind writing a proxy was the fact that I wanted <strong>you</strong>, my dear reader to fetch the source code and experiment with it or even host your own clone of tempalias.com. You should be able to do so with minimal effort, hence the solution should be as self-contained as possible without requiring a lot of infrastructure. Relying on a specific mail server would have severely limited the size of the audience, especially as the mail server I would have written the plugin for was to be Exim which isn't that widely used these days.

Then, there's another reason: As a long-time mail server administrator, I know that it is <em>imperative </em>to fork as little as possible during mail delivery. Hooking this into an existing mail server would have meant the server to fork for each incoming email, only to ultimately reject it in most of the cases as tempalias is much more about rejecting email than it is about delivering it.

No. Using the awesome performance of Node.js to reject tons and tons of email relying on any SMTP server as a smarthost only if needed felt more robust and easier to access for my readers. Hence I went the SMTP proxy route.

So. Am I happy with the launch?

Yes. I was able to make a service that is useful to some people. I was able to learn node.js from the inside out. I got to know some really bright developers in the process and I was able to contribute to open source projects.

On a personal level though, I would have hoped that spending 44 hours in developing an useful (and good looking) web service in a quite unknown but really sexy programming environment, documenting the steps in the process would have yielded a bit more social interaction with the community than a whole three twitter followers.

Maybe I should have stated my goal more clearly:
<p style="text-align: center;">You should follow me on twitter <a href="http://twitter.com/pilif">here</a>.</p>
(this was a friendly nod to an <a href="http://dustincurtis.com/you_should_follow_me_on_twitter.html">article of the same name</a> by Dustin Curtis, a person obviously way better in marketing than I will ever be)

Next time: Bookmarklet fun!
