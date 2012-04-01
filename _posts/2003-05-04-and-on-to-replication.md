---
layout: post
title: And on to replication
categories:
- Free Software
- Unix
status: publish
type: post
published: true
meta: {}

---
The show must go on. As our ADSL connection from the office to the internet is not that reliable, I deceided to use <a href="http://www.openldap.org">OpenLDAP</a>s <tt>slurpd</tt> to replicate the LDAP tree to an internal LDAP-Server. The setup is quite well described in my LDAP-Book and it did work at the first time I tried it.

At least it sort of worked...

Although changed attributes appeared on the replica, a newly created user was not synchronized. There was no reject on the master either - the data just vanished [sidenote: why is there a replication-rejectlog if data can vanish anyway - this is not reliable behaviour at all].

Reading the syslog finally gave me the idea: The permissions of the replicas data directory where not set correctly: some of the files (and the directory istelf) belonged to <tt>root.root</tt> while <tt>slapd</tt> was running as <tt>slapd.slapd</tt>.

Now it's working like a charm and I am looking forward to trying to authenticate richards mac against the internal LDAP-Server.

When this works, I'm going to finally convert the SAMBA-installation to a PDC and setup something to synchronize the windows-password with the unix one (both in LDAP - of course).

I'll keep you updated on my progress...
