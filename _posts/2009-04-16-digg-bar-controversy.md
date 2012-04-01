---
layout: post
title: digg bar controversy
categories:
- digg
- Opinions
- rant
- Software
- solution
- web
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
<strong>Update: </strong>I've actually written this post yesterday and scheduled it for posting today. In the mean time, digg has <a href="http://blog.digg.com/?p=664">found an even better solution</a> and only shows their bar for logged in users. Still - a solution like the one provided here would allow for the link to go to the right location regardless of the state of the digg bar settings.

Recently, digg.com added a controversial feature, the digg bar, which basically frames every posted link in a little IFRAME.

Rightfully so, webmasters were concerned about this and quite quickly, we had the usual religious war going on between the people finding the bar quite useful and the webmasters hating it for lost page rank, even worse recognition of their site and presumed affiliation with digg.

<a href="http://revcanonical.appspot.com/">Ideas crept up</a> over the weekend, but turned out <a href="http://ciaranmcnulty.com/blog/2009/04/rev-canonical-should-be-handled-with-care">not to be so terribly good</a>.

Basically it all boils down to digg.com screwing up on this, IMHO.

I know that they let you turn off that dreaded digg bar, but all the links on their page still point to their own short url. Only then is the decision made whether to show the bar or not.

This means that all links on digg currently just point to digg itself, not awarding any linked page with anything but the traffic which they don't necessarily want. Digg-traffic isn't worth much in terms of returning users. You get dugg, you melt your servers, you return back to be unknown.

So you would probably appreciate the higher page rank you get from being linked at by digg as that leads to increased search engine traffic which generally is worth much more.

The solution on diggs part could be simple: Keep the original site url in the href of their links, but use some JS-magic to still open the digg bar. That way they still get to keep their foot in the users path away from the site, but search engines will now do the right thing and follow the links to their actual target, thus giving the webmasters their page rank back.

How to do this?

Here's a few lines of jQuery to automatically make links formated in the form
{% highlight xml %}
<div id="link_container">
<a id="xxbc34fb" href="http://example.com/articles/cool_article">Cool Article</a>
<a id="xxbc38fc" href="http://example.com/articles/cool_article2">Cool Article 2</a>
<a id="xxbc39fk" href="http://example.com/articles/cool_article3">Cool Article 3</a></div>{% endhighlight %}
be opened via the digg bar while still working correctly for search engines (assuming that the link's ID is the digg shorturl):
{% highlight javascript %}$(function(){
  $('div#link_container a').click(function(){
    $(this).attr('href') = 'http://digg.com/' + this.id;
  });
});{% endhighlight %}
piece of cacke.

No further changes needed and all the web masters will be so much happier while digg gets to keep all the advantages (and it may actually help digg to increase their pagerank as I could imagine that a site with a lot of links pointing to different places could rank higher than one without any external links).

Webmasters then still could do their usual parent.location.href trickery to get out of the digg bar if they want to, but they could also retain their page rank.

No need to add further complexity to the webs standards because one site decides not to play well.
