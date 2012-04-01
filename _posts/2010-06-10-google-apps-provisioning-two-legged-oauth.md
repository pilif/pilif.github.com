---
layout: post
title: Google Apps - Provisioning - Two-Legged OAuth
categories:
- Sysadmin
tags:
- gmail
- google
- oauth
- python
- Solutions
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
Our company uses Google Apps premium for Email and shared documents, but in order to have more freedom in email aliases, in order to have more control over email routing and finally, because there are a couple of local parts we use to direct mail to some applications, all our mail, even though it's created in Google Apps and finally ends up in Google Apps, goes via a central mail relay we are running ourselves (well. I'm running it).

Google Apps premium allows you to do that and it's a really cool feature.

One additional thing I'm doing on that central relay is to keep a backup of all mail that comes from Google or goes to Google. The reason: While I trust them not to lose my data, there are stories around of people losing their accounts to Googles anti-spam automatisms. This is especially bad as there usually is nobody to appeal to.

So I deemed it imperative that we store a backup of every message so we can move away from google if the need to do so arises.

Of course that means though that our relay needs to know what local parts are valid for the google apps domain - after all, I don't want to store mail that would later be bounced by google. And I'd love to bounce directly without relaying the mail unconditionally, so that's another reason why I'd want to know the list of users.

Google provides their provisioning API to do that and using the GData python packages, you can easily access that data. In theory.

Up until very recently, the big problem was that the provisioning API didn't support OAuth. That meant that my little script that retreives the local parts had to have a password of an administrator which is something that really bugged me as it meant that either I store my password in the script or I can't run the script from cron.

With the Google Apps Marketplace, they fixed that somewhat, but it still requires a strange dance:

When you visit the OAuth client configuration (https://www.google.com/a/cpanel/YOURDOMAIN/ManageOauthClients), it lists you domain with the note "This client has access to all APIs.".

This is totally not true though as Google's definition of "all" apparently doesn't include "Provisioning" :-)

To make two-legged OAuth work for the provisioning API, you have to explicitly list the feeds. In my case, this was Users and Groups:

Under "Client Name", add your domain again ("example.com") and unter One or More API Scopes, add the two feeds like this: "https://apps-apis.google.com/a/feeds/group/#readonly,https://apps-apis.google.com/a/feeds/user/#readonly"

<a href="http://www.gnegg.ch/wp-content/uploads/2010/06/oauth-google.png"><img class="aligncenter size-medium wp-image-732" title="oauth-google" src="http://www.gnegg.ch/wp-content/uploads/2010/06/oauth-google-300x101.png" alt="" width="300" height="101" /></a>This will enable two-legged OAuth access to the user and group lists which is what I need in my little script:
{% highlight python %}
import gdata.apps.service
import gdata.apps.groups.service

consumer_key = 'YOUR.DOMAIN'
consumer_secret = 'secret' #check advanced / OAuth in you control panel
sig_method = gdata.auth.OAuthSignatureMethod.HMAC_SHA1

service = gdata.apps.service.AppsService(domain=consumer_key)
service.SetOAuthInputParameters(sig_method, consumer_key, consumer_secret=consumer_secret, two_legged_oauth=True)

res = service.RetrieveAllUsers()
for entry in res.entry:
    print entry.login.user_name

service = gdata.apps.groups.service.GroupsService(domain=consumer_key)
service.SetOAuthInputParameters(sig_method, consumer_key, consumer_secret=consumer_secret, two_legged_oauth=True)
res = service.RetrieveAllGroups()
for entry in res:
    print entry['groupName']
{% endhighlight %}
