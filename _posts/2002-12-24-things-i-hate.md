---
layout: post
title: Things I hate
categories:
- Personal
status: publish
type: post
published: true
meta: {}

---
Long time, no post. Sorry for that, but I was quite busy.

Today, I was invited to a nice pre-christmas dinner by the mother of my girlfriend. I really looked forward to the event and I deceided to just come to the office for some hours and then to go and take the train to Erlenbach where my girlfriend lives.

As soon as I was in the office, someone came to me and told me that a Win2k-Server just went down. I did what I always do in such cases: Go and reboot the thing.

But this time, it did not help.

So I went to get a TFT-Display and a keyboard to see what's wrong. And I was not pleased: Bluescreen at startup.

None of the debugging-tools provided by Microsoft was of any help, so I took the server at my place and inserted the original installation disk.

As I suspected, the repairing-tool launched by pressing "R" in the Setup-Screen did not help. The *real* good system repair tool can be gotten when chosing to "I"nstall a new Installation and *then* chosing "R" when the old installation has been found.

I was pleased to see that the server booted again, when the installation was complete. All the settings and the whole configuration was still there *yess!*

But two things were wrong:

<ul>
 <li>The WINS-Service could not be started. The error in the error-log was "File not found". An indication *what* file was missing was not given.
 <li>The Exchange-Server used by our renter was down and could not be started. The error in the log is german and I will not even try to translate it for you as it is meaningless anyway.
</ul>

In short: I could not fix the problem before I went to Erlenbach, so I had to return to the office instead of going back home after the (excellent) dinner because I am away around christmas.

My solutions for the problems:

<ul>
 <li>The WINS-Server could be reaniomated by un-installing and re-installing it.
 <li>With the Exchange-Server I am still trying, but I think, <a href="http://support.microsoft.com/default.aspx?scid=kb;EN-US;Q257415">Q257415</a> and <a href="http://support.microsoft.com/default.aspx?scid=kb;EN-US;Q296790">Q296790</a> may be of help (Note: <a href="http://groups.google.com">Google Groups</a> is really great if you don't know any solutions any more.
</ul>

I'll keep you updated on my progress here.
