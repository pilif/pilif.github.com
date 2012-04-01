---
layout: post
title: Backup with dirvish
categories: []

status: publish
type: post
published: true
meta: {}

---
<p>Using tape drives for your backups (in contrast to for example external hard drives) has some advantages and a whole lot of disadvantages which makes it impractical for me and a whole lot of other people:</p>
<ul>
  <li>There's (next to) no random access. Need a specific file? Often you have to restore the backup until that file is restored.</li>
  <li>Tapes are maintenance intensive: You have to clean the streamer, clean the tapes, store the tapes in specific environmental conditions and so on.</li>
  <li>Tapes are a slow medium. You won't get much more than 5-10 MB/s while writing to the tape.</li>
  <li>The inaccuracy of tapes makes a verify run something important if not absolutely needed to do.</li>
  <li>The equipment is expensive. Both tapes and streamer (or tape robots) cost quite some money.</li>
</ul>
<p>That's why I am using external hard drives for quite some time now. Granted, they have some serious disadvantages in long-livety (but they still outperform tapes not stored in said environmental conditions), but really important documents must be archived on a read-only medium anyways.</p>
<p>What harddisks provide you with is cheap storage, random access and the possibility to use common file system access tools to work with them.</p>
<p>External drives can be disconnected and stored at a different location from the backup machine and as they have a much larger capacity per medium than tape drives, you usually get away with one or two drives where you'd use many more tapes (at least in the affordable range of things).</p>
<p>If you need a pragmatic yet perfectly working and clever backup solution to fill up these external drives, I'd recommend <a href="http://www.dirvish.org/">dirvish</a></p>
<p>Dirvish uses existing tools like SSH and mainly rsync to create backups.</p>
<p>What I like most about it is it's functionality to create incremental backups by creating hardlinks to non-changed files (actually a feature of rsync).</p>
<p>That way, a initial backup of 22G can be incrementally backed up creating only 20M of more/different data here on my system I'm currently looking at.</p>
<p>This obviously depends on the type of data you are backing up and as the mechanism is file-based (it always operates on complete files), your savings won't be that good if you back up ever growing files like log files.</p>
<p>Still. For my use, dirvish does exactly what I want it to do and it does it very, very well. Perfect!</p>
<p>The tool creates backup sets as folders containing all the backed up files in their original structure. Restoring a specific file this is very, very easy.</p>
<p>To get you started, I would recommend you reading the <a href="http://edseek.com/~jasonb/articles/dirvish_backup/">dirvish HOWTO</a> by Jason Boxman - especially as dirvish uses sometimes not quite obvious terminology.</p>
