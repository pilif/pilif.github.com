---
layout: post
title: Joining Debian to ActiveDirectory
categories:
- samba
- debian
- linux
- sysadmin
tags:
- samba
- debian
- linux
- sysadmin
status: publish
type: post
published: true
---

This blog post is a small list of magic incantations and to be issued and animals to be sacrificed in order to join a Unix machine (Debian in this case) to a (samba-powered) ActiveDirectory domain.

All of these things have to be set up correctly or you will suffer eternal damnation in non-related-error-message hell:

* Make absolutely sure that DNS works correctly
    - the new member server's hostname must be in the DNS domain of the AD Domain
    - This absolutely includes reverse lookups.
    - Same goes for the domain controller. Again: Absolutely make sure that you set up a correct PTR record for your domain controller or you will suffer the curse of `GSSAPI Error: Unspecified GSS failure.  Minor code may provide more information (Server not found in Kerberos database)`
* Disable IPv6 everywhere. I normally always advocate against disabling IPv6 in order to solve problems and instead just solve the problem, but [bugs exist](https://lists.samba.org/archive/samba/2014-January/177987.html). Failing to disable IPv6 on either the server or the client will also cause you to suffer in `Server not found in Kerberos database` hell.
* If you made previous attempts to join your member server, even when you later left the domain again, there's probably a lingering host-name added by a previous dns update attempt. If that exists, your member server will be in `ERROR_DNS_UPDATE_FAILED` hell even if DNS is configured correctly.
    - In order to check, use `samba-tool` on the domain controller `samba-tool dns query your.dc.ip.address your.domain.name memberservername ALL`
    - If there's a hostname, get rid of it using `samba-tool dns delete your.dc.ip.address your.domain.name memberservername A ip.returned.above`
* make sure that the TLS certificate served by your AD server is trusted, either directly or chained to a trusted root. If you're using a self-signed root (you're probably doing that), add the root as a PEM-File (but with `.crt` extension!) to `/usr/local/share/ca-certificates/` ad run `/usr/sbin/update-ca-certificates`. If you fail to do this correctly, you will suffer in `ldap_sasl_interactive_bind_s: Can't contact LDAP server (-1)` hell (no. Nothing will inform you of a certificate error - all you get is `can't connect`)
* In order to check that everything is set up correctly, before even trying `realmd` or `sssd`, use ldapsearch: `ldapsearch -H ldap://your.dc.host/ -Y GSSAPI -N -b "dc=your,dc=base,dc=dn" "(objectClass=user)"`
* Aside of all that, you can [follow this guide](http://www.alandmoore.com/blog/2015/05/06/joining-debian-8-to-active-directory/), but also make sure that you manually install the `krb5-user` package. The debian package database has a missing dependency, so the package doesn't get pulled in even though it is required.

All in all, this was a really bad case of [XKCD 979](https://xkcd.com/979/) and in case you ask yourself whether I'm bitter, then let me tell you, that yes. I am bitter.

I can totally see that there are a ton of moving parts involved in this and I'm willing to nudge some of these parts in order to get the engine up and running. But it would definitely help if the various tools involved would give me meaningful log output. samba on the domain controller doesn't log, `tcpdump` is pointless thanks to SSL everywhere, `realmd` fails silently while still saying that everything is ok (also, it's unconditionally removing the config files it feeds into the various moving parts involved, so good luck trying to debug this),  `sssd` emits cryptic error messages (see above) and so on.

Anyways. I'm just happy I go this working and now for reproducing it one more time, but this time recording everything in Ansible.
