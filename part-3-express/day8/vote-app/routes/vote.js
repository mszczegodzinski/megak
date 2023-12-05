const express = require('express');
const { IpRestrict } = require('../utils/ip-restrict');

const voteRouter = express.Router();

const votes = {
  yes: 0,
  no: 0,
  maybe: 0,
};

const ipRestrict = new IpRestrict();

voteRouter
  .get('/check', (req, res) => {
    const info = Object.entries(votes)
      .map((arr) => `Votes on ${arr[0]}: ${arr[1]}`)
      .join('<br>');

    res.send(info);
  })
  .get('/:voteName', (req, res) => {
    if (!ipRestrict.check(req.ip)) {
      res.status(403).send('You can vote only once');
      return null;
    }
    const { voteName } = req.params;
    if (!votes[voteName]) {
      votes[voteName] = 0;
    }

    votes[voteName]++;

    res.send('Thanks for vote!');
  });

module.exports = { voteRouter };
