---
layout: post
title: why I don't touch crypo
categories:
- opinion
tags:
- programming
- opinion
status: publish
type: post
published: true
---

When doing our work as programmers, we screw up. Small bugs, big bugs,
lazyness - the possibilties are endless.

Usually, when we screw up, we know that immediately: We get a failing
test, we get an exception logged somewhere, or we hear from our users
that such and such feature doesn't work.

Also, most of the time, no matter how bad the bug, the issue can be
worked around and the application keeps working overall.

Once you found the bug, you fix it and everybody is happy.

But imagine you had one of these off-by-one errors in your code (those
that constantly happen to all of us) and further imagine that the
function where the error was in was still apparently producing the same
output as if the error wasn't there.

Imagine that because of that error the apparently correctly looking
output is completely useless and your whole application has just now
utterly broken.

That's crypto for you.

Crypto can't be a «bit broken». It can't be «mostly working». Either
it's 100% correct, or you shouldn't have bothered doing it at all. The
weakest link breaks the whole chain.

Worse: looking at the data you are working with doesn't show any sign
of wrongness when you look at it. You encrypt something, you see random
data. You decrypt it, you see clear text. Seems to work fine. Right!
Right?

Last week's [issue in the random number generator](http://nakedsecurity.sophos.com/2013/07/09/anatomy-of-a-pseudorandom-number-generator-visualising-cryptocats-buggy-prng/) in cryprocat is a very good example.

The bug was an off-by-one error in their random number generator. The
output of the function was still random numbers, looking at the output
would clearly show random numbers. Given that fact, the natural bias
for seeing code as being correct is only reinforced.

But yet it was wrong. The bug was there and the random numbers weren't
really random (enough).

The weakest link was broken, the whole effort in security practically
pointless, which is even worse in this case of an application whose
only purpose is, you know, security.

Security wasn't just an added feature to some other core functionality.
It *was* the core functionality.

That small off-by-one error has completely broken the whole application
and was completely unnoticable by just looking at the produced output.
Writing a testcase for this would have required complicated thinking
and coding which would be as likely to contain an error as it was
likely for the code to be tested to contain an error.

This, my friends, is why I keep my hands off crypto. I'm just plain not
good enough. Crypto is a world where understanding the concepts,
understanding the math and writing tests just isn't good enough.

The goal you *have* to reach is perfection. If you fail to reach that,
than you have failed utterly.

Crypto is something I leave to others to deal with. Either they have
reached perfection at which point they have my utmost respect. Or they
fail at which point they have my understanding.
