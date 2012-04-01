---
layout: post
title: Asterisk Extended
categories:
- Free Software
- Unix
- VoIP
status: publish
type: post
published: true
meta: {}

---
<p>Playing around with <a href="http://www.asterisk.org">Asterisk</a>, it was inevitable for me to stumble upon AGI.</p>
<p>AGI is a protocol quite like CGI which allows third party applications to be plugged into asterisk, giving them full control over the call handling. That way, even non-asterisk-developers are able to write interesting telephony applications.</p>
<p>One thing I always wanted to do is to set the CallerID on incoming calls. Some numbers are stored in our customer database. There is no reason not to show the customer names on the phones displays instead of only the number.</p>
<p>The snom phones do have a little addressbook, but it's very limited in both amount of memory and featureset, so it was clear that I'll have to set the CallerID via Asterisk (SIP allows for transmission of a caller-id. And <a href="http://www.voip-info.org/wiki/view/set+callerid">so does AGI</a>)</p>
<p>Additionally, I thought, it would be very nice to use the swiss phone book at <a href="http://tel.search.ch">tel.search.ch</a> or even the non-free ETV to try and guess numbers not already in our database.</p>
<p>That scenario is exactly what AGI is for.</p>
<p>As AGI works like CGI, it creates a new process for every call to AGI applications. This is not an option if you want to use interpreted languages. Well. it *is* an option considering our low amount of calls we are getting per time unit, but still. I don't like to deploy solutions with obvious drawbacks.
</p><p>
Besides, launching a PHP interpreter (I'd have written this in PHP) can easily take a second or so - not acceptable if you want the AGI script to be mandatory on each call. Think of it. You don't want the caller to wait for your application.</p>
<p>The solution to this is FastAGI, which works like FastCGI: A server keeps running and answers AGI-requests. Like this, you start the interpreter once and just serve the calls in the future. You save the startup-time of the interpreter.</p>
<p>Even better: It allows to run the AGI applications on a different machine than the PBX. This is good because you want the PBX to have as much CPU time slices as possible.</p>
<p>Unfortunately, this made PHP quite unsuitable for me: While it is possible to write a socket server in PHP (ext/posix does exist), I never managed to get it to work as I wanted to. It was slow, unstable and created zombies.</p>
<p>Then I found <a href="http://www.snapvine.com/code/ragi">RAGI</a> which was even better. <a href="/archives/ruby_on_rails.html">For quite some time now</a>, I have been looking for an excuse to do something with <a href="http://www.rubyonrails.org">Ruby on Rails</a>. With RAGI, I finally got it.</p>
<p>Getting the sample provided with RAGI to work was very easy (look at the README file). And reading through that sample file, I was very pleased to see the simplicity of writing a AGI-Application in Ruby (RAGI uses FastAGI, of course).</p>
<p>Now I can finally start hacking away in Rails to create my internal-customer-database / external-phone-lookup application (with some nice caching/timeout handling) to finally show the name behind the calling phone number on the displays of our SNOM phones.</p>
<p>Of course I'm going to provide the sourcecode here once I'm done.</p>
