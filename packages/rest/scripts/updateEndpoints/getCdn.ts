import path from "path";
import { snowflake } from "./augmentations/index.js";
import { defineEndpoint } from "./defineEndpoint.js";
import { ExportFromDetails, writeFile } from "./output.js";
import { TypeBuilder, TypeBuilderResult } from "./parser/index.js";
import { InterfaceProperty, InterfaceType, LiteralType, UnionType } from "./types/index.js";
import { snakeCaseToPascalCase } from "./util/index.js";
import { fileURLToPath } from "url";
import { OperationObject } from "openapi-typescript";

declare function fetch(url: string): Promise<{ text(): Promise<string>; }>;
export async function getCdn() {
    const response = await fetch('https://raw.githubusercontent.com/discord/discord-api-docs/main/docs/Reference.md');
    const markdown = await response.text();
    const tableStart = markdown.indexOf('## CDN Endpoints\n\n') + 20;
    if (tableStart === 19)
        throw new Error('Cannot find the CDN table definition');

    const tableEnd = markdown.indexOf('\n\n', tableStart);
    if (tableEnd === -1)
        throw new Error('Cannot find the CDN table definition');


    const endpoints = markdown.slice(tableStart, tableEnd)
        .split('\n')
        .slice(2)
        .map(row => {
            const [, name, path, formatStr] = row.split('|');
            const formats = formatStr!.split(',').map(f => f.trim().toLowerCase());
            const schemas = formats.reduce((p, c) => Object.assign(p, { [c]: {} }), {}) as Record<string, {}>;
            return {
                name: 'get_' + name!.trim().replace(/ /g, '_').toLowerCase(),
                path: path!.replace(/\[(.*?)\]\(.*?\)/g, '{$1}').trim().replace(/[ \\*]*$/g, ''),
                formats,
                schemas,
                operation: {
                    parameters: [],
                    responses: {
                        '200': {
                            description: '',
                            content: formats.reduce((p, c) => Object.assign(p, { [formatToMime(c)]: { schema: schemas[c]! } }), {})
                        }
                    }
                } as OperationObject
            }
        });

    const schemes = {
        path: Symbol()
    }

    return {
        loadTypes(builder: TypeBuilder) {
            for (const endpoint of endpoints) {
                const properties: InterfaceProperty[] = [];
                for (const match of endpoint.path.matchAll(/\{.*?\}/g)) {
                    const name = match[0].slice(1, -1);
                    const type = name.endsWith('_id') ? snowflake : new LiteralType({ value: 'string' });
                    properties.push(new InterfaceProperty({ name, type }));
                }
                properties.push(new InterfaceProperty({
                    name: 'format',
                    type: new UnionType({
                        types: endpoint.formats.flatMap(formatToExt).map(f => new LiteralType({
                            value: JSON.stringify(f)
                        }))
                    })
                }));
                for (const [format, schema] of Object.entries(endpoint.schemas)) {
                    builder.define(schema, () => formatToSchema(format));
                }
                builder.define(endpoint.operation, () => new InterfaceType({
                    name: `${snakeCaseToPascalCase(endpoint.name)}RequestPath`,
                    properties
                }), schemes.path)
            }
        },
        async writeFiles(outDir: URL, types: TypeBuilderResult, typesFile: URL, helperFile: URL) {
            const files: Array<ExportFromDetails> = [];
            for (const endpoint of endpoints) {
                for (const { imports, contents, name } of defineEndpoint(endpoint.name, 'get', endpoint.operation, `/${endpoint.path.replace(/\.png$/, '.{format}')}`, types, typesFile, helperFile, schemes)) {
                    const endpointFile = new URL(`./${name}`, outDir);
                    files.push({ file: endpointFile, name: path.basename(fileURLToPath(endpointFile)).slice(0, -3), isType: false });
                    await writeFile({ imports, contents }, endpointFile);
                }
            }
            const index = new URL('./index.ts', outDir)
            await writeFile({ exports: files }, index);
            return new URL('./index.ts', outDir);
        }
    }
}

function formatToMime(format: string) {
    switch (format) {
        case 'png': return 'image/png';
        case 'jpeg': return 'image/jpeg';
        case 'webp': return 'image/webp';
        case 'gif': return 'image/gif';
        case 'lottie': return 'application/json';
    }
    throw new Error(`Unsupported format ${format}`);
}
function formatToExt(format: string) {
    switch (format) {
        case 'png': return ['png'];
        case 'jpeg': return ['jpg', 'jpeg'];
        case 'webp': return ['webp'];
        case 'gif': return ['gif'];
        case 'lottie': return ['json'];
    }
    throw new Error(`Unsupported format ${format}`);

}
const imageType = new LiteralType({ value: 'ArrayBufferView' });
const lottieType = new LiteralType({ value: 'Record<string, unknown>' })
function formatToSchema(format: string) {
    switch (format) {
        case 'png':
        case 'jpeg':
        case 'webp':
        case 'gif': return imageType;
        case 'lottie': return lottieType;
    }
    throw new Error(`Unsupported format ${format}`);
}