/**
 * Ex.1: install chokidar and pass the path to observe it. Watch all .js files in this path.
 * If some file will be modified, added, deleted, return specific information.
 */

const { watch } = require('chokidar');
const { resolve, normalize } = require('path');

const currentPath = resolve(process.argv[2]);

// watch(currentPath, { ignoreInitial: true, ignored: /\.(?!js$)[^.]+$/ })
watch(normalize(`${currentPath}\\**/*.js`), { ignoreInitial: true })
  .on('add', (path) => console.log(`File ${path} was added`))
  .on('change', (path) => console.log(`File ${path} was changed`))
  .on('unlink', (path) => console.log(`File ${path} was removed`))
  .on('ready', () => console.log(`Ready for changes`));
