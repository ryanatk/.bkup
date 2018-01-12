#!/bin/bash

echo cd ~/git/heb
cd ~/git/heb

echo startoracle
startoracle
sleep 3s

echo ant start-endeca
ant start-endeca
sleep 3s

echo startatg
startatg
