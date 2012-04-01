---
layout: post
title: Old URLs fixed
tags:
- gnegg.ch
- Solutions
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
I have just added two rewrite rules to automatically translate most of the old s9y-URLs to something WordPress understands.

The first one was easy and could be done in WP's .htaccess-file:
<pre class="code">RewriteRule ^archives/([0-9]+)/([0-9]+)\.html$ /$1/$2 [R=permanent,L]</pre>
This handles the s9y-style archive URLs for monthly archives - something that got quite the amount of hits apparently - at least that's one of the 404 errors I've encountered the most in my logfiles.

The second one is the direct link to old posts. While this could be done in a PHP/.htaccess-only solution, I took the opportunity and learned how to do custom url maps for mod_rewrite which, of course, only work in the httpd.conf, so this isn't probably something everyone can do on their hosting plan:
<pre class="code">RewriteEngine On
RewriteMap s9yconv prg:/home/pilif/url-s9y2wp.php</pre>
After defining this, I could use the map in WP's .htaccess:
<pre class="code">RewriteRule ^archives/([0-9]+)-(.*)\.html$ /${s9yconv:$2} [R=permanent,L]</pre>
The <a href="http://www.lipfi.ch/url-s9y2wp.php">script</a> is very simple as you can see here:
{% highlight php %}
#!/usr/bin/php
<?php
include('wp/wp-includes/formatting.php');
while (($line = fgets(STDIN)) !== false){
    $line = preg_replace('#\.html$#', '', $line);
    $line = sanitize_title_with_dashes(preg_replace('#^[0-9]+-#', '', $line));
    echo "$line\n";
}
?>
{% endhighlight %}
While WP is configured to create permalinks containing the date, you can usually just feed it the URL-ized title and it'll find out the correct entry to use. This has the advantage that the script, which is long-running per the specification of prg-rewrite maps, is kept as simple as possible, which is needed as PHP doesn't always free all allocated memory - something you don't want to have in long-running processes like this one. This is why I redirect to something WP still has to do some work on: It spares me to do all the database-handling and stuff.

If I had to do this without the ability to change httpd.conf, I would use a rule like this:
<pre class="code">RewriteRule ^archives/([0-9]+)-(.*)\.html$ /s9y-convert.php/$2 [L]</pre>
and then do above logic in that script.

Both approaches work the same, but I wanted to try out how to do a dynamic rewrite map.
