# Installation

### clone the repo into home directory

```sh
cd ~
git clone git@github.com:ryanatk/.bkup.git
```

### create `.bashrc` based on what preferences you want to load, and reload it

```sh
vim ~/.bashrc
source ~/.bashrc
```

example content

```bash
#!/bin/bash

profile_name="zappos"
os="osx"
```

### link to .bash_profile, and reload it

```sh
ln -s .bkup/dotfiles/bash_profile ~/.bash_profile
source ~/.bash_profile
```

### link to vimrc

```sh
ln -s .bkup/dotfiles/vimrc ~/.vimrc
```

### install iTerm

[iTerm2](https://www.iterm2.com/downloads.html)

### link to iterm preferences

```sh
ln -s ~/.bkup/dotfiles/iterm2/com.googlecode.iterm2.plist ~/Library/Preferences/com.googlecode.iterm2.plist
```

_This does not work yet. Fix it._

### install VS Code

[VS Code](https://code.visualstudio.com/download)

### setup VS Code settings & extensions

```sh
ln -s ~/.bkup/dotfiles/vscode/User ~/Library/Application\ Support/Code/User
ln -s ~/.bkup/dotfiles/vscode/extensions ~/.vscode/extensions
defaults write com.microsoft.VSCode ApplePressAndHoldEnabled -bool false
```

### install node

[download node](https://nodejs.org/en/)

### install git-open

```sh
npm install --global git-open
```
