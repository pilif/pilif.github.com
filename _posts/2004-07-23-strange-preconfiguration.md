---
layout: post
title: Strange preconfiguration
tags:
- Free Software
- Software
status: publish
type: post
published: true
meta: {}

---
<p>Ever since I've updated our in-office Gentoo-Box to Samba 3, I had very bad performance (throughput wise). And with bad performance I mean at most 200 KBytes/s on a 100MBit network.</p>

<p>For quite some time I thought that it must be my client machine, so I rested the case. Till today, where someone else complained about really bad performance. So I began investigating.</p>

<p>At first I had one of our ultra-cheap switches in mind, so I tested the performance using FTP. Too bad: full speed there, so it must be a Samba problem.</p>

<p>What was really strange: Write performance to the server was great. It was just reading that took so incredibly long. So, armed with this information I did some googling and found ... only vague stuff. While there are some people with the same problem as myself, they are always told that it must be a hardware or windows problem (the two easy solutions) and there was no further discussion in all cases.</p>

<p>Somewhere I found the tip to set the following in smb.conf for maximum performance:</p>

<pre class="code">socket options = TCP_NODELAY SO_RCVBUF=8192 SO_SNDBUF=8192</pre>

<p>I went and looked, but the setting was already there. Too bad. The next thing I did was to comment the line out and restart samba:</p>

<pre class="code">#socket options = TCP_NODELAY SO_RCVBUF=8192 SO_SNDBUF=8192</pre>

<p>And you will not believe it, but it helped. The server is back to its old performance with 8 Mbytes per second which is a good value considering the cheap equipement involved.</p>

<p>Problem solved. Culprit: Strange preconfiguration by Gentoo. Why this helped? No idea! Why the wrong setting in the first place? No idea either. Why the wrong tip to put this option into smb.conf? Don't ask me. I'm just happy, it works again.</p>
