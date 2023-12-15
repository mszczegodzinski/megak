const { resolve, normalize } = require('path');
const { readFile, writeFile } = require('fs').promises;
const { decryptText, hash } = require('./cipher');
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
    const encryptedFile = JSON.parse(fileContent);
    const iv = encryptedFile.iv;
    const decryptedFile = await decryptText(encryptedFile.encrypted, password, ENCRYPTION_SALT, iv);
    const decryptedHash = hash(decryptedFile, HASH_SALT);

    if (decryptedHash === encryptedFile.hash) {
      await writeFile(safePath, JSON.stringify(decryptedFile), 'utf-8');
      console.log('Decrypted successfully');
    } else {
      console.error('Invalid password');
    }
  } catch (error) {
    console.error(error);
  }
})();
