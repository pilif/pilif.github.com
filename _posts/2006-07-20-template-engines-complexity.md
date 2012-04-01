---
layout: post
title: Template engines complexity
categories:
- PHP
- Programming
status: publish
type: post
published: true
meta: {}

---
<p>The current edition of the german computer magazine <a href="http://www.heise.de/ix/">iX</a> has an article comparing different template engines for PHP.</p>
<p>When I read it, the old discussion about Smarty providing too many flow controlling options sprang to my mind again, even though that article itself doesn't say anything about whether providing a rich template language is good or not.</p>
<p>Many purists out there keep telling us that no flow control what so ever should be allowed in a template. The only thing a template should allow is to replace certain marker by some text. Nothing more.</p>
<p>Some other people insist, that having blocks which are parsed in a loop is ok too. But all the options Smarty provides are out of the question as it begins intermixing logic and design again.</p>
<p>I somewhat agree on that argument. But the problem is that if you are limited to simple replacements and maybe blocks, you begin to create logic in PHP which serves no other purpose than filling that specially created block structure.</p>
<p>What happens is that you end up with a layer of PHP (or whatever other language) code that's so closely tailored to the template (or even templates - the limitations of the block/replacement engines often require you to split a template into many partial file) that even the slightest changes in layout structure will require a rewrite in PHP.</p>
<p>Experience shows me that if you really intend to touch your templates to change the design, it won't suffice to change the order of some replacements here and there. You will be moving parts around and more often than not the new layout will force changes in the different blocks / template files (imagine marker {mark} moving from block HEAD to block FOOT).</p>
<p>So if you want to work with the down-stripped template engines while still keeping the layout easily exchangeable, you'll create layout-classes in PHP which get called from the core. These in turn use tightly coupled code to fill the templates.</p>
<p>When you change the layout, you'll dissect the page layouts again, recreate the wealth of template files / blocks and then <em>update your layout classes</em>. This means that changing the layout does in-fact require your PHP backend coders to work with the designers yet again.</p>
<p>Take <a href="http://smarty.php.net">smarty</a>.</p>
<p>Basically you can feed a template a defined representation of view data (or even better: Your model data) in unlimited complexity and in raw form. You want to have floating numbers on your template represented with four significant digits? Not <b>your</b> problem with smarty. The template guys can do the formatting. You just feed a float to the template.</p>
<p>In other engines, formatting numbers for example is considered backend logic and thus must be done in PHP.</p>
<p>This means that when the design requirement in my example changes and numbers must be formatted with 6 significant digits, the designer is stuck. He must refer back to you, the programmer.</p>
<p>Not with Smarty. Remember: You got the whole data in a raw representation. A Smarty template guy, knows how to format Numbers from within Smarty. He just makes the change (which is a presentation change only) right in the template. No need to bother the backend programmer.</p>
<p>Furthermore, look at complex structures. Let's say a shopping cart. With Smarty, the backed can push the whole internal representation of that cart to the template (maybe after some cleaning up - I usually pass an associative array of data to the template to have a unified way of working with model data over all templates). Now it's your Smarty guys responsibility (and possibility) to do whatever job he has to do to format your model (the cart) in a way the current layout specification asks him to.</p>
<p>If the presentation of the cart changes (maybe some additional text info must be displayed what the template was not designed for in the first place), the model and the whole backend logic can stay the same. The template just uses the model object it's provided with to display that additional data.</p>
<p>Smarty is <em>the</em> template engine allowing to completely decouple the layout from the business logic.</p>
<p>And let's face it: Layout DOES in-fact contain logic: Alternating row colors, formatting numbers, displaying different texts if no entries could be found,...</p>
<p>When you remove logic from the layout, you will have to move it to the backend where it immediately means that you will need a backend worker whenever the layout logic changes (which it always does on redesigns).</p>
<p>Granted. Smarty isn't exactly easy to get used to for a HTML only guy.</p>
<p>But think of it: They managed to learn to replace &lt;font&gt; tags in their code with something more reasonable (CSS), that works completely differently and follows a completely different syntax.</p>
<p>What I want to say is that your layout guys are not stupid. They are well capable of learning the little bits of pieces of logic you'd want to have in your presentation layer. Let them have that responsibility means that you yourself can go back to the business logic once and for all. Your responsibility ends after pushing model objects to the view. The rest is the Smarty guys job.</p>
<p>Being in the process of redesigning a fully smarty-based application right now, I can tell you: It works. PHP does not need to get touched (mostly - design flaws exist everywhere). This is a BIG improvement over other stuff I've had to do before which was using the way everyone is calling clean: PHPLIB templates. I still remember fixing up tons and tons of PHP-code that was tightly coupled into the limited structure of the templates.</p>
<p>In my world, you can have one backend, no layout code in PHP and a unlimited amount of layout templates. Interchangable without changing anything in the PHP code. Without adding any PHP code when creating a new template.</p>
<p>Smarty is the only PHP template engine I know of that makes that dream come true.</p>
<p>Oh and btw, Smarty won the performance contest in that article with a lot of distance to the second fastest entry. So bloat can't be used as argument against smarty. Even if it IS bloated, it's not slower than non-bloated engines. It's faster.</p>
