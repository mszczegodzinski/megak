const { lookup } = require('dns');

//callback version
lookup('google.com', (err, data) => {
  if (err === null) {
    console.log(data);
  } else {
    console.log('error ', err);
  }
});
