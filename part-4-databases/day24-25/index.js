const express = require('express');
const methodOverride = require('method-override');
const hbs = require('express-handlebars');
const { handleError } = require('./utils/errors');
const { homeRouter } = require('./routers/home');
const { childRouter } = require('./routers/child');
const { giftRouter } = require('./routers/gift');

const app = express();

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(express.json());

app.engine(
  '.hbs',
  hbs.engine({
    extname: '.hbs',
    layoutsDir: __dirname + '/views/layouts',
  }),
);

app.set('view engine', '.hbs');
app.set('views', __dirname + '/views');

app.use('/', homeRouter);
app.use('/child', childRouter);
app.use('/gift', giftRouter);

app.use(handleError);
app.listen(3000, 'localhost', () => {
  console.log('Server running on http://localhost:3000/');
});
