/**
 * Description of this project you can find in the README.md file.
 */

const express = require('express');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const { configuratorRouter } = require('./routes/configurator');
const { homeRouter } = require('./routes/home');
const { orderRouter } = require('./routes/order');

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());
app.engine('.hbs', hbs.engine({ extname: '.hbs', layoutsDir: __dirname + '/views/layouts' }));
app.set('view engine', '.hbs');

app.use('/', homeRouter);
app.use('/configurator', configuratorRouter);
app.use('/order', orderRouter);

app.listen(3000, 'localhost');
