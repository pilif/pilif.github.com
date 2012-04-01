---
layout: post
title: OSX and OpenLDAP
tags:
- Mac
- Unix
status: publish
type: post
published: true
meta: {}

---
Finally. It works. I got Richard's OSX-Box to authenticate against my OpenLDAP server, I set up yesterday (acutually, it authenticates against the replica but this does not make any difference). Here's what I did:<ol>
 <li>As I have the <tt>homeDirectory</tt> attribute in the form <tt>/home/username</tt>, and Mac OS X has the users in <tt>/Users/username</tt>, I actually have two ways to fix this: a) add another attribute to the LDAP-Server called osxHomeDirecotry or something like that. This was no alternative as I don't have an enterprise number yet so I could not legally create an OID for such an attribute. b) symlink /home to /Users. That's what I did.
 <li>Now I started the "Directory Access" Utility in the <tt>Application/Utilities</tt> folder.
 <li>I've removed the checkmark on LDAPv2, selected LDAPv3 and clicked on "configure"
 <li>The next step was to remove the checkmark "Use DHCP supplied LDAP-Server" as my DHCP-Server does not supply an LDAP server (and I don't even know which option-code that would be on the DHCP-Server).
 <li>Now I've clicked on the "more"-Arrow to display the advanced settings where I've entered the hostname of the internal (replica) LDAP-Server. In LDAP Mappings, I've selected "Custom", the SSL-Checkbox stayed un-checked after my un-successful tries to get OpenLDAP to use my self-signed certificate yesterday. I'll get back to this as before I get productive with my setup.
 <li>In the new dialog that popped up, I had to make some adjustments:

(In my explanations, I assume, your accounts have objectClasses of <tt>inetOrgPerson</tt>, <tt>posixAccount</tt> and <tt>shadowAccount</tt>).
 <ol>
   <li>Under "Users", set the RecordName to "uid"
   <li>I had to add a Record called "Group" to Users and assign "primaryUID" to it or the group of the user was not recognized (see the prior entry to this blog)
   <li>Under "Group" add the RecordName-Attribute and assign cn to it or the Group was not recognized later on.
</ol>

 <li>Now close the dialog by hitting "OK" and then close the Next dialog too with "OK"
 <li>Now select the "Authentication"-Tab and chose a "Custom" search path. Add your newly added LDAP-Server.
 <li>Do the same with the Contacts-Tab - although I have not yet figured out how to get this to work.
 <li>Hit "Apply"
 <li>Reboot
</ol>The last step is very annoying: I had to experiment quite a bit with the mapping settings to finally get my LDAP-Groups recognized and get the right primary group assigned to LDAP-Users (it was always 0/wheel which is not what I wanted - not at all). There is no way to get the OS to recognize changes you make in the Direcotry Access Utility but to reboot the machine. I'm happy, OSX boots that fast. If it had been windows I'd stell be wating for the reboots to complete ;-)

<b>What have I accomplished?</b><ul>
  <li>I can login with the LDAP-Accounts be selecting "other" in the Login-Screen and then entering username and password
  <li>I can <tt>su</tt> to any LDAP-Account
</ul><b>What still does not work:</b><ul>
   <li><tt>passwd</tt>
   <li>Although I can set a new password in the system preferences, the changes do not get written back to the LDAP-Server
</ul>

About the password-changing-problems, I will have a look at pam. Until then, I'm quite happy, I finally got it to work.

I really hope, someone will find this useful...
