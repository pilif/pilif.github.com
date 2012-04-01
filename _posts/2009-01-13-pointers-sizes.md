---
layout: post
title: pointers, sizes
tags:
- Delphi
- funny
- Programming
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
Just a small remember for myself:

If
{% highlight delphi %}TMyRecord = record
  pointer1: pointer;
  pointer2: pointer;
  pointer3: pointer;
  pointer4: pointer
end;
PMyRecord = ^TMyRecord;{% endhighlight %}
then
{% highlight delphi %}  sizeof(TMyRecord) <> sizeof(PMyRecord){% endhighlight %}
So
{% highlight delphi %}
  var rec: PMyRecord;

  rec = AllocMem(sizeof(rec));
{% endhighlight %}
is probably <strong>not</strong> a sensible thing to do (at least not if you intend to actually put something into that space the pointer points to).

At least it began breaking very, very soonish and consistently once TMyRecord got enough members - too bad though that I first looked at the completely wrong space.

Nothing beats the joy of seeing a very non-localized access violation go away after two hours of debugging though.
