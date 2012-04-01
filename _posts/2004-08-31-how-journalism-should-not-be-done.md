---
layout: post
title: How journalism should not be done
tags:
- Opinions
status: publish
type: post
published: true
meta: {}

---
<p>
I am subscribed to the german "Linux Magazin" (it's articles are translated and published to the english "Linux Magazine") and today I received their anniversary edition (10 years Linux Magazin).</p>
<p>With great interest, I read the article "Insel H&uuml;pfer" on page 56 and later. It's about the author telling his story of finding security holes in the setup of a big german hosting provider</p>
<p>The author goes into great details when describing what he did and full of pride he actually tells the reader the MySQL-Root password of one of the compromised servers:</p>
<blockquote>
Und dann entdeckte ich erstmals etwas Erfreuliches: Das Passwort f&uuml;r MySQL-Root lautet: xxxxxx. So sollte ein sicheres Passwort aussehen.</blockquote>
<p>Which means in english: <em>Finally, I discovered something good: The mysql root password is: xxxx. This is what a secure password should look like</em>. In contrast to the article in the Linux Magazin, I am definitiely not naming the password here!</p>
<p>All this would not be worse enough for me to blog about here if only they would not have been so stupid to actually show the user  the name of the provider!</p>
<p>While all URLs are left out and the article does not name the provider, they made two bad mistakes:</p>
<ol>
 <li>On page 63, there is a screenshot of a compromised FAQ page. While they cleared out Mozillas the URL-field, they did not do that with the big visible title of the page containing the domain name in the top left corner. Additionally if they had grayed out the text, googling with the contents of the rest of the page would too have led me to the providers address</li>
 <li>On page 64, they have a screenshot displaying the URL of the compromised phpMyAdmin, graying out the domainname, but leaving the URL intact otherwise. Too bad that the name of the provider is no secret anymore (see above).</li>
</ol>
<p>All this would not be so bad (it certainly is bad for the publisher of Linux Magazin as this will get them in trouble with the provider), it really is <b>catastrophical</b> that the provider <b>has not changed the password printed in the article!</b></p>
<p>This means that any reader of the Linux Magazin (currently only subscribers - I really hope they stop further delivery of this issue) can access the MySQL-Databases of many customers of said provider!</p>
<p>Posting stories like this is really nice and is what gets you the readers actually, but if you do this, please take care not to publicly post compromised passwords that continue to be working when your edition goes to press. And don't leave clues like URLs and other stuff that points to the victim in question! Please!</p>
