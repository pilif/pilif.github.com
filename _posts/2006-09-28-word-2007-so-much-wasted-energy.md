---
layout: post
title: Word 2007 - So much wasted energy
tags:
- Opinions
- rant
- Software
- word
status: publish
type: post
published: true
meta: {}

---
<p>Today, I've come across a screencast showing how to <a href="http://www.jonesxml.com/jobailor/21stcenturydoc/21stcenturydoc.html">quickly format</a> a document using the all new Word 2007 - part of office 2007 (don't forget to also read the associated <a href="http://blogs.msdn.com/microsoft_office_word/archive/2006/09/18/761200.aspx">blog post</a>).</p>
<p>If you have any idea how Word works and how to actually use it, you will be as impressed as the presenter (and admittedly I) was: Apply some styles, chose a theme and be done with it.</p>
<p>Operations that took ages to get right are now done in a minute and it'll be very easy to create good looking documents.</p>
<p>Too bad that it's looking entirely different in practice.</p>
<p>If I watch my parents or even my coworkers use word, all I'm seeing is styles being avoided. Heading 1? Just use the formatting toolbar to make the font bigger and bold.</p>
<p>Increase spacing between paragraphs? Hit return twice.</p>
<p>Add empty spacing after a heading (which isn't even one from Word's point of view)? Hit return twice.</p>
<p>Indent text? Hit tab (or even space as seen in my mother's documents).</p>
<p>This also is the reason why those people never seem to have problems with word: The formatting toolbar works perfectly fine - the bugs lie in the "advanced" features like assigning styles.</p>
<p>Now the problem is that all features shown in that screencast are totally dependent of the styles being set correctly.</p>
<p>If you take the document shown as it is before you apply styling and then use the theme function to theme your document, nothing will happen as word doesn't know the semantic data about your document. What's a heading? What's a subtitle? It's all plain text.</p>
<p>Conversely, if you style your document the "traditional" way (using the formatting toolbar) and then try to apply the theme, nothing will happen either as the semantic information is still missing.</p>
<p>This is the exact reason why WYSIWYG looks like a nice gimmick at the first glance, but it more or less makes further automated work on the document impossible to do.</p>
<p>You can try and hack around this of course - try to see pattern in the user's formatting and guess the right styles. But this can lead to even bigger confusion later on as you can make wrong guesses which will in the end make the themeing work inconsistently.</p>
<p>Without actually using semantic analysis of the text (which currently is impossible to do), you will never be able to accurately use stuff like themeing - unless the user provides the semantic information by using styles which in turn defeats the purpose of WYSIWYG.</p>
<p>So, while I really like that new themeing feature of Office 2007, I fear that for the majority of the people it will be completely useless as it plain won't work.</p>
<p>Besides, themes are clearly made for the end user at home - in a corporate environment you will have to create documents according to the corporate design which probably won't be based on a pre-built style in office.</p>
<p>And end users are the people the least able to understand how assigning styles to content works.</p>
<p>And once people "get" how to work with text styles and the themes will begin to work, we'll be back at square one where everyone and their friends are using all the same theme because it's the only one looking more or less acceptable, defeating all originality initially in the theme.</p>
