import refParser from '@apidevtools/json-schema-ref-parser';
import { HeaderObject, OpenAPI3, OperationObject, ParameterObject, PathItemObject, ResponseObject } from 'openapi-typescript';
import { TypeBuilder, TypeBuilderResult } from './parser/index.js';
import { locateComponentSchemas, locateOperations, locateRequests, locateResponses } from './locate.js';
import { noRef, preventShadowGlobal, snakeCaseToPascalCase } from './util/index.js';
import { InterfaceProperty, InterfaceType, LiteralType } from './types/index.js';
import { ExportFromDetails, writeFile } from './output.js';
import { defineEndpoint } from './defineEndpoint.js';

export async function getRest() {
    const schema = await refParser.dereference({
        $ref: 'https://raw.githubusercontent.com/discord/discord-api-spec/main/specs/openapi.json'
    }) as OpenAPI3;

    const schemes = {
        header: Symbol('Headers'),
        path: Symbol('Path'),
        query: Symbol('Query')
    }

    schema.components ??= {};
    schema.components.schemas ??= {};
    schema.components.schemas['RateLimitError'] ??= rateLimitError.content['application/json'].schema;

    for (const { operation, method, url } of locateOperations(schema)) {
        const rateLimitKeys: string[] = [];
        operation['x-discord-ratelimit'] = `${method} ${url.replace(/\{(\w+)\}/g, (_, key: string) => getRateLimitTemplateArg(key, url, method, rateLimitKeys))}`;
        operation['x-discord-ratelimit-global'] = !rateLimitKeys.includes('interaction_id');
        operation.tags ??= [url];
        operation.responses ??= {};
        operation.responses[429] ??= rateLimitError;
        for (const response of Object.values(operation.responses ?? {}).map(noRef)) {
            response.headers ??= {};
            for (const [key, value] of Object.entries(rateLimitHeaders))
                response.headers[key] ??= value;
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
                const { imports, contents, name, file } = defineEndpoint(id, method, operation, url, types, typesFile, helperFile, schemes)
                const endpointFile = new URL(`./${file}`, outDir);
                files.push({ file: endpointFile, name, isType: false });
                await writeFile({ imports, contents }, endpointFile);
            }

            const index = new URL('./index.ts', outDir)
            await writeFile({ exports: files }, index);
            return index;
        }
    }
}

function getRateLimitTemplateArg(paramName: string, url: string, method: string, rateLimitKeys: string[]) {
    if (rateLimitKeyCompatibility[paramName]?.some(k => k === undefined ? rateLimitKeys.length === 0 : rateLimitKeys.includes(k))) {
        rateLimitKeys.push(paramName);
        return `{${paramName}}`;
    }
    if (paramName === 'message_id' && url === '/channels/{channel_id}/messages/{message_id}' && method === 'delete') {
        rateLimitKeys.push(paramName);
        return `{${paramName}:age(10000,1209600000)}`;
    }
    return `<any>`;
}
const rateLimitKeyCompatibility: Record<string, Array<string | undefined>> = {
    guild_id: [undefined],
    channel_id: [undefined],
    webhook_id: [undefined],
    interaction_id: [undefined],
    webhook_token: ['webhook_id'],
    interaction_token: ['interaction_id'],
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

const rateLimitError = {
    description: 'Rate limit error response',
    content: {
        'application/json': {
            schema: {
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
        }
    },
    headers: {
        'x-ratelimit-global': {
            description: 'Indicates if the rate limit encountered is the global rate limit (not per-route)',
            schema: {
                type: 'boolean'
            },
            required: true,
        },
        'x-ratelimit-scope': {
            description: 'Value can be user (per bot or user limit), global (per bot or user global limit), or shared (per resource limit)',
            schema: {
                type: 'string',
                oneOf: [
                    { const: 'user' },
                    { const: 'global' },
                    { const: 'shared' }
                ]
            },
            required: true,
        }
    }
} satisfies ResponseObject;
const rateLimitHeaders = {
    'x-ratelimit-limit': {
        description: 'The number of requests that can be made',
        schema: {
            type: 'integer'
        },
        required: false,
    },
    'x-ratelimit-remaining': {
        description: 'The number of remaining requests that can be made',
        schema: {
            type: 'integer'
        },
        required: false,
    },
    'x-ratelimit-reset': {
        description: 'Epoch time (seconds since 00:00:00 UTC on January 1, 1970) at which the rate limit resets',
        schema: {
            type: 'integer'
        },
        required: false,
    },
    'x-ratelimit-reset-after': {
        description: 'Total time (in seconds) of when the current rate limit bucket will reset. Can have decimals to match previous millisecond ratelimit precision',
        schema: {
            type: 'number'
        },
        required: false,
    },
    'x-ratelimit-bucket': {
        description: 'A unique string denoting the rate limit being encountered (non-inclusive of top-level resources in the path)',
        schema: {
            type: 'string'
        },
        required: false,
    }
} satisfies Record<string, HeaderObject>;