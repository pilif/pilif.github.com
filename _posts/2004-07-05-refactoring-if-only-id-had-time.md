---
layout: post
title: Refactoring - If only I'd had time
categories:
- Delphi
- Opinions
- Programming
status: publish
type: post
published: true
meta: {}

---
<p>
Refactoring is a cool thing to do: You go back to the drawing-board and redesign some parts of your application so that they fit better to the new requirements building up over time. Sometime you take old code and restructure it, sometime you just rewrite the functionality in question (or even the whole application, but I don't count this as refactoring any more)
</p>
<p>Code always has the tendency to get messy over time as new requirements arise and must be implemented on the basis of existing code. Not even the most brilliant design can save your code. It's impossible to know what you are going to do in the future with your code.</p>
<p>Let's say you have an application that is about orders. Orders with ordersets that somehow get greated and then processed. Now let's say you create quite an usable model of your order and ordersets. Very well. It's nice, it's clean and it works.</p>
<p>And now comes the customer and over the years new features are added, let's call it an inventory mode. You notice that these new inventory records have quite a lot in common with your orders, so you reuse them, but add some features.</p>
<p>Now full stop! It already happened. Why on earth are you reusing the old code and "just adding features"? That's not the way to go. The correct solution would be to abstract away the common parts of your order and inventory records to something like TProductContainer (using Delphi naming conventions here) which has two descendants TOrder and TInventoryRecord.</p>
<p>But this comes at a cost: It requires time. It requires quite some steps:</p>
<ol>
 <li>Think of a useful abstraction (just naming it is not easy. My TProductContainer above is stupid).</li>
 <li>Create the Interface</li>
 <li>Implement the new subclasses</li>
 <li>Change the application where appropriate (and if it's just changing declarations, it still sucks as it's time consuming)</li>
 <li>Test the whole thing</li>
</ol>
<p>Now try to convince the project-manager or even your customer that implementing the required feature can be done in x days, but you'd like to do it in x*2 days because that would be cleaner. The answer would be another question like: "If you do it in x days, will it work?". You'll have to answer "yes", in the end. So you will be asked "if you do it in x*2 days, will it work better than in x days?" and you'd have to answer "No" as the whole sense in cleaning up messy code is to keep it running just the same.
</p>
<p>So, in the end those things will accumulate until it cannot be put away any longer and the refactoring has to be done no matter what, just because implementing the feature uses x days plus y days just for understanding the mess you have created over time. y being 2x or so.</p>
<p>The mean thing is: The longer you wait doing the inevitable, the longer you will have to fix it, so in the end, it should always be the x*2 way - if only those noneducated people would understand.</p>
