---
layout: post
title: T610/Z600, Outlook, MobileAgent and Bluetooth
tags:
- Software
- Solutions
status: publish
type: post
published: true
meta: {}

---
<p>
If you own either a <a href="http://www.sonyericsson.com/t610/">T610</a> or <a href="http://www.sonyericsson.com/z600/">Z600</a> mobile phone, you may know of <a href="http://fma.xinium.com/index2.htm">floAt's Mobile Agent</a> a not-so-stable but even more powerful tool for accessing the phone from your PC. Sending SMSes, Managing contacts, even getting a popup windows when somebody calls you - everything is possbible.
</p><p>
Everything but synchronizing with outlook. There's just some kind of CVS export for your contacts, but this is very uncomfortable to handle. The bluetooth sync-profile the Widcomm software provides would do the trick, but I've many more contacts in outlook than there's space on the phone. So I need a way to specify which contacts to synchronize.
</p><p>
The software that comes from ericsson, XTNDConnect PC, has support for filters (I've created a category T610 and I'm syncing only contacts whithin this category), so would be doing the job.
</p><p>
Unfortunatly, this Ericsson PhoneMonitor-thing which XTNDConnect relies on is slightly incompatible to MobileAgent - either the phone is not detected or MobileAgent loses its connection (which locks my workstation because I'm using the proximity detection). I've never succeded in finding a way to reproducibly use both programs concurrently.
</p><p>
Not 'till now.
</p><p>
(BT-Driver is Widcomm 1.4.x but it should work with 1.3 too)
</p>
<ol>
  <li>Open the Advanced Bluetooth configuration.</li>
  <li>Client Applications Tab.</li>
  <li>Add COM Port</li>
  <li>OK to everything</li>
  <li>Double click the BT-Icon in the Tray</li>
  <li>"View devices in range"</li>
  <li>Double click your phone</li>
  <li>Right-click "Serial Port 2" and create a shortcut.</li>
  <li>go up two levels.</li>
  <li>right click the created shortcut, properties.</li>
  <li>Select the newly created port</li>
  <li>OK everything</li>
  <li>In the control panel open the Ericsson Phone Monitor</li>
  <li>In COM Ports, select the newly created port, chose "Reserve" and "Enable"</li>
  <li>OK</li>
 </ol>
<p>
Before synchronizing, double click the newly created shortcut in your "bluetooth places". The phone will not immediatly be detected, but as soon as you start XTNDConnect and hit "synchronize", it will be.
</p><p>
What you did with this steps is creating two virtual com-ports for the phone that can be concurrently used. That way you can use XTNDConnect to synchronize with outlook and MobileAgent for the rest. Very nice.</p>
