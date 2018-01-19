#!/bin/bash

echo cd ~/git/heb
cd ~/git/heb

echo startoracle
startoracle
sleep 5s

echo ant start-endeca-with-cas
ant start-endeca-with-cas
sleep 10s

echo startatg
startatg
