---
layout: post
title: PHP, stream filters, bzip2.compress
categories:
- bug
- bzip2
- filter
- PHP
- Programming
- solution
- Solutions
- stream
status: publish
type: post
published: true
meta: {}

---
<p>Maybe you remember that, more than a year ago, I had an interesting <a href="/archives/268-PHP-Stream-Filters.html">problem with stream filters</a>.</p>
<p>The general idea is that I want to output bz2-compressed data to the client as the output is being assembled - or, more to the point: The <a href="http://www.popscan.ch">PopScan</a> Windows-Client supports the transmission of bzip2 encoded data which gets really interesting as the amount of data to be transferred increases.</p>
<p>Even more so: The transmitted data is in XML format which is very easily compressed - especially with bzip2.</p>
<p>Once you begin to transmit multiple megabytes of uncompressed XML-data, you begin to see the sense in jumping through a hoop or two to decrease the time needed to transmit the data.</p>
<p>On the receiving end, I have an <a href="/archives/149-Refactoring-Its-worth-it.html">elaborate</a> <a href="/archives/314-XmlReader-I-love-thee.html">construct</a> capable of downloading, decompressing, parsing and storing data as it arrives over the network.</p>
<p>On the sending end though, I have been less lucky: Because of that problem I had, I was unable to stream out bzip2 compressed data as it was generated - the end of the file was sometimes missing. This is why I'm using ob_start() to gather all the output and then compress it with bzcompress() to send it out.</p>
<p>Of course this means that all the data must be assembled before it can be compressed and the sent to the client.</p>
<p>As we have more and more data to transmit, the client must wait longer and longer before the data begins to reach it.</p>
<p>And then comes the moment when the client times out.</p>
<p>So I finally really had to fix the problem. I could not believe that I was unable to compress and stream out data on the fly.</p>
<p>It turns out that I finally found the smallest possible amount of code to illustrate the problem in a non-hacky way:</p>
<p>So: This fails under PHP up until 5.2.3:</p>
<pre class="code">
&lt;?
$str = "BEGIN (%d)\n
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
mollit anim id est laborum.
\nEND (%d)\n";

$h = fopen($_SERVER['argv'][1], 'w');
$f = stream_filter_append($h, "bzip2.compress", STREAM_FILTER_WRITE);
for($x=0; $x &lt; 10000; $x++){
   fprintf($h, $str, $x, $x);

}
fclose($h);
echo "Written\n";
?&gt;
</pre>
<p>Even worse though: It doesn't fail with a message, but it writes out a corrupt bzip-File.</p>
<p>And it gets worse: With a little amount of data it works, but as the amount of data increases, it begins to fail - at different places depending on how you shuffle the data around.</p>
<p>Above script will write a bzip file which - when uncompressed - will end around iteration 9600.</p>
<p>So now that I had a small reproducible testcase, I could report a bug in PHP: <a href="http://bugs.php.net/?id=42117">Bug 47117</a>.</p>
<p>After spending so many hours on a problem which in the end boiled down to a bug in PHP (I've looked anywhere, believe me. I also tried workarounds, but all to no avail), I just could not let the story end there.</p>
<p>Some investigation quickly turned up a wrong check for a return value in bz2_filter.c which I was able to patch up very, very quickly, so if you visit that bug above, you will find a patch correcting the problem.</p>
<p>Then, when I finished patching PHP itself, hacking up the needed PHP-code to let the thing stream out the compressed data as it arrived was easy. If you want, you can have a look at <a href="http://www.lipfi.ch/bzcomp.phps">bzcomp.phps</a> which demonstrates how to plug the compression into either the output buffer handling or something quick, dirty and easier else.</p>
<p>Oh, and if you are tempted to do this:</p>
<pre class="code">
function ob($buf){
        return bzcompress($buf);
}

ob_start('ob');
</pre>
<p>... it won't do any good because you will still gobble up all the data before compressing. And this:
<pre class="code">
function ob($buf){
        return bzcompress($buf);
}

ob_start('ob', 32768);
</pre>
<p>will encode in chunks (good), but it will write a bzip2-end-of-stream marker after every chunk (bad), so neither will work.</p>
<p>Nothing more satisfying than to fix a bug in someone else's code. Now let's hope this gets applied to PHP itself so I don't have to manually patch my installations.</p>
