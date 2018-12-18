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

### link to iterm preferences

```sh
ln -s ~/.bkup/dotfiles/iterm2/com.googlecode.iterm2.plist ~/Library/Preferences/com.googlecode.iterm2.plist
```
