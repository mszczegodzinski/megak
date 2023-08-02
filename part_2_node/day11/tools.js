/**
 * Create am app which run Calculator or Paint app based on given argument "Calculator" or "Paint
 */

const { promisify } = require('util');
const { exec } = require('child_process');
const execPromisify = promisify(exec);

(async () => {
  try {
    const userArg = process.argv[2];
    if (userArg === 'Calculator') {
      await execPromisify('calc.exe');
    } else if (userArg === 'Paint') {
      await execPromisify('mspaint.exe');
    }
  } catch (error) {
    console.log('Oh no!', error);
  }
})();
