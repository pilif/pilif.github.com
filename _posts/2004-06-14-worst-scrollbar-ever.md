---
layout: post
title: Worst scrollbar ever
categories: []

status: publish
type: post
published: true
meta: {}

---
<div class="floatimg">
<img alt="scrollbar.png" src="http://www.gnegg.ch/archives/scrollbar.png" width="78" height="173" border="0" /><p class="legend">Taken from thawte.com. I made the thing a bit shorter, but changed nothing else.</p>
</div>
<p>Small quiz: What is this thing you are seing in this image (possibly displayed on the right in your browser)?</p>
<p>It's a scrollbar. Or at least, it's supposed to be one. I came across this "wonderful" ... thing when I was looking around for a code signing certificate on thawte.com. Have a look for yourself: It's right <a href="http://www.thawte.com/codesign/index.html">there</a>.</p>
<p>I have quite some problems with this maybe-scrollbar:</p>
<ul>
  <li>I can't read it. Maybe it's my eyes, but I simply have problems recognizing a dark blue slider on black background.</li>
  <li>It's no real scrollbar. It does just look like one. This has many "advantages":
        <ul>
           <li>The mouse wheel does not work with this one.</li>
            <li>The arrow-buttons are much too small for my preference</li>
            <li>It's terribly slow as it's pure DHTML</li>
            <li>Clicking somewhere on it does scroll the document to the designated point, but it's terribly slow too.</li>
            <li>Dragging and Dropping the knob does not work. Firefox (correctly) thinks I want to drag the knob-image somewhere to my desktop</li>
            <li>Keyboard navigation is not possible</li>
    </ul></li>
    <li>But the worst thing of them all: If the browser window is small enough, it gets a (real) scrollbar on its own. But with this one, the mouse wheel does work (no surprise: it's a real scrollbar). Thus, scrolling through the page with the wheel scrolls, but it scrolls the wrong thing. There is no way to read the whole page using the mousewheel.</li>
</ul>
<p>The page has a fixed height so the last problem above can occur quite frequently. I see absolutely no sense in creating a DHTML monster to do something the browser already does. I can't see any drawbacks of the page having a non-fixed height and would rely on the browsers scrollbar.
</p><p>Can somebody enlighten me?</p>
<p>PS: As comments about usability seem to get constantly more numerous, I have created a usability category. Maybe some time in the future I will actually create a category-based listing :-)</p>
