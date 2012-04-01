---
layout: post
title: Sprite avatars in Gravatar
tags:
- avatar
- chrono trigger
- Games
- Personal
- snes
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
<img class="size-full wp-image-656 alignright" title="Frog" src="http://www.gnegg.ch/wp-content/uploads/2010/02/Frog-Front-1.gif" alt="" width="32" height="48" />

After the release of Google Buzz, my <a href="http://www.google.com/profiles/phofstetter">Google profile</a> which I had for years finally became somewhat useful. Seeing that I really liked the avatar I've added to that profile, I decided, that <a href="http://en.wikipedia.org/wiki/List_of_characters_in_Chrono_Trigger#Frog">Frog</a> should henceforth be my official avatar.

This also meant that I wanted to add <a href="http://en.wikipedia.org/wiki/List_of_characters_in_Chrono_Trigger#Frog">Frog</a> to my Gravatar profile which, unfortunately proved to be... let's say interesting.

The image resizer Gravatar provides on their site to fit the uploaded image to the sites need apparently was not designed for sprites as it tries to blow up sprites way out of proportion only to resize them back down. At first I though I could get away with cheating by uploading above picture with a huge margin added to it, but that only lead to a JavaScript error in their uploader.

In the end, this is what I have done:
<ol>
	<li>Convert the picture into the TGA format</li>
	<li>Scale it using <a href="http://web.archive.org/web/20080208215126/http://www.hiend3d.com/hq3x.html">hq3x</a> (<a href="http://en.wikipedia.org/wiki/Pixel_art_scaling_algorithms">explanation of hq3x</a>)</li>
	<li>Convert it back to png and re-add transparency (hq3x had trouble with transparency in the TGA file)</li>
	<li>Scale it to 128 pixels in height</li>
	<li>paste it into a pre-prepared 128x128 canvas</li>
	<li>upload that.</li>
</ol>
This is how my gravatar looks now, which feels quite acceptable to me:

<img class="aligncenter" title="Gravatar" src="http://www.gravatar.com/avatar/117112d883960c8ed0e13823f88e45f1" alt="My Gravatar" width="80" height="80" />

The one in google's profile was way easier to create: Paste the original image into a 64 by 64 canvas and let google do the resizing. It's not as perfect as the hq3x algorithm, but that suffers by the downsizing to make frog fit 128 pixels in height anyways.

The other option would be to scale using hq2x and the paste that into a 128 by 128 canvas yielding this sharper, but smaller image:

<a href="http://www.gnegg.ch/wp-content/uploads/2010/02/gravatar-sharp.png"><img class="aligncenter size-full wp-image-657" title="Sharper Frog" src="http://www.gnegg.ch/wp-content/uploads/2010/02/gravatar-sharp.png" alt="" width="128" height="128" /></a>But what ever I do, frog will still be resized by Gravatar (and thus destroyed), so I went with the image that contains more colored pixels at the expense of a bit of sharpness.
