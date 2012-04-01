---
layout: post
title: "JSONP. Compromised in 3\xE2\x80\xA62\xE2\x80\xA61\xE2\x80\xA6"
tags:
- javascript
- json
- opinion
- Opinions
- Programming
- security
- xss
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
To embed a vimeo video on some page, I had a look at their different methods for embedding and the easiest one seemed to be what is basically JSONP - a workaround for the usual restriction of disallowing AJAX over domain boundaries.

But did you know, that JSONP not only works around the subdomain restriction, it basically is one huge cross site scripting exploit and there's nothing you can do about it?

You might have heard this and you might have found articles like <a href="http://tav.espians.com/sanitising-jsonp-callback-identifiers-for-security.html">this one</a> thinking that using libraries like that would make you save. But that's an incorrect assumption. The solution provided in the article has it backwards and only helps to protect the originating site against itself, but it does not help at all to protect the calling site from the remote site.

You see, the idea behind JSONP is that you source the remote script using &lt;script src="http://remote-service.example.com/script.js"&gt; and the remote script then (after being loaded into your page and thus being part of your page) is supposed to call some callback of the original site (from a browsers standpoint it is part the original site).

The problem is that you do not get control over the loading let alone content of that remote script. Because the cross-domain restrictions prevent you from making an AJAX request to a remote server, you are using the native HTML methods for cross domain requests (which should not have been allowed in the first place) and at that moment you relinquish all control over your site as that remotely loaded script runs in the context of your page, which is how you get around the cross domain restrictions - by loading the remote script into your page and executing it in the context of your page.

Because you never see that script until it is loaded, you cannot control what it can do.

Using JSONP is basically subjecting yourself to an XSS attack by giving the remote end complete control over your page.

And I'm not just talking about malicious remote sites... what if they themselves are vulnerable to some kind of attack? What if they were the target of a successful attack? You can't know and once you do know it's too late.

This is why I would recommend you never to rely on JSONP and find other solutions for remote scripting: Use a local proxy that does sanitization (i.e. strict JSON parsing which will save you), rely on cross-domain messaging that was added in later revisions of the upcoming HTML5 standard.
