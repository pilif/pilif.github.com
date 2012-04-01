---
layout: post
title: Found on my iMac
categories:
- Mac
status: publish
type: post
published: true
meta: {}

---
<p>Today, I found a residual registration link lingering around in my home-directory of my iMac. Looking at it's contents with <tt>cat</tt> reveals quite an ordinary .plist-XML-file.</p>
<p>What's interesting is what the engineers at Apple obviously thought of the newsletters the user is given a chance to subscribe to:</p>
<pre class="code">
        &lt;key&gt;RegistrationInfo&lt;/key&gt;
        &lt;dict&gt;
                &lt;key&gt;Apple<b>Spam</b>&lt;/key&gt;
                &lt;string&gt;NO&lt;/string&gt;
                &lt;key&gt;Location&lt;/key&gt;
                &lt;string&gt;B&lt;/string&gt;
                &lt;key&gt;Occupation&lt;/key&gt;
                &lt;string&gt;5&lt;/string&gt;
                &lt;key&gt;Others<b>Spam</b>&lt;/key&gt;
                &lt;string&gt;NO&lt;/string&gt;
        &lt;/dict>
</pre>
<p>(the emphasis is mine)</p>
<p>Oh... how I agree with them!</p>
