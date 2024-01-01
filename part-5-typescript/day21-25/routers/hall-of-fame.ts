import { Router } from "express";

export const fameRouter = Router();

fameRouter.get("/ranking", (req, res) => {
  res.render("views/ranking.hbs", {});
});
