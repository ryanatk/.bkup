# echo main.bash

# command line stuff
alias ls='ls -G'
alias ll='ls -alF'
alias la='ls -A'
alias lc='ls -CF'
alias fin='find -L . -name'

# grep stuff
export GREP_OPTIONS='--color=auto'
export GREP_COLORS='fn=16'
alias gr='fgrep -R -I -n --exclude-dir=public --exclude-dir=dist --exclude-dir=build --exclude-dir=logs --exclude-dir=reports --exclude-dir=coverage --exclude-dir=node_modules --exclude-dir=docs --exclude=package-lock.json'

# vim stuff
export EDITOR=vim
set -o vi
alias vim='vim -p'

# git command aliases
alias gdb='git branch -D'
alias gbd='git branch -D'
alias gchange='git whatchanged -p -w --'
alias gcb='git checkout -b'
alias gco='git checkout'
alias gcom='git commit'
alias gcoma='git commit -a'
alias gdev='git checkout develop && git pull'
alias gf='git fetch'
alias gfetch='git fetch'
alias glog='git log'
alias glp='git log -p'
alias go='git open'
alias gpr='gpush && go'
alias gpull='git pull'
alias gpush='git push -u origin HEAD'
alias gst='git status'
alias guncom='git reset --soft HEAD~1'

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

# function to set terminal tab title
term() {
  echo "set terminal title: $@"
  printf "\033]2;$@\a"
}
