const express = require("express");
const hbs = require("express-handlebars");
const { clientRouter } = require("./routes/client");
const { homeRouter } = require("./routes/home");
const { db } = require("./utils/db");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

app.engine(
  ".hbs",
  hbs.engine({
    extname: ".hbs",
    layoutsDir: __dirname + "\\views\\layouts",
  }),
);
app.set("view engine", ".hbs");
app.set("views", __dirname + "\\views");

app.use("/", homeRouter);
app.use("/client", clientRouter);
app.get("/test", (req, res) => {
  db.update({
    name: "abc123",
    mail: "abc123@@ab.com",
  });
  res.send("ok");
});

app.listen(3000, "localhost", () => {
  console.log("Server running on http://localhost:3000/");
});
