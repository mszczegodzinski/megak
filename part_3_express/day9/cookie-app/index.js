/**
 * Write an Express app which render a form where user can put its name.
 * Put this form into ./public directory.
 * Then set 3 routes:
 * /cookie/set - here you can send the form. Save into the cookie given name and display a message "Your name was saved."
 * This coookie should be saved at least for a month.
 * /cookie/show - display a given name.
 * /cookie/check - display information if name is already saved in the cookie.
 */

const express = require('express');
const cookieParser = require('cookie-parser');
const { cookieRouter } = require('./routes/cookie');

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());
app.use('/cookie', cookieRouter);

app.listen(3000, 'localhost');
