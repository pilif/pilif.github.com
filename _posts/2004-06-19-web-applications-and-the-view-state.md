---
layout: post
title: Web Applications and the View State
tags:
- Opinions
- Programming
- session
- viewstate
- webdev
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
Today, it came to my mind, that I know of a problem with some web applications, which apparently few else seem to know about. What is worse, is that those new technologies like ASP.NET and Java Server Faces seem to run straight into the problem.

This article is even bigger than the usual, so I split it up.
<!--more-->

This is about tracking the state of the application, which is usually done with whatever your environment provides for using HTTP-Sessions (Cookie or whatever based - it doesn't matter). The concept is always the same: For each concurrent visitor on your application, the server allocates some kind of storage, assigns that an ID and sends that back to the web browser of the client, which, on every further request, provides the Server with that ID which in turn looks for the associated data.

This works very well, but can badly break when the user opens another browser window. Let me make an example (which is a bit constructed, but I'm going to give you a real-world one later):

Suppose you have a web-application that lists some items and provides a link to delete them. When the user clicks those links, another page will open asking the user for confirmation. This could look that way:
<table border="1">
<tbody>
<tr>
<td>Item1</td>
<td>[Delete]</td>
</tr>
<tr>
<td>Item2</td>
<td>[Delete]</td>
</tr>
<tr>
<td>Item3</td>
<td>[Delete]</td>
</tr>
<tr>
<td>Item4</td>
<td>[Delete]</td>
</tr>
<tr>
<td>Item5</td>
<td>[Delete]</td>
</tr>
</tbody></table>
(of course, there would also be an Edit-Link and a possibility to add another enty, but this doesn't matter for this example)

Now, if the user clicks on one of those delete-links, another page will open looking about like this:

---

&lt;Item&gt; is going to be deleted? OK?
[yes] [no]

----

Now let's suppose, that on this delete-page, there is code in the back end, that sets a session-variable called $item_to_delete to the ID of the item the user has clicked the delete-button in the index-page. Then, when the user clicks "ok", the next page will use this session-variable and delete the (apparently) selected page.

This workflow is very nice and works well <strong>as long as the user does not open more than one browser window</strong>

Let me explain with an example. Suppose the user does the following:
<ol>
	<li>Open the delete-Link of the Item1 in a new window ($item_to_delete is set to 1)</li>
	<li>Open the delete-link of the Item2 in a new window ($item_to_delete is set to 2)</li>
	<li>Go to the Window asking for confirmation to delete Item 1 and click ok</li>
</ol>
What happens is that the session-variable $item_to_delete is looked at and the corresponding item is deleted. Too bad, it's not set to 1, but has been set to 2 while the user opened the other confirmation-page in another window. <strong>The wrong item is deleted</strong>.

Session-Variables work for the users session, not per open browser window, which generally is what the developer intended, as it should be allowed to open multiple windows and still stay logged on, for example.

Now you may call this example of mine a bit constructed and you are right with that. But then again, go to <a href="http://www.linux-community.de">linux-community.de</a> (it's german, but it doesn't matter for this example) and to the following:
<ol>
	<li>Open any article linked on the front page in a new browser window</li>
	<li>Open another article in another browser window</li>
	<li>In the window displaying the first article, change some comments-viewing preferences (with those     buttons below the article)</li>
</ol>
Now though you have correctly changed the viewing-style of the comments, the article you are seeing is the wrong one - it's the one you have opened in the second browser window. Not the original one. This is exactly the same problem as the one I've described in my example above.

There are two approaches to fix that problem:
<ul>
	<li>Disallow the user to open another browser window. This is a no-solution as it introduces quite an usability-problem and may be not even technically possible. I mean: Just imagine reading above linux-website without the ability to open multiple windows at once (the same happens with tabs, anyway)</li>
	<li>Fix the problem by putting the object which the application currently is working on into the context of the currently visible page. This may be the url (/del_form.php?id=xxx) or a hidden form-field. Whatever. Just not the session-data</li>
</ul>
Now. That's an easy fix. Why am I blogging about this if it's so easily fixed?

The problem is those new environments that allow to do web-programming event-centered like you would do client-side GUI programming. Those environments (ASP.NET and Java Server Faces come to my mind) depend heavily on the state of the application stored somewhere and they try to abstract away any web-specific problems (like this one), but - and that's my point - both systems I know of (I've never worked with them, but read quite some documentation) don't seem to be aware of the buglet I'm describing here. This would not be that a big problem as the developer can work around that easily enough. The problem is the high degree of abstraction provided, which allows the developer to (seemingly) forget about the stateless environment she is working with which in the end leads to her not thinking about problems like the one I'm writing about.

What a developer may see is that the application sometimes seems to fail on some users, which is one of those extremely difficult to debug problems. In the end the developer may notice that it has to do with multiple browser windows and instead of trying to analyze the problem further, she will be compelled to jsut disallow opening multiple windows, thus creating a big usability problem.

Later, the vendors of those new environments may even recognize the problem and "fix it" by doing interesting things like checking the integrity of the view state with some kind of hash or whatever and present the user that "dares" to open another windows with a message like this:
<blockquote>Viewstate curruption detected

A corruption of the viewstate has been detected. Please close all browser windows and try again. All your changes you may have made are lost. We apologize for any inconvenience</blockquote>
or whatever.

I'm really no fan of those new web technologies as the abstract away quite too much details. In gerneral, I have no problems with abstractions and with anything else that makes it easier for us developers to build applications. But when it comes down to creating a usability nightmare just because it must be easy for the developer, we went a step too far. And we should be looking for a better solution.
