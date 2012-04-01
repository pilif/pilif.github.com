---
layout: post
title: Trying out Gmail
tags:
- gmail
- google
- imap
- mail
- Software
status: publish
type: post
published: true
meta: {}

---
<p>Everyone and their friends seems to be using Gmail lately and I agree: The application has a clean interface, a very powerful search feature and is easily accessible from anywhere.</p>
<p>I have my Gmail address from back in the days when invites were scarce and the term AJAX wasn't even a term yet, but I never go around to really take advantage of the services as I just don't see myself checking various email accounts at various places - at least not for serious business.</p>
<p>But now I found a way to put gmail to the test as my main email application - at least for a week or two.</p>
<p>My main mail storage is and will be our Exchange server. I have multiple reasons for that</p>
<ol>
  <li>I have all my email I ever sent or received in that IMAP account. That's WAY more than the 2.8 GB you get in Gmail and even if I had enough space there, I would not want to upload all my messages there. </li>
  <li>I don't trust gmail to be as diligent with the messages I store there as I would want it to. I managed to keep every single email message from 1998 till now and I'd hate to lose all that to a "glitch in the system".</li>
  <li>I need IMAP access to my messages for various purposes.</li>
  <li>I need the ability of a strong server-side filtering to remove messages I'm more or less only receiving for logging purposes. I don't want to see these - not until I need them. No reason to even have them around usually.</li>
</ol>
<p>So for now I have added yet another filter to my collection of server-side filters: This time I'm redirecting a copy of all mail that didn't get filtered away due to various reasons to my Gmail address. This way I get to keep all mail of my various aliases all at the central location where they always were and I can still use Gmail to access the newly arrived messages.</p>
<p>Which leaves the problem with the sent messages which I ALSO want to archive at my own location - at least the important ones.</p>
<p>I fixed this by BCCing all Mail I'm writing in gmail to a new alias I created. Mail to that alias with my Gmail address as sender will be filtered into my sent-box by Exchange so it'll look as though I sent the message via Thunderbird and then uploaded the copy via IMAP.</p>
<p>I'm happy with this solution, so testing Gmail can begin.</p>
<p>I'm asking myself: Is a tag based storage system better than a purely search based (the mail I don't filter away is kept in one big INBOX which I access purely via search queries if I need something)? Is a web based application as powerful as a mail client like Thunderbird or Apple Mail? Do I unconsciously use features I'm going to miss when using Gmail instead of Apple Mail or Thunderbird? Will I be able to get used to the very quick keyboard-interface to gmail?</p>
<p>Interesting questions I intend to answer.</p>
