---
layout: post
title: Hosted Code Repository?
tags:
- paranoia
- Programming
- rant
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
Recently (yesterday), the <a href="http://www.rubyonrails.com/">Ruby on Rails</a> project announced their switch to <a href="http://git.or.cz/">git</a> for their revision controlling needs. Also, they announced that they will use the hosted service <a href="http://github.com/">github</a> as the place to host the main repository on (even though git is decentralized, there is some sense in having a "main tree" which contains what's going to be the official releases).

I didn't know github, so I had a look at their project.

What I don't understand is that they seem to also target commercial entities with their offering. Think of it: Supposing that you are a commercial entity doing commercial software development. Would you send over all your sourcecode *and* all the development history to another company?

Sure. They call themselves "Secure". But what does that mean? Sure: They have SSL and SSH support, but frankly, I'm less concerned with patches travelling over the network unencrypted than I'm concerned with trusting anybody to host my code.

Even if they don't screw up storage security (think: "accessing the code of your competition"), even if they are completely 100% trustworthy (think: "displeased employee selling out to your competition before leaving his employer"), there is still the issue of government/legal access.

When using an external hosting provider, you are storing your code (and history) in a foreign country with its own legislation. Are you prepared for that?

And finally, do you want the government of the country you've just sent your code (and history) to, to really have access to all that data? Who guarantees that the hosting provider of your choice won't cooperate as soon as the government comes knoking (it <a href="http://www.theregister.co.uk/2005/09/07/yahoo_china_dissident_case/">happened before</a>, even without <a href="http://seclists.org/nmap-hackers/2007/0000.html">legal base at all</a>)?

All that is never worth the risk for a larger company (or for smaller ones - <a href="http://www.sensational.ch">like ours</a>).

So what exactly are these hosting companies (github is one. <a href="http://www.codespaces.com/">Code Spaces</a> is another) targeted at?
<ul>
	<li>Free Software developers? Their code is open to begin with, so they have to face the problems I described anyways. But they are much harder to sue. Also, I'm not sure how compelling it is for a free software project to use a non-free tool (rails being the exception, but we'll talk about that later on)</li>
	<li>Large companies? No way (see above)</li>
	<li>Smaller companies? Probably not. Smaller companies are less of a target due to lower visibility, but sueing them for anything is more likely to get you something in return quickly as they usually don't dare prolonged legal fights.</li>
</ul>
