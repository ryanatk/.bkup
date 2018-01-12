#!/bin/bash

echo cd ~/git/heb
cd ~/git/heb

echo startoracle
startoracle
sleep 2s

echo ant start-endeca
ant start-endeca
# Or for running baseline indexing
#ant start-endeca-with-cas
sleep 3s

echo ant all
ant all
sleep 3s

echo ant update-env-schemas
ant update-env-schemas
sleep 3s

echo ant update-data
ant update-data
sleep 3s

echo ant update-test-data
ant update-test-data
sleep 3s

#echo ant import-application
#ant import-application
#sleep 3s

echo startatg
startatg
