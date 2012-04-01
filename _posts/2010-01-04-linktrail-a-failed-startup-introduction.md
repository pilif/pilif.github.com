---
layout: post
title: linktrail - a failed startup - introduction
categories:
- linktrail
- Personal
- PHP
- webdev
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
I guess it's inevitable. Good ideas may fail. And good ideas may be years ahead of their time. And of course, sometimes, people just don't listen.

But one never stops learning.

In the year 2000, I took part in a plan of a couple of guys to become the next Yahoo (Google wasn't quite there yet back then), or, to use the words we used on the site,
<blockquote>For these reasons, we have designed an online environment that offers a truly new way for people to store, manage and share their favourite online resources and enables them to engage in long-lasting relationships of collaboration and trust with other users.</blockquote>
The idea behind the project, called linktrail, was basically what would much later on be picked up by the likes of twitter, facebook (to some extent) and the various community based news sites.

The whole thing went down the drain, but the good thing is that I was able to legally salvage the source code, the install it on a personal server of mine and to publish the source code. And now that so many years have passed, it's probably time to tell the world about this, which is why I have decided to start this little series about the project. What is it? How was it made? And most importantly: Why did it fail? And concequently: What could we have done better?

But let's first start with the basics.

As I said, I was able to legally acquire the database and code (which is mostly written by me anyways) and to install the site on a server of mine, so let's get that out to start with. The site is available at <a href="http://linktrail.pilif.ch">linktrail.pilif.ch</a>. What you see running there is the result of 6 months of programming by myself after a concept done by the guys I've worked with to create this.

What is linktrail?

If the tour we made back then is any good, then just <a href="http://linktrail.pilif.ch/Tour/">taking it</a> would probably be enough, but let me phrase in my words: The site is a collection of so called trails which in turn are small units, comparable to blogs, consisting of links, titles and descriptions. These micro-blogs are shown in a popup window (that's what we had back then) beside the browser window to allow quick navigation between the different links in the trail.

Trails are made by users, either by each user on their own or as a collaborative work between multiple users. The owner of a trail can hand out permissions to everybody or their friends (using a system quite similar to what we currently see on facebook for example)

A trail is placed in a directory of trails which was built around the directory structures we used back then, though by now, we would probably do this much more different. Users can subscribe to trails they are interested in. In that case, they will be notified if a trail they are subscribed to is updated either by the owner or anybody else with the rights to update the trail.

Every user (called expert in the site's terms) has their profile page (<a href="http://linktrail.pilif.ch/Experts/pilif">here's mine</a>) that lists the trails they created and the ones they are subscribed to.

The idea was for you as an user to find others with similar interests and form a community around those interests to collaborate on trails. An in-site messaging-system helped users to communicate with each other: Aside of just sending plain text messages, it's possible to recommend trails (for easy one-click subscription) .

linktrail was my first real programming project, basically 6 months after graduating in what the US would call high school. Combine that fact with the fact that it was created during the high times of the browser wars (year 2000, remember)  with web standards basically non-existing, then you can imagine what a mess is running behind the scenes.

Still, the site works fine within those constraints.

In future posts, I will talk about the history of the project, about the technology behind the site, about special features and, of course, about why this all failed and what I would do differently - both in matters of code and organization.

If I woke your interest, feel free to have a look at the code of the site which I just now converted from CVS (I started using CVS about 4 months into development, so the first commit is HUGE) to SVN to git and <a href="http://github.com/pilif/linktrail">put it up on github</a> for public consumption. It's licensed under a BSD license, but I doubt that you'd find anything in this mess of PHP3(!) code (though it runs unchanged(!) on PHP5 - topic of another post I guess), HTML 3.2(!) tag soup and java-script hacks.

Oh and if you can read german, I have also <a href="http://github.com/pilif/ltr-concept">converted the CVS repository</a> that contained the concept papers that were written over the time.

In preparation of this series of blog-posts, I have already made some changes to the code base (available at github):
<ul>
	<li>login after register now works</li>
	<li>warning about unencrypted(!) passwords in the registration form</li>
	<li>registering requires you to solve a reCAPTCHA.</li>
</ul>
