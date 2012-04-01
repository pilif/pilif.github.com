---
layout: post
title: Delphi, Windows XP, Styles and embedded IE
categories:
- Delphi
- Programming
- Solutions
status: publish
type: post
published: true
meta: {}

---
Let's say you have a delphi (delphi 7 - altough prior versions can use Mike Lischkes <a href="http://www.delphi-gems.com/ThemeManager.php">Theme Manager</a> application which embedds the Microsoft Internet Explorer ActiveX Control. Let's assume furhter that you have created your Manifest so the application appears in the themed style under Windows XP.
<p>
Unfortunatly, the embedded IE does not do that: Controls are still drawn in the old theme-less style. Why? How to tell the Control to use the themed style (which it certainly supports - just look at IE itself)?
<p>
For long I was looking for a solution which I've just found.
<p>
First, call <tt>SetThemeAppProperties</tt> (defined in <tt>UxTheme.pas</tt>), then send <tt>WM_THEMECANGED</tt> to your forms - at least to the one that uses the IE-Control. Example:

<pre>
  SetThemeAppProperties( STAP_ALLOW_NONCLIENT OR
       STAP_ALLOW_CONTROLS OR
       STAP_ALLOW_WEBCONTENT );
  PostMessage(frmBrowser.Handle, WM_THEMECHANGED, 0, 0);
</pre>
Especially important is the flag <tt>STAP_ALLOW_WEBCONTENT</tt>
<p>
Then, in the form containing the browser, just add a message-procedure:
<p>
Form-declaration:<pre>
  private
    procedure wmthemechanged (var msg: TMessage); message wm_themechanged;
</pre>

<b>Update:</b> I've turned off the comment-feature as this entry somehow got listed in some spammers database. I'm currently deleting about 10 entries per day that are just there to provide links to some stange sites. I'll post about this later.
