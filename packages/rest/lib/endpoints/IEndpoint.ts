import { HttpMethod, IHttpRequest, IHttpResponse } from "../http/index.js";
import { Route } from "../routes/index.js";

export interface IEndpoint<TModel extends object, TResult> {
    readonly route: Route<HttpMethod, TModel>;
    createRequest(model: TModel): IHttpRequest;
    readResponse(response: IHttpResponse): PromiseLike<TResult>;
}

export interface EndpointDefinition<
    Method extends HttpMethod = HttpMethod,
    Name extends PropertyKey = PropertyKey,
    Path extends object = any,
    Query extends object = any,
    Headers extends object = any,
    Response = unknown,
    Body extends object = any
> {
    readonly name: Name;
    readonly route: Route<Method, Path>;
    readonly rateLimit: RateLimitDefinition<Path>;
    readonly query: QueryDefinition<Query>;
    readonly headers: HeadersDefinition<Headers>;
    readResponse<Content>(statusCode: number, contentType: string | undefined, content: Content, resolve: (contentType: string, content: Content) => Promise<unknown>): Promise<Response>;
    createBody(model: Body): { type: string; content: ArrayBufferView[]; } | undefined;
}

export interface QueryDefinition<Model extends object> {
    readonly keys: readonly (keyof Model)[];
    getValues(model: Model): Iterable<[`${keyof Model & number | string}`, string]>;
}

export interface HeadersDefinition<Model extends object> {
    readonly keys: readonly (keyof Model)[];
    getValues(model: Model): { [P in keyof Model]?: string };
}

export interface RateLimitDefinition<Model extends object> {
    readonly global: boolean;
    bucket(model: { [P in keyof Model]: Model[P] | string }): string;
}
