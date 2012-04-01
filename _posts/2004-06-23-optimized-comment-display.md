---
layout: post
title: Optimized comment display
categories: []

status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
Yesterday, when I was reading through old entires here on gnegg.ch, it came to me that I have never really styled the comments-section of my postings during the redesign. I've taken the old MT-Template and style definitions and let it rest at that.

I wanted to change that and so I did:
<ul>
	<li>The comments are in one of those grey boxes now. I think the can be a lot better distinguished from each other now.</li>
	<li>The comment-form is hidden by default. The used JavaScript is quite straight forward, but if you don't want to use JS and still comment, use a User defined stylesheet and set
<pre>    #comment-form{
        display: show !important;
    }</pre>
</li>
	<li>Using <a href="http://www.nonplus.net/software/mt/MTEntryIfComments.htm">MTEntryIfComments</a>, the trackback-list is only shown if there actually <strong>are</strong> trackbacks</li>
	<li>Using the same plugin, if there are no comments, a message is displayed, encouraging to write one.</li>
</ul>
I like this solution quite a lot. The entries are quite less cluttered that way. What do you think?
