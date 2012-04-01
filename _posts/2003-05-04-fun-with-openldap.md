---
layout: post
title: Fun with OpenLDAP
categories:
- Books
- Free Software
- Unix
status: publish
type: post
published: true
meta: {}

---
I bought "<a href="http://www.oreilly.com/catalog/ldapsa/">LDAP System Administration</a>" because I was interested in LDAP for a long time and I never really understood what one could do with it.

While the reading book is great (it lacks some details here and there, but it's really nice to read and has very understandable explanations), putting it to work wasn't:

What I want to acomplish is to have a central user-database for our 3 people company: Two Windows PC's, one Linux-Router, a Mac OS X workstation, 3 Linux-Servers, my Home-PC - I want to be able to log into all of them with my one password I have in the LDAP-Server. That's what LDAP is for anyway.

Setting up the server was done in no time (although it required some sweat because I first installed the <a href="http://www.openldap.org">OpenLDAP</a> Server of debian stable but then deceided to upgrade to the current release (debian is lagging like ever) by using the server from the unstable distribution. I got it to install eventually (after purging the former installation that caused the update-script of the new installation to quit beacuse ldap-utils where not installed [side note: if a packages installation script requires tools from another package: why isn't this dependency marked in the package?]).

Soon I've created my test-account, installed nss_ldap and pam_ldap and it seemd to work.

Actually it crashed my SSH-daemon as soon as I tried to log on to the machine, I could not change the password of LDAP-accounts, su did not work and login was not possible either - despite the fact I was following the clear instructions in the LDAP-Book.

The SSH-Problem got solved by updating to the latest version (uncommenting the LDAP-Support for groups in <tt>/etc/nsswitch.conf</tt> did help with the older version but this was no alternative. <tt>su</tt>ing eventually began to work without me really changing anything, changing the password required me to edit <tt>/etc/pam.d/passwd</tt> despite the fact that the in-file documentation of that file states that it is not necessary. Just like the <tt>su</tt>-problem, the one with login went away eventually.

<tt>/bin/passwd</tt> requires still requires me to enter the users old password when called as root. Stupid, but can be circumvented by using a LDAP-Admin-Tool. <tt>chsh</tt> authenticates via PAM and gets the current entries correctly but tries to save back to <tt>/etc/passwd</tt>. As stupid as the thing with <tt>passwd</tt>

So the adventure is not even half completed but a day is used and I had to fight problems which are not even supposed to be existing...

Is what I am trying to do really that sophisticated that it sinply does not work? Or am I just plain stupid?

I'll keep you updated...
