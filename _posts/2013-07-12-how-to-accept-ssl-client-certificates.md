---
layout: post
title: how to accept SSL client certificates
categories:
- sysadmin
tags:
- programming
- sysadmin
- ssl
status: publish
type: post
published: true
---

Yesterday I was asked on twitter how you would use client certificates
on a web server in order to do user authentication.

Client certificates are very handy in a controlled environment and they
work really well to authenticate API requests. They are, however,
completely [unusable for normal people](/2008/05/why-is-nobody-using-ssl-client-certificates/).

Getting meaningful information from client side certificates is
something that's happening as part of the SSL connection setup, so it
must be happening on whatever piece of your stack that terminates the
client's SSL connection.

In this article I'm going to look into doing this with nginx and Apache
(both traditional frontend web servers) and in node.js which you might
be using in a setup where clients talk directly to your application.

In all cases, what you will need is a means for signing certificates in
order to ensure that only client certificates you signed get access to
your server.

In my use cases, I'm usually using openssl which comes with some
subcommands and helper script to run as a certificate authority. On the
Mac if you prefer a GUI, you can use Keychain Access which as all you
need in the "Certificate Assistant" submenu of the application menu.

Next, you will need the public key of your users. You can have them
send in a traditional CSR and sign that on the command line (use
`openssl req` to create the CSR, use `openssl ca` to sign it), or you
can have them submit an HTML form using the `<keygen>` tag (yes. that
exists. Read up on it on [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/keygen)
for example).

You absolutely *never ever in your lifetime* want the private key of
the user. Do not generate a keypair for the user. Have them generate a
key and a CSR, but never ever have them send the key to you. You only
need their CSR (which contains their public key, signed by their
private key) in order to sign their public key.

Ok. So let's assume you got that out of your way. What you have now is
your CAs certificate (usually self-signed) and a few users which now
own certificates you have signed for them.

Now let's make use of this (I'm assuming you know reasonably well how
to configure these web servers in general. I'm only going into the
client certificate details).


### nginx

For nginx, make sure you have enabled SSL using the usual steps. In
addition to these, set `ssl_client_certificate`
([docs](http://nginx.org/en/docs/http/ngx_http_ssl_module.html#ssl_client_certificate))
to the path of your CA's certificate. nginx will only accept client
certificates that have been signed by whatever `ssl_client_certificate`
you have configured.

Furthermore, set `ssl_verify_client`
([docs](http://nginx.org/en/docs/http/ngx_http_ssl_module.html#ssl_verify_client))
to `on`. Now only requests that provide a client certificate signed by
above CA will be allowed to access your server.

When doing so, nginx will set a few additional variables for you to
use most importantly `$ssl_client_cert` (full certificate),
`$ssl_client_s_dn` (the subject name of the client certificate),
`$ssl_client_serial` (the serial number your CA has issued for their
certificate) and most importantly `$ssl_client_verify` which you should
check for `SUCCESS`.

Use `fastcgi_param` or `add_header` to pass these variables through to
your application (in the case of add_header make sure that it was
really nginx who set it and not a client faking it).

I'll talk about what you do with these variables a bit later on.

### Apache

As with nginx, enxure that SSL is enabled. Then set
`SSLCACertificateFile` to the path to your CA's certificate. Then set
`SSLVerifyClient` to `require`
([docs](http://httpd.apache.org/docs/2.4/mod/mod_ssl.html)).

Apache will also set many variables for you to use in your application.
Most notably `SSL_CLIENT_S_DN` (the subject of the client
certificate)and `SSL_CLIENT_M_SERIAL` (the serial number your CA has
issued). The full certificate is in `SSL_CLIENT_CERT`.

### node.js

If you want to handle the whole SSL stuff on your own, here's an
example in node.js. When you cann `http.createServer`
([docs](http://nodejs.org/api/https.html#https_https_createserver_options_requestlistener)),
pass in some options. One is `requestCert` which you would set to true.
The other is is `ca` which you should set to an array of strings in PEM
format which is your CA's certificate.

Then you can check whether the certificate check was successful by
looking at the `client.authorized` property of your `request` object.

If you want to get more info about the certificate, use
`request.connection.getPeerCertificate()`.

### what now?

Once you have the information about the client certificate (via
fastcgi, reverse proxy headers or apache variables in your module),
then the question is what you are going to do with that information.

Generally, you'd probably couple the certificate's subject and its
serial number with some user account and then use the subject and
serial as a key to look up the user data.

As people get new certificates issued (because they might expire), the
subject name will stay the same, but the serial number will change, so
depending on your use-case use one or both.

There are a couple of things to keep in mind though:

* Due to a flaw in the SSL protocol which was [discovered in 2009](http://www.educatedguesswork.org/2009/11/understanding_the_tls_renegoti.html),
  you cannot savely have only parts of your site require a certificate.
  With most client libraries, this is an all-or-nothing deal. There is
  a secure renegotiation, but I don't think it's widely supported at
  the moment.
* There is no notion of signing out. The clients have to present their
  certificate, so your clients will always be signed on (which might
  be a good thing for your use-case)
* The UI in traditional browsers to handle this kind of thing is
  [absolutely horrendous](/2008/05/why-is-nobody-using-ssl-client-ertificates/).
  I would recommend using this only for APIs or with managed devices
  where the client certificate can be preinstalled silently.

You do however gain a very good method for uniquely identifying
connecting clients without a lot of additional protocol overhead. The
SSL negotiation isn't much different whether the client is presenting a
certificate or not. There's no additional application level code
needed. Your web server can do everything that's needed.

Also, there's no need for you to store any sensitive information. No
more leaked passwords, no more fear of leaking passwords. You just
store whatever information you need from the certificate and make sure
they are properly signed by your CA.

As long as you don't lose your CAs private key, you can absolutely
trust your clients and no matter how much data they get when they
break into your web server, they won't get passwords, not the ability
to log in as any user.

Conversely though, make sure that you keep your CA private key
absolutely safe. Once you lose it, you will have to invalidate all
client certificates and your users will have to go through the process
of generating new CSRs, sending them to you and so on. Terribly
inconvenient.

In the same vein: Don't have your CA certificate expire too soon. If it
does expire, you'll have the same issue at hand as if you lost your
private key. Very annoying. I learned *that* the hard way back in
2001ish and that was only for internal use.

If you need to revoke a users access, either blacklist his serial
number in your application or, much better, set up a proper CRL for
your certificate authority and have your web server check that.

So. Client certificates can be useful tool in some situations. It's
your job to know when, but at least now you have some hints to get you
going.

Me personally, I was using this once around 2009ish for a REST
API, but I have since replaced that with oAuth because that's what most
of the users knew best (read: "at all"). Depending on the audience,
client certificates might be totally foreign to them.

But if it works for you, perfect.
