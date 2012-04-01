---
layout: post
title: PHP Stream Filters
tags:
- Free Software
- PHP
- Programming
status: publish
type: post
published: true
meta: {}

---
<p>You know what I want? I want to append one of those nice and shiny PHP stream filters to the output stream.</p>
<p>I have this nice windows-application that recives a lot of XML-data that can be compressed with a very high compression factor. And as the windows application is for people with very limited bandwith, this seems to be the perfect thing to do.</p>
<p>You know, I CAN compress all my output already. By doing something like this:</p>
<pre class="code">
&lt;?php
ob_start();
echo "stuff";
$c = ob_get_clean();
echo bzcompress($c);
?&gt;
</pre>
<p>The problem with this approach is that the data is only sent to the client once it's assembled completely. bzip2 on the other hand is a stream compressor that is very well able to compress a stream of data and send it out as soon as a chunk is ready.</p>
<p>The windows client on the reciving end is certainly capable of doing that. As soon as bytes come in, it decompresses it chunk-wise and feeds it to a Expat based parser which will handle the extracted data. Now I want this to happen on the sending side aswell.</p>
<p>The following code does work sometimes:</p>
<pre class="code">
&lt;?php
  $fh = fopen('php://stdout', 'w');
  stream_filter_append($fh, 'bzip2.compress', STREAM_FILTER_WRITE, $param);
  fwrite($fh, "Stuff");
  fclose($fh);
?&gt;
</pre>
<p>But sometimes it doesn't and produces a incomplete bzip2-stream.</p>
<p>I have a certain idea of why this is happening (no sending out of data to the filter on shutdown), but I can't prevent it. Sometimes the data is not put out which makes this method unusable.</p>
<p>I'm afraid to report this to bugs.php.net as I'm sure it's something PHP was not designed for and it'll get marked as BOGUS faster than I can spell 'gnegg'.</p>
<p>So this means that the windows-client just has to wait for the data being extracted, converted to xml and compressed.</p>
<p>*sigh*</p>
<p>(thinking of it, there may be this option of outputting data to a temp-file (to which handle a filter is assigned to) and the read it out to the browser immediately afterwards. But come on, this can't be the solution, can it?)</p>
<p><b>Update:</b> I've since <a href="/archives/365-PHP,-stream-filters,-bzip2.compress.html">tracked the problem</a> to a bug in PHP itself for which I found a fix. My assumption of writing to a temporary file could help was wrong as PHP itself does not check the return value of a bzlib function correctly and never writes out a half-full buffer on stream close. Neither to the output stream nor to a file.</p>
