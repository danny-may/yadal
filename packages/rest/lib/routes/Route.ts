import { HttpMethod } from "../http/index.js";

export type RouteModel<T extends Route> = T extends Route<HttpMethod, infer Model> ? Model : never;
export interface Route<Method extends HttpMethod = HttpMethod, Model extends object = object> {
    readonly method: Method;
    readonly template: `/${string}`,
    readonly regex: RegExp,
    readonly keys: readonly (keyof Model)[];
    readonly authentication: { readonly [type: string]: readonly string[] };
    create(model: Model): `/${string}`;
    test(url: `/${string}`): boolean;
    tryParse(url: `/${string}`): null | Record<keyof Model, string>;
    parse(url: `/${string}`): Record<keyof Model, string>;
}