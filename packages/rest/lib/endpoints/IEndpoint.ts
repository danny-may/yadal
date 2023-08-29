import { endpoints } from "../../ref/index.js";
import { HttpMethod, IHttpRequest, IHttpResponse } from "../http/index.js";
import { Route } from "../routes/index.js";

export interface IEndpoint<TModel extends object, TResult> {
    readonly route: Route<TModel>;
    createRequest(model: TModel): IHttpRequest;
    readResponse(response: IHttpResponse): PromiseLike<TResult>;
}

export interface EndpointDefinition<
    Method extends HttpMethod = HttpMethod,
    Name extends PropertyKey = PropertyKey,
    Route extends object = any,
    Query extends object = any,
    Headers extends object = any,
    Response = unknown,
    Body extends object = any
> {
    readonly name: Name;
    readonly route: RouteDefinition<Method, Route>;
    readonly query: QueryDefinition<Query>;
    readonly headers: HeadersDefinition<Headers>;
    readResponse<Content>(statusCode: number, contentType: string | undefined, content: Content, resolve: (contentType: string, content: Content) => Promise<unknown>): Promise<Response>;
    createBody(model: Body): { type: string; content: ArrayBufferView[]; } | undefined;
}

export interface RouteDefinition<Method extends HttpMethod, Model extends object> {
    readonly method: Method;
    readonly template: `/${string}`,
    readonly regex: RegExp,
    readonly keys: readonly (keyof Model)[];
    create(model: Model): `/${string}`;
    test(url: `/${string}`): boolean;
    parse(url: `/${string}`): Record<keyof Model, string>;
    rateLimitBuckets(model: { [P in keyof Model]: Model[P] | string }): Iterable<string>;
}

export interface QueryDefinition<Model extends object> {
    readonly keys: readonly (keyof Model)[];
    getValues(model: Model): Iterable<[keyof Model, string]>;
}

export interface HeadersDefinition<Model extends object> {
    readonly keys: readonly (keyof Model)[];
    getValues(model: Model): { [P in keyof Model]?: string };
}

const def: Record<string, EndpointDefinition> = endpoints;
def;