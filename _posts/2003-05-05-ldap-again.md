---
layout: post
title: LDAP again...
categories:
- Free Software
- Unix
status: publish
type: post
published: true
meta: {}

---
I know... it's getting boring...

I just wanted to say that I've sucessfully fixed two problems:

<ol>
 <li>I had a problem where <tt>passwd</tt> immediatly failed one another server I just LDAPed:
<pre>pilif@sen1 ~ % passwd
LDAP Password incorrect
passwd: User not known to the underlying authentication module
pilif@sen1 ~ %</pre>
 The problem was a <tt>use_first_pass</tt> I had in the pam_ldap-line of <tt>/etc/pam.d/passwd</tt>. When changing the password, it checked the authentity with an empty password (first_pass was empty - I never ever entered one) which failed. If somebody could please tell me the log level to set in slapd.conf to actually get useful logging information describing the problem: step forward!
 <li>You have to set <tt>rootbinddn</tt> in you (pam|nss)_ldap configuration file. This will enable <tt>root</tt> to change a users password without having to know it first.
</ol>

Oh.. both updatedn and updateref where not correctly set in the replicas slapd.conf. I've fixed this too.
