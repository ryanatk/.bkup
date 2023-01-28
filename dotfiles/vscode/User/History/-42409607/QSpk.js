const { execSync } = require('child_process');
const { writeFileSync } = require('fs');
const { join } = require('path');
const dayjs = require('dayjs');
// const { version } = require('../package.json');

const cmd = (command) =>
  execSync(command, { encoding: 'utf8' }).replace('\n', '');

//   BUILD INFO
const build = {
  time: dayjs().format('MMM D, YYYY HH:mm:ss (UTC Z)'),
  branch: cmd('git branch --show-current'),
  sha: cmd('git rev-parse HEAD'),
  // version,
};
// console.log(build);

const buildOutput =
  'BUILD\n' +
  Object.entries(build).reduce(
    (str, [label, value]) => (str += `${label}: ${value}\n`),
    '',
  );
console.log(buildOutput);

// CHANGES
const changes = cmd('git log origin/main...HEAD');
console.log(changes);

const changesOutput = 'CHANGES\n' + changes;

// WRITE TO FILE
const path = join(__dirname, '..', 'public', 'app.txt');
// console.log(path);
const fileContents = [buildOutput, changesOutput].join('\n\n');
console.log(fileContents);

writeFileSync(path, fileContents);
