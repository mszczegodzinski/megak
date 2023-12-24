import * as express from "express";
import { Router, Request, Response } from "express";
import { CookieMakerApp } from "../index";
import { MyRouter } from "../types/my-router";

export class OrderRouter implements MyRouter {
  readonly urlPrefix = "/order";
  readonly router: Router = Router();
  constructor(private cmapp: CookieMakerApp) {
    this.setUpRoutes();
  }

  private setUpRoutes() {
    this.router.get("/summary", this.summary);
    this.router.get("/thanks", this.thanks);
  }

  private summary = (req: Request, res: Response) => {
    const { sum, addons, base, allBases, allAddons } =
      this.cmapp.getCookieSettings(req);

    res.render("order/summary", {
      cookie: {
        base,
        addons,
      },
      allBases,
      allAddons,
      sum,
    });
  };

  private thanks = (req: Request, res: Response) => {
    const { sum } = this.cmapp.getCookieSettings(req);

    res
      .clearCookie("cookieBase")
      .clearCookie("cookieAddons")
      .render("order/thanks", {
        sum,
      });
  };
}
