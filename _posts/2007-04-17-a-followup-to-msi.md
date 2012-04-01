---
layout: post
title: A followup to MSI
categories:
- msi
- opinion
- Programming
- response
status: publish
type: post
published: true
meta: {}

---
<p>My <a href="http://www.gnegg.ch/archives/357-Windows-Installer-Worked-around.html">last post about MSI</a> generated some nice responses, amongst them the <a href="http://blogs.xmission.com/legalize/2007/04/16/is-it-the-tool-or-the-author/">lengthy blog post</a> on <a href="http://blogs.xmission.com/legalize">Legalize Adulthood</a>.</p>
<p>Judging from the two track-backs on the MSI posting and especially after reading the linked post above, I come to the conclusion that my posting was very easy to misunderstand.</p>
<p>I agree that the workarounds I listed are <em>problems with the authoring</em>. I DO think however that all these workarounds where put in place because the platform provided by Microsoft is lacking in some kind.</p>
<p>My rant was not about the side effects of these workarounds. It was about their sole existence. Why are some of us forced to apply workarounds to an existing platform to achieve their goals? Why doesn't the platform itself provide the essential features that would make the workarounds unneeded?</p>
<p>For my *real* problems with MSI from an end users perspective, feel free to read <a href="http://www.gnegg.ch/archives/174-A-look-at-Windows-Installer.html">this rant</a> or <a href="http://www.gnegg.ch/archives/107-Why-o-why-is-my-harddrive-so-small.html">this on</a> e (but bear in mind that both are a bit oldish by now).</p>
<p>Let's go once again through my points and try to understand what each workaround tries to accomplish:</p>
<ol>
    <li><p><strong>EXE-Stub to install MSI</strong>: MSI, despite being the platform of choice still isn't as widely deployed as the installer authors want it to be. If Microsoft wants us to use MSI, it's IMHO their responsibility to ensure that the platform is actually available.</p>
        <p>I do agree though that Microsoft is working on this, for example by requiring MSI 3.1 (the first release with acceptable patching functionality) for Windows Update. This is what makes the stubs useless over time.</p>
        <p>And personally I think a machine that isn't using Windows Update and thus hasn't 3.1 on it isn't a machine I'd want to deploy my software on because a machine not running Windows update is probably badly compromised and in an unsupportable state.</p>
    </li>
    <li><p><strong>EXE-Stub to check prerequisites</strong>: Once more I don't get why the underlying platform cannot provide functionality that is obviously needed by the community. Prerequisites are a fact for life and MSI does nothing to help that. MSI packages can't be used to install other MSI packages but Merge Modules, but barely any libraries required by todays applications actually come in MSM format (.NET framework? Anyone?).</p>
        <p>In response to the excellent post on Legalize Adulthood which gives an example about DirectX, I counter with: Why is there a DirectX Setup API? Why are there separate CAB files? Isn't MSI supposed to handle that? Why do I have to create a setup stub calling a third-party API to get stuff installed that isn't installed in the default MSI installation?.</p>
        <p>An useful package solution would provide a way to specify dependencies or at least allow for automated installation of dependencies from the original package.</p>
        <p>It's ironic that an MSI package can - even though it's dirty - use a CustomAction to install a traditionally packaged .EXE-Installer-Dependency, but can't install a .MSI packaged dependency.</p>
        <p>So my problem isn't with bootstrappers as such, but with the limitations in MSI itself requiring us developers to create bootstrappers to do work which IMHO MSI should be able to do.</p>
    </li>
    <li><p><strong>MSI-packages .EXE's</strong>: I wasn't saying that MSI is to blame for the authors that repacked their .EXE's into .MSI packages. I'm just saying that this is another type of workaround that could have been chosen for the purpose of getting the installation to work despite (maybe only perceived) limitations in MSI. An ideal packaging solution would be as accessible and flexibly as your common .EXE-installer and thus make such a workaround unneeded.</p></li>
    <li><p><strong>Third party scripting</strong>: In retrospect I think the motivation for these third party scripting solutions is mainly the vendor-lock-in. I'm still convinced though that with a more traditional structure and a bit more flexibility for the installer authors, such third party solutions would get more and more unneeded until they finally die out.</p></li>
    <li><p><strong>Extracting, then merging</strong>: Also just another workaround that has been chosen because a distinct problem wasn't solvable using native MSI technology.</li>
</ol>
<p>I certainly don't blame MSI for a developer screwing up. I'm blaming MSI for not providing the tools necessary for the installer community to use native MSI to solve the majority of problems. I ALSO blame MSI for messiness, for screwing up my system countless times and for screwing up my parent's system which is plainly unforgivable.</p>
<p>Because MSI is a complicated black box, I'm unable to fix problems with constantly appearing installation prompts, with unremovable entries in "Add/Remove programs" and with installations failing with such useful error messages as "Unknown Error 0x[whatever]. Installation terminated".</p>
<p>I'm blaming MSI for not stopping the developer community to author packages with above problems. I'm blaming MSI for its inherent complexity causing developers to screw up.</p>
<p>I'm disappointed with MSI because it works in a ways that requires at least a part of the community to create messy workarounds for quite common problems MSI can't solve.</p>
<p>What I posted was a list of workarounds of varying stupidity for problems that shouldn't exist. Authoring errors that shouldn't need to happen.</p>
<p>I'm not picky here: A large majority of packages I had to work with <em>do</em> in fact employ one of these workarounds (the unneeded EXE-stub being the most common one), none of which should be needed.</p>
<p>And don't get me started about how other operating systems do their deployment. I think Windows could learn from some of them, but that's for another day.</p>
