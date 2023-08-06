/**
 * Ex2: create a http server which get a type of math operation, two parameters (numbers), and return the result of calculation
 * examples:
 * http://localhost:3000/add/add/2/2 => print result 4
 * http://localhost:3000/subtract/2/2 => print result 0
 * http://localhost:3000/multiply/2/2 => print result 4
 * http://localhost:3000/divide/2/2 => print result 1
 */

const { createServer } = require('http');

const calculationHandler = (type, arg1, arg2) => {
  switch (type) {
    case 'add':
      return arg1 + arg2;
    case 'subtract':
      return arg1 - arg2;
    case 'multiply':
      return arg1 * arg2;
    case 'divide':
      return arg1 / arg2;
    default:
      return 'Invalid type operation';
  }
};

const server = createServer((req, res) => {
  const params = req?.url.split('/');
  const type = params?.[1];

  const result = calculationHandler(type, Number(params[2]), Number(params[3]));
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`Result of ${type} operation is ${result}`);
});

server.listen(3000, 'localhost');
