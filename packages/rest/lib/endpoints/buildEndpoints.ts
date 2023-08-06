import { IEndpoint } from './IEndpoint.js';
import { HttpHeaders, IHttpContent, IHttpResponse } from '../http/index.js';
import { Route } from '../routes/index.js';

export function buildEndpoint<T extends IEndpointOptions>(options: T): BuildEndpoint<T>
export function buildEndpoint<T extends IEndpointOptions>(options: T): IEndpoint<any, unknown> {
    const { read, body = noBody, headers = noHeaders, query, route } = options;
    const pathSegments = route.map(r => typeof r === 'string' ? () => r : (m: any) => r.stringify(m[r.key]));
    const getBaseUrl = (m: any) => new URL(pathSegments.map(v => v(m)).join(''));
    const getUrl = query === undefined ? getBaseUrl : (model: any) => {
        const url = getBaseUrl(model);
        for (const [key, value] of query(model))
            url.searchParams.append(key, value);
        return model;
    };

    return Object.freeze<IEndpoint<any, unknown>>({
        route,
        readResponse: read,
        createRequest: model => ({
            method: route.method,
            url: getUrl(model),
            headers: headers(model),
            body: body(model)
        })
    })
}
export function buildEndpoints<T extends Record<PropertyKey, IEndpointOptions>>(options: T) {
    return Object.freeze(Object.fromEntries(
        Reflect.ownKeys(options)
            .map(k => [k, buildEndpoint(options[k]!)] as const)
    )) as { readonly [P in keyof T]: BuildEndpoint<T[P]> };
}

function noHeaders() {
    return new HttpHeaders();
}

function noBody() {
    return undefined;
}

type BuildEndpoint<Endpoint extends IEndpointOptions> =
    Endpoint extends IEndpointOptions<infer Url, infer Body, infer Headers, infer Query, infer Out>
    ? IEndpoint<Url & Body & Headers & Query, Out>
    : never

export interface IEndpointOptions<URL extends object = any, Body = any, Headers = any, Query = any, Out = any> {
    readonly route: Route<URL>;
    readonly read: (response: IHttpResponse) => PromiseLike<Out>;
    readonly body?: (arg: Body) => IHttpContent | undefined,
    readonly headers?: (arg: Headers) => HttpHeaders,
    readonly query?: (arg: Query) => Iterable<readonly [string, string]>
}