---
layout: post
title: sacy 0.2 - now with less, sass and scss
categories: []

status: publish
type: post
published: true
meta:
  _flattr_post_language: en_GB
  _flattr_post_category: text
  _flattr_post_hidden: "0"
  _flattr_btn_disabled: ""
  _edit_last: "1"
  _wp_old_slug: ""
---
To fresh up your memory (<a href="/2009/09/introducing-sacy-the-smarty-asset-compiler/">it has been a while</a>): <a href="http://github.com/pilif/sacy">sacy</a> is a <a href="http://www.smarty.net">Smarty</a> (both 2 and 3) plugin that turns

{% highlight xml %}
{asset_compile}
<link type="text/css" rel="stylesheet" href="/styles/file1.css" />
<link type="text/css" rel="stylesheet" href="/styles/file2.css" />
<link type="text/css" rel="stylesheet" href="/styles/file3.css" />
<link type="text/css" rel="stylesheet" href="/styles/file4.css" />
<script type="text/javascript" src="/jslib/file1.js"></script>
<script type="text/javascript" src="/jslib/file2.js"></script>
<script type="text/javascript" src="/jslib/file3.js"></script>
{/asset_compile}
{% endhighlight %}

into
{% highlight xml %}
<link type="text/css" rel="stylesheet" href="/assets/files-1234abc.css" />
<script type="text/javascript" src="/assets/files-abc123.js"></script>
{% endhighlight %}

It does this without you ever having to manually run a compiler, without serving all your assets through some script (thus saving RAM) and without worries about stale copies being served. In fact, you can serve all static files generated with sacy with cache headers telling browsers to never revisit them!

All of this, using two lines of code (wrap as much content as you want in {asset_compile}...{/asset_compile})

Sacy has been around for a bit more than a year now and has since been in production use in <a href="http://www.popscan.com">PopScan</a>. During this time, no single bug in Sacy has been found, so I would say that it's pretty usable.

Coworkers have bugged me enough about how much better <a href="http://lesscss.org/">less</a> or <a href="http://sass-lang.com/">sass</a> would be compared to pure CSS so that I finally decided to update <a href="http://github.com/pilif/sacy">sacy</a> to allow us to use less in PopScan:

Aside of consolidating and minimizing CSS and JavaScript, sacy can now also transform less and sass (or scss) files using the exact same method as before but just changing the mime-type:

{% highlight xml %}
<link type="text/x-less" rel="stylesheet" href="/styles/file1.less" />
<link type="text/x-sass" rel="stylesheet" href="/styles/file2.sass" />
<link type="text/x-scss" rel="stylesheet" href="/styles/file3.scss" />
{% endhighlight %}

Like before, you don't concern yourself with manual compilation or anything. Just use the links as is and sacy will do the magic for you.

Interested? Read the (by now huge) <a href="https://github.com/pilif/sacy/blob/v0.2/README.markdown">documentation</a> on <a href="http://github.com/pilif">my github page</a>!
