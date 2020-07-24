const exec = require('child_process').exec;
const execSync = require('child_process').execSync;

const getBranches = exec('git branch', (error, stdout, stderr) => {
  if (error) {
    console.log('error:', error);
  }

  if (stderr) {
    console.log('stderr:', stderr);
  }

  const branches = stdout.split('\n');
  console.log('branches:', branches);
  //const areYouSure = 

  branches.map(branch => {
    const branchName = branch.trim();
    console.log('branchName:', branchName);

    if (branchName.indexOf('HUZZAH-') !== -1) {
      exec(`git branch -D ${branchName}`);
    }

    exec(`git branch -d ${branchName}`, (error, stdout, stderr) => {
      if (stderror.indexOf('not fully merged')) {
      }
    });
  });

  exec('git branch');
});
