---
layout: post
title: Google Buzz, Android and Google Apps Accounts
tags:
- android
- annyoing
- buzz
- google
- Software
- Solutions
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
I was looking at the Google Android Maps Application that is now providing integrated Google Buzz support, showing buzzes directly on the map and allowing you to buzz (around where I live and work, there has been a tremendous uptake of Google Buzz which makes this really compelling).

However, there's a little peculiarity about the Android maps application: If your main Google Account you configured (that's the first one you configure) on the phone is a Google Apps account, Maps will use that for buzz-support (apparently, there's already some kind of infrastructure for inter-company Buzzing in place). This means that you would only see buzzes from other people in your domain and, because there's no official support for this out there, only if they are also using an Android phone.

"Mittelpraktisch" as I would say in German.

The obvious workaround is to configure your private gmail account to be your primary account (this is only possible by factory-resetting your device by the way), but this has some disadvantages, mainly the fact that the calendar on the Android  phones only supports syncing with the primary account and as it happens, usually it's the work-calendar (the Apps one) you want synchronized; not the private one (that lingers unused in my case).

To work around this issue, share your work calendar with your private Google account.

Unfortunately, I couldn't do that as I'm posting this, because the default in the domain configuration is to not allow this. Thankfully, I'm that domain's administrator, so I could change it (small company. remember.), but it seems to take a while to propagate into the calendar account.

I'll post more as my investigation turns out more, though it is my gut feeling that this mess will solve itself as Google fixes their Maps application to not use that phantom corporate buzz account.
