---
layout: post
title: Programatically generating XML
tags:
- Programming
status: publish
type: post
published: true
meta: {}

---
<p>If you have to generate XML, it's usually considered good style to use one of these defined APIs like DOM or <tt>XMLWriter</tt>.</p>
<p>Just writing out a string to the line is considered bad practice because... why, actually?</p>
<p>Jeff Atwood once more <a href="http://www.codinghorror.com/blog/archives/000617.html">wrote down</a> what I have been thinking for quite some time now.</p>
<p>In many cases, just dumping out XML with <tt>sprintf</tt> or whatever your language provides you with is faster, independent of bugs in the libraries you use and easier to read.</p>
<p>There are five characters that need to be treated with caution in XML: the &amp;, the &lt;, the &gt;, the &quot; and the &apos;.</p>
<p>Quoting even is straight forward and you usually don't run into niceties like quoting backslashes in regular expressions you are passing to <tt>perl -e</tt> inside a double quoted string on your shell (I don't even want to count the \'s needed to actually get the regex parser in perl to see just one of them).</p>
<p>And even if you screw up, you can still rely on the XML parser to bail out if something is wrong.</p>
<p>The time you waste learning your library, coping with its bugs and finally working with the usual bloat of todays OOP interfaces (interface as in "user interface") far outweighs the occasional quoting problem which should not happen anyways.</p>
<p>And don't make me get started on trying to understand the structure of the XML code like Jeff posted is going to create:</p>
<div>
    <code>System.Text.StringBuilder sb = new System.Text.StringBuilder();

XmlWriterSettings xs = new XmlWriterSettings();
xs.ConformanceLevel = ConformanceLevel.Fragment;
xs.Indent = true;

XmlWriter xw = XmlWriter.Create(sb, xs);
xw.WriteStartElement("status");
xw.WriteAttributeString("code", "1");
xw.WriteEndElement();
xw.WriteStartElement("data");
xw.WriteStartElement("usergroup");
xw.WriteAttributeString("id", "usr");
xw.WriteEndElement();
xw.WriteEndElement();
xw.Flush();
return sb.ToString();
</code></div>

<p>If you are seeing this in code you have to maintain (but you have not written), how would you tell what XML it generates? How does the readability of that compare to this?</p>
<div><code>string s =
        @"&lt;status code=""{0}"" /&gt;
        &lt;data&gt;
          &lt;usergroup id=""{1}"" /&gt;
        &lt;/data&gt;";
    return String.Format(s, "1", "usr");
</code></div>
<p>Note that I'm not that much of a .NET guy, but I'm quoting Jeff's code here</p>
<p>Summary in one word: Jeff's Article: ACK!</p>
