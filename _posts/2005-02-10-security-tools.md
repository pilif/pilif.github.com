---
layout: post
title: Security Tools
categories:
- Opinions
status: publish
type: post
published: true
meta: {}

---
<p>There was <a href="http://www.zdnet.com.au/news/security/0,2000061744,39180674,00.htm">this security announcement</a> today: Another time a Symantec product does not what it's supposed to and actually executes <a href="http://upx.sourceforge.net/">UPX</a>-Packaged .EXE-Files to find out whether they conain malicious code or not.</p>
<p>This is certainly not the best way to accomplish that...</p>
<p>So this is anoter point why I'm no fan of security software in place of user education (and regular flaw-patching): Such software creates a false sense of security ("should I click here? Oh well.. I have my NAV running, so nothing's going to happen") and may even open bigger holes when itself is not secure.</p>
<p>As it stands now, a educated user without NAV that receives an email with a prepared UPX-packaged .exe will just delete the file and be happy.</p>
<p>An educated user <b>with</b> NAV will delete the file too, but before he can, NAV will have scanned the email and thus <em>executed the malware</em>. This is a case where the infection comes from the software supposed to be preventing it.</p>
<p>It's just like with firewalls: Why installing a packet filter filtering unwanted packets to open ports when you can close the ports in the first place?</p>
<p>Security is (mostly) a social thing (not counting exploits which must/can be prevented by updating the affected software) that can be achieved best using social skills, not software-barriers (as software has flaws - education at least has the possibility of achieving its goals).</p>
<p>So I'm not bashing Symantec (for once), but security-software as such.</p>
