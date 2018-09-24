#!/bin/bash

printf '\033]2;heb bounce\a'

echo cd ~/git/heb
cd ~/git/heb

echo ant -Dfrontend=false all
ant -Dfrontend=false all
sleep 3s

echo startatg
startatg
