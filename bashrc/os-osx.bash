# osx specific settings
export NODE_PATH='usr/local/lib/node'
export firefox='/Applications/Firefox.app/Contents/MacOS/firefox'
export PATH="$HOME/local/node/bin:/usr/local/mysql/bin:/usr/local/sbin:$PATH:/Applications/Firefox.app/Contents/MacOS/"

# nginx
alias cnginx='cd /usr/local/etc/nginx'
alias ngrestart='sudo nginx -s stop; sudo nginx'

# mac applications
alias mou='open -a Mou'
alias mvim='/Applications/MacVim.app/Contents/MacOS/Vim -g -p --remote-tab-silent'
alias mvimsplit='/Applications/MacVim.app/Contents/MacOS/Vim -g -o --remote-tab-silent'

# Finder - Hidden Files
alias show-hidden-files='defaults write com.apple.finder AppleShowAllFiles TRUE; killall -KILL Finder'
alias hide-hidden-files='defaults write com.apple.finder AppleShowAllFiles FALSE; killall -KILL Finder'

# Add whitespace to the mac dock
alias dockSpace='(defaults write com.apple.dock persistent-apps -array-add "{tile-data={}; tile-type=\"spacer-tile\";}"; killall Dock)'

# VirtualBox
alias ie7update='rm -rf ~/.ievms/IE7* ~/VirtualBox\ VMs/IE7\ -\ WinXP/; curl -s https://raw.github.com/xdissent/ievms/master/ievms.sh | env IEVMS_VERSIONS="7" bash'
