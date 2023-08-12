import { OpenAPI3, ParameterObject } from 'openapi-typescript';
import { locateComponentSchemas, locateRequestSchemas, locateResponseSchemas, parser, snakeCaseToPascalCase, TypeBuilder, getSchema, writeTypes, preventShadowGlobal, augmentations, locateRequestParameters, InterfaceType, InterfaceProperty, LiteralType } from './updateEndpoints/index.js';

const schema = await getSchema();
const types = new TypeBuilder(parser);
loadAugmentations(types);
loadComponentTypes(types, schema);
loadOperationParameters(types, schema, {
    cookie: Symbol('Cookies'),
    header: Symbol('Headers'),
    path: Symbol('Path'),
    query: Symbol('Query')
});
loadOperationRequests(types, schema);
loadOperationResponses(types, schema);

await writeTypes(types.build().values(), new URL('../ref/discord.ts', import.meta.url));

function loadAugmentations(types: TypeBuilder) {
    for (const type of augmentations)
        types.register(type);
}

function loadComponentTypes(types: TypeBuilder, schema: OpenAPI3) {
    for (const { name, definition } of locateComponentSchemas(schema))
        types.parse(definition, preventShadowGlobal(name, 'Discord'));
}

function loadOperationRequests(types: TypeBuilder, schema: OpenAPI3) {
    const noBody = new Set<string>(['get', 'head', 'delete', 'connect', 'trace']);
    for (const { definition, id, mediaType, method } of locateRequestSchemas(schema)) {
        if (noBody.has(method))
            continue;
        switch (mediaType.toLowerCase()) {
            case 'application/json':
                types.parse(definition, `${snakeCaseToPascalCase(id)}RequestJSON`);
                break;
            case 'application/x-www-form-urlencoded':
                types.parse(definition, `${snakeCaseToPascalCase(id)}RequestURLEncoded`);
                break;
            case 'multipart/form-data':
                types.parse(definition, `${snakeCaseToPascalCase(id)}RequestFormData`);
                break;
            default: throw new Error(`Unsupported request media type ${mediaType}`)
        }
    }
}

function loadOperationResponses(types: TypeBuilder, schema: OpenAPI3) {
    for (const { definition, id, mediaType } of locateResponseSchemas(schema)) {
        switch (mediaType.toLowerCase()) {
            case 'application/json':
                types.parse(definition, `${snakeCaseToPascalCase(id)}ResponseJSON`);
                break;
            case 'image/png':
                types.parse(definition, `${snakeCaseToPascalCase(id)}ResponsePNG`);
                break;
            default: throw new Error(`Unsupported response media type ${mediaType}`)
        }
    }
}

function loadOperationParameters(types: TypeBuilder, schema: OpenAPI3, schemes: Record<ParameterObject['in'], symbol>) {
    for (const { operation, id, parameters } of locateRequestParameters(schema)) {
        const byLocation = parameters.reduce<Record<ParameterObject['in'], Array<ParameterObject>>>(
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
            types.define(operation, ctx => {
                return new InterfaceType({
                    name: `${snakeCaseToPascalCase(id)}Request${postfix}`,
                    properties: byLocation[key].map(p => new InterfaceProperty({
                        name: p.name,
                        optional: p.required !== true,
                        type: p.schema === undefined ? new LiteralType({ value: 'string' }) : ctx.parse(p.schema)
                    }))
                })
            }, schemes[key])
        }
    }
}