---
layout: post
title: reddit's commenting system
tags:
- commenting
- opinion
- reddit
- Software
- Usability
- webdev
status: publish
type: post
published: true
meta: {}

---
<p>This is something I wanted to talk about for quite some time now, but I never got around to it. Maybe you know <a href="http://reddit.com">reddit</a>. reddit basically works like digg.com - it's one of these web2.0 mashup community social networking <a href="http://www.youtube.com/watch?v=dr3qPRAAnOg">bubble</a> sites. reddit is about links posted by users and voted for by users.</p>  <p>Unlike digg, reddit has an awful screen design and thus seems to attract&#160; a bit more mature crowds than digg does, but lately it seems to be taken over by politics and pictures which devalues the whole site a bit.</p>  <p>What is really interesting though is the commenting system. In fact, it's interesting enough for me to write about it and it works well enough for me to actually post a comment there here and then. It's even good enough for me to be sure that whenever I will be in the situation to design a system to allow users to comment on something that I will have a look at what reddit did and I will model my solution around that base.</p>  <p>There are so many commenting systems out there, but all fail in some regards. Either they disturb your reading flow, making it too difficult to post something. Or they either hide comments behind a foldable tree structure or they display a flat list making it difficult to see any kind of threading going on.</p>  <p>And once you actually are interested in a topic enough to post a comment or a reply to a comment, you'll quickly lose track of the discussion which gets as quickly buried by newly arriving posts.</p>  <p>reddit works differently.</p>  <p>First, messages are displayed in a threaded, but fully expanded view, thus allowing to skip over content you are not interested in while still providing all the overview you need. Then, posting is done inline via some AJAX interface. You see a comment you want to reply to, you hit the reply link, enter the text and hit &quot;save&quot;. The page is not reloaded, you end up just where you left off.</p>  <p>But what good is answering to a comment if the initial commenter quickly forgets about his or her comment? Or if he or she just plain doesn't find her comment again? </p>  <p>reddit puts all direct replies to any comments you made into your personal inbox folder. If you have any of these replies, the envelope to the top right will light up red allowing you to see newly arrived replies to your comments. With one click, you can show the context of the post you replied to, your reply and the reply you got. This makes it incredibly easy to be notified when someone posted something in response, thus keeping the discussion alive, no matter how deeply it may have been buried by comments arriving after yours.</p>  <p>So even if reddit looks awful (one gets used to the plain look though), it has one of the best, if not the best online discussion systems under its hood and so many other sites should learn from that example. It's so easy that it even got me to post a comment here and then - and I even got replies despite not obviously trolling (which usually helps you get instant-replies, though I don't recommend this practice).</p>
