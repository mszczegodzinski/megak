/**
 * Ex1: create a simple http server which returns how many times a user visits a page.
 */

const { createServer } = require('http');

let visitCounter = 0;

const server = createServer((req, res) => {
  if (req.url === '/') {
    visitCounter++;
  }
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`You are visiting page ${visitCounter}!`);
});

server.listen(3000, 'localhost');
