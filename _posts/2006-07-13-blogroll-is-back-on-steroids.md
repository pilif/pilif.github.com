---
layout: post
title: Blogroll is back - on steroids
categories:
- Free Software
- gnegg.ch
- PHP
- Solutions
status: publish
type: post
published: true
meta: {}

---
<p>I finally got around to adding an excerpt of the list of blogs I'm regularly reading to the navigation bar to the right.</p>
<p>The list is somewhat special as it's auto-updating: It refereshes every 30 minutes and displays a list of blogs in descending order of last-updated-time.</p>
<p>Adding the blogroll was a multi step process:</p>
<p>At first, I thought adding the Serendipity blogroll plugin and pointing it to my <a href="http://www.newsgator.com">Newsgator</a> subscription <a href="http://services.newsgator.com/ngws/svc/opml.aspx?uid=61859&amp;mid=1">list</a> (I'm using Newsgator to always have an up-to-date read-status in both Net News Wire and FeedDemon) was enough, but unfortunately, that did not turn out to be the case.</p>
<p>First, the expat module of the PHP installation on this server has a bug making it unable to parse files with the unicode byte order mark at the beginning (basically three bytes telling your machine if the document was encoded on a little- or big-endian machine). So it was clear that I had to do some restructuring of the OPML-feed (or patching around in the s9y plugin, or upgrading PHP).</p>
<p>Additionally, I wanted the list to be sorted in a way that the blogs with the most recent postings will be listed first.</p>
<p>My quickly hacked-together solution is <a href="http://www.lipfi.ch/pilif-feed.phps">this script</a> which uses a RSS/Atom-parser I took from Wordpress, which means that the script is licensed under the GNU GPL (as the parser is).</p>
<p>I'm calling it from a cron-job once per 30 minutes (that's why the built-in cache is disabled on this configuration) to generate the OPML-file sorted by the individual feeds update time stamp.</p>
<p>That OPML-file then is fed into the serendipity plugin.</p>
<p>The only problem I now have is that the list is unfairly giving advantage to the aggregated feeds as these are updated much more often than individual persons blogs. In the future I will thus either create a penalty for these feeds, remove them from the list or just plain show more feeds on the page.</p>
<p>Still, this was a fun hack to do and fulfills its purpose. Think of it: Whenever I add a feed in either Net News Wire or FeedeDemon, it will automatically pop up on the blogroll on gnegg.ch - this is really nice.</p>
<p>On a side note: I could have used the Newsgator API to get the needed information faster and probably even without parsing the individual feeds. Still, I went the OMPL-way as that's an open format making the script useful for other people or for me should I ever change the service.</p>
