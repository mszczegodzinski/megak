import * as express from "express";
import * as cookieParser from "cookie-parser";
import { engine } from "express-handlebars";
import { ConfiguratorRouter } from "./routes/configurator";
import { HomeRouter } from "./routes/home";
import { OrderRouter } from "./routes/order";
import { handlebarsHelpers } from "./utils/handlebars-helpers";
import { COOKIE_BASES, COOKIE_ADDONS } from "./data/cookies-data";
import { Application, json, Response, Request } from "express";
import { Entries } from "./types/entries";

export class CookieMakerApp {
  private app: Application;
  public readonly data = {
    COOKIE_BASES,
    COOKIE_ADDONS,
  };

  private readonly routers = [HomeRouter, ConfiguratorRouter, OrderRouter];
  constructor() {
    this._configureApp();
    this._setRoutes();
    this._run();
  }

  _configureApp() {
    this.app = express();

    this.app.use(json());
    this.app.use(express.static("public"));
    this.app.use(cookieParser());
    this.app.engine(
      ".hbs",
      engine({
        extname: ".hbs",
        layoutsDir: __dirname + "/views/layouts",
        helpers: handlebarsHelpers,
      }),
    );
    this.app.set("view engine", ".hbs");
    this.app.set("views", __dirname + "/views");
  }

  _setRoutes() {
    for (const router of this.routers) {
      const obj = new router(this);
      this.app.use(obj.urlPrefix, obj.router);
    }
  }

  _run() {
    this.app.listen(3000, "0.0.0.0", () => {
      console.log("Listening on http://localhost:3000");
    });
  }

  showErrorPage(res: Response, description: string) {
    res.render("error", {
      description,
    });
  }

  getAddonsFromReq(req: Request) {
    const { cookieAddons } = req.cookies as {
      cookieAddons: string;
    };
    return cookieAddons ? JSON.parse(cookieAddons) : [];
  }

  getCookieSettings(req: Request): {
    addons: string[];
    base: string | undefined;
    sum: number;
    allBases: Entries;
    allAddons: Entries;
  } {
    const { cookieBase: base } = req.cookies as {
      cookieBase?: string;
    };

    const addons = this.getAddonsFromReq(req);

    const allBases = Object.entries(this.data.COOKIE_BASES);
    const allAddons = Object.entries(this.data.COOKIE_ADDONS);

    const sum =
      (base ? handlebarsHelpers.findPrice(allBases, base) : 0) +
      addons.reduce(
        (prev: number, curr: string) =>
          prev + handlebarsHelpers.findPrice(allAddons, curr),
        0,
      );

    return {
      // Selected stuff
      addons,
      base,

      // Calculations
      sum,

      // All possibilities
      allBases,
      allAddons,
    };
  }
}

new CookieMakerApp();
