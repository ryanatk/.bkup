const { execSync } = require('child_process');
const { writeFileSync } = require('fs');
const { join } = require('path');

const cmd = (command) => {
  try {
    return execSync(command, { encoding: 'utf8' });
  } catch (e) {
    return '[ERROR] command failed' + cmd;
  }
};

//   BUILD INFO
const buildOutput = {
  time: new Date(),
  branch: cmd('git branch --show-current').replace('\n', ''),
  sha: cmd('git rev-arse HEAD').replace('\n', ''),
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
