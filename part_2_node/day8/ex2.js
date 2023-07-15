/**
 * Ex.2 Modify the program from Ex.1 so as to react on full file save, then if some file was added or changed, print their contents.
 *
 */

const { watch } = require('chokidar');
const { resolve, normalize } = require('path');
const { readFile } = require('fs').promises;

const currentPath = resolve(process.argv[2]);

async function readUpdatedFile(path) {
  try {
    const data = await readFile(path, 'utf-8');
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

watch(normalize(`${currentPath}\\**/*.js`), { ignoreInitial: true, awaitWriteFinish: true })
  .on('add', (path) => {
    console.log(`File ${path} was added`);
    readUpdatedFile(path);
  })
  .on('change', (path) => {
    console.log(`File ${path} was changed`);
    readUpdatedFile(path);
  })
  .on('unlink', (path) => console.log(`File ${path} was removed`))
  .on('ready', () => console.log(`Ready for changes`));
