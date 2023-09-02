import { HttpMethod } from "../http/index.js";

export type RouteModel<T extends Route<any, any>> = T extends Route<HttpMethod, infer Model> ? Model : never;
export interface Route<Method extends HttpMethod = HttpMethod, Model extends object = object> {
    readonly method: Method;
    readonly regex: RegExp;
    readonly template: RouteTemplate<Model>;
    readonly authentication: { readonly [type: string]: readonly string[] };
    create(model: Model): `/${string}`;
    test(url: `/${string}`): boolean;
    tryParse(url: `/${string}`): null | Record<keyof Model, string>;
    parse(url: `/${string}`): Record<keyof Model, string>;
}

export interface RouteTemplate<Model extends object> {
    readonly raw: `/${string}`;
    readonly keys: readonly ([object] extends [Model] ? PropertyKey : keyof Model)[];
    readonly segments: readonly string[];
}