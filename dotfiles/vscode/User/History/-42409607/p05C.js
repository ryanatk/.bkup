const { execSync } = require('child_process');
const { writeFileSync } = require('fs');
const { join } = require('path');
const dayjs = require('dayjs');
// const { version } = require('../package.json');

const cmd = (command) => {
  try {
    return execSync(command, { encoding: 'utf8' });
  } catch (e) {
    console.log('[ERROR] command failed:' + cmd);
    return 'failed';
  }
};

//   BUILD INFO
const buildOutput = {
  time: dayjs().format('MMM D, YYYY HH:mm:ss (UTC Z)'),
  branch: cmd('git brach --show-current').replace('\n', ''),
  sha: cmd('git rev-parse HEAD').replace('\n', ''),
  // version,
};
// console.log(build);

const build =
  'BUILD:\n' +
  Object.entries(buildOutput).reduce(
    (str, [label, value]) => (str += `${label}: ${value}\n`),
    '',
  );
// console.log(buildOutput);

// CHANGES
const changesOutput = cmd('git log --format=oneline origin/main...HEAD');
// console.log(changes);

const changes = 'CHANGES:\n' + changesOutput;
// console.log(changesOutput);

// WRITE TO FILE
const path = join(__dirname, '..', 'public', 'app.txt');
// console.log(path);

const fileContents = [build, changes].join('\n');
// console.log(fileContents);

writeFileSync(path, fileContents);
