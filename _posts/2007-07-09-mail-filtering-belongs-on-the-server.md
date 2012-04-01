---
layout: post
title: Mail filtering belongs on the server
categories:
- apple
- browser
- gprs
- iphone
- spam
status: publish
type: post
published: true
meta: {}

---
<p><a href="http://pixelated-dreams.com/archives/306-Im-now-officially-a-fanboy....html">Different</a> <a href="http://forums.macnn.com/103/ipod-iphone-and-apple-tv/340682/spam-on-the-iphone/">people</a> who got their iPhone are complaining about SPAM reaching their inbox and want Junk Mail controls on their new gadget, failing to realize the big problem with that approach:</p>
<p>Even if the iPhone is updated with a SPAM filter, the messages will get transmitted and filtered there, which means that you pay for receiving the junk just to throw it away afterwards.</p>
<p>Additionally, Bayes filter still seem to be the way to go with junk mail filtering. The Bayes rules can get pretty large, so this means that you either have to retrain your phone or that the seed data must be synchronized with the phone which will take both a lot of time and space better used for something else.</p>
<p>No. SPAM filtering is a task for the mail server.</p>
<p>I'm using SpamAssassin and DSPAM to check the incoming mail for junk and then I'm using the server side filtering capabilities of our Exchange server to filter mail recognized as SPAM into the "Junk E-Mail" box.</p>
<p>If the filter is easy enough (checking for header values and moving into boxes), even though it is defined in Outlook, the server can process them regardless of which client is connecting to it to fetch the mail (Apple Mail, Thunderbird and the IMAP client on my W880i in my case). This means that all my junk is sorted away into the "Junk Email" folder just when it arrives. It never reaches the INBOX and I never see it.</p>
<p>I don't have an iPhone and I don't want to have one (I <em>depend</em> on bluetooth modem functionality and a real keypad), but the same thing applies to any mobile emailing solution. You don't want SPAM on your Blackberry and especially not on your even simpler non-smartphone.</p>
<p>Speaking of transferring data: The other thing I really don't like about the iPhone is the browser. Sure: It's standard compliant, it renders nice, it supports AJAX and supports small-screen-rendering but <em>it transmits the websites uncompressed</em>.</p>
<p>Let me make an example: The digg.com frontpage in Opera Mini causes 10KB of data to be tranferred. It looks perfectly fine on my SonyEricsson W880 and works as such (minus some javascript functionality). Digg.com when accessed via Firefox causes 319 KB to be transmitted.</p>
<p>One MB costs CHF 7 here (though you can have some inclusive MB's depending on contract) which is around EUR 4.50, so for that money I could watch digg.com three times with the iPhone or 100 times with Opera Mini. The end-user experience is largely the same on both platforms - at least close enough not to warrant the 33 times more expensive access via a browser that works without a special proxy.</p>
<p>As long as GPRS data traffic is prohibitively expensive, junk mail filtering on the server and a prerendering-proxy based browser are a must. Even more so than the other stuff missing in the iPhone.</p>
