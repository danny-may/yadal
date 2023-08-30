import { IEndpoint } from './IEndpoint.js';
import { HttpHeaders, HttpMethod, IHttpContent } from '../http/index.js';
import { Route } from '../routes/index.js';

export function buildEndpoint<T extends EndpointDefinition>(baseUrl: URL, options: T): BuildEndpoint<T>
export function buildEndpoint<T extends EndpointDefinition>(baseUrl: URL, options: T): IEndpoint<any, unknown> {
    const {
        createBody,
        headers: { getValues: headerValues },
        query: { getValues: queryValues },
        readResponse,
        route
    } = options;

    return Object.freeze<IEndpoint<any, unknown>>({
        route,
        readResponse(response) {
            return readResponse(response.status, response.headers.get('content-type'), getBody.bind(null, response.body));
        },
        createRequest(model) {
            const headers = new HttpHeaders(headerValues(model));
            const body = createBody(model);
            const url = new URL(route.create(model), baseUrl);
            for (const [key, value] of queryValues(model))
                url.searchParams.append(key, value);

            return {
                method: route.method,
                url,
                headers,
                body: body === undefined ? undefined : {
                    headers: new HttpHeaders({ 'content-type': body.type }),
                    stream: () => body.content
                }
            }
        }
    })
}

async function getBody(content: IHttpContent) {
    const chunks = [];
    for await (const chunk of content.stream())
        chunks.push(new Uint8Array(chunk.buffer, chunk.byteOffset, chunk.byteLength));
    const result = new Uint8Array(chunks.reduce((p, c) => p + c.byteLength, 0));
    let offset = 0;
    for (const chunk of chunks) {
        result.set(chunk, offset);
        offset += chunk.byteLength;
    }
    return result;
}

export function buildEndpoints<T extends EndpointDefinition>(baseUrl: URL, options: Iterable<T>) {
    const result = {} as Record<PropertyKey, BuildEndpoint<T>>;
    for (const option of options) {
        result[option.name] = buildEndpoint(baseUrl, option);
    }
    return Object.freeze(result) as { readonly [P in T as P['name']]: BuildEndpoint<P> }
}

type BuildEndpoint<Endpoint extends EndpointDefinition> =
    Endpoint extends EndpointDefinition<infer Path, infer Query, infer Headers, infer Response, infer Body>
    ? IEndpoint<Path & Body & Headers & Query, Response>
    : never

export interface EndpointDefinition<
    Path extends object = any,
    Query extends object = any,
    Headers extends object = any,
    Response = unknown,
    Body extends object = any
> {
    readonly name: PropertyKey;
    readonly route: Route<HttpMethod, Path>;
    readonly query: QueryDefinition<Query>;
    readonly headers: HeadersDefinition<Headers>;
    readResponse(statusCode: number, contentType: string | undefined, content: () => Promise<ArrayBufferView>): Promise<Response>;
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