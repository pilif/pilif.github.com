---
layout: post
title: Vista preloaded
categories:
- lenovo
- oem
- preload
- Usability
- vista
status: publish
type: post
published: true
meta: {}

---
<p>Today I had the dubious "pleasure" of setting up a Lenovo Thinkpad R60 with Vista Business Edition preloaded.</p>
<p>We just needed to have a clean Vista machine to test components of our PopScan solution on and I just <em>didn't</em> have the disk space needed for yet another virtual machine.</p>
<p>I must say that I didn't look forward to the process. Mainly because I hated the OEM installation process under XP. Basically, you got an installation cluttered with "free" "feature enhancments" which usually were really bad-looking if provided from the hardware manufacturer or nagged the hell out of you if it were trial releases of some anti virus program or something else.</p>
<p>Ever since I'm setting up windows machines for personal use, my policy has been to wipe the things clean and install a clean windows copy on them.</p>
<p>With this background and the knowledge that just for testing purposes the out-of-the-box installation would do the trick, I turned on that R60 machine.</p>
<p>The whole initial setup process was very pleasant: It was just the usual Windows Setup minus the whole copying of files process - the installation started with asking me what language and what regional settings to use and it actually guessed the keyboard settings right after setting the location (a first! Not even apple can do that *sigh*).</p>
<p>Then came the performance testing process as we know it from non-oem-preinstalled installations.</p>
<p>Then it asked me for username and provided a selection of background images.</p>
<p>I <em>really, really</em> liked that because usually the vendor provided images are just crap.</p>
<p>The selection list even contained some Vista-native images and some Lenovo images - clearly separated.</p>
<p>The last question was a small list of "additional value-add products" with "No thank you" preselected.</p>
<p>You can't imagine how pleased I was.</p>
<p>...</p>
<p>up until what came after.</p>
<p>The system rebooted and presented me with a login screen to which I gave the credentials I provided during the setup process.</p>
<p>Then the screen turned black and a DOS command prompt opened. And a second, though minimized.</p>
<p>The first two lines in that DOS prompt were</p>
<pre class="code">echo "Please wait"
Please wait</pre>
<p>I can understand that Lenovo wanted to get their machines out and that they may be willing to sacrifice a bit of Vista's shinyness. But they obviously even lack the basic batch-knowledge of using "@echo off" as the first command in their setup script thus ruining the unpleasantness of the installation even more.</p>
<p>But wait... it's getting worse...</p>
<p>The script ran and due to echo being on displayed the horrors to me: ZIP-File after ZIP-File was unpacked into the Application Data folder of the new user. MSI-File after MSI-File was installed. All without meaningful progress report (to a non-techie that is).</p>
<p>Then some Lenovo registration assistant popped up asking me all kinds of personal questions with no way to skip it, but the worst thing about it was the font it used: MS Sans Serif - without <em>any</em> font smoothing. This looked like Windows 98, removing the last bit of WOW from Vista ( :-) ).</p>
<p>Then it nagged me about buying Norton Internet Security.</p>
<p>And finally it let me to the desktop.</p>
<p>And... oh the horror:</p>
<ul>
    <li>My earlier choice of background image was ignored. I was seeing a Lenovo-Logo all over the place.</li>
    <li>On the screen was a Vista-Builtin-Assistant telling me to update the Windows Defender signatures. <strong>It looked awful.</strong> Jaggyness all over the place: Clear Type was clearly off and the default font of windows looks <em>aful</em> without ClearType.</li>
    <li>It's <em>impossible</em> for a non-techie to fix that ClearType thing as it's buried deep in the Control Panel - it's supposed to be on and never to be touched by normal users.</li>
    <li>On the Notification Area were <em>three</em> icons telling me about WLAN connectivity: Windows' own, the Think Pad driver's and the one of the ThinkVantage Network Access tool (the last one has a bug, btw, it constantly keeps popping up a balloon telling me that it's connected. If I close it, it reopens 30 seconds later).</li>
</ul>
<p>I didn't do anything to fix this, but quickly joined the machine to the domain in the hope that logging in to that would give me the Vista default profile.</p>
<p>But no: Another MSI-installer and <em>still no ClearType</em></p>
<p>It's a shame to see how the OEMs completely destroy everything Microsoft puts into making their OSes look and feel "polished". Whatever they do, the OEMs succeed at screwing up the installations.</p>
<p>This is precisely where Apple outshines Windows by far. If you buy a computer by apple, you will have software on it that was put there by Apple, made by Apple, running on an OS made by Apple. Everything is shiny and works out of the box.</p>
<p>Microsoft will <em>never</em> be able to provide that experience to their users as long as OEMs think they can just throw in some crappy made installation tools that destroy all the good experience a new user could have with the system. From scary DOS prompts over crappy (and no longer needed) third party applications to completely crappy preconfiguration (I could *maybe* let that ClearType thingie pass IF they'd chosen a system font that was actually readable with ClearType off - this looked worse than a Linux distribution with an unpatched Freetype).</p>
<p>PC OEMs put no love at all into their products.</p>
<p>Just sticking a Windows Vista sticker on it isn't brining that "WOW" to the customers at all.</p>
<p>Microsoft should go after the OEMs and force them to provide clean installations with only a minimal amount of customization done.</p>
