import { EndpointDefinition, IEndpoint } from './IEndpoint.js';
import { HttpHeaders, HttpMethod, IHttpContent } from '../http/index.js';

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
            return readResponse(response.status, response.headers.get('content-type'), response.body, decodeResponse);
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

async function decodeResponse(type: string, content: IHttpContent) {
    if (!(type in responseReaders))
        throw new Error(`Unsupported content type ${type}`);
    return await responseReaders[type as keyof typeof responseReaders](content);
}
const responseReaders = {
    async 'application/json'(content) {
        const json = [];
        for await (const chunk of content.stream())
            json.push(decoder.decode(new Uint8Array(chunk.buffer, chunk.byteOffset, chunk.byteLength)));
        return JSON.parse(json.join(''));
    }
} satisfies Record<string, (content: IHttpContent) => Promise<unknown>>;

const decoder = new TextDecoder();
export function buildEndpoints<T extends EndpointDefinition>(baseUrl: URL, options: Iterable<T>) {
    const result = {} as Record<PropertyKey, BuildEndpoint<T>>;
    for (const option of options) {
        result[option.name] = buildEndpoint(baseUrl, option);
    }
    return Object.freeze(result) as { readonly [P in T as P['name']]: BuildEndpoint<P> }
}

type BuildEndpoint<Endpoint extends EndpointDefinition> =
    Endpoint extends EndpointDefinition<HttpMethod, PropertyKey, infer Path, infer Query, infer Headers, infer Response, infer Body>
    ? IEndpoint<Path & Body & Headers & Query, Response>
    : never