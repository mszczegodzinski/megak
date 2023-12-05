/**
 * Create an Express app which has static files served from the public directory (./public/exercise01).
 * On the home page display a form which can take 2 parameters.
 * Then check if second number is a factor of first number.
 * Use JSON in this app.
 */

const express = require('express');
const app = express();
const { calcRouter } = require('./routes/calc');

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use('/calc', calcRouter);

app.listen(3000);
