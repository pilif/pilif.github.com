---
layout: post
title: Web service authentication
categories:
- Opinions
- security
- Software
- webdev
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
When reading an <a href="http://googlesystem.blogspot.com/2008/04/subscribe-to-authenticated-feeds-in.html">article</a> about how to make google reader work with authenticated feeds, one big flaw behind all those web 2.0 services sprang to my mind: Authentication.

I know that there are <a href="http://oauth.net/">efforts</a> underway to standardise on a common method of service authentication, but we are nowhere near there yet.

Take facebook: They offer you to enter your email account data into some form to send an invitation to all your friends. Or the article I was referring to: They want your account data for a authenticated feed to make them available in google reader.

But think of what you are giving away...

For your service provider to be able to interact with that other service, they need to store your passwort. Be it short term (facebook, hopefully) or long term (any online feed reader with authentication support). They can (and do) assure you that they will store the data in encrypted form, but to be able to access the service in the end, they need the unencrypted password, thus requiring them to not only use reversible encryption, but to also keep the encryption key around.

Do you want a company in a country whose laws you are not familiar with to have access to all your account data? Do you want to give them the password to your personal email account? Or to everything else in case you share passwords?

People don't seem to get this problem as account data is freely given all over the place.

Efforts like <a href="http://oauth.net/">OAuth</a> are clearly needed, but as webbased technology, they clearly can't solve all the problems (what about Email accounts for example).

But is this the right way? <a href="http://www.codinghorror.com/blog/archives/001072.html">We can't even trust desktop applications</a>. Personally, I think the good old username/password combination is at the end of its usefulness (was it ever really useful?). We need new, better, ways for proving our identity. Something that is easily passed around and yet cannot be copied.

SSL client certificates feel like an underused but very interesting option. Let's make two examples. The first one is your authenticated feed. The second one is your SSL-enabled email server. Let's say that you want to give a web service revokable access to both services without ever giving away personal information.

For the authenticated feed, the external service will present the feed server with its client side certificate which you have signed. By checking your signature, the authenticated feed knows your identity and by checking your CRL it knows whether you authorized the access or not. The service doesn't know your password and can't use your signature for anything but accessing that feed.

The same goes for the email server: The third party service logs in with your username and the signed client certificate (signed by you), but without password. The service doesn't need to know your password and in case they do something wrong, you revoke your signature and be done with it (I'm not sure whether mail servers support client certificates, but I gather they do as it's part of the SSL spec).

Client side certificates already provide a standard means for secure authentication without ever passing a known secret around. Why isn't it used way more often these days?
