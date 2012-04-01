---
layout: post
title: "Google Apps: Mail Routing"
categories:
- Sysadmin
tags:
- email
- google
- networking
- Software
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
Just today while beginning the evaluation of a Google Apps For Your Domain Premium account, I noticed something that may be obvious to all of you Google Apps user out there, but certainly isn't documented well enough for you to notice before you sign up:

Google Apps Premium has kick-ass mail routing functionality.

Not only can you configure Gmail to only accept mails from defined upstream-server, thus allowing you to keep the MX to some already existing server where you can do alias resolution for example. No. You can also tell Gmail to <strong>send</strong> outgoing mail via an external relay.

This is ever so helpful as it allows you to keep all the control you need over incoming email - for example if you have email-triggered applications running. Or you have email-aliases (basically forwarders where xxx@domain.com is forwarded to yyy@other-domain.com) which Google Apps does not support.

Because you can keep your old MX, your existing applications keep working and your aliases continue to resolve.

Allowing you to send all outgoing mail via your relay, in turn, allows you to get away without updating SPF records and forcing customers to change filters they may have set up for you.

This feature alone can decide between a go or no-go when evaluating Google Apps and I cannot understand why they have not emphasized on this way more than they currently do.
