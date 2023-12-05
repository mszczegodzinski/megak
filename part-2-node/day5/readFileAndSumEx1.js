/**
 * Ex1: Create a function that sums all the numbers from a JSON file which is placed ./data/input.json
 * The result should be stored in ./data/sum.txt
 */

const { readFile, writeFile } = require('fs').promises;

async function readFileAndSum() {
  try {
    const data = await readFile('./data/input.json', 'utf-8');
    const parsedData = JSON.parse(data);
    const sum = (total, current) => total + current;
    const result = JSON.stringify(parsedData.reduce(sum, 0));
    try {
      await writeFile('./data/sum.txt', `${result}`, {
        encoding: 'utf-8',
        flag: 'w',
      });
      console.log('File was saved successfully. Go to the file to check the result.');
    } catch (error) {
      console.log('File was not saved.', error);
    }
  } catch (error) {
    console.log('File was not saved.', error);
  }
}

readFileAndSum();
