---
layout: post
title: Copying with MOVE? Moving with copy?
tags:
- Delphi
- Programming
status: publish
type: post
published: true
meta: {}

---
<p>
Today I came across the situation where I had to copy - using delphi - some chunck of memory from one place to another. I nevery did that before (using OOP techniques gets you around that most of the time - at least in Delphi), so I had no idea how to do it. What I knew is that in C, I'd do that with <tt>memcpy</tt>. As a convinced fan of Pascals intuitive API notation, I looked in the help for <tt>MemCopy</tt> or <tt>CopyMem</tt>. Nothing (which is strange, considering things like <tt>AllocMem</tt> actually exist).
</p>
<p>Some googling around turned out the name of the function: it's</p>
<pre class="code"><strong>procedure</strong> <font color="#2040a0">Move</font><font color="4444FF">(</font><strong>const</strong> <font color="#2040a0">Source</font><font color="4444FF">;</font> <strong>var</strong> <font color="#2040a0">Dest</font><font color="4444FF">;</font> <font color="#2040a0">Count</font><font color="4444FF">:</font> <font color="#2040a0">Integer</font><font color="4444FF">)</font><font color="4444FF">;</font></pre>
<p>Move? That can't be. Can it? I want to copy, not to move. A quick glance at the help file revealed that it's the truth: Move actually copies...</p>
<blockquote>Move copies Count bytes from Source to Dest. No range checking is performed. Move compensates for overlaps between the source and destination blocks.</blockquote>
<p>Descriptive procedure names? Usually, yes. But this can only be described as way beyond the optimum ;-)</p>
<p>Oh... on another note: What do you think, <tt>Copy</tt> does? Copying memory? No way:</p>
<pre class="code">
<strong>function</strong> <font color="#2040a0">Copy</font><font color="4444FF">(</font><font color="#2040a0">S</font><font color="4444FF">;</font> <font color="#2040a0">Index</font>, <font color="#2040a0">Count</font><font color="4444FF">:</font> <font color="#2040a0">Integer</font><font color="4444FF">)</font><font color="4444FF">:</font> <font color="#2040a0">string</font><font color="4444FF">;</font>

<strong>function</strong> <font color="#2040a0">Copy</font><font color="4444FF">(</font><font color="#2040a0">S</font><font color="4444FF">;</font> <font color="#2040a0">Index</font>, <font color="#2040a0">Count</font><font color="4444FF">:</font> <font color="#2040a0">Integer</font><font color="4444FF">)</font><font color="4444FF">:</font> <strong>array</strong><font color="4444FF">;</font></pre>
<blockquote>
S is an expression of a string or dynamic-array type. Index and Count are integer-type expressions. Copy returns a substring or subarray containing Count characters or elements starting at S[Index]. The substring or subarray is a unique copy (that is, it does not share memory with S, although if the elements of the array are pointers or objects, these are not copied as well.)

If Index is larger than the length of S, Copy returns an empty string or array.

If Count specifies more characters or array elements than are available, only the characters or elements from S[Index] to the end of S are returned.</blockquote>
<p>Yeah!. Right.</p>
<p>Oh and on second thought: The move-thing may have its roots in the assembler language, where <tt>MOV</tt> actually copies the data too - at least I think so. But anyway: If even C got it right, why has my beloved Pascal to fail in such an easy case?</p>
