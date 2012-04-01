---
layout: post
title: Twisted Tornado
tags:
- opinion
- Opinions
- python
- Software
- tornado
- twisted
- webdev
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
Lately, the net is all busy talking about the new <a href="http://github.com/facebook/tornado">web server</a> released by <a href="http://www.friendfeed.com">FriendFeed</a> last week and how their server basically does the same thing as the <a href="http://twistedmatrix.com/trac/">Twisted framework</a> that was around so much longer. One <a href="http://pwpwp.blogspot.com/2009/09/python-community-in-anguish-pain.html">blog entry</a> ends with
<blockquote>Why Facebook/Friendfeed decided to create a new web server is completely beyond us.</blockquote>
Well. Let me add my two cents. Not from a Python perspective (I'm quite the Python newbie, only having completed one bigger project so far), but from a software development perspective. I feel qualified to add the cents because I've <em>been there and done that</em>.

When you start any project, you will be on the lookout for a framework or solution to base your work on. Often times, you already have some kind of idea of how you want to proceed and what the different requirements of your solution will be.

Of course, you'll be comparing existing requirements against the solutions around, but chances are that none of the existing solutions will match your requirements exactly, so you will be faced with changing them to match.

This involves not only the changes themselves but also other considerations:
<ul>
	<li>is it even possible to change an existing solution to match your needs?</li>
	<li>if the existing solution is an open source project, is there a chance of your changes being accepted upstream (this is <em>not a given</em>, by the way).</li>
	<li>if not, are you willing to back- and forward-port your changes as new upstream versions get released? Or are you willing to stick with the version for eternity, manually back-porting security-issues?</li>
</ul>
and most importantly
<ul>
	<li>what takes more time: Writing a tailor-made solution from scratch or learning how the most-matching solutions ticks to make it do what you want?</li>
</ul>
There is a very strong perception around, that too many features mean bloat and that a simpler solution always trumps the complex one.

Have a look at articles like «<a href="http://briancarper.net/blog/clojure-1-php-0">Clojure 1, PHP 0</a>» which compares a home-grown, tailor-made solution in one language to a complete framework in another and it seems to favor the tailor-made solution because it was more performant and felt much easier to maintain.

The truth is, you can't have it both ways:

Either you are willing to live with «bloat» and customize an existing solution, adding some features and not using others, or you are unwilling to accept any bloat and you will do a tailor-made solution that may be lacking in features, may reimplement other features of existing solutions, but will contain <em>exactly</em> the features you want. Thus it will not be «bloated».

FriendFeed decided to go the tailor-made route but instead of many other projects each day who go the tailor made route (take Django's reimplementations of many existing Python technologies like templating and ORM as another example) and keep using that internally, they actually went public.

Not with the intention to bad-mouth Twisted (though it kinda sounded that way due to bad choice of words), but with the intention of telling us: «Hey - here's the tailor-made implementation which we used to solve our problem - maybe it is or parts of it are useful to you, so go ahead and have a look».

Instead of complaining that reimplementation and a bit of NIH was going on, the community could embrace the offering and try to pick the interesting parts they see fitting for their implementation(s).

This kind of reinventing the wheel is a standard process that is going on all the time, both in the Free Software world as in the commercial software world. There's no reason to be concerned or alarmed. Instead we should be thankful for the groups that actually manage to put their code out for us to see - in so many cases, we never get a chance to see it and thus lose a chance at making our solutions better.
