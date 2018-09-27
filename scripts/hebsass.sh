#!/bin/bash

printf '\033]2;heb sass\a'

echo cd ~/git/heb/modules/b2cStore
cd ~/git/heb/modules/b2cStore

echo ant minify-static-assets
ant minify-static-assets
sleep 3s

echo cd ~/git/heb
cd ~/git/heb

echo ant watch-css
ant watch-css
