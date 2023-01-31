# osx specific settings
export NODE_PATH='usr/local/lib/node'
export firefox='/Applications/Firefox.app/Contents/MacOS/firefox'
export PATH="$HOME/.node_modules/bin:/Applications/Visual Studio Code.app/Contents/Resources/app/bin:$PATH"

# iterm2 tab name
precmd() {
  echo -ne "\e]1;${PWD##*/}\a"
}

# update keychain password
alias keychain='sudo security set-keychain-password'

# find my ip
alias myip='ipconfig getifaddr en0'
alias myipwireless='ipconfig getifaddr en1'

# Finder - Hidden Files
alias show-hidden-files='defaults write com.apple.finder AppleShowAllFiles TRUE; killall -KILL Finder'
alias hide-hidden-files='defaults write com.apple.finder AppleShowAllFiles FALSE; killall -KILL Finder'

# Add whitespace to the mac dock
alias dockSpace='(defaults write com.apple.dock persistent-apps -array-add "{tile-data={}; tile-type=\"spacer-tile\";}"; killall Dock)'

