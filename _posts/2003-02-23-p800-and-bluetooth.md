---
layout: post
title: P800 and Bluetooth
tags:
- Hardware
status: publish
type: post
published: true
meta: {}

---
I've just arrived at my office and tried out connecting to my P800 (see earlier posting) via Bluetooth. As the software underlying the SonyEricsson PC-Suite is the same as in the new Nokia PC-Suite (mRouter strikes back...), I suspected everything to nearly-work as usual.

I am using a Acer BT500 USB Bluetooth adaptor that comes with the usual widcomm software. Connecting to the P800 requires me to check the COM-Port that is assigned to the BT-Adaptor (<b>not</b> to the phone!) in the mRouter-Configuration. Then I open the COM-Port on the Phone with the Bluetooth.-Software on my PC. The Phone receives this request, closes the port again (results in an error-message on the PC) and then opens the COM-Port of the PC's BT-Adaptor.

Every now and then (about every second time), the mrouter-Software notifies this and opens the channel to the phone.

I heard that newer versions of the widcomm software can handle the way those Symbian Phones connect via Bluethooth without annoying me with error-message. I will check the Acer-Website if they have updated their driver but I don't really think they did...
