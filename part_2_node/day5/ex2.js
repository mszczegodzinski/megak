/**
 * Ex. 2: Write a program that shows all files in the "projects" directory.
 * Use a possibility to list all files in current directory, and then display them in a loop.
 * Use stat to check if a file is a directory , then open them recursively, and list all files in current directory.
 */

const { readdir, readFile, stat } = require('fs').promises;

async function showFilesInDirectory(path) {
  const BASE_PATH = path;
  try {
    const elements = await readdir(path);
    for (const element of elements) {
      try {
        const el = (await stat(`${BASE_PATH}/${element}`)).isDirectory();
        if (el) {
          await showFilesInDirectory(`${BASE_PATH}/${element}`);
        } else {
          const file = await readFile(`${BASE_PATH}/${element}`, 'utf-8');
          console.log(file);
        }
      } catch (error) {
        console.log('error ', error);
      }
    }
  } catch (error) {
    console.log('error', error);
  }
}

showFilesInDirectory('./projects');
