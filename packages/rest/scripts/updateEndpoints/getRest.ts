import refParser from '@apidevtools/json-schema-ref-parser';
import { OpenAPI3, OperationObject, ParameterObject, PathItemObject, SchemaObject } from 'openapi-typescript';
import { TypeBuilder, TypeBuilderResult } from './parser/index.js';
import { locateComponentSchemas, locateOperations, locateRequests, locateResponses } from './locate.js';
import { noRef, preventShadowGlobal, snakeCaseToPascalCase } from './util/index.js';
import { InterfaceProperty, InterfaceType, LiteralType } from './types/index.js';
import { ExportFromDetails, writeFile } from './output.js';
import { defineEndpoint } from './defineEndpoint.js';
import { fileURLToPath } from 'url';
import path from 'path';

export async function getRest() {
    const schema = await refParser.dereference({
        $ref: 'https://raw.githubusercontent.com/discord/discord-api-spec/main/specs/openapi.json'
    }) as OpenAPI3;

    const schemes = {
        header: Symbol('Headers'),
        path: Symbol('Path'),
        query: Symbol('Query')
    }

    const rateLimitError: SchemaObject = {
        type: 'object',
        properties: {
            'code': {
                type: 'number'
            },
            'global': {
                type: 'boolean'
            },
            'message': {
                type: 'string'
            },
            'retry_after': {
                type: 'number'
            }
        },
        required: ['global', 'message', 'retry_after']
    }
    schema.components ??= {};
    schema.components.schemas ??= {};
    schema.components.schemas['RateLimitError'] = rateLimitError;

    for (const { operation } of locateOperations(schema)) {
        operation.responses ??= {};
        operation.responses[429] ??= {
            description: 'Rate limit error',
            content: {
                'application/json': {
                    schema: rateLimitError
                }
            }
        }
    }

    return {
        loadTypes(builder: TypeBuilder) {
            loadComponentTypes(builder, schema);
            loadOperations(builder, schema, schemes)
        },
        async writeFiles(outDir: URL, types: TypeBuilderResult, typesFile: URL, helperFile: URL) {
            const files: Array<ExportFromDetails> = [];
            for (const { id, method, operation, url } of locateOperations(schema)) {
                for (const { imports, contents, name } of defineEndpoint(id, method, operation, url, types, typesFile, helperFile, schemes, true)) {
                    const endpointFile = new URL(`./${name}`, outDir);
                    files.push({ file: endpointFile, name: path.basename(fileURLToPath(endpointFile)).slice(0, -3), isType: false });
                    await writeFile({ imports, contents }, endpointFile);
                }
            }

            const index = new URL('./index.ts', outDir)
            await writeFile({ exports: files }, index);
            return index;
        }
    }
}

function loadComponentTypes(types: TypeBuilder, schema: OpenAPI3) {
    for (const { name, definition } of locateComponentSchemas(schema))
        types.parse(definition, preventShadowGlobal(name, 'Discord'));
}
type SchemeSymbols = Partial<Record<ParameterObject['in'], symbol>>;
function loadOperations(types: TypeBuilder, schema: OpenAPI3, schemes: SchemeSymbols) {
    for (const { id, operation, method, path } of locateOperations(schema)) {
        loadOperationRequests(types, id, operation, method);
        loadOperationResponses(types, id, operation);
        loadOperationParameters(types, schemes, id, operation, path)
    }
}

function loadOperationRequests(types: TypeBuilder, id: string, operation: OperationObject, method: string) {
    const noBody = new Set<string>(['get', 'head', 'delete', 'connect', 'trace']);
    for (const { mediaType, content } of locateRequests(operation)) {
        const schema = noRef(content.schema);
        if (noBody.has(method) || schema === undefined)
            continue;
        switch (mediaType.toLowerCase()) {
            case 'application/json':
                types.parse(schema, `${snakeCaseToPascalCase(id)}RequestJSON`);
                break;
            case 'application/x-www-form-urlencoded':
                types.parse(schema, `${snakeCaseToPascalCase(id)}RequestURLEncoded`);
                break;
            case 'multipart/form-data':
                types.parse(schema, `${snakeCaseToPascalCase(id)}RequestFormData`);
                break;
            default: throw new Error(`Unsupported request media type ${mediaType}`)
        }
    }
}

function loadOperationResponses(types: TypeBuilder, id: string, operation: OperationObject) {
    for (const { mediaType, content } of locateResponses(operation)) {
        const schema = noRef(content.schema);
        if (schema === undefined)
            continue;
        switch (mediaType.toLowerCase()) {
            case 'application/json':
                types.parse(schema, `${snakeCaseToPascalCase(id)}ResponseJSON`);
                break;
            case 'image/png':
                types.define(schema, () => new LiteralType({ value: 'ArrayBufferView' }));
                break;
            default: throw new Error(`Unsupported response media type ${mediaType}`)
        }
    }
}

function loadOperationParameters(types: TypeBuilder, schemes: SchemeSymbols, id: string, operation: OperationObject, path: PathItemObject) {
    const byLocation = [
        ...operation.parameters?.map(noRef) ?? [],
        ...path.parameters?.map(noRef) ?? [],
        {
            in: 'header',
            name: 'x-audit-log-reason',
            schema: {
                type: 'string'
            },
            required: false
        } as ParameterObject
    ].reduce<Record<ParameterObject['in'], Array<ParameterObject>>>(
        (p, c) => (p[c.in].push(c), p),
        { header: [], cookie: [], path: [], query: [] }
    )
    for (const [key, postfix] of [
        ['query', 'Query'],
        ['path', 'Path'],
        ['header', 'Headers'],
        ['cookie', 'Cookies']
    ] as const) {
        if (byLocation[key].length === 0)
            continue;
        const scheme = schemes[key];
        if (scheme === undefined)
            continue;

        types.define(operation, ctx => {
            return new InterfaceType({
                name: `${snakeCaseToPascalCase(id)}Request${postfix}`,
                properties: byLocation[key].map(p => new InterfaceProperty({
                    name: p.name,
                    optional: p.required !== true,
                    type: p.schema === undefined ? new LiteralType({ value: 'string' }) : ctx.parse(p.schema)
                }))
            })
        }, scheme)
    }
}