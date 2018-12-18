#!/bin/bash

printf '\033]2;heb bounce\a'

echo cd ~/git/heb
cd ~/git/heb

echo ant all
ant all
sleep 3s

echo startatg
startatg

# ring the bell
tput bel
