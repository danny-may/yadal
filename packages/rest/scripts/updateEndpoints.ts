import { OpenAPI3, OperationObject, ParameterObject, PathItemObject } from 'openapi-typescript';
import { defineEndpoint, locateComponentSchemas, parser, TypeBuilder, getSchema, preventShadowGlobal, augmentations, InterfaceType, InterfaceProperty, LiteralType, locateOperations, typesToSource, writeFile, exposeViaExport, noRef, locateRequests, locateResponses, deleteFsItem, defineHelpers, ExportFromDetails, snakeCaseToPascalCase } from './updateEndpoints/index.js';
import p from 'node:path';
import { fileURLToPath } from 'node:url';

const schema = await getSchema();
const builder = new TypeBuilder(parser);
const schemes = {
    header: Symbol('Headers'),
    path: Symbol('Path'),
    query: Symbol('Query')
}
loadAugmentations(builder);
loadComponentTypes(builder, schema);
loadOperations(builder, schema, schemes)
const types = builder.build();
const typesFile = new URL('../ref/discord.ts', import.meta.url);
const helperFile = new URL('../ref/helpers.ts', import.meta.url);
await deleteFsItem(new URL('../ref', import.meta.url));
await writeFile({
    contents: typesToSource(types.values(), exposeViaExport)
}, typesFile);

await writeFile(defineHelpers(typesFile), helperFile);

const endpointFiles: Array<ExportFromDetails> = [];
for (const { id, method, operation, path, url } of locateOperations(schema)) {
    for (const { imports, contents, name } of defineEndpoint(id, method, operation, url, path, types, typesFile, helperFile, schemes)) {
        const endpointFile = new URL(`../ref/${name}`, import.meta.url);
        endpointFiles.push({ file: endpointFile, name: p.basename(fileURLToPath(endpointFile)).slice(0, -3), isType: false });
        await writeFile({ imports, contents }, new URL(`../ref/${name}`, import.meta.url));
    }
}

const endpointsIndex = new URL('../ref/endpoints/index.ts', import.meta.url)
await writeFile({ exports: endpointFiles }, endpointsIndex);
await writeFile({
    exports: [
        { file: typesFile, isType: false },
        { file: helperFile, isType: false },
        { file: endpointsIndex, isType: false, name: 'endpoints' }
    ]
}, new URL('../ref/index.ts', import.meta.url));

function loadAugmentations(types: TypeBuilder) {
    for (const type of augmentations)
        types.register(type);
}

function loadComponentTypes(types: TypeBuilder, schema: OpenAPI3) {
    for (const { name, definition } of locateComponentSchemas(schema))
        types.parse(definition, preventShadowGlobal(name, 'Discord'));
}

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
                types.parse(schema, `${snakeCaseToPascalCase(id)}ResponsePNG`);
                break;
            default: throw new Error(`Unsupported response media type ${mediaType}`)
        }
    }
}

type SchemeSymbols = Partial<Record<ParameterObject['in'], symbol>>;
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