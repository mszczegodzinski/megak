const { resolve, normalize } = require('path');
const { readFile, writeFile } = require('fs').promises;
const { encryptText, hash } = require('./cipher');
const { ENCRYPTION_SALT, HASH_SALT } = require('./constants');

function safeJoin(base, target) {
  const targetPath = '.' + normalize('/' + target);
  return resolve(base, targetPath);
}

const safePath = safeJoin(__dirname, process.argv[2]);
const password = process.argv[3];

(async () => {
  try {
    const fileContent = await readFile(safePath, 'utf-8');
    const fileHashed = await hash(fileContent, HASH_SALT);
    const encryptedContent = await encryptText(fileContent, password, ENCRYPTION_SALT);
    encryptedContent.hashed = fileHashed;
    await writeFile(safePath, JSON.stringify(encryptedContent), 'utf-8');
    console.log(encryptedContent);
  } catch (error) {
    console.error(error);
  }
})();
