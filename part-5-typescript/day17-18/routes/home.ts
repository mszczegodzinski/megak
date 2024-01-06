import { Router, Request, Response } from "express";
import { CookieMakerApp } from "../index";
import { get, rest } from "../decorators/rest.decorator";
import { RestDecoratorInfo } from "../types/rest-decorator";
import { BaseRouter } from "./base";
import { MyRouter } from "../types/my-router";
export class HomeRouter extends BaseRouter implements MyRouter {
  readonly urlPrefix = "/";

  @get("/")
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
