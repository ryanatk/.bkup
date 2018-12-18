#!/bin/bash

printf '\033]2;heb fix\a'

echo remove failed artifacts
rm ~/jboss/standalone/deployments/local_store_8080/*failed
sleep 3s

echo recreate-jboss-servers
ant recreate-jboss-servers
sleep 3s

echo startheb
startheb
