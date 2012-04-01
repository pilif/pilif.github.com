---
layout: post
title: JavaScript and Applet interaction
categories:
- Programming
tags:
- applet
- java
- Programming
- Software
- webdev
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
As I said <a href="/2009/04/this-months-find-jna-and-applet-launcher/">earlier this month</a>: While Java applets are dead for games and animations and whatever else they were used back in the nineties, they still have their use when you have to access the local machine from your web application in some way.

There are other possibilities of course, but they all are limited:
<ul>
	<li>Flash loads quickly and is available in most browsers, but you can only access the  hardware Adobe has created an API for. That's upload of files the user has to manually select, webcams and microphones.</li>
	<li>ActiveX doesn't work in browsers, but only in IE.</li>
	<li>.NET dito.</li>
	<li>Silverlight is neither commonly installed on your users machines, nor does it provide the native hardware access.</li>
</ul>
So if you need to, say, access a bar code scanner. Or access a specific file on the users computer - maybe stored in a place that is inconvenient for the user to get to (%Localappdata% for example is hidden in explorer). In this case, a signed Java applet is the only way to go.

You might tell me that a website has no business accessing that kind of data and generally, I would agree, but what if your requirements are to read data from a bar code scanner without altering the target machine at all and without requiring the user to perform any steps but to plug the scanner and click a button.

But Java applets have that certain 1996 look to them, so even if you access the data somehow, the applet still feels foreign to your cool Web 2.0 application: It doesn't quite fit the tight coupling between browser and server that AJAX gets us and even if you use Swing, the GUI will never look as good (and customized) as something you could do in HTML and CSS.

But did you know that Java Applets are fully scriptable?

Per default, any JavaScript function on a page can call any public method of any applet on the site. So let's say your applet implements
{% highlight java %}public String sayHello(String name){
    return "Hello "+name;
}{% endhighlight %}
Then you can use JavaScript to call that method (using jQuery here):
{% highlight javascript %}$('#some-div').html(
    $('#id_of_the_applet').get(0).sayHello(
        $('#some-form-field').val())
);{% endhighlight %}
If you do that, you have to remember though that any applet method called this way will <strong>run inside the sandbox</strong> regardless if the applet is signed or not.

So how do you access the hardware then?

Simple: Tell the JRE that you are sure (you are. aren't you?) that it's ok for a script to call a certain method. To do that, you use AccessController.doPrivileged(). So if for example, you want to check if some specific file is on the users machine. Let's further assume that you have a singleton RuntimeSettings that provides a method to check the existence of the file and then return its name, you could do something like this:
{% highlight java %}   public String getInterfaceDirectory(){
        return (String) AccessController.doPrivileged(
                new PrivilegedAction() {
                    public Object run() {
                        return RuntimeSettings.getInstance().getInterfaceDirectory();
                    }
                }
            );
    }{% endhighlight %}
Now it's safe to call this method from JavaScript despite the fact that RuntimeSettings.getInterfaceDirectory() directly accesses the underlying system. Whatever is in PrivilegedAction.run() will have full hardware access (provided the applet in question is signed and the user has given permission).

Just keep one thing in mind: Your applet is fully scriptable and if you are not very careful where that Script comes from, your applet may be abused and thus the security of the client browser might be at risk.

Keeping this in mind, try to:
<ul>
	<li>Make these elevated methods do one and only one thing.</li>
	<li>Keep the interface between the page and the applet as simple as possible.</li>
	<li>In elevated methods, do not call into javascript (see below) and certainly do not eval() any code coming from the outside.</li>
	<li>Make sure that your pages are sufficiently secured against XSS: Don't allow any user generated content to reach the page unescaped.</li>
</ul>
The explicit and cumbersome declaration of elevated actions was put in place to make sure that the developer keeps the associated security risk in mind. So be a good developer and do so.

Using this technology, you can even pass around Java objects from the Applet to the page.

Also, if you need your applet to call into the page, you can do that too, of course, but you'll need a bit of additional work.
<ol>
	<li>You need to import JSObject from netscape.javascript (yes - that's how it's called. It works in all browsers though), so to compile the applet, you'll have to add plugin.jar (or netscape.jar - depending on the version of the JRE) from somewhere below your JRE/JDK installation to the build classpath. On a Mac, you'll find it below /System/Library/Frameworks/JavaVM.framework/Versions/&lt;your version&gt;/Home/lib.</li>
	<li>You need to tell the Java plugin that you want the applet to be able to call into the page. Use the <em>mayscript</em> attribute of the java applet for that (interestingly, it's just mayscript - without value, thus making your nice XHTML page invalid the moment you add it - mayscript="true" or the correct mayscript="mayscript" don't work consistently on all browsers).</li>
	<li>In your applet, call the static JSObject.getWindow() and pass it a reference to your applet to acquire a reference to the current pages window-object.</li>
	<li>On that reference you can call eval() or getMember() or just call() to call into the JavaScript on the page.</li>
</ol>
This tool set allows you to add the applet to the page with 1 pixel size in diameter placed somewhere way out of the viewport distance and with visibility: hidden, while writing the actual GUI code in HTML and CSS, using normal JS/AJAX calls to communicate with the server.

If you need access to specific system components, this (together with <a href="/2009/04/this-months-find-jna-and-applet-launcher/">JNA and applet-launcher</a>) is the way to go, IMHO as it solves the anachronism that is Java GUIs in applets.

There is still the long launch time of the JRE, but that's getting better and better with every JRE release.

I was having so much fun last week discovering all that stuff.
