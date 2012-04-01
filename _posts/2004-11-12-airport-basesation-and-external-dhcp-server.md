---
layout: post
title: AirPort basesation and external DHCP server
categories:
- Hardware
- Mac
- Solutions
status: publish
type: post
published: true
meta: {}

---
<p>Recently, I bought an airport basestation.</p>
<p>I wanted to use it as a NAT router and a wireless access point. DNS and DHCP I wanted to do via a fully-fledged BIND/dhcpd combination running on my <a href="/archives/pile_of_new_hardware.html">iMac</a>.</p>
<p>DNS I need because I'm doing some work for the office from home. As much of it is web based, I need virtual hosts on my server and I certainly don't want to go back to stone age and move around <tt>hosts</tt> files. DNS was invented for something, so please, let me use it.</p>
<p>DHCP I wanted because sometimes, I'm using applications on my notebook that require some ports forwarded to them (bittorrent for example). Forwarding ports without fixed IP-adresses can be difficult (especially if changing the forwarding address requires a restart of the router), so I wanted the possibility to give the MAC-adress of my notebooks NIC a fixed IP-address. This is not possible with airports built-in DHCP server (and I don't blame them for this - it's quite a special feature)</p>
<p>Now, imagine how disappointed I was seing, that this is not possible when using Apples configuration program:</p>
<p>They tie NAT and DHCP together: Either you turn off both NAT and DHCP, NAT only, or none of them. Turning off DHCP only is not possible.</p>
<p>Looking around on the web, I came across Jon Sevys <a href="http://edge.mcs.drexel.edu/GICL/people/sevy/airport/#Configurator">Java Based Configurator</a> again.</p>
<p>With this tool my configuration certainly is possible:</p>
<ol>
  <li>Configure your basestation using Apples utility. Tell it to enable NAT and distribute IP-Adresses</li>
  <li>Update the configuration and exit Apples utility.</li>
  <li>Run the Java Based configurator.</li>
  <li>On the "DHCP Functions"-Tab, unckeck the Checkbox</li>
  <li>On the "Bridging Functions"-Tab uncheck "Disable bridging between Ethernet and wireless Lan"
  <li>Save the configuration.
</ol>
<p>The last step is important if you want the Basestation to continue working as an usable wireless access point. I forgot to do this the first time I tried and did not get an IP-Adress and could not connect to the wired lan after setting one manually either. Logical, but disturbing if you think you got the solution but it still does not work as expected...</p>
