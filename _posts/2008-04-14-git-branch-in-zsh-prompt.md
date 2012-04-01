---
layout: post
title: git branch in ZSH prompt
categories:
- git
- solution
- Solutions
- Unix
- zsh
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
<p style="padding-top: 20px !important">
<img src="http://www.gnegg.ch/wp-content/uploads/2008/04/gitprompt.png" alt="Screenshot of the terminal showing the current git branch" title="git prompt" width="365" height="36" class="aligncenter size-full wp-image-400" />
</p>

Today, I came across a little trick on how to <a href="http://unboundimagination.com/Current-Git-Branch-in-Bash-Prompt">output the current git branch on your bash prompt</a>. This is very useful, but not as much for me as <a href="http://www.gnegg.ch/2005/04/praise-to-zsh/">I'm using ZSH</a>. Of course, I wanted to adapt the method (and to use fewer backslashes :-) ).

Also, in my setup, I'm making use of ZSH's prompt themes feature of which I've chosen the theme "adam1". So let's use that as a starting point.
<ol>
	<li>First, create a copy of the prompt theme into a directory of your control where you intend to store private ZSH functions (~/zshfuncs in my case).
{% highlight bash %}cp /usr/share/zsh/4.3.4/functions/prompt_adam1_setup ~/zshfuncs/prompt_pilif_setup{% endhighlight %}
</li>
	<li>Tweak the file. I've adapted the prompt from the original article, but I've managed to get rid of all the backslashes (to actually make the regex readable) and to place it nicely in the adam1 prompt framework.</li>
	<li>Advise ZSH about the new ZSH function directory (if you haven't already done so). {% highlight bash %}fpath=(~/zshfunc $fpath){% endhighlight %}</li>
	<li>Load your new prompt theme. {% highlight bash %}prompt pilif{% endhighlight %}</li>
</ol>
And here's the adapted adam1 prompt theme:

{% highlight bash %}
# pilif prompt theme

prompt_pilif_help () {
  cat <<'EOF'
This prompt is color-scheme-able.  You can invoke it thus:

  prompt pilif [<color1> [<color2> [<color3>]]]

This is heavily based on adam1 which is distributed with ZSH. In fact,
the only change from adam1 is support for displaying the current branch
of your git repository (if you are in one)
EOF
}

prompt_pilif_setup () {
  prompt_adam1_color1=${1:-'blue'}
  prompt_adam1_color2=${2:-'cyan'}
  prompt_adam1_color3=${3:-'green'}

  base_prompt="%{$bg_no_bold[$prompt_adam1_color1]%}%n@%m%{$reset_color%} "
  post_prompt="%{$reset_color%}"

  base_prompt_no_color=$(echo "$base_prompt" | perl -pe "s/%{.*?%}//g")
  post_prompt_no_color=$(echo "$post_prompt" | perl -pe "s/%{.*?%}//g")

  precmd  () { prompt_pilif_precmd }
  preexec () { }
}

prompt_pilif_precmd () {
  setopt noxtrace localoptions
  local base_prompt_expanded_no_color base_prompt_etc
  local prompt_length space_left
  local git_branch

  git_branch=`git branch 2>/dev/null | grep -e '^*' | sed -E 's/^\* (.+)$/(\1) /'`
  base_prompt_expanded_no_color=$(print -P "$base_prompt_no_color")
  base_prompt_etc=$(print -P "$base_prompt%(4~|...|)%3~")
  prompt_length=${#base_prompt_etc}
  if [[ $prompt_length -lt 40 ]]; then
    path_prompt="%{$fg_bold[$prompt_adam1_color2]%}%(4~|...|)%3~%{$fg_bold[white]%}$git_branch"
  else
    space_left=$(( $COLUMNS - $#base_prompt_expanded_no_color - 2 ))
    path_prompt="%{$fg_bold[$prompt_adam1_color3]%}%${space_left}<...<%~ %{$reset_color%}$git_branch%{$fg_bold[$prompt_adam1_color3]%} $prompt_newline%{$fg_bold_white%}"
  fi

  PS1="$base_prompt$path_prompt %# $post_prompt"
  PS2="$base_prompt$path_prompt %_&gt; $post_prompt"
  PS3="$base_prompt$path_prompt ?# $post_prompt"
}

prompt_pilif_setup "$@"
{% endhighlight %}
The theme file can be downloaded <a href="http://www.lipfi.ch/prompt_pilif_setup">here</a>
