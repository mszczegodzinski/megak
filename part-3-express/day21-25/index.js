const express = require("express");
const hbs = require("express-handlebars");
const methodOverride = require("method-override");
const { clientRouter } = require("./routes/client");
const { homeRouter } = require("./routes/home");
const { db } = require("./utils/db");

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
// app.get("/test", (req, res) => {
//   res.send(db.getOne("dd6dcac0-ee6b-4b2c-9c5d-9952d4963880"));
// });

app.listen(3000, "localhost", () => {
  console.log("Server running on http://localhost:3000/");
});
