import { HttpMethod } from "../types/http-method";
import { RestDecoratorInfo } from "../types/rest-decorator";
import { MyRouter } from "../types/my-router";

export function rest(httpMethod: HttpMethod, path: string) {
  return (target: MyRouter, propertyName: string): any => {
    const ar: RestDecoratorInfo[] = (Reflect.get(target, "_restApiCalls") ??
      []) as RestDecoratorInfo[];
    ar.push({
      httpMethod,
      path,
      propertyName,
    });

    Reflect.set(target, "_restApiCalls", ar);
  };
}

export function get(path: string) {
  return rest("get", path);
}

export function post(path: string) {
  return rest("post", path);
}

export function patch(path: string) {
  return rest("patch", path);
}
