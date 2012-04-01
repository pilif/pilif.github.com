---
layout: post
title: Hacking Hiltl
categories:
- Personal
status: publish
type: post
published: true
meta: {}

---
<p>The <a href="http://www.hiltl.ch">Hiltl</a> is an excellent vegetarian restaurant in the middle of Z&uuml;rich. I eat there quite often because the food's great, the waitors are friendly and they always have space for you despite being constantly full of guests (others seem to think the same).</p>
<p>What's interesting from a technical point of view is their ordering system: All waiters are equipped with a Windows CE device by Symbol and use WLAN to communicate with a central server (two actually, but see later) to process your order, send it to the citchen and finally print out the receipt for you.</p>
<p>What's even more impressive is the seemingly perfect user interface: The waitors are actually faster with those things than they'd ever be using the old-fashioned paper-way. Even if you have special whishes, they can enter them in an efficient way.</p>
<p>The only time papers are involved is when they print your receipt. The system automatically selects the nearest printer.</p>
<p>This is one of the secrets behind the incredible efficiency of the Hiltl allowing for an incredible throughput of guests while still giving them all the time they need to eat and chat. Actually, a table is ready for the next guest only about one minute after the previous guests have left.</p>
<p>The restaurant is devided into two floors. Both have a master-waitor which has control over all the tables. They communicate via radio.</p>
<p>So you see: This is <b>the</b> restaurant for a geek to visit: Good food and good tech in one.</p>
<p>Now, the Zyxel access point they had mounted to the roof of the restaurant somewhat itched me. I mean: It's WLAN after all. And I know the devices they are using - I wrote some lines for them too. So, maybe I can get some insight, I thought.</p>
<p>Armed with a notebook and the right software, me and Christoph took our meal in the Hiltl today.</p>
<p>The bad thing first: They don't even use WEP for their network. They just created and empty SSID but don't even hide it. So we did not have to use a WEP cracking equipment.</p>
<p>The devices communicate via SOAP over HTTP on a non-standard port. Additionally, the server often pings the known clients to check if they are still there. Then there's a misconfigured router sending out IPv6 packets which are not used in any way. Oh and a Win9x-machine is there too, announcing itself as a network browser.</p>
<p>There are two servers: One for ordering, the other for printig.</p>
<p>Unfortunately, the SOAP messages (especially those to the ordering-system) contain much binary data, so there's not much one can do there without isolating one device and doing some known steps on it. </p>

<p>Unfortunately, our equipement was not running until after our order was taken, so I don't even have a reference point.</p>
<p>The printing though, uses some clear text XML-parameters. I think, I could be able to print some funny messages to all of those printers.</p>
<p>As I see it, no authentication whatsoever takes place - besides a hard-coded registration of the devices IP-adresses. ARP-spoofing could help about that though.</p>
<p>Now... what do I want to say with this? I'm certainly <b>not</b> going to attack them as I <b>really, really</b> like their food and want to return there often for my nutritial needs. Then, it's a matter of honor: They are so progressive and efficient that I just can't punish them for their (quite obvious)  security problem.</p>
<p>Still, for educational purposes, this little experiment was very useful. Maybe, another day, I will even try to decode those binary parameters - just to know how it <b>would</b> work, not to hack me a cheaper meal or so ;-)</p>
<p>The last thing to do for me on this posting is one thing: I ask you kindly to do the same thing as I do: Don't crack the network there, but go there to eat. It's really worth it.</p>
