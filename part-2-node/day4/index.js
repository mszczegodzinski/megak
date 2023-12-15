/**
 * task description:
 * read the last number from file.txt, then multiply it by 2, and write it to file.txt
 */

const { readFile, writeFile, appendFile } = require('fs').promises;

const FILE_NAME = './file.txt';

(async () => {
  try {
    const numberFromFile = await readFile(FILE_NAME, 'utf-8');
    const numbers = numberFromFile.split('\n');
    const lastNumberFromFile = Number(numbers[numbers.length - 1]);
    await appendFile(FILE_NAME, `\n${lastNumberFromFile * 2}`, 'utf-8');
    console.log('File was saved');
  } catch (error) {
    console.log('error ', error);
  }
})();
