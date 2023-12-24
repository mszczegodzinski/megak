import * as express from "express";
import "express-async-errors";
import * as methodOverride from "method-override";
import hbs = require("express-handlebars");
import { handleError } from "./utils/errors";
import { homeRouter } from "./routers/home";
import { childRouter } from "./routers/child";
import { giftRouter } from "./routers/gift";
import { handlebarsHelpers } from "./utils/handlebar-helpers";
import "./utils/db";

const app = express();

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "\\public"));
app.use(express.json());

app.engine(
  ".hbs",
  hbs.engine({
    extname: ".hbs",
    layoutsDir: __dirname + "\\views\\layouts",
    helpers: handlebarsHelpers,
  }),
);

app.set("view engine", ".hbs");
app.set("views", __dirname + "\\views");

app.use("/", homeRouter);
app.use("/child", childRouter);
app.use("/gift", giftRouter);

app.use(handleError);
app.listen(3000, "localhost", () => {
  console.log("Server running on http://localhost:3000/");
});
