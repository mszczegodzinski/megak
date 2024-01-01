import { Router } from "express";

export const arenaRouter = Router();

arenaRouter
  .get("/fight-form", (req, res) => {
    res.render("views/arena.hbs", {});
  })

  .post("/fight", (req, res) => {
    res.render("views/arena.hbs", {});
  });
