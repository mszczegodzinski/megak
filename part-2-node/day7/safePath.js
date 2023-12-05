/**
 * Ex 2: Create a program which creates a safe path based on the given path parameter.
 * Check these arguments:
 * 1. ../../../../../../../../Windows/System32/Drivers/etc/hosts
 * 2. ~me.jpg
 * 3. C:\systeminfo
 * 4. LPT1 (windows only)
 */

const { normalize, resolve } = require('path');

const filePath = process.argv[2];

if (!filePath) {
  console.log('Please provide a file path');
  process.exit(1);
}

const safePathJoin = () => {
  const currentDir = process.cwd();
  const fileName = normalize('/' + filePath);
  return resolve(currentDir + fileName);
};

console.log(safePathJoin());
