---
layout: post
title: One day with Serendipity
tags:
- Free Software
- gnegg.ch
status: publish
type: post
published: true
meta: {}

---
<p>Here we go: Everything migrated. Every link (hopefully) fixed. Worked around (I think) some problems with images uploaded from MT clashing with Serendipity's (s9y from now on) mod_rewrite handling and re-categorized every entry: the new gnegg.ch is up and running.</p>
<p>So, how is life with s9y?</p>
<p>Fist of all: I got no single comment SPAM. This is due to the better SPAM countermeasures and due to all URLs changing. I'll have to see how good the SPAM prevention will work, though I have an idea it can't be that bad (see below).</p>
<p>While s9y is slower than MT in delivering pages (understandable considering MT is generating static pages), it's more feature-rich compared to MT - at least if you consider s9y to be a blogging engine, not a framework to create blogging-engine-like tools.</p>
<p>I love the plugin system: There's nothing you can't write a plugin for and people seem to have noticed that - at least considering the wealth of plugins available for you to download and install (directly from the administration interface).</p>
<p>Also, because I'm using a premade template and because s9y is a bit more intelligent in reusing templates, the whole site finally has a consistent look. No more usage of outdated templates when commenting or displaying error messages.</p>
<p>The most interesting thing though is the SPAM prevention: When you post a comment, it will go through the following procedure:</p>
<ul>
    <li>Is it exactly the same comment as another posted before? If so, reject it. This prevents a spammer that got through once from getting through again. And it prevents you from double-posting by accident.</li>
    <li>Is your IP-Address posting a comment within 2 minutes after posting another one, the comment will be rejected. I know proxy servers and NAT routers exist and I will tweak the time if I should ever get more popular. A cookie-based approach obviously doesn't work to flood-protect the blog from malicious spammers.</li>
    <li>Does the comment point to an URL listed on <a href="http://www.surbl.org/">SURBL</a>, it'll be rejected. I'm sorry, but this is a sacrifice I must ask for.</li>
    <li>If you post a comment to an entry older than 30-days, it'll be insta-moderated. I promise to activate it as soon as possible.</li>
    <li>If you post to a comment older than 7 days, you'll have to solve a captcha, just to be sure. If you cannot solve it, feel free to contact me via Email</li>
    <li>After you post a comment with more than 3 links, I'll have to approve it first. If you post more than 20 links, it'll be rejected.</li>
    <li>A word-filter is active aswell, though I think all these measures stop the spam before even getting here.</li>
    <li>If all this fails, I'm sure the SPAM will be detected by <a href="http://akismet.com">Akismet</a></li>
</ul>
<p>While I know that some restrictions may hurt you, please believe me that the restrictions are in place to both increase the overall quality of content here and to make my life a bit easier.</p>
<p>Serendipity really is a nice blogging engine. Go ahead and try it!</p>
