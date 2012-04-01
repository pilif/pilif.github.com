---
layout: post
title: Fixed Searchengine
categories: []

status: publish
type: post
published: true
meta: {}

---
I've just realized that the searchengine-setup for Movabletype in a mod_perl environment has not been documented and I thus never added the needed directives to the apache configuration leading the search-engine on this site not to work.

This is fixed now.

For those wondering what to add to the apache-configuration to enable the searchengine with mod_perl, please use the following code snippet to enlighten you:

<pre>
PerlModule MT::App::Search
&lt;Location /mt/search&gt;
SetHandler perl-script
PerlHandler MT::App::Search
PerlSetVar MTConfig /path/to/your/mt.cfg
&lt;/Location&gt;
</pre>
