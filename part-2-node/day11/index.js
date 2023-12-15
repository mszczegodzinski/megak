/**
 * Run the test.js file and look at the output.
 */

const { exec } = require('child_process');

exec('node test.js', (error, stdout, stderr) => {
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});
