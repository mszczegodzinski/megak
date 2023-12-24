import { Router, Request, Response } from "express";
import { CookieMakerApp } from "../index";
export class HomeRouter {
  readonly urlPrefix = "/";
  readonly router: Router = Router();
  constructor(private cmapp: CookieMakerApp) {
    this.cmapp = cmapp;
    this.setUpRoutes();
  }

  private setUpRoutes() {
    this.router.get("/", this.home);
  }

  private home = (req: Request, res: Response) => {
    const { sum, addons, base, allBases, allAddons } =
      this.cmapp.getCookieSettings(req);

    res.render("home/index", {
      cookie: {
        base,
        addons,
      },
      allBases,
      allAddons,
      sum,
    });
  };
}
