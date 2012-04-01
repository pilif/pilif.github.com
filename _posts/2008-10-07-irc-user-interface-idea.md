---
layout: post
title: IRC user interface idea
categories:
- channel
- chat
- irc
- Programming
- ui
- Usability
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
Don't you know this problem?

You are connected to some amount of IRC servers and you are watching a certain amount of channels.

Every IRC client I know either uses tabs or windows to separate these channels in their own context, usually providing some visual clue if there was activity in a different channel you are not currently watching.

While this metaphor probably makes a lot of sense in very busy channels, I think that consolidating every channel into one single window probably is a much better way for you to follow what's going on and to talk back to the channels - especially when you are watching lesser populated channels.

This frees you from the burden of constantly switching channel windows (or tabs) to see what is going on.

Let's say you are connected to irc1.example.com and irc2.example.com. On irc1, you are connected to #channel1a and #channel1b and on irc2, you are connected to #channel2a

Now, to my knowledge, every current IRC client either uses three windows or three tabs (maybe even 5 windows/tabs because the server themselves get a window too) to represent this information. In window based clients, you can arrange all of them aside of each other, but talking to a certain channel still forces you to focus different windows.

Now with my idea, you would consolidate these channels. You would only get one window which contains all the messages from all channels.

So in the simplest incarnation, you'd probably see something like this in your chat window:
<pre>1) irc1/#channel1a [user1aa]&gt; hi there!
2) irc1/#channel1b [user1a]&gt; hi there!
1) irc1/#channel1a [user1ab]&gt; hi user1aa
3) irc2/#channel2a [user2aa]&gt; hi folks!</pre>
though you would probably understand much more easily what's going on if the server-, channel- and user names were a bit more... well... distinct.

Of course, you could add color. You assign each channel a color, like this:
<pre><span style="color: #99cc00;">1) irc1/#channel1a [user1aa]&gt; hi there!</span>
<span style="color: #ff6600;">2) irc1/#channel1b [user1a]&gt; hi there!</span>
<span style="color: #99cc00;">1) irc1/#channel1a [user1ab]&gt; hi user1aa</span>
<span style="color: #0000ff;">3) irc2/#channel2a [user2aa]&gt; hi folks!</span></pre>
and if you need to, you can still color nicks.
<pre><span style="color: #99cc00;">1) irc1/#channel1a [<span style="color: #ff0000;">user1aa</span>]&gt; hi there!</span>
<span style="color: #ff6600;">2) irc1/#channel1b [<span style="color: #003300;">user1a</span>]&gt; hi there!</span>
<span style="color: #99cc00;">1) irc1/#channel1a [<span style="color: #cc99ff;">user1ab</span>]&gt; hi user1aa</span>
<span style="color: #0000ff;">3) irc2/#channel2a [<span style="color: #ffcc00;">user2aa</span>]&gt; hi folks!</span></pre>
Now... how to talk back?

Easy. Every channel is assigned a number for quick access. Just type /[channel number] to switch to that channel and type, then hit enter. The channel you last talked to is predefined and sticks around until you hit /[another channel number].

This feels so much an easier and more intuitive way to handle multiple connections, especially in cases where the channels you are joined are not too active, as in this way, you can easily watch everything that is going on.

Also, usually, discussions happen in intervals in different channels. You will only very rarely see the color concert I've shown above as usually, you have a discussion going on in one channel while the others are relatively quiet.

I'll probably have to go and implement a proof-of-concept sometime in the future, but this feels like such a nice idea when just looking at it. Why is nobody doing it? What am I missing?
