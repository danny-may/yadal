import { HttpMethod } from "../http/index.js";

export type RouteModel<Route extends IRoute> = Route extends IRoute<infer T> ? T : never;
export interface IRoute<Model extends object = object> {
    readonly id: string;
    readonly parse: RouteParser;
    readonly method: HttpMethod;
    getUrl(model: Model): URL;
}
export interface RouteParser {
    (url: URL): Record<string, unknown> | undefined;
    readonly rootSegment: RouteSegment;
}

export interface RouteSegment {
    readonly literal?: string;
    readonly next?: RouteSegment;
    parse: (this: void, segment: string) => Partial<Record<string, unknown>> | undefined
}
