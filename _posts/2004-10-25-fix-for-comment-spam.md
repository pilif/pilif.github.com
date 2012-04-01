---
layout: post
title: Fix for comment spam?
categories:
- gnegg.ch
status: publish
type: post
published: true
meta: {}

---
<p>Yesterday, <a href="http://www.7nights.com/asterisk/">asterisk*</a> talks <a href="http://www.7nights.com/asterisk/archive/2004/10/easy-comment-spam-fix">about comment spam</a> and an easy fix to do it.</p>
<p>Reading <a href="http://weblog.burningbird.net/archives/2002/10/29/comment-spam-quick-fix">the article</a> gives quite a good insight on how those spammers work: They don't seem to really request the page of your entry, but they only submit hardcoded values in some database.</p>
<p>This gets this seemingly simple trick to work. Inststead of reading the weblog page and submitting the real form, spammers still submit the hardcoded value, missing the additional form-element.</p>
<p>Unfortunately, this problem is easy to fix for the spammer: Just update the database with the new information form the forms. And I promise you: As soon as this hack gets more known (which is bound to happen soon as it's so simple to impelement), they will update their scripts.</p>
<p>The logical next consequence would be to change this additional tag more often, leading to the spammers updating the index more often.</p>
<p>The ultimate consequence would be a script generating some kind of random cookie which is different on every request. This in turn would lead the spammers to actually request the form before sumitting it.</p>
<p>I don't think, I have to name the consequences of that: The spam will stay, but the bandwidth needed will increase greatly. Instead of just posting, the spammer will also request the whole page.</p>
<p>And the spammer will certainly do that on all weblogs. Regardless of whether they deploy this cookie or not.</p>
<p>So in the end, this "fix" just makes the whole thing worse for all  us bloggers.</p>
<p>Sorry. No solution. Or ist it? Convince me otherwise!</p>
