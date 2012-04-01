---
layout: post
title: tempalias - validity limits
categories:
- admin
- Software
- tempalias
- update
- usage
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
I've just pushed a small update to tempalias.com that imposes some (generous) limits to the values you can provide for the validity:
<ul>
	<li>the maximum amount of days an alias can be valid is now <strong>60 days</strong>.</li>
	<li>the maximum amount of messages that can be sent to an aliases is now set to <strong>100 messages</strong>.</li>
</ul>
I realized that there might be some potential for abusing tempalias.com if the aliases have a practically unlimited duration. Besides, then they wouldn't be <strong>temp</strong>aliases any more. Right?

Already generated aliases with longer durations stay valid - true to the spirit of not looking into the data my users provided me with, I'm not going to check the existing aliases.
