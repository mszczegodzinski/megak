const express = require('express');

const cookieRouter = express.Router();

cookieRouter
  .get('/set', (req, res) => {
    res.send('Hello World!');
  })
  .get('/show', (req, res) => {
    res.send('Hello World!');
  })
  .get('/check', (req, res) => {
    res.send('Hello World!');
  });

module.exports = { cookieRouter };
