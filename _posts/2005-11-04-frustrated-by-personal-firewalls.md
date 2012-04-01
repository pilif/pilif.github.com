---
layout: post
title: Frustrated by personal firewalls
categories:
- Opinions
status: publish
type: post
published: true
meta: {}

---
<p>As you may know, the <a href="http://www.sensational.ch">company</a> I'm working in develops <a href="http://www.popscan.net">barcode ordering solutions</a>.</p>
<p>Now for me it's very frustrating to see that whatever I do, those oh-so-good personal firewall and internet security and whatnot tools manage to screw the experience for the enduser. During developement, I'm always watching to adhere to common known-good practices in regards to handling the system. Works without admin rights? Yes. Uses systemwide functions wherever possible? Yes. Clean uninstall? Yes. Spyware free? Of course. Trojan horse? God beware! No!</p>
<p>None the less, PopScan gets majorly screwed here and then:</p>
<ul>
 <li>Norton Internet Security is per default configured to let only 'Programs authorized by Symantec' to access the internet. I don't even try to ask how to get on that list - besides the fact that we'd never have the resources to do wahtever Symantec wants from us - if they provide such a possibility at all.</li>
 <li>Whenever the offline version connects to the internet, a big scary warning from whatever personal firewall (besides Norton - that tool silently blocks everything that's not IE and LiveUpdate) pops up telling the (not-knowing) user that something bad is currently happening. End-users are known to click 'block' here and accuse us of creating trojan horses</li>
 <li>To circumvent many problems associated with installations on the client, we created the <a href="http://www.popscan.net/web_en/smb.html">Web version</a> of PopScan. And you know what: We're still screwed. Java-Applets get blocked (how the hell should we get the barcodes in the scanner if not with Java or ActiveX??), PopUps get blocked (of course we don't pop up any unrequested ones. The only popup used is for reading the scanner. With onClick="window.open()". It can't be more 'user-requested' than this. Still... Some security program deemed it necessary to block that.</li>
</ul>
<p>The worst thing about all that is: Those obviously broken programs that screw applications all over the place call themselves 'Security Tools' and with this, they seem to be automatically trusted by the end users. If a security tool tells the user "Trojan Horse Alert", the user panics and blocks everyting. If a security tool just silently blocks certain internet connections (PopScan Offline uses Port 80 to communicate - using WinInet API - a less intrusive, less sneaky way for connecting to the internet does not exist), everyone blames the blocked program of not working.</p>
<p>To connect to the internet regardless of any PFW setting would mean to inject code into IE and use that to do your internet work. The better tools still detect that, but you can get around it by abusing the Windows Message Loop and simulating keypresses. But both solutions are actually trojany. And I'd never ever implement such a "feature". It's compomising stability and integrity. And it's etically flawed. None the less: The tools force me to do something like this if I want to work it 100% of the caused in 100% of the installations</p>
<p>Those tools go way too far.</p>
<p>And don't forget: It's the nonexperienced users that get bitten: Those install security tools. Those don't know what those tools do. Those trust them. Those make the wrong conclusions (PopScan can't connect. PopScan must be broken).</p>
<p>It's just frustrating. Why use lots of time to make a software non-intrusive and perfectly compliant to both technical and ethical standards when it's blocked just like your average trojan horse trashing your installation and displaying advertisement all over the place?</p>
<p>Actually I think, those trojans are better off because they have code to circumvent the security tools.</p>
<p>As it currently stands I have the feeling these tools do block more legitimate applications then trojan horses. And this frustrates me. Greatly.</p>
