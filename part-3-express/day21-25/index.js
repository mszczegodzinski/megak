const express = require("express");
const hbs = require("express-handlebars");
const methodOverride = require("method-override");
const { clientRouter } = require("./routes/client");
const { homeRouter } = require("./routes/home");
const { db } = require("./utils/db");
const { handleError } = require("./utils/errors");
const { join } = require("path");

const app = express();
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(express.json());

app.engine(
  ".hbs",
  hbs.engine({
    extname: ".hbs",
    layoutsDir: __dirname + "/views/layouts",
  }),
);

app.set("view engine", ".hbs");
app.set("views", __dirname + "/views");

app.use("/", homeRouter);
app.use("/client", clientRouter);

app.use(handleError);

app.listen(3000, "localhost", () => {
  console.log("Server running on http://localhost:3000/");
});
