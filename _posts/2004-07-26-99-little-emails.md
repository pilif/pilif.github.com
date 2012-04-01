---
layout: post
title: 99 little emails
categories:
- Personal
status: publish
type: post
published: true
meta: {}

---
<pre class="code">
pilif@galadriel ~ % cat ebinerv.php
&lt;?
 for ($i = 0; $i &lt; 100; $i++){
   mail('xxx@sensational.ch', 'Gnegg', 'Gnegg!', 'From: xxx@xxx.ch');
   echo "\rSent Mail $i";
 }
 echo "\nDone!\n";
?&gt;
</pre>
<p>In principle I'm long ahead such little toys. But Ebi had this special configuration where each email that arrives at his mailbox is forwarded as an SMS to his very old mobile phone. And the phone has that nasty bug (or some may call it strange behaviour) where the "Delete all"-function does not really do it's task.
</p>
<p>In the end it was quite funny to see ebi manually delete neary each and every SMS he got because of my script. Maybe he will now buy a better phone or fix his configuration? We'll see.</p>
