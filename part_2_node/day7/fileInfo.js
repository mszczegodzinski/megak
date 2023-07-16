/**
 * Ex1: create a program which based on a given path parameter and display all information about:
 * 1. full path
 * 2. parent directory
 * 3. file name
 * 4. file extension
 *
 * example input: /to/jest/plik.txt
 * expectet output:
 * 1. /to/jest/plik
 * 2. /to/jest
 * 3. plik.txt
 * 4. .txt
 */

const { dirname, basename, extname, normalize } = require('path');

const filePath = process.argv[2];

if (!filePath) {
  console.log('Please provide a file path');
  process.exit(1);
}

console.log('1. ', normalize(filePath));
console.log('2. ', dirname(filePath));
console.log('3. ', basename(filePath));
console.log('4. ', extname(filePath));
