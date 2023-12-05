const express = require('express');
const hbs = require('express-handlebars');
const { clientRouter } = require('./routes/client');

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.engine('.hbs', hbs.engine({ extname: '.hbs', layoutsDir: __dirname + '/views/layouts' }));
app.set('view engine', '.hbs');

app.use('/client', clientRouter);

app.listen(3000, 'localhost', () => {
  console.log('Server running on http://localhost:3000/');
});
