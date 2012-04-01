---
layout: post
title: Dynamic object creation in Delphi
categories:
- delphi factory instance programming
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
In a quite well-known pattern, you have a certain amount of classes, all inheriting from a common base and you have a factory that creates instances of these classes. Now let's go further ahead and assume that the factory will have no knowledge of what classes will be available at run-time.

Each of this classes registers itself at run-time depending on a certain condition and then the factory will create instances depending on that registration.

This post is about how to do this in Delphi. Remember that this sample is very much abstracted and the real-world application is quite a bit more complex, but this sample should be enough to demonstrate the point.

Let's say, we have these classes:
{% highlight Delphi %}
type
  TJob = class(TObject)
    public
      constructor Create;
  end;

  TJobA = class(TJob)
    public
      constructor Create;
  end;

  TJobB = class(TJob)
    public
      constructor Create;
  end;

  TJobAA = class(TJobA)
    public
      constructor Create;
  end;
{% endhighlight %}
Each of these constructors does something to initialize the instance and thus calls its parent using 'inherited'.

Now, let's further assume that we have a Job-Repository that stores a list of available jobs:
{% highlight Delphi %}
type
  TJobRepository = class(TObject)
    private
      FAvailableJobs: TList;
    public
      procedure registerJob(cls: TClass);
      function getJob(Index: Integer): TClass;
   end;
{% endhighlight %}
Now we can register our jobs
{% highlight Delphi %}
   rep = TJobRepository.Create;
   if condition then
     rep.RegisterJob(TJobAA);
   if condition2 then
     rep.RegisterJob(TJobB);
{% endhighlight %}
and so on. Now at runtime, depending on some condition, we will instantiate any of these registered jobs. This is how we'd do that:
{% highlight Delphi %}  job = rep.getJob(0).Create; {% endhighlight %}
Sounds easy. But this doesn't work.

job in this example will be of type TJobAA (good), but its constructor will not be called (bad). The solution is to
<ol>
	<li>Declare the constructor of TJob as being virtual.</li>
	<li>Create a Meta-Class for TJob, because the Constructor of TObject is NOT virtual, to when you dynamically instantiate an object from a TClass only the constructor of TObject will be called.</li>
	<li>Override the inherited virtual constructor.</li>
</ol>
So in code, it looks like this:
<pre>type
  TJobClass = class of TJob;
  TJob = class(TObject)
   public
    constructor Create; <strong>virtual;</strong>
  end;

  TJobA = class(TJob)
    public
      constructor Create; <strong>override;</strong>
    end;

TJobAA = class(TJobA)
    public
      constructor Create; <strong>override;</strong>
    end;

TJobRepository = class(TObject)
    private
      FAvailableJobs: TList;
    public
      procedure registerJob(cls: TClass);
      function getJob(Index: Integer): T<strong>Job</strong>Class;
   end
</pre>

This way, Delphi knows that when you call

{% highlight delphi %}  job = rep.getJob(0).Create; {% endhighlight %}

that you are creating an instance of a TJobAA object which has a constructor that overrides the virtual Constructor of TJob by the virtue that the Class of TJobAA is a class of TJob.

Personally, I would have assumed that this just works without the need of declaring the Meta-Class and the trickery with the need to explicitly declare the constructor as virtual. But seeing that Delphi is a compiled static language, actually, I'm happy that this works at all.
