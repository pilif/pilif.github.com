---
layout: post
title: Mail for Windows as I like it
categories: []

status: publish
type: post
published: true
meta: {}

---
I had a problem.

My Problem was to still utilize Windows (I have customers requiring me to build windows-programs for them) but having a decent mail program anyway. With decent I mean that it must at least support the following featureset (in the order of decreasing importance):

<ol>
 <li>IMAP-Support. Not just IMAP-Support, but a good one with things as storing Sent-Mail on the server, using the server to search for messages (although I doubt the efficiency of this as long as I am using <a href="http://www.inter7.com/courierimap">Courier</a> on the server side. Searching through 10'000+ textfiles without any index whatsoever is not what *I* call efficient), but also some kind of local caching so that opening folders does not require to get all headers again (which disqualifies <a href="http://www.cyrusoft.com">Mulberry</a> [and <a href="http://www.mutt.org">Mutt</a> on Linux]).
 <li>Threading Support. I want to have nicely sorted message threads and I want to see a real tree structure
 <li>Correct formatting of messages. I absolutly don't want a thing like Outlook Express that does not allow proper quoting, mime-headers, line-breaks and so on...
 <li>Multiple Identities. I have a corporate email-adress I use for customers and a more private one, I used to subscribe to some mailinglists. At least I need to be able to enter more than one Email-Adress per Account (Mullbery does this) or even better to tell the program to use different sender addresses depending on the currently opened folder.
 <li>Adressbook synchronisation. As a reader of this weblog you may have seen that I am quite a "synchronization guy". I want the addresses from my P800 to be in my Mail program. How does not matter for me.
 <li>Checking for new Mail in subfolders. I am subscribed to a whole lot of mailinglists and I filter them already on the server (using <a href="http://www.exim.org">Exim</a> as MTA, this can be done even without spawning many subprocesses for every message). Many Mail Programs insist on just checking the "INBOX"-Folder for new messages despite the fact that Courier would provide a new message count for every folder.
<li>Color Coding of Messages (Quotations ins different colors).
</ol>

I've been using Mozilla Mail so far and it fails to support items 4, 5 and 6 in the list above. Mulberry which I tried for a month or two did even fail so support item 1. Calling mutt via ssh on the mailserver also worked, but I had problems with 1, 5 and 6.

No the point of this article is, that I've finally found what I was looking for for the last three years. A Mail client for Windows supoprting the whole list above! The tool is called "Becky!" and comes from a japanese company called <a href="http://www.rimarts.co.jp">RimArts</a>. Only the import of my adresses required a bit of hacking, but everything else (and even more like the "Mailinglist Manager", the excellent editor, the possibility to use external editors, ...) is there.

Importing the adresses involved a tool called <a href="http://www.stoer.de/ipod/ipod_en.htm">OutPod</a> which is thought for getting a vCard-File out of outlook to store it on the iPod. Becky! has an import-filter for vCard-Files, so this worked nicely (Mozilla *does* have an import-tool for Outlook, but it did not work on my system).

Just go and give Becky! a try. It's great!
