---
layout: post
title: GPRS, Bluetooth and Mac OS X
tags:
- Mac
status: publish
type: post
published: true
meta: {}

---
<p>GPRS in your mobile phone and bluetooth are a real dream-team: Phones like that are small, fit in your pocket and still, they allow you to connect to the internet from your laptop - and even at reasonable speeds.</p>

<p>In contrast to the widely spread PC-Cards or wired connections, the handling too rocks: Just keep your phone in your pocked, dial from the laptop and use the internet. No fiddling with cards (or drivers. or strange software. your OS comes with all it needs to get the connection going), no problems with forgotten cables.</p>

<p>Bluetooth brought simplicity to the connection with your phone. Earlier we had infrared or cables, but nothing works as reproducibly as bluetooth does - at least in Windows.</p>

<p>As you know, I switched over to using Mac OS for my main office workstation. And today I was in the situation of needing internet in train and at a customers site.</p>

<p>Naturally, I wanted to use my mac to connect via Bluetooth to my K750i to use it's GPRS capability.</p>

<p>While the bluetooth stack provides a very nice assistant to add a new bluetooth device and even allows you to create the GPRS connection, unfortunately, it does not work in the end.</p>

<p>Apple does provide some very specialized modem scripts, which is both good and bad. Good because if there's a script for your modem/phone, it'll work perfectly. Bad because if there is no script, it won't work at all.</p>

<p>The assistant provided a list of Ericsson phone scripts and suggested using "Ericsson Infrared". Naturally I first tried connecting with that, dialing *99***3# as I would in windows (the GPRS data connection being the third configured connection on the phone).</p>

<p>The phone did not even begin the dialing process.</p>

<p>I rebooted the Mac, launched Windows, created the RAS connection there and connected via GPRS to google for a solution (oh the irony...).</p>

<p>And I quickly found one: The <a href="http://www.taniwha.org.uk/">modem scripts</a> by Kia ora Ross</p>

<p>One thing to note though: You must use the script using a CID which is <em>not</em> configured on your phone (which is different from windows) and use the name of the APN as phone number (which also is different). With that in mind, connecting is easy.</p>

<p>What remains to be told: Apple which claims to be the superior OS usability-wise fails on this not-so-advanced task. Not only that. It fails in multiple ways:</p>
<ul>
    <li>It does not provide a generic modem script (like Windows does)</li>
    <li>It suggests a completely non-working solution (instead of telling "sorry. I have not matching script.")</li>
    <li>One you get the right scripts, you have to click the "Show all"-Checkbox to be actually able to select it - despite all scripts listed in the default configuration being completely unusable.</li>
</ul>

<p>So I'm coming back to what I was saying all the way: OS X or Windows? Doesn't matter. Both have advantages. Both have disadvantages. Neither is clearly more usable than the other. Just go with what you feel more comfortable and live with the problems.</p>

<p>Oh and: Setting up a GPRS connection via a bluetooth-connected phone arguably is not a task doable at all for the people OSX was designed for. So it's probably OK if it's a bit harder. But still.... I'm not very happy about this.</p>

<p>PS: This is written and posted during a train ride. Connected via GPRS. Written on my MacBook Pro.</p>
