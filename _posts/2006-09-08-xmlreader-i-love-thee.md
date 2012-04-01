---
layout: post
title: XmlReader - I love thee
categories: []

status: publish
type: post
published: true
meta: {}

---
<p>Lately, I have been working with the .NET framework. Well. It was the compact framework actually. I'm currently writing software for one of these advanced barcode scanners which run Windows Mobile.</p>
<p>The one thing I want to talk about is <tt>XmlReader</tt>. You know: One of these devices actually has a built-in GPRS unit, so it lends itself as a really nice mobile client.</p>
<p>With mobility comes synchronization and synchronization is something PopScan can do quite well. The protocol is XML based, so I need to parse XML on the device.</p>
<p>It's even getting more interesting though: The server usually bzip2-compresses the XML-data while sending it out. The XML stream is perfectly compressible, so that's a good thing to do - even more so that the device communicates over a volume taxed GPRS connection.</p>
<p>The naïve approach to this situation is to do this:</p>
<ol>
    <li>Read data from server to the memory</li>
    <li>Compress the data in-memory</li>
    <li>Use a DOM-Parser to build a DOM-Tree</li>
    <li>Iterate over the tree and handle the article data</li>
</ol>
<p>This approach, of course, is completely unworkable. For once, you waste memory by storing the data multiple times in different forms. Then you build a DOM-tree which is pointless as it's more or less flat data anyways. And finally, you wait for the download and then for the decompression before you can begin parsing. So it's slow.</p>
<p>The way to go is to read data from the network, decompress it as it arrives, feed the data into a stream based XML-parser and work with its output.</p>
<p>That way, you only need some memory of buffers in the decompression engine and the XML parser. And you don't wait. As you recieve data from the server, you can start decompressing and parsing it.</p>
<p>I've done this before. It was in Delphi. Reciving data from WinInet, feeding it through a bzip2 decompressor and finally parsing it with expat was truly hard work: Pointers here, malloc there and that awful event based interface of expat making it very difficult to track state.</p>
<p>And now I had to do it again with c#</p>
<p>Wow! This was easy.</p>
<p>First, there's the nice Stream interface using a decorator pattern: You can just wrap streams into each other and then just read from the "outermost" stream.</p>
<p>This means that I can wrap a bzip2-decompression stream around the HTTP-Response stream and make the XML parser read from the decompression stream which in turn reads from the HTTP-response stream.</p>
<p>And then you have the XmlReader interface.</p>
<p>Parsing XML is done in a while loop by calling the object's Read() method which returns whenever it encounters a start or end element in the stream. This makes tracking the state much easier and helps cleaning keeping your code clean.</p>
<p>All in all, I can't believe how easy it was to write that parser.</p>
<p>This shows that some nice thought went into the design of the .NET framework and I'm really looking forward into finding even more nice surprises such as this.</p>
