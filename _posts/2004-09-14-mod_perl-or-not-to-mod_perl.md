---
layout: post
title: mod_perl or not to mod_perl
categories:
- gnegg.ch
status: publish
type: post
published: true
meta: {}

---
<p>
Floating around the net I found a patch for my mod_perl problem <a href="http://www.gnegg.ch/archives/171-MT-3.1.html">I had</a> with MT 3.1, so I have reenabled mod_perl, which actually sped up the wohle system greatly, but forced me to remove <a href="http://www.jayallen.org/projects/mt-blacklist/">MT-Blacklist</a>, as it's not compatible with mod_perl environements (Internal Server Error, here I come!)
</p>
<p>"No big deal", I thought - deleting those five SPAM comments a day would not have been so bad - especially since MT 3.1 provides a far better comment-deleting UI than 2.6</p>
<p>
Then, today, I had to change my mind: Between 6am and 12pm two of those f***ing SPAMMers actually posted stupid comment spam to nearly every posting in my blog. After deleting them, they gave me a rest just to continue their evil doing during the whole afternoon, forcing me to delete about 2 comments per 20 minutes. Inconvinient when I have to work in between.
</p>
<p>So - for me, it's back to non-mod_perl. It seems like gnegg.ch is popular enough for actually depending on MT-Blacklist. Very nice. Thank you stupid SPAMMers!
</p>
