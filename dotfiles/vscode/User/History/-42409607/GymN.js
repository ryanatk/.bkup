const { execSync } = require('child_process');
const { writeFileSync } = require('fs');
const { join } = require('path');
const dayjs = require('dayjs');
const { version } = require('../package.json');

const cmd = (command) => execSync(command, { encoding: 'utf8' });

//   BUILD INFO
const build = {
  time: dayjs().format('MMM D, YYYY HH:mm:ss (UTC Z)'),
  branch: cmd('git branch --show-current').replace('\n', ''),
  sha: cmd('git rev-parse HEAD').replace('\n', ''),
  version,
};
// console.log(build);

const buildOutput =
  'BUILD:\n' +
  Object.entries(build).reduce(
    (str, [label, value]) => (str += `${label}: ${value}\n`),
    '',
  );
// console.log(buildOutput);

// CHANGES
// const changes = cmd('git log --format=format:%H origin/main...HEAD');
const changes = cmd('git log --format=oneline origin/main...HEAD');
console.log(changes);

const changesOutput = 'CHANGES:\n' + changes;
console.log(changesOutput);

// WRITE TO FILE
const path = join(__dirname, '..', 'public', 'app.txt');
// console.log(path);
const fileContents = [buildOutput, changesOutput].join('\n');
// console.log(fileContents);

writeFileSync(path, fileContents);
