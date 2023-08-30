import { OpenAPI3, OperationObject, SchemaObject } from "openapi-typescript";
import { noRef } from "./util/index.js";

export function* locateComponentSchemas(schema: OpenAPI3): Generator<{ definition: SchemaObject; name: string; }> {
    for (const [name, definition] of Object.entries(schema.components?.schemas ?? {}))
        yield { definition, name };
}

const HttpMethods = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'] as const;
export function* locateOperations(schema: OpenAPI3) {
    for (const [url, path] of Object.entries(schema.paths ?? {}).map(x => [x[0], noRef(x[1])] as const)) {
        for (const method of HttpMethods) {
            const operation = noRef(path[method]);
            if (operation?.operationId === undefined)
                continue;
            yield { operation, method, id: operation.operationId, path, url };
        }
    }
}

export function* locateRequests(operation: OperationObject) {
    const request = noRef(operation.requestBody);
    if (request === undefined)
        return;

    for (const [mediaType, c] of Object.entries(request.content)) {
        const content = noRef(c);
        yield { mediaType, content, request };
    }
}

export function* locateResponses(operation: OperationObject) {
    const responses = noRef(operation.responses);
    if (responses === undefined)
        return;

    for (const [status, r] of Object.entries(responses)) {
        const response = noRef(r);
        for (const [mediaType, content] of Object.entries(response.content ?? {})) {
            yield { status, response, mediaType, content };
        }
    }
}
