#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var execSync = require('child_process').execSync;
var exec = require('child_process').exec;

// setup zeta dir & git repos

var home = '/Users/$USER';
var zeta = path.join(home, 'zeta');
fs.symlink(zeta, path.join(home, 'workspace'));
var frontends = path.join(zeta, 'frontends');
var clone = function (name, url, isFrontend) {
  exec('git clone ' + url + ' ' + path.join(zeta, name), function (error){
    if (error)
      console.log(error);
    if (isFrontend)
      fs.symlink(path.join(zeta, name, 'frontend'), path.join(frontends, name));
  });
};

console.log('');
console.log('Setting up Zeta Environment');
console.log('');

exec('mkdir ' + zeta + '; cd ' + zeta, function (error) {
  if (error) { console.log(error); }
  exec('mkdir ' + frontends, function (error) {
    if (error) { console.log(error); }
    clone('Atlas', 'git@github01.zappos.net:SearchTeam/Atlas.git');
    clone('Helios', 'git@github01.zappos.net:SearchTeam/Helios.git');
    clone('abu', 'git@github01.zappos.net:Goldcopy/Abu.git', true);
    clone('ads', 'git@github01.zappos.net:ratkinson/ads.git');
    clone('broadway', 'git@github01.zappos.net:Broadway/broadway.git');
    clone('dev-properties', 'git@github01.zappos.net:Omega/dev-properties.git');
    clone('drupal', 'git@github.zappos.net:github/drupal.git');
    clone('hamlet', 'git@github01.zappos.net:Goldcopy/hamlet.git', true);
    clone('kirk', 'git@github01.zappos.net:Goldcopy/kirk.git', true);
    clone('pinot', 'git@github.zappos.net:github/Pinot.git', true);
    clone('pixel-server', 'git@github01.zappos.net:ratkinson/pixel-server.git');
    clone('qa-properties', 'git@github.zappos.net:integration/qa-properties.git');
    clone('sahara', 'git@github.zappos.net:github/sahara.git', true);
    clone('solr', 'git@github01.zappos.net:SearchTeam/solr.git');
    clone('spock', 'git@github01.zappos.net:Journey/spock.git');
    clone('tater', 'git@github.zappos.net:github/tater.git', true);
    clone('thor', 'git@github01.zappos.net:Goldcopy/thor.git', true);
    clone('tot', 'git@github.zappos.net:github/tot.git');
    clone('valhalla', 'git@github01.zappos.net:Goldcopy/valhalla.git');
  });
});
