/**
 * Step 1:
 * Create the Express app which will host our static files. On the home page we can vote for three options: yes, no, or maybe.
 * routes:
 * /vote/yes
 * /vote/no
 * /vote/check - check the result of the vote
 *
 * step 2:
 */

const express = require('express');
const app = express();

app.use(express.static('public'));

let votesForYes = 0;
let votesForNo = 0;
let votesForMaybe = 0;

app.get('/', (req, res) => {
  res.send('You voted for Yes!');
});

app.get('/vote/yes', (req, res) => {
  votesForYes++;
  res.send('You voted for Yes!');
});

app.get('/vote/no', (req, res) => {
  votesForNo++;
  res.send('You voted for No!');
});

app.get('/vote/check', (req, res) => {
  res.send(`There is ${votesForYes} votes for Yes, ${votesForNo} votes for No`);
});

app.listen(3000, 'localhost');
