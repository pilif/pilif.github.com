---
layout: post
title: Lots of fun with OpenVPN
categories:
- Free Software
- Software
- Solutions
- Unix
status: publish
type: post
published: true
meta: {}

---
<p><a href="http://openvpn.net/">OpenVPN</a> may seem to you as being "just another VPN solution". And maybe you are right.</p>
<p>However, OpenVPN has some distinct advantages over other VPN-solution that makes it quite interesting for deployment:</p>
<ul>
 <li>NAT traversal. OpenVPN uses plain old UDP-Packages as a transport medium. Every NAT router on this world can forward them correctly out-of-the-box. If not, create the usual port-forwarding rule and be done with it. If that fails too (whyever it could fail), use the TCP-protocol.</li>
 <li>Ease-of-use: Install, create two certificates, use the VPN. It's as easy as 1-2-3</li>
 <li>Designed with small installations in mind. OpenVPN is not a big slow beast like IPSec for example. While it may not be as secure, it does not have all the problems associated with IPSec.</li>
 <li>User-Space. OpenVPN runs completely in userspace (while using the TUN device provided by the kernel). This way the installation is non-critical and does require no reboots. Updates in case of security problems do not require reboots either.</li>
</ul>
<p>So after this unexpected praise: What brings me to writing this posting?</p>
<p>Well. I've just deployed one of the coolest things on earth: Using OpenVPN, I have connected my home network to the network in the office. Both ends see each other and allow for direct connections. I'm not only able to print on the offices printers from home (which admittedly is as useless as it is cool), but I'm also able to - for example - stream music from home to the office over a secured channel. All using straight IP connections without any NAT-trickery or other things.</p>
<p>Actually not even one port is forwarded through my NAT-gateway (a ZyAir B-2000 - as the Airport-Basestation does not allow for static routes (see below), I was forced to cross-grade).</p>
<p>I already had some of this functionality using my previously deployed PPTP-setup, though this had some disadvantages:</p>
<ul>
 <li>Flacky support in Linux. Maintaining the beast across windows- and mac versions was not easy as something always broke on new versions.</li>
 <li>Suboptimal security. You know: PPTP has flaws - quite like WEP. Though I've tried to work around them by using very very long passwords.</li>
 <li>Suboptimal usability: When I wanted to connec to the office, I had to dial into the VPN, so user interaction was needed. Additionally, the default-gateway was redirected (I could have turned that off), so all open TCP connections got disconnected when I dialled.</li>
</ul>
<p>My current solution does not have any of those problems (I don't know about the security of course - no one does. For now, OpenVPN is said to be secure): No dialling is required, no problems with changing software-versions are to be expected (as it runs on a dedicated router which I don't intend on changing), and I don't have to dial in. The default gateway is not changed either of course, so the usual internet-connections go out directly. This way I'm unaffected from the office's suboptimal upstream of 65KBytes/s (unless I use services from the office of course - but this is unavoidable).</p>
<p>So. What did I do?</p>
<p>At the very first, I had to recompile the kernel on the server side once. I have not included TUN-support when I created my <tt>.config</tt> last year. After this, <tt>emerge openvpn</tt> was all that was needed. I kept the default configuration-file somewhat intact (install with the "examples" USE-flag and use the example-server.conf), but made some minor adjustments:
</p>
<pre class="code">
local x.x.x.x
push "route 192.168.2.0 255.255.255.0"
client-config-dir ccd
route 192.168.3.0 255.255.255.0
#push "redirect-gateway"
</pre>
<p>(just the changed lines)</p>
<p>and the /etc/openvpn/ccd/Philip_Hofstetter:</p>
<pre class="code">
iroute 192.168.3.0 255.255.255.0
</pre>
<p>Now, what does this configuration do?</p>
<ul>
 <li>Bind to the external interface only. This has only cosmetical reasons</li>
 <li>Push the route to the internal network to the client. Using the default configuration, all OpenVPN-Addresses are in the 10.8.0.0 network which allows me for nice firewall-settings on the server-side. The 192.168.2.0/24 network is our office-network</li>
 <li>Tell OpenVPN that there are some client-specific configuration options to reach the 192.168.3.0/24 net which is my home network</li>
 <li>Comment out the option to let OpenVPN set the default gateway. We really don't want all the traffic in my home net going through the office</li>
</ul>
<p>Then we create this client-configuration file. It's named after the CN you use in the SSL-certificate, while replacing spaces with underscores. You can see the correct value by setting up everything and then connecting to the server while watching the logfile.</p>
<p>In the client specific configuration-file we confirm the additional route we want to create.</p>
<p>The configuration file on the client router is unchanged from the default.</p>
<p>The only thing you need now is the SSL-certificate. Create one for the server and more for each client. I won't go into this in this article as it's somewhat complicated on itself, but you'll find lots of guides out there.</p>
<p>I used our companies CA to create the certificates for both the server and the client.</p>
<p>After this, it's just a matter of <tt>/etc/init.d/openvpn start</tt> on both machines (the path to the certificates/keys in the configuration files must match your created files of course).</p>
<p>Just watch out for the routing: On the server I had to change nothing as the server was already entered as default gateway on all the clients in the office network.</p>
<p>In the client network, I had to do some tweaking as the default-gateway was set to the Airport Basestation, which (understandably) knew nothing about the 192.168.2.0/24 network, so was unable to route the IP-packets to the VPN-gateway in the internal network (my Mac Mini).</p>
<p>Usually you solve that by installing a static route on the default gateway in your network. Unfortunately, this is not possible on an airport basestation. A problem I have solved by replacing it with a ZyAir B-2000 from Zyxel which allows for setting static routes.</p>
<p>On that new access-point I created a route equivalent to this unix-command:</p>
<pre class="code">route add -net 192.168.2.0 netmask 255.255.255.0 gw 192.168.3.240</pre>
<p>Where 192.168.3.240 is the address of my Mac Mini on which OpenVPN was running as client.</p>
<p>Then I issued "echo 1 > /proc/sys/net/ipv4/ip_forward" on the Mac Mini to allow the packets to be forwarded.</p>
<p>So whenever I send packets to one of the offices computers - let's say 192.168.2.98, this is what happens:</p>
<ol>
 <li>The client uses it's IP and netmask to find out that the packet cannot be delivered directly. It sends it to the default gateway (my ZyAir)</li>
 <li>The ZyAir consults its routing table to watch for the route to 192.168.2.0/24 and finds 192.168.3.240 as gateway for that network (every other address would have been routed thorugh my cable modem)</li>
 <li>192.168.3.240, shion, watches it's own roting table where OpenVPN has created a route thorugh the VPN-interfaces (10.8.0.x) to the 192.168.2.0/24 network. It delivers the packet there.</li>
 <li>On the other end of the tunnel, the OpenVPN-Server delivers the packet to the destination server.</li>
</ol>
<p>The path of the reply-packets is the same - just from the bottom to the top.</p>
<p>After getting the routing as I wanted it (verifyable by pinging petween computers in both networks), the next step was pure cosmetics:</p>
<ul>
 <li>Create an internal DNS-server. Use it as a slave for the office's DNS-server to allow for DNS-lookups to work without crossing the VPN each time</li>
 <li>Use said DNS-server to create entries for the computers in my home network</li>
 <li>Make the office DNS-server a slave for that home-zone (to reach my computers by name)</li>
</ul>
<p>All of this was most interesting to implement and went much more smootly than anything else I've tried so far VPN-wise. Finally, I have the optimum solution concering connectivity to my office.</p>
<p>And besides that: It was fun to implement. Just worthy of a "Supreme nerd" - the title I got <a href="http://www.nerdtests.com/ft_nq.php?im ">here</a> for my 92 points.</p>
