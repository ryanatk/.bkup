# echo main.bash

# command line stuff
alias ls='ls -G'
alias ll='ls -alF'
alias la='ls -A'
alias lc='ls -CF'
alias fin='find -L . -name'
alias fuckjava='killall -9 java'

# grep stuff
export GREP_OPTIONS='--color=auto'
export GREP_COLORS='fn=16'
alias gr='fgrep -R -I -n --exclude-dir=build --exclude-dir=logs --exclude-dir=node_modules --exclude=*.log'

# vim stuff
export EDITOR=vim
set -o vi
alias vim='vim -p'
alias vgr='vim -p `fgrep -R -l --exclude-dir=node_modules --exclude=*.log --exclude=*.p.* $1 *`'
#this doesnt work. make it work.

# Git tab completion
source ~/.git-completion.sh
source ~/.git-prompt.sh
export GIT_PS1_SHOWDIRTYSTATE=true
export GIT_PS1_SHOWSTASHSTATE=true
export GIT_PS1_SHOWUNTRACKEDFILES=true
PS1='\[\033[1;33m\]\u\[\033[0m\]@\[\033[1;33m\]$profile_name \[\033[0m\]\w\[\033[1;33m\]$(__git_ps1 " %s")\[\033[0m\] \$ '

# git command aliases
alias gst='git status'
alias gchange='git whatchanged -p --'
alias gdiff='git diff -w origin/master...HEAD'
alias gcom='git commit'
alias gcoma='git commit -a'
alias gco='git checkout'
alias gcob='git checkout -b'
alias gpush='git push origin HEAD'
alias gpull='git pull'
alias go='git open'
alias gcp='git cherry-pick'
alias gl='git log'
alias glp='git log -p'

# file location shortcuts
alias ehosts='sudo vi /etc/hosts'
alias ebash='vim ~/.bashrc'
alias ebashes='vim ~/.bkup/dotfiles/bashrc/'
alias rbash='. ~/.bash_profile'
alias evimrc='vim ~/.vimrc'
alias cweb='cd ~/web'
alias cdot='cd ~/.bkup/dotfiles'
alias ..='cd ..'
alias ...='cd ../..'

# ssh
alias sshryanatk='ssh root@198.199.114.117'

# aws
# curl -O https://s3.amazonaws.com/zappos-aws-workshop/aws.zip; unzip aws.zip; rm aws.zip; mv aws ~/.aws
export AWS_CONFIG_FILE=~/.aws/aws_config_file
export EC2_HOME=~/.aws/ec2-api-tools-1.6.7.1
export PATH=$PATH:$EC2_HOME/bin:~/.aws/AWS-ElasticBeanstalk-CLI-2.3.1/eb/macosx/python2.7

# function to set terminal tab title
term() {
  echo "set terminal title: $@"
  printf "\033]2;$@\a"
}
