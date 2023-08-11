const express = require('express');

const calcRouter = express.Router();

calcRouter.post('/check', (req, res) => {
  const { numberA, numberB } = req.body;
  const factor = numberA % numberB === 0;

  res.json({ factor });
});

module.exports = { calcRouter };
