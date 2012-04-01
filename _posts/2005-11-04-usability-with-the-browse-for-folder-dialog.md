---
layout: post
title: Usability with the Browse for folder dialog
tags:
- Usability
status: publish
type: post
published: true
meta: {}

---
<center><img alt="browsefolder.png" src="http://www.gnegg.ch/archives/browsefolder.png" width="324" height="338" /></center>
<p>This dialog is the worst usability nightmare ever. It's so bad that I'm really afraid of using any function in any program making me to chose a directory. Why? Don't get me started:</p>
<ul>
  <li>It's too small. Newer versions of Windows allow you to resize it, but it's dependent on the program. The one I took this screenshot off does not.</li>
  <li>It's uncommon. You don't see that dialog often. Many programs use a standard file selection dialog when they ask for a directory (I guess because of the problems outlined here)</li>
  <li>It does not allow multiple selection. Meaning that if your program provides the user to work with multiple directories at once, it can't be done with this dialog. You have to build your own solution, thus losing even more usability by forcing the user to learn something new</li>
  <li>The tree-view is an uncommon view on the filesystem. Over time, Microsoft eliminated the tree view for directory navigation more and more. You have to willingly turn it on in Windows XP. There's no explorer view with that tree per default</li>
 <li>It's context-less. Tell me: What's the reason to select a folder in the dialog you see in the screenshot above? I don't select a folder for the selections sake. I want do do something with that folder. What? The dialog does not tell me. I know this can be set in the API-Call to bring up the dialog. But many people do not.</li>
 <li>It has not way to enter a path manually. Copy & Paste exists for a reason. If you have deeply nested paths, it can be a real timesaver. Navigate in Explorer (maybe already open anyways), Copy the path to the clipboard and... nope... no pasting</li>
 <li>It has no autocomplete. I'm very fast in typing paths with the help of autocomplete: c:\Pro[arrow down]\Po[arrow down] and I'm in c:\Program Files\PopScan. Not in this dialog. In this dialog, I have to click through the whole path</li>
 <li>Around Windows 2000, microsoft extended the file selection dialogs with a shortcut bar allowing easy access to some commonly used folders. This bar is missing in this dialog.</li>
 <li>It's readonly. What if I want to make a new folder? Some "editions" of the dialog do provide a 'New Folder' button. Even so, it works by adding a 'New Folder'-Folder and you have to manually click it to rename it (at least on this system here. Behaviour is erratic</li>
<li>There's no context menu. Usuall when you see filesystem icons, you can right-click it to get a systemwide context-menu. Not with this dialog. Well. You can right-click. A context menu does appear. But the single entry is "What's this" providing an utterly pointless context sensitive help entry that - I'm afraid has no context at all:  "Click the plus sign (+) to display more choices" choices? What choices? Why do I want to see new choices? This is no answer for the question "what's this". It's no answer at all. What the <em>heck</em>.</li>
 <li>It's context less (yeah. we had that before): Tell me: What's the path I currently have selected in the screenshot? How can I know I have selected the correct folder? I may - after all - have multiple Richard Wagner folders on my harddrive</li>
 <li>I wanted to write that it violates fitts law because you had to click those small '+'-signs (as the context sensitive help tells you). And now - after <em>years</em> of using this dialog I finally learned that you can double-click folders to expland them. I did not know that until now</li>
 <li>When you have mounted network drives, it's a living performance-problem as the top layer of the dialog displays all drives which can take some time. In which the dialog (and the unerlying app freezes).</li>
 <li>The deeper you get in the hierarchy, the more you have to <em>horizontally</em> scroll.</li>
</ul>
<p>I'm sure I can list even more, but enough is enough. I'm sure you get the point</p>
<p>Microsoft, I beg of you: Redesign this dialog!</p>
<p>Force the programs to use the new design. Don't provide a fallback!</p>
<p>This way only the programs that are actually re-building this dialog (instead of calling the API) remain broken - and after all, they were broken to begin with: Why rebuild something crappy? Why rebuild it and risk it only being similar but not identical in usage? Why rebuild and risk it remaining broken even if the dialog gets fixed?</p>
<p>And believe me: There are people rebuilding existing OS-features. For no reason at all (see another posting about Adobes new file selection dialogs)</p>
