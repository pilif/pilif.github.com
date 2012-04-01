---
layout: post
title: Why I love the command line
categories:
- Solutions
- Unix
status: publish
type: post
published: true
meta: {}

---
<p>Today I had the task to join together quite some mp3-files.</p>
<p>I had about 100 radio plays, each devided in three to six files which I wanted to have joined to one file per play so I can better organize them on my iPod</p>
<p>There are tools out there doing exactly that. mp3surgeon being one of them. All these tools a) have a non-scriptable GUI (meaning lots and lots of clicks) and b) cost money</p>
<p>b) would not be a pronlem if those tools would work for me, but because of a) they do not.</p>
<p>Then I found <a href="http://www.mpgedit.org/mpgedit/">mpgedit</a> a command line tool capable of joining MP3's (respecting VBR-headers, but without recoding the new file)</p>
<p>As it's usable from the command line, I could write a small script doing exactly what I wanted:</p>
<pre class="code">
&lt;?

$dir = dir(".");
while (false !== ($entry = $dir->read())) {
	if (preg_match('/^\.+$/', $entry)) continue;
	$path = '.\\'.$entry;
	if (is_dir($path))
 	    doJoin($path);
}

function doJoin($dir){
	echo "Looking in $dir\n";
	$of = escapeshellarg("..\\".basename($dir).".mp3");
	chdir($dir);
	$files = array();
	$d = dir(".");
	while (false !== ($entry = $d->read())) {
	   if (!preg_match('/\.mp3$/', $entry)) continue;
	   $files[] = $entry;
	}
	$d->close();
	sort($files);
	$files = array_map('escapeshellarg', $files);
	system("c:\mp3\mpgedit_nocurses.exe -o $of -e- ".implode(' ', $files));
	chdir("..");
}
?&gt;
</pre>
<p>Note that it's written in PHP as this is the language I currently do most of my work with. And note that it's very customized to just my needs. None the less it works very well and saves me from about 200'000 clicks</p>
<p>Now this is exacltly why I love the command line.</p>
