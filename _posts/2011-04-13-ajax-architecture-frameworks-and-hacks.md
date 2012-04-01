---
layout: post
title: AJAX, Architecture, Frameworks and Hacks
tags:
- ajax
- architecture
- hack
- js
- opinion
- Opinions
- Personal
- Programming
- Software
status: publish
type: post
published: true
meta:
  _flattr_post_language: en_GB
  _flattr_post_category: text
  _flattr_post_hidden: "0"
  _flattr_btn_disabled: ""
  _edit_last: "1"
---
Today I was talking with <a href="http://twitter.com/brainlock">@brainlock</a> about JavaScript, AJAX and Frameworks and about two paradigms that are in use today:

The first is the "traditional" paradigm where your JS code is just glorified view code. This is how AJAX worked in the early days and how people are still using it. Your JS-code intercepts a click somewhere, sends an AJAX request to the server and gets back either more JS code which just gets evaulated (thus giving the server kind of indirect access to the client DOM) or a HTML fragment which gets inserted at the appropriate spot.

This means that<em> your JS code will be ugly</em> (especially the code coming from the server), but it has the advantage that all your view code is right there where all your controllers and your models are: on the server. You see this pattern in use on the 37signals pages or in the <a href="http://github.com">github</a> file browser for example.

Keep the file browser in mind as I'm going to use that for an example later on.

The other paradigm is to go the other way around an promote JS to a first-class language. Now you build a framework on the client end and transmit only data (XML or JSON, but mostly JSON these days) from the server to the client. The server just provides a REST API for the data plus serves static HTML files. All the view logic lives only on the client side.

The advantages are that you can organize your client side code much better, for example using <a href="http://documentcloud.github.com/backbone/">backbone</a>, that there's no expensive view rendering on the server side and that you basically get your third party API for free because the API is the only thing the server provides.

This paradigm is used for the new twitter webpage or in my very own <a href="http://tempalias.com">tempalias.com</a>.

Now <a href="http://twitter.com/brainlock">@brainlock</a> is a heavy proponent of the second paradigm. After being enlightened by the great Crockford, we both love JS and we both worked on huge messes of client-side JS code which has grown over the years and lacks structure and feels like copy pasta sometimes. In our defense: Tons of that code was written in the pre-enlightened age (2004).

I on the other hand see some justification for the first pattern aswell and I wouldn't throw it away so quickly.

The main reason: It's more pragmatic, it's more DRY once you need graceful degradation and arguably, you can reach your goal a bit faster.

Let me explain by looking at the github file browser:

If you have a browser that supoports the HTML5 history API, then a click on a directory will reload the file list via AJAX and at the same time the URL will be updated using push state (so that the current view keeps its absolute URL which is valid even after you open it in a new browser).

If a browser doesn't support pushState, it will gracefully degrade by just using the traditional link (and reloading the full page).

Let's map this functionality to the two paradigms.

First the hacky one:
<ol>
	<li>You render the full page with the file list using a server-side template</li>
	<li>You intercept clicks to the file list. If it's a folder:</li>
	<li>you request the new file list</li>
	<li>the server now renders the file list partial (in rails terms - basically just the file list part) without the rest of the site</li>
	<li>the client gets that HTML code and inserts it in place of the current file list</li>
	<li>You patch up the url using push state</li>
</ol>
done. The view code is only on the server. Whether the file list is requested using the AJAX call or the traditional full page load doesn't matter. The code path is exactly the same. The only difference is that the rest of the page isn't rendered in case of an AJAX call. You get graceful degradation and no additional work.

Now assuming you want to keep graceful degradation possible and you want to go the JS framework route:
<ol>
	<li>You render the full page with the file list using a server-side template</li>
	<li>You intercept the click to the folder in the file list</li>
	<li>You request the JSON representation of the target folder</li>
	<li>You use that JSON representation to fill a client-side template which is a copy of the server side partial</li>
	<li>You insert that HTML at the place where the file list is</li>
	<li>You patch up the URL using push state</li>
</ol>
The amount of steps is the same, but the amount of work isn't: If you want graceful degradation, then you write the file list template twice: Once as a server-side template, once as a client-side template. Both are quite similar but usually you'll be forced to use slightly different syntax. If you update one, you have to update the other or the experience will be different whether you click on a link or you open the URL directly.

Also you are duplicating the code which fills that template: On the server side, you use ActiveRecord or whatever other ORM. On the client side, you'd probably use Backbone to do the same thing but now your backend isn't the database but the JSON response. Now, Backbone is really cool and a huge timesaver, but it's still more work than not doing it at all.

OK. Then let's skip graceful degradation and make this a JS only client app (<a href="http://www.google.com/search?ie=UTF-8&amp;q=gawker+redesign">good luck trying to get away with that</a>). Now the view code on the server goes away and you are just left with the model on the server to retrieve the data, with the model on the client (Backbone helps a lot here, but there's still a substatial amount of code that needs to be written that otherwise wouldn't) and with the view code on the client.

Now don't ge me wrong.

I <strong>love</strong> the idea of promoting JS to a first class language. I <strong>love</strong> JS frameworks for big JS only applications. I <strong>love</strong> having a "free", dogfooded-by-design REST API. I <strong>love</strong> building cool architectures.

I'm just thinking that at this point it's so much work doing it right, that the old ways do have their advantages and that we should not condemn them for being hacky. True. They are. But they are also <em>pragmatic</em>.
