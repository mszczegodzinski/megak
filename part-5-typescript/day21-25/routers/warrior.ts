import { Router } from "express";

export const warriorRouter = Router();

warriorRouter
  .get("/register", (req, res) => {
    res.render("views/register.hbs", {});
  })
  .post("/", (req, res) => {
    res.render("views/ranking.hbs", {});
  });
