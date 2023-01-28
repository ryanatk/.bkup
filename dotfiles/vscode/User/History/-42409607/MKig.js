const { execSync } = require('child_process');
const { writeFileSync } = require('fs');
const { join } = require('path');
const dayjs = require('dayjs');
const { version } = require('../package.json');

const obj = {
  build: dayjs().format('MMM D, YYYY HH:mm:ss (Z)'),
  branch: cmd('git branch --show-current'),
  sha: cmd('git rev-parse HEAD'),
  version,
};

console.log(obj);

const output = Object.entries(obj).reduce(
  (str, [label, value]) => (str += `${label}: ${value}\n`),
  '',
);

console.log(output);

const path = join(__dirname, '..', 'public', 'app.txt');

console.log(path);

writeFileSync(path, output);

function cmd(command) {
  return execSync(command, { encoding: 'utf8' }).replace('\n', '');
}
