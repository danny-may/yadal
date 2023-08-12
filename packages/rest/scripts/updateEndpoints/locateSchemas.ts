import { OpenAPI3, OperationObject, ParameterObject, PathItemObject, SchemaObject } from "openapi-typescript";
import { noRef } from "./util/index.js";

export function* locateComponentSchemas(schema: OpenAPI3): Generator<{ definition: SchemaObject; name: string; }> {
    for (const [name, definition] of Object.entries(schema.components?.schemas ?? {}))
        yield { definition, name };
}

const HttpMethods = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'] as const;
type HttpMethod = typeof HttpMethods[number];
function* locateOperations(schema: OpenAPI3): Generator<{ method: HttpMethod; id: string; operation: OperationObject; path: PathItemObject }> {
    for (const path of Object.values(schema.paths ?? {}).map(noRef)) {
        for (const method of ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'] as const) {
            const operation = noRef(path[method]);
            if (operation?.operationId === undefined)
                continue;
            yield { operation, method, id: operation.operationId, path };
        }
    }
}

export function* locateRequestSchemas(schema: OpenAPI3): Generator<{ definition: SchemaObject; method: HttpMethod; id: string; mediaType: string }> {
    for (const { method, id, operation } of locateOperations(schema)) {
        const request = noRef(operation.requestBody);
        if (request === undefined)
            continue;

        for (const [mediaType, content] of Object.entries(request.content)) {
            const definition = noRef(content).schema;
            if (definition !== undefined)
                yield { method, id, mediaType, definition };
        }
    }
}

export function* locateResponseSchemas(schema: OpenAPI3): Generator<{ definition: SchemaObject; method: HttpMethod; id: string; mediaType: string; status: string; }> {
    for (const { method, id, operation } of locateOperations(schema)) {
        const responses = noRef(operation.responses);
        if (responses === undefined)
            continue;

        for (const [status, response] of Object.entries(responses)) {
            for (const [mediaType, content] of Object.entries(noRef(response).content ?? {})) {
                const definition = noRef(content).schema;
                if (definition !== undefined)
                    yield { method, id, status, mediaType, definition };
            }
        }
    }
}

export function* locateRequestParameters(schema: OpenAPI3): Generator<{ operation: OperationObject; parameters: ParameterObject[]; id: string; method: HttpMethod; }> {
    for (const { method, id, operation, path } of locateOperations(schema)) {
        const pathParams = path.parameters?.map(noRef) ?? [];
        const opParams = operation.parameters?.map(noRef) ?? [];
        yield { operation, id, method, parameters: [...pathParams, ...opParams] };
    }
}