# enable the default zsh completions!
autoload -Uz compinit && compinit
source ~/.bkup/dotfiles/git-prompt.sh

setopt prompt_subst
#RPROMPT=$'$(__git_ps1 "%s")'
RPROMPT='%n@%m'

#PROMPT='%F{yellow}%n%f %~ $ '
#PROMPT='%F{yellow}%n%f %~ %F{yellow}$(__git_ps1 "%s")%f $ '
#PROMPT='%F{yellow}%n%f $(__git_ps1 "%s") $ '
PROMPT='%B%~%b%F{yellow}$(__git_ps1)%f %# '

source ~/.bash_profile
