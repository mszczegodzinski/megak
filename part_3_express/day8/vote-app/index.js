/**
 * Create the Express app which will host our static files. On the home page we can vote for three options: yes, no, or maybe.
 * routes:
 * /vote/yes
 * /vote/no
 * /vote/check - check the result of the vote
 *
 * Make sure that each user can vote only once.
 *
 */

const express = require('express');
const app = express();
const { voteRouter } = require('./routes/vote');

app.use(express.static('public'));

app.use('/vote', voteRouter);

app.listen(3000, 'localhost');
