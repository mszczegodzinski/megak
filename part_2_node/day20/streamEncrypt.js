const { pipeline } = require('stream').promises;
const { createReadStream, createWriteStream } = require('fs');
const { createCipheriv, randomBytes } = require('crypto');
const { promisify } = require('util');
const scrypt = promisify(require('crypto').scrypt);
const { ENCRYPTION_SALT } = require('./constants');

(async () => {
  const inputFile = process.argv[2];
  const outputFile = process.argv[3];
  const password = process.argv[4];
  const algorithm = 'aes-256-ctr';
  const iv = randomBytes(16);
  const key = await scrypt(password, ENCRYPTION_SALT, 32);

  await pipeline(createReadStream(inputFile), createCipheriv(algorithm, key, iv), createWriteStream(outputFile));

  console.log('Done!');
})();
