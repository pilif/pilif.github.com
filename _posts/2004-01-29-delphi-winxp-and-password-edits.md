---
layout: post
title: Delphi, WinXP and Password Edits
tags:
- Delphi
- Programming
- Solutions
status: publish
type: post
published: true
meta: {}

---
I'm still into making Delphi apps look more "native" when run under Windows XP. Now that <a href="http://www.gnegg.ch/archives/73-Delphi,-Windows-XP,-Styles-and-embedded-IE.html">I got the IE-Control working</a>, I was looking into the password-edit case.
<p>
The Problem: When using the standard way for creating password edits (Drop a TEdit on the Form and set the PasswordChar property to ° ), this may look and work on in Win 9x, NT and 2000, but under XP, some features are missing:
<p>
<ul>
 <li>In XP, password-edits cannot be read from other applications by sending the WM_GETTEXT message. Delphi's TEdit can.
 <lI>In XP, the edits have a nice bullet instead of a * to mark the entered characters
 <li>When CapsLock is active, a balloon-hint appears warning the user that maybe she is not doing what she expects
</ul>
<p>
How to fix this?
<p>
Simple: Create a descendant of <tt>TEdit</tt>, override <tt>CreateParams</tt> and set the controls style to <tt>ES_PASSWORD</tt>. Provided you are supplying a valid Manifest for XP, you now have a fully fledged and nice working password-edit:
<p>
<pre>
procedure TPasswordEdit.CreateParams(var Params: TCreateParams);
begin
  inherited;
  Params.Style := Params.Style or ES_PASSWORD;
end;
</pre>
<p>
Oh. One thing is still missing: The dots look wrong. This is because Delphi does not use Windows' standart font per default but overrides this with "MS Sans Serif" where "Tahoma" is the standard under XP. So Delphi-Apps generally look kind of foreign - even more so, when ClearType is enabled (MS Sans Serif is a bitmap font and cannot be antialiased).
<p>
This can be fixed by setting each forms <tt>DesktopFont</tt> property to <tt>true</tt>. Note that it's a protected property, so it must me called from withing the form.
<p>
Now the bullets look right and the font's in your application are proper anti-aliased (provided <tt>ParentFont</tt> is set to true in every component on the form).
<div align="center">
<img alt="delphi_pwchar.png" src="http://www.gnegg.ch/archives/delphi_pwchar.png" width="408" height="190" border="0" /></div>
