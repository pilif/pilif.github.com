---
layout: post
title: updated sacy - now with more coffee
categories:
- programming
- php
- smarty
- sacy
status: publish
type: post
published: true
---
I've just updated the <a href="https://github.com/pilif/sacy">sacy repository</a> 
to now also provide support for compiling Coffee Script.

{% highlight xml %}
{asset_compile}
<script type="text/coffeescript" src="/file1.coffee"></script>
<script type="text/javascript" src="/file2.js"></script>
{/asset_compile}
{% endhighlight %}

will now not compile file1.coffee into JS before creating and linking one big chunk of minified JavaScript.

{% highlight xml %}
<script type="text/javascript" src="/assetcache/file2-deadbeef1234.js"></script>
{% endhighlight %}

As always, the support is seamless - this is all you have to do.

Again, in order to keep deployment simple, I decided to go with a pure PHP solution ([coffeescript-php](https://github.com/alxlit/coffeescript-php)).

I do see some advantages in the native solutions though (performance, better output), so I'm actively looking into a solution to detect the availability of native converters that I could shell out to without having to hit the file system on every request.

Also, when adding the coffee support, I noticed that the architecture of sacy isn't perfect for doing this transformation stuff. Too much code had to be duplicated between CSS and JavaScript, so I will do a bit of refactoring there.

Once both the support for external tools and the refactoring of the transformation is completed, I'm going to release v0.3, but if you want/need coffee support right now, go ahead and clone 
<a href="https://github.com/pilif/sacy">the repository</a>.