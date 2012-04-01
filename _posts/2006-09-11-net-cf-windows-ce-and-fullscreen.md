---
layout: post
title: .NET CF, Windows CE and Fullscreen
categories: []

status: publish
type: post
published: true
meta: {}

---
.NET CF, Windows CE and Fullscreen

<p>Assuming you are creating an application for the .NET compact framework and further assuming that the application is designed to be the only one running on the target device because the whole device is <em>defined</em> by your application.</p>
<p>Also, you don't want the end-users to tamper with the device.</p>
<p>This is why you sometimes want to put your application in a full-screen mode, hiding all other UI elements on the screen. Of course, to prevent tampering, you'd have to take additional measures, but that's another topic.</p>
<p>The application I'm currently working on is written for the .NET compact framework, so the explanations are made for that environment.</p>
<p>Putting your application to full screen on the PocketPC is easy: Set your form's <tt>FormBorderStyle</tt> to <tt>None</tt> and set <tt>WindowState</tt> to <tt>Maximized</tt>. That will do the trick.</p>
<p>On Windows CE (PocketPC is basically a special UI library and application collection running on top of Windows CE), there's a bit more work to do.</p>
<p>First of all, you have to remove the task bar, which is acomplished by some P/Invoke calls which are declared like this:</p>
<pre class="code">
[DllImport("coredll.dll", CharSet=CharSet.Auto)]
public static extern bool ShowWindow(int hwnd, int nCmdShow);

[DllImport("coredll.dll", CharSet = CharSet.Auto)]
public static extern bool EnableWindow(int hwnd, bool enabled);
</pre>

<p>Then, in your main form's constructor, do the magic:</p>
<pre class="code">
int h = FindWindow("HHTaskBar", "");
ShowWindow(h, 0);
EnableWindow(h, false);</pre>
<p>And don't forget to turn the task bar on again when your application exits.</p>
<pre class="code">
int h = FindWindow("HHTaskBar", "");
ShowWindow(h, 5);
EnableWindow(h, true);</pre>
<p>There's one important additional thing to do though:</p>
<p>WindowState = Maximized won't work!</p>
<p>Well. It <strong>will</strong> work, but it will resize your form in a way that there weill be empty space at the bottom of the screen where the taskbar was. You will have to manually resize the form by using something like this:</p>
<pre class="code">
this.Height = Screen.PrimaryScreen.Bounds.Height;
this.Width = Screen.PrimaryScreen.Bounds.Width;</pre>
<p>That last bit hit me hard today :-)</p>
<p>On a side note: There's also the <tt>SHFullScreen</tt>-API call which also allows your application to position itself on the top of the taskbar. This basically is the official way to go, but the DLL aygshell.dll where the function is implemented in is not always available on all CE configurations.</p>
