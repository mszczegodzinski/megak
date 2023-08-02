/**
 * Ex1: Pass some phrase as an argument in command line to node program and check if the phrase matches to the password 'megakurs'.
 */

const { hash, compare } = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

const TEXT_TO_COMPARE = process.env.TEXT_TO_COMPARE;
const text = process.argv[2];
const rounds = 10

hash(text, rounds, (err, hash) => {
  if(err) {
    console.error(err);
    return;
  };

  compare(TEXT_TO_COMPARE, hash, (err, isMatch) => {
    if(err) {
      console.error(err);
      return;
    };
    console.log(isMatch);
  })  
})