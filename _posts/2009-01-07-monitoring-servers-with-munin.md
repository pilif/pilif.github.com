---
layout: post
title: Monitoring servers with munin
categories:
- Software
- Unix
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
If you want to monitor runtime parameters of your machines, there are quite many tools available.

But in the past, I've never been quite happy with any of them. Some didn't work, others didn't work right and some others worked ok but then stopped working all of a sudden.

All of them were a pain to install and configure.

Then, a few days ago, I found <a href="munin.projects.linpro.no">Munin</a>. Munin is optimized for simplicity, which makes it work very, very well. And the reports actually look nice and readable which is a nice additional benefit.

[caption id="attachment_479" align="aligncenter" width="400" caption="Apache parameters"]<img class="size-full wp-image-479" title="Screenshot of some Apache parameters" src="http://www.gnegg.ch/wp-content/uploads/2009/01/munin-overview.png" alt="Apache parameters" width="400" height="339" />[/caption]

Like many other system monitoring solutions, Munin relies on custom plugins to access the various system parameters. Unlike other solutions though, the plugins are very easy to write, understand and debug which encourages you to write your own.

Adding additional servers to be watched is a matter of configuring the node (as in "apt-get install munin-node") and adding two lines to your master server configuration file.

Adding another plugin for a new parameter to monitor is a matter of creating one symlink and restarting the node.

[caption id="attachment_480" align="aligncenter" width="495" caption="Manifestation of a misconfigured cronjob"]<img class="size-full wp-image-480" title="Manifestation of a misconfigured cronjob" src="http://www.gnegg.ch/wp-content/uploads/2009/01/cpu-week.png" alt="Manifestation of a misconfigured cronjob" width="495" height="336" />[/caption]

On the first day after deployment the tool already proved useful in finding a misconfigured cronjob on on server which ran every minute for one hour every second hour instead of once per two hours.

Munin may not have all the features of the foll-blown solutions, but it has three real advantages over everything else I've seen so far:
<ol>
	<li>It's very easy to install and configure. What good is an elaboration solution if you can never get it to work correctly?</li>
	<li>It looks very nicely and clean. If looking at the reports hurts the eyes, you don't look at them or you don't understand what they want to tell you.</li>
	<li>Because the architecture is so straight-forward, you can create customized counters in <em>minutes</em> which in the end provides you with a much better overview over what is going on.</li>
</ol>
The one big drawback is that the master data collector needs to access the monitored servers on port 4949 which is not exactly firewall-friendly.

Next time, we'll learn how to work around that (and I don't mean the usual ssh tunnel solution).
