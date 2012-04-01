---
layout: post
title: Why is nobody using SSL client certificates?
categories:
- Opinions
- Software
- ssl
- Usability
- webdev
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
Did you know that ever since the days of Netscape Navigator 3.0, there is a technology that allows you to
<ul>
	<li>securely sign on without using passwords</li>
	<li>allow for non-annoying two-factor authentication</li>
	<li>uniquely identify yourself to third-party websites without giving the second party any account information</li>
</ul>
<p>All of this can be done using SSL client certificates.</p>
<p>You know: Whenever you visit an SSL protected page, what usually happens is that your browser checks the identity of the remote site by checking their certificate. But what also could happen is that the remote site could check <strong>your </strong>identity using a previously issued certificate.</p>
<p>This is called SSL client side certificate.</p>
<p>Sites can make the browser generate a keypair for you. Then they'll sign your public key using their private key and they'll be able to securely identify you from then on.</p>
<p>The certificate is stored in the browser itself and your browser will send it to any (SSL protected) site requesting it. The site in turn could then identify you as the owner of the private key associated to the presented certificate (provided the key wasn't generated on a <a href="http://lists.debian.org/debian-security-announce/2008/msg00152.html">pre-patch</a> Debian installation *sigh*).</p>
<p>The keypair is bound to the machine it was generated on, though it can be exported and re-imported on a different machine.</p>
<p>It solves our introductory three problems like this:</p>
<ul>
	<li>by presenting the certificate, the origin server can identify you. <em>No need to enter a user name or a password</em>.</li>
	<li>By asking for a password (something you know) and comparing the SSL certificate (something you have), you get cheap and <em>easy two factor authentication</em> that's a lot more secure than asking for your mothers maiden name.</li>
	<li>If the requesting party in a three-site scenario knows your public key and uses that to request information from a requested party, you, <em>can revoke access by this key at any time</em> without any of the parties knowing your username and password.</li>
</ul>
<p>Looks very nice, doesn't it?</p>
<p>So why isn't it used more often (read: at all)?</p>
<p>This is why:</p>
<a href="http://www.gnegg.ch/wp-content/uploads/2008/05/scary_small.png"><img class="aligncenter size-full wp-image-411" title="Complicated SSL Dialogs" src="http://www.gnegg.ch/wp-content/uploads/2008/05/scary_small.png" alt="Picture underlining the \" width="450" height="473" /></a>

The screenshot shows what's needed to actually have a look at the client side certificates installed in your browser, which currently is the only way of accessing them. Let's say you want to copy a keypair from one machine to another. You'll have to:
<ol>
	<li>Open the preferences (many people are afraid of even that)</li>
	<li>Select Advanced (scary)</li>
	<li>Click Encryption (encry... what?)</li>
	<li>Click "View Certificates" (what do the other buttons do? oops! Another dialog?)</li>
	<li>Select your certificate (which one?) and click "Export" (huh?)</li>
</ol>
<p>Even generation of the key is done in-browser without feedback by the site requesting the key.</p>
<p>This is like basic authentication (nobody uses this one) vs. forms based authentication (which is what everybody uses): It's non-themeable, scary, modal and complicated.</p>
<p>What we need for client side certificates to become useful is a way for sites to get more access to the functionality than they currently do: They need information on the key generation process. They should allow the user to export the key and to re-import it (just spawning two file dialogs should suffice - of course the key must not be transmitted to the site in the process). They need a way to list the keys installed in a browser. They need to be able to add and remove keys (on the user's request).</p>
<p>In the current state, this excellent idea is rendered completely useless by the awful usability and the completely detached nature: This is a browser feature. It's browser dependent without a way for the sites to control it - to guide users through steps.</p>
<p>For this to work, sites need more control.</p>
<p>Without giving them access to your keys.</p>
<divpInteresting problem. Isn't it?</p>
