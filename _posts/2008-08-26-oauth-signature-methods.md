---
layout: post
title: OAuth signature methods
tags:
- oauth
- Programming
- security
- webdev
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
I'm currently looking into web services and different methods of request authentication, especially as what I'm aiming to end up with is something inherently RESTful as this method will provide me with the best flexibility when designing a frontend to the service and generally, the arguments of the REST crowd seem to convince me (works like the human readable web, inherently scalable, enforces clean structure of resources and finally: easy to program against due to "obvious" API).

As different services are going to communicate with themselves, sometimes acting as users of their respective platforms and because I'm not really inclined to pass credentials around (or make the user do one half of the tasks on one site and the other half on another site), I was looking into different methods of authentication and authorization which work in a RESTful enviroment and work without passing around user credentials.

The first thing I did was to note the requirements and subsequently, I quickly designed something using public key cryptography which would have worked quite nicely (possibly - I'm no expert in this field - yet).

Then I learned about <a href="http://oauth.net">OAuth</a> which was designed precisely to solve my issues.

Eager, I read through <a href="http://oauth.net/core/1.0/">the specification</a>, but I was put off by one single fact: The default method for signing requests, the method that is most widely used, the method that is most widely supported, relies on a <strong>shared secret</strong>.

Even worse: The shared secret must be known in clear on both the client and the server (using the common terminology here; OAuth speaks of consumers and providers, but I'm (still) more used to the traditional naming).

This is bad on multiple levels:
<ul>
	<li>As the secret is stored on two places (client and server), it's twice as probable to leak out than if it's only stored on one place (the client).</li>
	<li>If the token is compromised, the attacker can act in the name of the client with no way of detection.</li>
	<li>Frankly, it's responsibility I, as a server designer, would not want to take on. If the secret is on the client and the client screws up and lets it leak, <strong>it's their problem</strong>, if the secret is stored on the server and the server screws up, <strong>it's my problem</strong> and I have to take responsibility.
Personally, I'm quite confident that I would not leak secret tokens, but can I be sure? Maybe. Do I even want to think about this? Certainly not if there is another option.</li>
	<li>If, god forbid, the whole table containing all the shared secrets is compromised, I'm really, utterly screwed as the attacker can use all services, impersonating any user at will.</li>
	<li>As the server <em>needs to know all shared secrets</em>, the risk of losing all of them is <strong>only even created</strong>. If only the client knows the secret, an attacker has to compromise each client individually. If the server knows the secret, it <em>suffices to compromise the server to get all clients</em>.</li>
	<li>As per the point above, the server gets to be a really interesting target for attacks and thus needs to be extra secured and even needs to take measures against all kinds of more-or-less intelligent attacks (usually ending up DoSing the server or worse).</li>
</ul>
In the end, HMAC-SHA1 is just repeating history. At first, we stored passwords in the clear, then we've learned to hash them, then we even salted them and now we're exchanging them for tokens stored in the clear.

No.

What I need is something that keeps the secret on the client.

The secret should never ever need to be transmitted to the server. The server should have no knowledge at all of the secret.

Thankfully, OAuth contains a solution for this problem: RSA-SHA1 as defined in section 9.3 of the specification. Unfortunately, it leaves a lot to be desired though. Whereas the rest of the specification is a pleasure to read and very, well, specific, 9.3 contains the following phrase:
<blockquote>It is assumed           that the Consumer has provided its RSA public key in a verified way           to the Service Provider, in a manner which is beyond the scope of           this specification.</blockquote>
Sure. Just specify the (IMHO) useless way using shared secrets and leave out the interesting and IMHO only functional method.

Sure. Transmitting a Public Key is a piece of cake (it's public after all), but this puts another burden on the writer of the provider documentation and as it's unspecified, implementors will be forced to amend the existing libraries with custom code to transmit the key.

Also I'm unclear on header size limitations. As the server needs to know what public key was used for signature (oauth_consumer_key), it must be sent on each requests. While manually generated public token can be small, a public key certainly isn't. Is there a size-limit for HTTP-headers? I'll have to check that.

I could just transmit the key ID (the key is known on the server) or the key fingerprint as the consumer key, but is that following the standard? I didn't see this documented anywhere and examples in the wild are very scarcely implemented.

Well... as usual, the better solution just requires more work and I can live with that, especially considering as, for now, I'll be the person to write both server and client, but I feel the upcoming pain, should third party consumers decide to hook up with that provider.

If you ask me what I would have done in the footsteps of the OAuth guys, I would only have specified RSA-SHA1 (and maybe PLAINTEXT) and not even bothered with HMAC-SHA1. And I would have specified a standard way for public key exchange between consumer and provider.

Now the train has left and everyone interested in creating a really secure (and convenient - at least for the provider) solution will be left with more work and not standardized methods.
