import * as express from 'express';
import 'express-async-errors';
import * as methodOverride from 'method-override';
import { engine } from 'express-handlebars';
import { handleError } from './utils/errors';
import { homeRouter } from './routers/home';
import { arenaRouter } from './routers/arena';
import { hallOfFameRouter } from './routers/hall-of-fame';
import { warriorRouter } from './routers/warrior';
// import {handlebarsHelpers} from "./utils/handlebars-helpers";
// import "./utils/db";

const app = express();

app.use(methodOverride('_method'));
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.static('public'));
app.engine(
  '.hbs',
  engine({
    extname: '.hbs',
    layoutsDir: __dirname + '\\views\\layouts',
    // helpers: handlebarsHelpers,
  }),
);

app.set('view engine', '.hbs');
app.set('views', __dirname + '\\views');

app.use('/', homeRouter);
app.use('/arena', arenaRouter);
app.use('/hall-of-fame', hallOfFameRouter);
app.use('/warrior', warriorRouter);

app.use(handleError);

app.listen(3000, '0.0.0.0', () => {
  console.log('Server running on http://localhost:3000/');
});
