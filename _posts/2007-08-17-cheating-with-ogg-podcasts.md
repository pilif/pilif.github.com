---
layout: post
title: Cheating with OGG-podcasts
categories: []

status: publish
type: post
published: true
meta: {}

---
<center><!-- s9ymdb:24 --><img width='470' height='60' style="border: 0px; padding-left: 5px; padding-right: 5px;" src="/uploads/ogg.png" alt="" /></center>
<p>For about a year, I'm listening to Podcasts all the time. Until now, I was using my iPod nano with iTunes for my podcasting needs and I was pretty happy about it.</p>
<p>Lately though, I came across some podcasts that provide either only OGG versions or at least enhanced OGG versions (like stereo or additional content). Not wanting to start writing code to listen to Podcasts, I thought that maybe I should try out another player...</p>
<p>I settled with an iRiver Clix 2 which looks great, has a nice OLED display and plays OGG files.</p>
<p>Unfortunately though, it doesn't play AAC-files which is what one of the podcasts I listen to is distributed in.</p>
<p>So I went down to code and wrote <a href="http://www.worldofwarcast.com/forums/showthread.php?t=871">some conversion scripts</a> that download the AAC-files, convert them to ogg and alter the RSS-feed to point to the converted files.</p>
<p>This worked perfectly, so today I rsynced two Podcasts to the iRiver and went to the Office, only to noticing two big problems with the thing:</p>
<ol>
    <li>It doesn't keep track of what Podcasts I've already listened to. As I have quite many podcasts I'm subscribed to, it's very hard to manually keep track.</li>
    <li>And the killer: It doesn't store the playback position. This is totally bad as podcasts usually are long (up to two hours) and while I like the iRiver's nice 'press-the-edge-of-the-device' usage concept, it's a real pain to seek in the file: Either it's <b>way too slow</b> or <b>totally inaccurate</b>, so while seeking on the iPod would be tolerable, it's completely impossible to do on the iRiver.</li>
</ol>
<p>Just when I thought that the advantages of being able to play OGGs still outweigh the two disadvantages, I began thinking that maybe, maybe I could do the AAC to OGG-Hack again, but in the other direction...</p>
<p>So now I'm "cheating" myself into better quality and bonus content without actually really using the free format.</p>
<p>And this is how it works (it's basically the same thing as the scripts I linked in the forum post above, but it has some advanced features):</p>
<ul>
    <li>At half pas midnight (though I may increase the interval), <a href="http://www.lipfi.ch/ogg_cast_download.phps">ogg_cast_download.php</a> runs. It goes over a list of RSS-feeds (though I may actually automate this list in a later revision - as soon as I'm getting more and more ogg-casts), checks them for new entries (which is easy: If the file isn't there, it must be new), downloads the enclosures (using wget for resume functionality, proper handling of redirects and meaningful output), acquires tagging information and finally converts the files to AAC format using faac.</li>
    <li>Whenever iTunes checks for new podcasts, it doesn't actually download the original, but uses <a href="http://www.lipfi.ch/oggcasts.phps">oggcasts.php</a> running on <a href="/archives/291-Computers-under-my-command-Issue-1-shion.html">shion</a>, passing the original URL</li>
    <li>oggcasts.php checks the (symlinked) output directoy of the ogg downloader and alters the feeds to match the converted files.</li>
</ul>
<p>And if you think you can just install the <a href="http://www.xiph.org/quicktime/">official quicktime OGG component</a> to import the feeds: That unfortunately won't work. iTunes refuses to directly download ogg-feeds.</p>
