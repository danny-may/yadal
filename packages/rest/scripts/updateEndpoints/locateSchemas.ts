import { OpenAPI3, OperationObject, SchemaObject } from "openapi-typescript";
import { noRef, snakeCaseToPascalCase, documentation } from "./util/index.js";
import { ParserContext } from "./parser/TypeBuilder.js";
import { LiteralType, TypeReference } from "./types/index.js";

export function* locateComponentSchemas(schema: OpenAPI3): Generator<{ definition: SchemaObject; name: string; }> {
    for (const [name, definition] of Object.entries(schema.components?.schemas ?? {}))
        yield { definition, name };
}

const HttpMethods = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'] as const;
type HttpMethod = typeof HttpMethods[number];
function* locateOperations(schema: OpenAPI3): Generator<{ method: HttpMethod; id: string; operation: OperationObject; }> {
    for (const path of Object.values(schema.paths ?? {}).map(noRef)) {
        for (const method of ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'] as const) {
            const operation = noRef(path[method]);
            if (operation?.operationId === undefined)
                continue;
            yield { operation, method, id: operation.operationId };
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

export function* locateAllSchemas(schema: OpenAPI3): Generator<{ definition: SchemaObject; config: string | ((context: ParserContext) => TypeReference) }> {

    for (const path of Object.values(schema.paths ?? {}).map(noRef)) {
        for (const method of ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'] as const) {
            const operation = noRef(path[method]);
            if (operation?.operationId === undefined)
                continue;
            const prefix = `${snakeCaseToPascalCase(method)}${snakeCaseToPascalCase(operation.operationId)}`;
            const request = noRef(operation.requestBody);
            if (request !== undefined) {
                for (const [type, content] of Object.entries(request.content)) {
                    switch (type) {
                        case 'application/json':
                        case 'application/x-www-form-urlencoded':
                        case 'multipart/form-data':
                            const name = `${prefix}Request${mediaTypeToName(type)}`;
                            const schema = noRef(content).schema;
                            if (schema !== undefined)
                                yield { definition: noRef(schema), config: name };
                            break;
                        default: throw new Error(`Unsupported request type ${type}`);
                    }
                }
            }
            for (const response of Object.values(operation.responses ?? {}).map(noRef)) {
                for (const [type, content] of Object.entries(response.content ?? {})) {
                    const schema = noRef(content).schema;
                    if (schema === undefined)
                        continue;
                    switch (type) {
                        case 'application/json':
                            const name = `${prefix}Response${mediaTypeToName(type)}`;
                            if (schema !== undefined)
                                yield { definition: noRef(schema), config: name };
                            break;
                        case 'image/png':
                            yield {
                                definition: schema,
                                config: () => new LiteralType({
                                    name: `${prefix}ResponsePng`,
                                    documentation: documentation(schema),
                                    value: 'ArrayBufferView'
                                })
                            }
                            break;
                        default: throw new Error(`Unsupported response type ${type}`);
                    }
                }
            }
        }
    }
}

function mediaTypeToName(mediaType: string): string {
    switch (mediaType) {
        case 'application/json': return 'JSON';
        case 'application/x-www-form-urlencoded': return 'URLEncoded';
        case 'multipart/form-data': return 'FormData';
        default: throw new Error(`Unsupported media type ${mediaType}`);
    }
}