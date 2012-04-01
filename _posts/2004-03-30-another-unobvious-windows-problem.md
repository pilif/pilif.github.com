---
layout: post
title: Another unobvious Windows problem
tags:
- Software
- Solutions
status: publish
type: post
published: true
meta: {}

---
<p>
I have quite a lax administration policy concerning our network which is possible as long as we don't have that many machines and employees: I for myself do not place many restrictions in choice of hardware and OS on our employees. They should work with whatever they want. Only restriction: The OS must be multi-user capable (means: no Windows 9x) and if the employee wants access to our file-server it must somehow support the SMB protocol.
</p><p>
Lukas, on the other hand, adds another requirement to the list above: The system must somehow provide support for our <a href="http://www.gnegg.ch/archives/63-Each-problem-has-a-solution....html">exchange based</a> groupware. This can be native access or via the web interface.
</p><p>
So yesterday, someone wanted to add his computer to our network. It's a IBM Thinkpad running Windows 2000 in a highly tweaked installation which should be preserved at all costs. Every other administrator would insist that at least the corporate configuration would be enforced, but I don't care and put the users satisfaction above all easement for my task, so I let him keep his setup, but suggested him to join our Windows domain to make his life easier (no logging in to our fileserver, better exchange-support (remember: Lukas' condition).
</p><p>
After some initial problems with the installed personal firewall (have I told you that I hate them? <a href="http://www.gnegg.ch/archives/61-pptp-+-linux-much-fun..html">Yes I have</a>), I went on and tried to join our Windows 2003 domain. After quite a long waiting time, the only thing I got was "Access Denied". A quick look to the server's event log showed nothing but success-messages.
</p><p>
Googling did not help (much), but told me about a certain <tt>netsetup.log</tt> windows is supposed to create on the client (it's in <tt>%windir%\Debug</tt>. Here's the log I got:
</p>
<pre>03/30 16:19:28 -----------------------------------------------------------------
03/30 16:19:28 NetpDoDomainJoin
03/30 16:19:28 NetpMachineValidToJoin: 'THINKPAD'
03/30 16:19:28 NetpGetLsaPrimaryDomain: status: 0x0
03/30 16:19:28 NetpMachineValidToJoin: status: 0x0
03/30 16:19:28 NetpJoinDomain
03/30 16:19:28 	Machine: THINKPAD
03/30 16:19:28 	Domain: office.sensational.ch
03/30 16:19:28 	MachineAccountOU: (NULL)
03/30 16:19:28 	Account: office.sensational.ch\pilif
03/30 16:19:28 	Options: 0x3
03/30 16:19:28 	OS Version: 5.0
03/30 16:19:28 	Build number: 2195
03/30 16:19:28 	ServicePack: Service Pack 4
03/30 16:19:28 NetpValidateName: checking to see if 'office.sensational.ch' is valid as type 3 name
03/30 16:19:28 NetpValidateName: 'office.sensational.ch' is not a valid NetBIOS domain name: 0x7b
03/30 16:19:28 NetpCheckDomainNameIsValid [ Exists ] for 'office.sensational.ch' returned 0x0
03/30 16:19:28 NetpValidateName: name 'office.sensational.ch' is valid for type 3
03/30 16:19:28 NetpDsGetDcName: trying to find DC in domain 'office.sensational.ch', flags: 0x1020
03/30 16:19:43 NetpDsGetDcName: failed to find a DC having account 'THINKPAD$': 0x525
03/30 16:19:43 NetpDsGetDcName: found DC '\\durin.office.sensational.ch' in the specified domain
03/30 16:19:43 NetUseAdd to \\durin.office.sensational.ch\IPC$ returned 5
03/30 16:19:43 NetpJoinDomain: status of connecting to dc '\\durin.office.sensational.ch': 0x5
03/30 16:19:43 NetpDoDomainJoin: status: 0x5</pre>
<p>
Not so useful besides: <tt>NetUseAdd to \\durin.office.sensational.ch\IPC$ returned 5</tt>
</p><p>
As the last entry was something about a status 0x5 and the error was "Access Denied", I figured that this "returned 5" must mean "Access Denied" too.
</p><p>
A quick try to access the server showed me that I was right: I could not access any share - my password was not accepted (besides the server's security log telling me otherwise).
</p><p>
Finally the guy owning the noteook had an idea: He has disabled Windows 2000's packet signing and encryption via Administrative Tools/Local Security Policy. Enabling it and rebooting finally did the trick. When asked why he did so he said that it would greatly speed up access from a PC running Windows 98...
</p><p>
What did I learn: Maybe my policy is a bit too lax and if keep it, I should at least not try to fix problems I'm getting with it (it would have worked perfectly well without joining the domain)<br />
What do you learn: If you have the same problem, here's the solution. And this is what this blog is for.
