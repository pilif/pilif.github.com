---
layout: post
title: Firefo^WDeer Park Alpha 1
tags:
- Free Software
status: publish
type: post
published: true
meta: {}

---
<p>Yesterday, a developers preview of Mozilla 1.1 was released. To  not confuse end users, the've called it <a href="http://www.mozilla.org/projects/deerpark/releases/alpha1.html">Deer Park Alpha 1</a>. You won't see (m)any Firefox-References in the UI.</p>
<p>As always on a major release, extensions and themes tend to break. And as always, you can try to patch (change the MaxVersion) the install.rdf-file in the XPI-file (it's just a zip-archive) and try to see whether the extension still works. Here's what I got so far:</p>
<ul>
 <li>Installing DeerPark Alpha 1 breaks Firefox. You basically get an unstyled white screen when you start Firefox. This is not great, but unavoidable I suppose.</li>
 <li>You can patch up the Qute-Theme and it mostly works (install it with <a href="http://www.winmatrix.com/forums/index.php?showtopic=2640">this script</a>). The preferences-screen looks funny though (it's mostly transparent). So if you don't change any preferences, you can go with qute.</li>
 <li>The Web Developer toolbar continues to work without patching, though with limited functionality.</li>
 <li>Download Manager Tweak works as always, though you can't access its preferences-screen from the preferences dialog (from the extensions window works fine though)</li>
 <li>Feed Your Reader can be patched up. It does not work any more though</li>
 <li>Greasemonkey can be patched up. It does not work though. Throws an error when trying to install an user script.</li>
 <li>Platypus seems to work fine, though it's useless as Greasmonkey does not.</li>
 <li>Adblock can be patched and <em>actually continues to work</em>.</li>
</ul>
<p>This scenario underlines my one problem I'm having with Firefox: They seem to be unable to provide a stable extensions API. On one hand this is a good thing: Cleaning up the API here and then helps getting the product clean and fast. On the other hand, this is bad for the end user. What do you do if your favourite plugin stops being developed and a new browser comes out? Either you don't use the plugin any more, or you stay with the old release of the browser (I'd do that if adblock would stop working - for example).</p>
<p>But you can't stay on old versions. Sometime in the future, a security problem will show up. If you are unlucky enough, the older version is not supported any more. So the choice is: Not using the plugin or surfing with an insecure browser.</p>
<p>That's why I have so few extensions installed. Those I have are popular enough to give me some guarantees that they will be updated. Those I'd like to install that seem to come without the guarantees, I won't install so I don't get used to having them available.</p>
<p>This is not the best situation ever. The people at Mozilla should try to stabilize the API somewhat as soon as possible. And they should try to be backward compatible at least for two bigger releases or so.</p>
<p>I will now go and look for people responsible for all those extensions and will try to report them my findings. And hope for the best.</p>
