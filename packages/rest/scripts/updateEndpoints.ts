import { locateComponentSchemas, locateRequestSchemas, locateResponseSchemas, parser, snakeCaseToPascalCase, TypeBuilder, getSchema, writeTypes, preventShadowGlobal } from './updateEndpoints/index.js';

const schema = await getSchema();
const types = new TypeBuilder(parser);
for (const { name, definition } of locateComponentSchemas(schema))
    types.parse(definition, preventShadowGlobal(name, 'Discord'));
const noBody = new Set<string>(['get', 'head', 'delete', 'connect', 'trace']);
for (const { definition, id, mediaType, method } of locateRequestSchemas(schema)) {
    if (noBody.has(method))
        continue;
    switch (mediaType.toLowerCase()) {
        case 'application/json':
            types.parse(definition, `${method.toUpperCase()}${snakeCaseToPascalCase(id)}RequestJSON`);
            break;
        case 'application/x-www-form-urlencoded':
            types.parse(definition, `${method.toUpperCase()}${snakeCaseToPascalCase(id)}RequestURLEncoded`);
            break;
        case 'multipart/form-data':
            types.parse(definition, `${method.toUpperCase()}${snakeCaseToPascalCase(id)}RequestFormData`);
            break;
        default: throw new Error(`Unsupported request media type ${mediaType}`)
    }
}
for (const { definition, id, mediaType, method } of locateResponseSchemas(schema)) {
    switch (mediaType.toLowerCase()) {
        case 'application/json':
            types.parse(definition, `${method.toUpperCase()}${snakeCaseToPascalCase(id)}ResponseJSON`);
            break;
        case 'image/png':
            types.parse(definition, `${method.toUpperCase()}${snakeCaseToPascalCase(id)}ResponsePNG`);
            break;
        default: throw new Error(`Unsupported response media type ${mediaType}`)
    }
}

await writeTypes(types.build().values(), new URL('../ref/discord.ts', import.meta.url));