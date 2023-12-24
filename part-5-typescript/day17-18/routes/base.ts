import { RestDecoratorInfo } from "../types/rest-decorator";
import { Router } from "express";
import { CookieMakerApp } from "../index";

export class BaseRouter {
  public readonly router: Router = Router();

  constructor(protected cmapp: CookieMakerApp) {
    this.setUpRoutes();
  }

  private setUpRoutes(): void {
    const ar: RestDecoratorInfo[] = (Reflect.get(this, "_restApiCalls") ??
      []) as RestDecoratorInfo[];

    for (const apiOp of ar) {
      this.router[apiOp.httpMethod](apiOp.path, (...args) =>
        (this as any)[apiOp.propertyName](...args),
      );
    }
  }
}
