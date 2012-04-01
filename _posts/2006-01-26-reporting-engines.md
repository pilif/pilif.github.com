---
layout: post
title: Reporting Engines
categories:
- Delphi
status: publish
type: post
published: true
meta: {}

---
<p>There are quite many solutions available to you if you want to create printed (or PDFed) reports from your delphi application, but surprisingly, one one is really convincing.</p>
<p>The so called professional solutions like Crystal Reports or List&Label are very expensive, require a large runtime to be deployed and may even require you as the developer to pay royalties per delivered client</p>
<p>So for my particular problem, the only solution was to use a VCL based engine that can be compiled into the exe and does not need any additional components to be deployed.</p>
<p>Years ago, I was told to use <a href="http://www.digital-metaphors.com">ReportBuilder</a> and maybe people were even right there: Quick Reports (as in included into delphi back then) had and still has a very bad reputation, and RB was the only other VCL based product available</p>
<p>RB has some problems though. Lacking Delphi 2006 support, limited report templates, field formating on the database access layer and last but not least: A nasty bug preventing barcodes from being correctly rendered to PDF-Files.</p>
<p>Then, I had a look at <a href="http://www.fast-report.com">Fast Report</a> and I tell you: That piece of software is perfect!</p>
<p>Granted, switching will come with a bit of work, though the paradigms of both engines kinda match. But once you've done the stupid rebuilding of the old templates, you'll notice how wonderful Fast Report actually is. And you will notice immediately as it's very, very intuitive to use - compared to RB. Things that required custom programming or even a little hacking here and ther in RB just work in FR. And they even work without forcing you to read through lots of documentation in advance</p>
<p>And everything - just everything is in the report template. Number formats, even small scripts for changing the report in subtle ways while it's being printed. Just perfect for what I was doing.</p>
<p>So, if you are looking for a nice, powerful really easy to  use reporting enginet that can be fully compiled into your EXE, you should really go with FR. It even costs less than RB.</p>
