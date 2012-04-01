---
layout: post
title: My worst mistakes in programming
tags:
- programming
- code
- design
status: publish
type: post
published: true
---

I'm in the middle of refactoring a big infrastructure piece in our
product [PopScan](http://www.popscan.com). It's very early code, rarely
touched since its inception in 2004, so I'm dealing mainly with my sins
of the past.

This time like no time before, I'm feeling the two biggest mistake I
have ever made in designing a program, so I though I'd make this post
here in order to help others not fall into the same trap.

Remember this: Once you are no longer alone working on your project,
the code you have written sets an example. Mistakes you have made are
copied - either verbatim or in spirit. The design you have chosen
lives on in the code that others write (rightfully so - you should
strive to keep code consistent).

This makes it even more important not to screw up.

Back in 2004 I have failed badly at two places.

* I chose a completely wrong abstraction in class design, mixing two
things that should be separate.

* I chose - in a foolhearted whish to save on CPU time to create a ton
of internal state instead of fetching the data when it's needed (I
could still cache then, but I missed that).

So here's the story.

## One is the architectural issue.

Let me tell you, dear reader, should you *ever* be in the position of
having to do anything even remotely related to an ecommerce solution
dealing with products and orders, so repeat with me:

> Product lists are not the same thing as orders. Orders are not the same thing as baskets.

and even more importantly:

> A product and a line item are two completely different things.

A line item describes how a specific product is placed in a list, so
at best, a product is contained in a line item. A product doesn't have
a quantity. A product doesn't have a total price.

A line item does.

And when we are at it: «quantity» is not a number. It is the entitiy
that describes the amount of times the product is contained within the
line item. As such a quantity usually consists of an amount and a
unit. If you change the unit, you change the quantity. If you change
the amount, you change the quantity.

Anyways - sitting down and thinking of the entities in the feature
that you are implementing is an essential part of the work that you
do. Even it it seems "kinda right" at the time, even if it works
"right" for years - once you make a mistake at a bad place, you are
stuck with it.

PopScan is about products and ordering them. Me missing the
distinction between a product and a line item back in 2004 worked fine
until now, but as this is a core component of PopScan, it has grown
the most over the years, more and more intertwining product and line
item functionality to the point of where it's too late to fix this now
or at least it would require countless hours of work.

Work that will have to be done sooner rather than later. Work that
deeply affects a core component of the product. Work that will change
the API greatly and as such can only be tested for correctness in
integration tests. Unit tests become useless as the units that are
being tested won't exist any more in the future.

Painful work.

If only I had more time and experience those 8 years ago.

## The other issue is about state

Let's say you have a class `FooBar` with a property `Foo` that is
exposed as part of the public API via a `getFoo` method.

That `Foo` relies of some external data - let's call it `foodata`.

Now you have two options of dealing with that `foodata`:

1. You could read `foodata` into an internal `foo` field at
construction time. Then, whenever your `getFoo()` is called, you
return the value you stored in `foo`.

2. Or you could read nothing until `getFoo()` is called and then read
`foodata` and return that (optionally caching it for the next call to
`getFoo()`)

Chosing the first design for most of the models back in 2004 was the
second biggest coding mistake I have ever made in my life.

Aside of the fact that constructing one of these `FooBar` objects
becomes more and more expensive the more stuff you preload (likely
never to be used for the lifetime of the object), you have also
contributed to a huge amount of internal state of the object.

The temptation to write a `getBar()` method that has a side effect of
also altering the internal foo field is just too big. And now you end
up with a `getBar()` that suddenly also depends on the internal state
of `foo` which suddenly is disconnected from the initial `foodata`.

Worse, suddenly calling code will see different results depending on
whether it calls `getBar()` before it's calling `getFoo()`. Which will
of course lead to code depending on that fact, so fixing it becomes
very hard (but at least caught by unit tests).

Having the internal fields also leads to `FooBar`'s implementation
preferring these fields over the public methods, which is totally
fine, as long as `FooBar` stands alone.

But the moment there's a `FooFooBar` which inherits from `FooBar`, you
lose all the advantages of polymorphism. `FooBar`'s implementation will
always only use its own private fields. It's impossible for `FooFooBar`
to affect `FooBar`'s implementation, causing the need to override many
more methods than what would have been needed if `FooBar` used its own
public API.

## Conclusion

These two mistakes cost us hours and hours of working around our
inability to do what we want. It cost us hours of debugging and it
causes new features to come out much more clunky than they need to be.

I have done so many bad things in my professional life. A `shutdown -h`
instead of -r on a remote server. A `mem=512` boot parameter (yes.
That number is/was interpreted as bytes. And yes. Linux needs more
than 512 bytes of RAM to boot), an `update` without `where` clause -
I've screwed up so badly in my life.

But all of this is *nothing* compared to these two mistakes.

These are not just inconveniencing myself. These are inconveniencing
my coworkers and our customers (because we need more time to implement
features).

Shutting down a server by accident means 30 minutes of downtime at
worst (none since we heavily use VMWare). Screwing up a class design
twice is the gift that keeps on giving.

I'm so sorry for you guys having to put up with `OrderSet` of doom.

Sorry guys.