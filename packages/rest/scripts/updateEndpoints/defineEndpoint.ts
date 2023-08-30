import { OperationObject, ParameterObject } from "openapi-typescript";
import { HttpMethod } from "../../lib/http/index.js";
import { wellKnownEncodings } from "./parser/parseStringType.js";
import { escapeRegex } from "@yadal/core";
import { noRef, snakeCaseToCamelCase, source, sourceJoin } from "./util/index.js";
import { ImportFromDetails } from "./output.js";
import { TypeBuilderResult } from "./parser/index.js";
import { InterfaceProperty, InterfaceType, IntersectionType, LiteralType, Type, UnionType } from "./types/index.js";

const emptyObj = new InterfaceType({ properties: [] });
const empty = new LiteralType({ value: 'undefined' });
export function defineEndpoint(
    id: string,
    method: Lowercase<HttpMethod>,
    operation: OperationObject,
    url: string,
    types: TypeBuilderResult,
    typesUrl: URL,
    helperUrl: URL,
    schemes: Partial<Record<ParameterObject['in'], symbol>>
) {
    const queryType = types.get(operation, schemes.query ?? Symbol());
    const pathType = types.get(operation, schemes.path ?? Symbol()) ?? emptyObj;
    const headerType = types.get(operation, schemes.header ?? Symbol());
    const bodyTypes = Object.entries(noRef(operation.requestBody)?.content ?? {})
        .map(([contentType, definition]) => ({ contentType, type: types.get(noRef(definition).schema ?? {}) ?? (() => { throw new Error('Channot find type'); })() }));
    const responseTypes = Object.entries(operation.responses ?? {})
        .map(x => [x[0], noRef(x[1])] as const)
        .flatMap(([statusPattern, response]) => response.content === undefined
            ? [{ statusPattern, contentType: '', type: undefined as Type | undefined }]
            : Object.entries(response.content)
                .map(([contentType, definition]) => ({ statusPattern, contentType, type: types.get(definition.schema ?? {}) })));
    const successTypes = responseTypes.filter(t => t.statusPattern === 'default' || t.statusPattern.startsWith('2'));
    const responseType = successTypes.length === 0 ? empty : new UnionType({ types: new Set(successTypes.map(t => t.type ?? empty)) });
    const name = snakeCaseToCamelCase(id);
    const tag = operation.tags?.map(t => `/${t}`)[0] ?? url;
    const imports: ImportFromDetails[] = [];
    const extern: Record<string, Iterable<string>> = {};

    return {
        name,
        imports,
        contents: source`export const name = ${JSON.stringify(name)};
${defineRoute(method, pathType, imports, typesUrl, name, url, operation.security?.reduce((p, c) => Object.assign(p, c), {}) ?? {})}
${defineRateLimit(operation)}
${defineQuery(queryType, imports, typesUrl, name)}
${defineHeader(headerType, imports, typesUrl, name)}
${defineResponse(imports, helperUrl, responseType, name, responseTypes, typesUrl, extern)}
${defineRequest(bodyTypes, imports, helperUrl, typesUrl, extern)}
${() => source([], ...Object.values(extern))}`,
        file: `${tag}/${method}.ts`
    };
}



function defineRequest(bodyTypes: { contentType: string; type: Type; }[], imports: ImportFromDetails[], helperUrl: URL, typesUrl: URL, extern: Record<string, Iterable<string>>) {
    if (bodyTypes.length === 0) {
        return source`export type Body = {};
export function createBody(_: Body): undefined {
    return undefined;
}`;
    }
    imports.push({ file: helperUrl, exported: 'DiscordRestError', isType: false });
    for (const { type } of bodyTypes)
        if (type.name !== undefined)
            imports.push({ file: typesUrl, exported: type.name, isType: true });

    const bodyTypeUnion = new Set<Type>();
    for (const { type } of bodyTypes) {
        if (isNonObjectType(type)) {
            if (type.name !== undefined)
                imports.push({ file: typesUrl, exported: type.name, isType: true });
            bodyTypeUnion.add(new InterfaceType({
                properties: [
                    new InterfaceProperty({
                        name: 'data',
                        type
                    })
                ]
            }));
        } else {
            bodyTypeUnion.add(type);
        }
    }

    const bodyUnion = new UnionType({ types: bodyTypeUnion });
    return source`export type Body = ${bodyUnion.inline('~')};
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    ${differentiateBodyTypes('model', bodyTypes, (type, contentType) => {
        if (isNonObjectType(type))
            return defineNestedBody('model', contentType, 'data', extern);
        const props = getAllProperties(type);
        if (props !== null)
            return defineInlineBody('model', contentType, props, extern);
        return source`throw new DiscordRestError(null, "Unsupported type")`;
    })}
}`;
}

function isNonObjectType(type: Type): boolean {
    if (type instanceof InterfaceType)
        return false;
    if (type instanceof IntersectionType || type instanceof UnionType)
        return type.types.every(t => isNonObjectType(t.dereference()));
    return true;
}

const declareEncoder = source`declare const TextEncoder: typeof import('node:util').TextEncoder;
declare type TextEncoder = import('node:util').TextEncoder;
const encoder = new TextEncoder();
`;
const declareDecoder = source`declare const TextDecoder: typeof import('node:util').TextDecoder;
declare type TextDecoder = import('node:util').TextDecoder;
const decoder = new TextDecoder();
const typedArray: new () => Exclude<Extract<Parameters<TextDecoder["decode"]>[0], ArrayBufferView>, DataView> = Object.getPrototypeOf(Uint8Array.prototype).constructor;
function decode(content: ArrayBufferView) {
    if (content instanceof typedArray || content instanceof DataView)
        return decoder.decode(content);
    return decoder.decode(new Uint8Array(content.buffer, content.byteOffset, content.byteLength));
}
`;
function defineInlineBody(model: string, contentType: string, props: Iterable<{ name: string; optional: boolean; type: Type; }>, extern: Record<string, Iterable<string>>) {
    switch (contentType) {
        case 'application/json': return defineJsonInlineRequest(model, props, extern);
        case 'multipart/form-data': return defineFormDataRequest(model, props, extern);
    }
    throw new Error(`Unsupported content type ${contentType}`);
}

function defineNestedBody(model: string, contentType: string, prop: string, extern: Record<string, Iterable<string>>) {
    switch (contentType) {
        case 'application/json': return defineJsonNestedRequest(model, prop, extern);
    }
    throw new Error(`Unsupported content type ${contentType}`);
}

function differentiateBodyTypes(model: string, bodyTypes: { contentType: string; type: Type; }[], selector: (type: Type, contentType: string) => Iterable<string>) {
    if (bodyTypes.length === 1) {
        const { type, contentType } = bodyTypes[0]!;
        return source`${selector(type, contentType)}\n`;
    }
    const form = bodyTypes.find(b => b.contentType === 'multipart/form-data');
    const json = bodyTypes.find(b => b.contentType === 'application/json');
    if (form === undefined) {
        if (json === undefined) {
            throw new Error('No supported body type found');
        }
        return source`${selector(json.type, json.contentType)}\n`;
    }
    if (json === undefined)
        return source`${selector(form.type, form.contentType)}\n`;
    const properties = [...getAllProperties(form.type) ?? []].filter(p => isBinaryType(p.type));
    if (properties.length === 0)
        return source`${selector(json.type, json.contentType)}\n`;
    const conditions = [];
    for (const property of properties) {
        if (!property.optional)
            return source`${selector(form.type, form.contentType)}\n`;
        conditions.push(source`(${JSON.stringify(property.name)} in ${model} && ${model}[${JSON.stringify(property.name)}] != null)`);
    }
    return source`if (
    ${sourceJoin(conditions, '\n|| ')}
) {
    ${selector(form.type, form.contentType)}
} else {
    ${selector(json.type, json.contentType)}
}`;
}

function defineJsonInlineRequest(model: string, props: Iterable<{ name: string, optional: boolean; }>, extern: Record<string, Iterable<string>>) {
    return source`return {
    type: \`application/json; charset=\${encoder.encoding}\`,
    content: [${pickEncodeJson(model, [...props].map(p => p.name), extern)}]
};`
}

function pickEncodeJson(model: string, props: readonly string[], extern: Record<string, Iterable<string>>) {
    extern.encoder = declareEncoder;
    return source`encoder.encode(JSON.stringify({
    ${sourceJoin(props.map(p => JSON.stringify(p)).map(p => `${p}: ${model}[${p} as keyof typeof ${model}]`), ',\n')}
}))`
}

function defineJsonNestedRequest(model: string, propName: string, extern: Record<string, Iterable<string>>) {
    extern.encoder = declareEncoder;
    return source`return {
    type: \`application/json; charset=\${encoder.encoding}\`,
    content: [encoder.encode(JSON.stringify(
        ${model}[${JSON.stringify(propName)} as keyof typeof ${model}]
    ))]
};`;
}

function defineFormDataRequest(model: string, props: Iterable<{ name: string, optional: boolean; type: Type; }>, extern: Record<string, Iterable<string>>) {
    const preEncoded = {
        '--': '--',
        'lf': '\n',
    } as Record<string, string>;
    const payloadJsonProperties = [];
    const fileProperties = [];
    for (const { type, name, optional } of props) {
        if (isBinaryType(type))
            fileProperties.push({ name, optional });
        else
            payloadJsonProperties.push(name);
    }

    preEncoded.payload_json = `\nContent-Disposition: form-data; name="payload_json"\nContent-Type: application/json\n\n`;
    const chunkInit = [source`formEncoded["--"], boundary, formEncoded["payload_json"],
${pickEncodeJson(model, payloadJsonProperties, extern)}, formEncoded["lf"]`];
    const conditional = [];
    for (const { name, optional } of fileProperties) {
        if (!optional)
            chunkInit.push(source`,\n${propertyChunks(name, `${model}[${JSON.stringify(name)}]`, preEncoded)}`);
        else
            conditional.push(source`if (${JSON.stringify(name)} in ${model}) {
    const value = ${model}[${JSON.stringify(name)}];
    if (value !== undefined) {
        chunks.push(
            ${propertyChunks(name, 'value', preEncoded)}
        );
    }
}`)
    }
    if (conditional.length === 0)
        chunkInit.push(source`,\nformEncoded["--"], boundary, formEncoded["--"]`)
    else
        conditional.push(source`chunks.push(formEncoded["--"], boundary, formEncoded["--"]);`);

    const formEncodedProps = Object.entries(preEncoded)
        .map(x => `${JSON.stringify(x[0])}:encoder.encode(${JSON.stringify(x[1])})`)
        .join(',\n')
    extern.encoder = declareEncoder;
    extern.formEncoded = source`const formEncoded = {
    ${formEncodedProps}
} as const;\n`;

    return source`const boundaryStr = \`boundary-\${[...new Array(4)].map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)).join(\'-\')}\`;
const boundary = encoder.encode(boundaryStr);
const chunks: ArrayBufferView[] = [
    ${sourceJoin(chunkInit, '')}
];
${sourceJoin(conditional, '\n')}
return {
    type: \`multipart/form-data; boundary=\${boundaryStr}; charset=\${encoder.encoding}\`,
    content: chunks
};`;

    function propertyChunks(key: string, value: string, formEncoded: Record<string, string>) {
        const k1 = `${JSON.stringify(key)}.1`;
        const k2 = `${JSON.stringify(key)}.2`;
        formEncoded[k1] = `\nContent-Disposition: form-data; name=${key}; filename="`;
        formEncoded[k2] = `"\nContent-Type: `;

        return source`formEncoded["--"], boundary, formEncoded[${JSON.stringify(k1)}], encoder.encode(encodeURIComponent(${value}.name ?? ${JSON.stringify(key)})),
formEncoded[${JSON.stringify(k2)}], encoder.encode(${value}.contentType ?? "application/octet-stream"), formEncoded["lf"], formEncoded["lf"],
${value}.content, formEncoded["lf"]`;
    }
}

function isBinaryType(type: Type) {
    return type === wellKnownEncodings.binary || (type instanceof LiteralType && type.value === wellKnownEncodings.binary.name);
}

function defineResponse(imports: ImportFromDetails[], helperUrl: URL, responseType: LiteralType | UnionType, fullName: string, responseTypes: { statusPattern: string; contentType: string; type: Type | undefined; }[], typesUrl: URL, extern: Record<string, Iterable<string>>) {
    imports.push({ file: helperUrl, exported: 'DiscordRestError', isType: false });
    const conditions: Record<string, { precision: number; contentTypes: Record<string, { kind: ResponseKind; type: Type | undefined; }>; }> = {};
    for (const { statusPattern, contentType, type } of responseTypes) {
        if (type?.name !== undefined)
            imports.push({ file: typesUrl, exported: type.name, isType: true });
        const [statusConditionKey, precision] = statusPattern === 'default' ? ['', 0] : statusToCondition(statusPattern, 'statusCode');
        const { contentTypes } = conditions[statusConditionKey] ??= { precision, contentTypes: {} };
        contentTypes[contentType] = {
            kind: statusConditionKey === '' ? 'default' : statusToResponseKind(statusPattern),
            type
        }
    }
    const { '': fallback, ...statuses } = conditions;
    const sources = Object.entries(statuses)
        .sort((a, b) => a[1].precision - b[1].precision)
        .map(([condition, { contentTypes }]) => source`if (${condition}) {
    ${generateReadResponseStatusCodeHandler(contentTypes, imports, helperUrl, extern)}
}`);
    if (fallback !== undefined)
        sources.push(generateReadResponseStatusCodeHandler(fallback.contentTypes, imports, helperUrl, extern));
    else
        sources.push(source`throw new DiscordRestError(null, \`Unexpected status code \${statusCode} response\`);`);

    return source`export type Response = ${responseType.inline(`${fullName}Response`)};
export async function readResponse(statusCode: number, contentType: string | undefined, content: () => Promise<ArrayBufferView>): Promise<Response> {
    ${sourceJoin(sources, '\n')}
}`;
}

function defineRoute(method: Lowercase<HttpMethod>, pathType: Type, imports: ImportFromDetails[], typesUrl: URL, fullName: string, url: string, security: Record<string, string[]>) {
    if (pathType.name !== undefined)
        imports.push({ file: typesUrl, exported: pathType.name, isType: true });
    const regexSource = [];
    const matchKeys = [];
    const matcher = /\{.*?\}/g;
    let match = matcher.exec(url);
    let start = 0;
    while (match !== null) {
        regexSource.push(escapeRegex(url.slice(start, match.index)));
        regexSource.push(`(?<${match[0].slice(1, -1)}>.*?)`);
        matchKeys.push(JSON.stringify(match[0].slice(1, -1)));
        start = match.index + match[0].length;
        match = matcher.exec(url);
    }
    regexSource.push(escapeRegex(url.slice(start)));
    const createSource = JSON.stringify(url)
        .slice(1, -1)
        .replace(/`/g, '\\`')
        .replace(/\{(\w+)\}/g, (_, key) => `\${encodeURIComponent(model.${key})}`);

    const createArgName = matchKeys.length === 0 ? '_?' : 'model';

    return source`export type RouteModel = ${pathType.inline(`${fullName}RouteModel`)};
const routeRegex = /^${regexSource.join('')}$/i;
export const route = {
    method: ${JSON.stringify(method.toUpperCase())},
    template: ${JSON.stringify(url)},
    keys: Object.freeze([${matchKeys.join(',')}] as const),
    authentication: Object.freeze(${JSON.stringify(security, null, 4).replace(/\[.*?\]/gs, 'Object.freeze($& as const)').split('\n')} as const),
    get regex(){
        return /^${regexSource.join('')}$/i;
    },
    create(${createArgName}: RouteModel) {
        return \`${createSource}\` as const satisfies \`/\${string}\`;
    },
    test(url: \`/\${string}\`) {
        return routeRegex.test(url);
    },
    tryParse(url: \`/\${string}\`) {
        const match = url.match(routeRegex)?.groups;
        return match === undefined
            ? null
            : {
                ${matchKeys.map(k => `[${k}]: decodeURIComponent(match[${k}]!)`).join(',\n')}
            };
    },
    parse(url: \`/\${string}\`) {
        const result = route.tryParse(url);
        if (result === null)
            throw new Error('Invalid URL');
        return result;
    }
} as const;
Object.freeze(route);`;
}

function defineRateLimit(operation: OperationObject) {
    const { 'x-discord-ratelimit': template, 'x-discord-ratelimit-global': global } = operation;
    if (typeof template !== 'string' || typeof global !== 'boolean')
        return source``;

    const keys: string[] = [];
    const ratelimitSource = JSON.stringify(template)
        .slice(1, -1)
        .replace(/`/g, '\\`')
        .replace(/\{(.*?)\}/g, (_, key: string) => {
            const [name, source] = computeRateLimit(key)
            keys.push(`"${name}"`);
            return [...source].join('\n');
        });
    const ratelimitArgName = keys.length === 0 ? '_?' : `model`;
    if (keys.length === 0)
        keys.push('never');
    return source`export const rateLimit = {
    global: ${global},
    bucket(${ratelimitArgName}: { [P in ${keys.join(' | ')}]: RouteModel[P] | string; }) {
        return \`${ratelimitSource}\` as const;
    }
} as const;
Object.freeze(rateLimit);`
}

function computeRateLimit(key: string) {
    const match = key.match(/^(.*?):(.*?)\((.*?)\)$/);
    if (match === null) {
        if (key.includes(':'))
            throw new Error(`Malformed ratelimit transform ${JSON.stringify(key)}`);
        return [key, source`\${model.${key}}`] as const;
    }
    const [, name, transform, argStr] = match as [string, string, string, string];
    const t = rateLimitValueTransforms[transform];
    if (t === undefined)
        throw new Error(`Unsupported transform ${JSON.stringify(transform)}`);
    return [name, t(name, argStr)] as const;
}

const rateLimitValueTransforms = {
    age(name, args) {
        const bounds = args.split(',').map(v => Number(v.trim())).sort((a, b) => a - b);
        if (bounds.some(isNaN))
            throw new Error(`Invalid age transform arguments ${JSON.stringify(args)}`);
        const conditions = bounds.map((v, i) => source`if (age < ${v}) return "group-${i}";`);
        return source`\${((id: string) => {
    const age = Date.now() - Number((BigInt(id) >> 22n) + 1420070400000n /* Discord epoch */);
    ${sourceJoin(conditions, '\n')}
    return "group-rest";
})(model.${name})}`;
    }
} as Record<string, (name: string, args: string) => Iterable<string>>;

function defineHeader(headerType: Type | undefined, imports: ImportFromDetails[], typesUrl: URL, fullName: string) {
    headerType ??= emptyObj;
    if (!(headerType instanceof InterfaceType))
        throw new Error('Header must be an interface');
    if (headerType.name !== undefined)
        imports.push({ file: typesUrl, exported: headerType.name, isType: true });
    const props = headerType.properties.map(p => JSON.stringify(p.name));
    return source`export type HeaderModel = ${headerType.inline(`${fullName}HeaderModel`)};
export const headers = {
    keys: Object.freeze([${props.join(',')}] as const),
    getValues(${props.length === 0 ? `_?` : `model`}: HeaderModel) {
        const result = {} as { [P in keyof HeaderModel]?: string };
        ${sourceJoin(props.map(p => {
        return `if (${p} in model) {
    const value = model[${p}];
    if (value !== undefined && value !== null) {
        result[${p}] = String(value);
    }
}`
    }), '\n')}
        return result;
    }
} as const;
Object.freeze(headers);`;
}

function defineQuery(queryType: Type | undefined, imports: ImportFromDetails[], typesUrl: URL, fullName: string) {
    queryType ??= emptyObj;
    if (!(queryType instanceof InterfaceType))
        throw new Error('Query must be an interface');
    if (queryType.name !== undefined)
        imports.push({ file: typesUrl, exported: queryType.name, isType: true });
    const props = queryType.properties.map(p => JSON.stringify(p.name));
    return source`export type QueryModel = ${queryType.inline(`${fullName}QueryModel`)};
export const query = {
    keys: Object.freeze([${props.join(',')}] as const),
    * getValues(${props.length === 0 ? `_?` : `model`}: QueryModel) {
        ${sourceJoin(props.map(p => {
        return `if (${p} in model) {
    const value = model[${p}];
    if (value !== undefined && value !== null) {
        yield [${p}, String(value)] as [${p}, string];
    }
}`
    }), '\n')}
    }
} as const;
Object.freeze(query);`;
}

function statusToCondition(status: string, paramName: string): [condition: string, precision: number] {
    if (/^\dXX$/i.test(status)) {
        return [`${paramName} >= ${status[0]}00 && ${paramName} <= ${status[0]}99`, 100];
    }
    if (/^\d{3}$/) {
        return [`${paramName} === ${status}`, 1];
    }
    throw new Error(`Unsupported status template: ${status}`);
}
type ResponseKind = 'data' | 'error' | 'ratelimit' | 'default';
function statusToResponseKind(status: string): ResponseKind {
    return status === '429' ? 'ratelimit' : status[0] !== '2' ? 'error' : 'data';
}


function generateReadResponseContentTypeHandler(type: Type | undefined, kind: ResponseKind, contentType: string, imports: ImportFromDetails[], helperUrl: URL, extern: Record<string, Iterable<string>>) {
    switch (kind) {
        case 'error':
            return type === undefined
                ? source`throw new DiscordRestError(null, \`Unexpected status code \${statusCode} response\`);`
                : source`throw new DiscordRestError(${readContentType(contentType, extern)} as ${type.inline('~')});`;
        case 'ratelimit':
            if (type === undefined)
                return source`throw new DiscordRestError(null, \`Unexpected status code \${statusCode} response\`);`;
            imports.push({ file: helperUrl, exported: 'DiscordRateLimitError', isType: false });
            return source`throw new DiscordRateLimitError(${readContentType(contentType, extern)} as ${type.inline('~')});`
        case 'data':
            return type === undefined
                ? source`return undefined;`
                : source`return ${readContentType(contentType, extern)} as ${type.inline('~')};`;
        case 'default':
            return type === undefined
                ? source`return undefined;`
                : source`if (statusCode >= 200 && statusCode < 300) {
    return ${readContentType(contentType, extern)} as ${type.inline('~')});
} else {
    throw new DiscordRestError(${readContentType(contentType, extern)} as ${type.inline('~')});
}`;
    }
}

function readContentType(contentType: string, extern: Record<string, Iterable<string>>) {
    const result = contentTypeReaders[contentType];
    if (result === undefined)
        throw new Error('Unsupported content type reader ' + JSON.stringify(contentType));
    const [source, declare] = result;
    if (declare !== undefined)
        extern[declare[0]] = declare[1];
    return source;
}
const contentTypeReaders = {
    'application/json': [source`JSON.parse(decode(await content()))`, ['decoder', declareDecoder]],
    'image/png': [source`await content()`],
    'image/jpeg': [source`await content()`],
    'image/gif': [source`await content()`],
    'image/webp': [source`await content()`],
} as Record<string, [Iterable<string>, [string, Iterable<string>]?]>;

function generateReadResponseStatusCodeHandler(config: Record<string, { kind: ResponseKind; type: Type | undefined; }>, imports: ImportFromDetails[], helperUrl: URL, extern: Record<string, Iterable<string>>) {
    const { '': fallback, ...rest } = config;
    const conditions = Object.entries(rest).map(([contentType, { kind, type }]) => source`if (contentType === ${JSON.stringify(contentType)}) {
    ${generateReadResponseContentTypeHandler(type, kind, contentType, imports, helperUrl, extern)}
}`);
    if (fallback !== undefined)
        conditions.push(generateReadResponseContentTypeHandler(fallback.type, fallback.kind, '', imports, helperUrl, extern));
    else
        conditions.push(source`throw new DiscordRestError(null, \`Unexpected content type \${JSON.stringify(contentType)} response with status code \${statusCode}\`);`);
    return sourceJoin(conditions, '\n');
}

function getAllProperties(type: Type): Iterable<{ name: string; optional: boolean; type: Type; }> | null {
    if (type instanceof InterfaceType) {
        return type.properties.map(p => ({ name: p.name, optional: p.optional, type: p.type.dereference() }));
    }

    if (type instanceof UnionType) {
        const types = type.types.map(t => getAllProperties(t.dereference()));
        const props = {} as Record<string, { name: string, required: number, types: Set<Type> }>;
        for (const type of types) {
            if (type === null)
                return null;
            for (const prop of type) {
                const x = props[prop.name] ??= { name: prop.name, required: 0, types: new Set() };
                x.types.add(prop.type);
                x.required += +!prop.optional;
            }
        }
        return Object.values(props)
            .map(x => ({
                name: x.name,
                optional: x.required < types.length,
                type: x.types.size === 1 ? [...x.types][0]! : new IntersectionType({ types: x.types })
            }));
    }

    if (type instanceof IntersectionType) {
        const types = type.types.map(t => getAllProperties(t.dereference()));
        const props = {} as Record<string, { name: string, required: boolean, types: Set<Type> }>;
        for (const type of types) {
            if (type === null)
                return null;
            for (const prop of type) {
                const x = props[prop.name] ??= { name: prop.name, required: false, types: new Set() };
                x.required ||= !prop.optional;
                x.types.add(prop.type);
            }
        }
        return Object.values(props)
            .map(x => ({
                name: x.name,
                optional: !x.required,
                type: x.types.size === 1 ? [...x.types][0]! : new IntersectionType({ types: x.types })
            }));
    }

    return null;
}