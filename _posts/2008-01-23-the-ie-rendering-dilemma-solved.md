---
layout: post
title: The IE rendering dilemma - solved?
categories:
- hack
- ie8
- Opinions
- Programming
- rendering
- Software
- webdev
status: publish
type: post
published: true
meta: {}

---
<p>A couple of months a <a href="/archives/379-The-IE-rendering-dilemma.html">IE rendering dilemma</a>: How to fix IE8's rendering engine without breaking all the corporate intranets out there? How to create both a standards oriented browser and still ensure that the main customers of Microsoft - the enterprises - can still run a current browser without having to redo all their (mostly internal) web applications.</p> <p>Only three days after my posting IEBlog talked about <a href="http://blogs.msdn.com/ie/archive/2007/12/19/internet-explorer-8-and-acid2-a-milestone.aspx">IE8 passing the ACID2 test</a>. And when you watch the video linked there, you'll notice that they indeed kept the IE7 engine untouched and added an additional switch to force IE8 into using the new rendering engine.</p> <p>And yesterday, A List Apart showed us <a href="http://www.alistapart.com/articles/beyonddoctype/">how it's going to work</a>.</p> <p>While I completely understand Microsofts solution and the reasoning behind it, I can't see any other browser doing what Microsoft recommended as a new standard. The idea to keep multiple rendering engines in the browser and default to outdated ones is in my opinion a bad idea. Download-Sizes of browser increase by much, security problems in browsers must be patched multiple times, and, as the Webkit blog put it, "[..] <a href="http://webkit.org/blog/155/versioning-compatibility-and-standards/">hurts the hackability of the code</a> [..]".</p> <p>As long as the other browser vendors don't have IE's market share nor the big company intranets depending on these browsers, I don't see any reason at all for the other browsers to adapt IE's model.</p> <p>Also, when I'm doing (X)HTML/CSS work, usually it works and displays correctly in every browser out there - with the exception of IE's current engine. As long as browsers don't have awful bugs all over the place and you are not forced to hack around them, deviating from the standard in the process, there is no way a page you create will only work in one specific version of a browser. Even more so: When it breaks on a future version, that's a bug in the browser that must be fixed there.</p> <p>Assuming that Microsoft will, finally, get it right with IE8 and subsequent browser versions, we web developers should be fine with</p><pre class="code">&lt;meta http-equiv="X-UA-Compatible" content="IE=edge" /&gt;
</pre>
<p>on every page we output to a browser. These compatibility hacks are for people that don't know what they are doing. We know. We follow standards. And if IE begins to do so as well, we are fine with using the latest version of the rendering engine there is. </p>
<p>If IE doesn't play well and we need to apply braindead hacks that break when a new version of IE comes out, then we'll all be glad that we have this method of forcing IE to use a particular engine, thus making sure that our hacks continue to work.</p>
