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
        .map(([contentType, definition]) => ({ contentType, type: types.get(noRef(definition).schema ?? {}) }));
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



function defineRequest(bodyTypes: { contentType: string; type: Type | undefined; }[], imports: ImportFromDetails[], helperUrl: URL, typesUrl: URL, extern: Record<string, Iterable<string>>) {
    if (bodyTypes.length === 0) {
        return source`export type Body = {};
export function createBody(_: Body): undefined {
    return undefined;
}`;
    }
    imports.push({ file: helperUrl, exported: 'DiscordRestError', isType: false });
    for (const { type } of bodyTypes)
        if (type?.name !== undefined)
            imports.push({ file: typesUrl, exported: type.name, isType: true });

    const bodyTypeUnion = new Set<Type>();
    for (const { type } of bodyTypes) {
        if (type === undefined)
            continue;
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
    const parts = differentiateBodyTypes(bodyTypes, (type, contentType) => {
        if (isNonObjectType(type))
            return defineNestedBody(contentType, 'data', extern);
        const props = getAllProperties(type);
        if (props !== null)
            return defineInlineBody(contentType, props, extern);
        return source`throw new DiscordRestError(null, "Unsupported type")`;
    });
    return source`export type Body = ${bodyUnion.inline('~')};
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    ${source([], ...parts)}
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
function defineInlineBody(contentType: string, props: Iterable<{ name: string; optional: boolean; type: Type; }>, extern: Record<string, Iterable<string>>) {
    switch (contentType) {
        case 'application/json': return defineJsonInlineRequest(props, extern);
        case 'multipart/form-data': return defineFormDataRequest(props, 'model', extern);
    }
    throw new Error(`Unsupported content type ${contentType}`);
}

function defineNestedBody(contentType: string, prop: string, extern: Record<string, Iterable<string>>) {
    switch (contentType) {
        case 'application/json': return defineJsonNestedRequest(prop, extern);
    }
    throw new Error(`Unsupported content type ${contentType}`);
}

function* differentiateBodyTypes(bodyTypes: { contentType: string; type: Type | undefined; }[], selector: (type: Type, contentType: string) => Iterable<string>) {
    if (bodyTypes.length === 1) {
        const { type, contentType } = bodyTypes[0]!;
        yield source`${selector(type!, contentType)}\n`;
    } else {
        const match = bodyTypes.find(b => b.contentType === 'multipart/form-data')
            ?? bodyTypes.find(b => b.contentType === 'application/json');
        if (match === undefined)
            throw new Error('No supported body type found');
        const { type, contentType } = match;
        yield source`${selector(type!, contentType)}\n`;
    }
}

function defineJsonInlineRequest(props: Iterable<{ name: string, optional: boolean; }>, extern: Record<string, Iterable<string>>) {
    const preEncoded = {
        ',': ',',
        '{': '{',
        '}': '}'
    } as Record<string, string>;
    const optional: string[] = [];
    const chunkInit = [source`jsonEncoded["{"]`];
    for (const prop of props) {
        const name = JSON.stringify(prop.name);
        preEncoded[`${name}:`] = `${name}:`;
        if (prop.optional)
            optional.push(name);
        else
            chunkInit.push(source`,${chunkInit.length === 1 ? '' : 'jsonEncoded[","],'}
jsonEncoded[${JSON.stringify(`${name}:`)}], encoder.encode(JSON.stringify(model[${name}]))`);
    }
    const conditional = [];
    if (optional.length === 0)
        chunkInit.push(source`,\njsonEncoded["}"]`);
    else {
        const conditionallyPushChunk = chunkInit.length === 1
            ? conditionallyPushChunkWithMaybeComma
            : conditionallyPushChunkWithComma;
        for (const name of optional) {
            conditional.push(conditionallyPushChunk(name))
        }
        conditional.push(source`chunks.push(jsonEncoded["}"]);`);
    }
    const jsonEncodedProps = Object.entries(preEncoded)
        .map(x => `${JSON.stringify(x[0])}:encoder.encode(${JSON.stringify(x[1])})`)
        .join(',\n')
    extern.encoder = declareEncoder;
    extern.jsonEncoded = source`const jsonEncoded = {
    ${jsonEncodedProps}
} as const;\n`;

    return source`const chunks = [
    ${sourceJoin(chunkInit, '')}
];
${sourceJoin(conditional, '\n')}
return { type: \`application/json; charset=\${encoder.encoding}\`, content: chunks };`;
}

function conditionallyPushChunkWithComma(name: string) {
    return source`if (${name} in model) {
    const value = model[${name}];
    if (value !== undefined) {
        chunks.push(jsonEncoded[","], jsonEncoded[${JSON.stringify(`${name}:`)}], encoder.encode(JSON.stringify(value)));
    }
}`;
}

function conditionallyPushChunkWithMaybeComma(name: string) {
    return source`if (${name} in model) {
    const value = model[${name}];
    if (value !== undefined) {
        if (chunks.length > 1)
            chunks.push(jsonEncoded[","]);
        chunks.push(jsonEncoded[${JSON.stringify(`${name}:`)}], encoder.encode(JSON.stringify(value)));
    }
}`;
}

function defineJsonNestedRequest(propName: string, extern: Record<string, Iterable<string>>) {
    extern.encoder = declareEncoder;
    return source`return { type: \`application/json; charset=\${encoder.encoding}\`, content: [encoder.encode(JSON.stringify(model[${JSON.stringify(propName)}]))] };`;
}

function defineFormDataRequest(props: Iterable<{ name: string, optional: boolean; type: Type; }>, model: string, extern: Record<string, Iterable<string>>) {
    const preEncoded = {
        '--': '--',
        'lf': '\n',
    } as Record<string, string>;
    const chunkInit = [];
    const conditional = [];
    for (const prop of props) {
        if (prop.optional)
            conditional.push(source`if (${JSON.stringify(prop.name)} in ${model}) {
    const value = ${model}[${JSON.stringify(prop.name)}];
    if (value !== undefined) {
        chunks.push(${propertyChunks(prop.name, 'value', prop.type, preEncoded)});
    }
}`);
        else if (chunkInit.length === 0)
            chunkInit.push(propertyChunks(prop.name, `${model}[${JSON.stringify(prop.name)}]`, prop.type, preEncoded));
        else
            chunkInit.push(source`,
${propertyChunks(prop.name, `${model}[${JSON.stringify(prop.name)}]`, prop.type, preEncoded)}`);
    }
    if (conditional.length === 0)
        chunkInit.push(source`formEncoded["--"], boundary, formEncoded["--"]`)
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
const chunks = [
    ${sourceJoin(chunkInit, '')}
];
${sourceJoin(conditional, '\n')}
return { type: \`multipart/form-data; boundary=\${boundaryStr}; charset=\${encoder.encoding}\`, content: chunks };`;

    function propertyChunks(key: string, value: string, type: Type, formEncoded: Record<string, string>) {
        if (type === wellKnownEncodings.binary || (type instanceof LiteralType && type.value === wellKnownEncodings.binary.name)) {
            const k1 = `${JSON.stringify(key)}.1`;
            const k2 = `${JSON.stringify(key)}.2`;
            formEncoded[k1] = `\nContent-Disposition: form-data; name=${key}; filename=`;
            formEncoded[k2] = `\nContent-Type: `;

            return source`formEncoded["--"], boundary, formEncoded[${JSON.stringify(k1)}], encoder.encode(encodeURIComponent(${value}.name ?? ${JSON.stringify(key)})), formEncoded[${JSON.stringify(k2)}], encoder.encode(${value}.contentType ?? "application/octet-stream"), formEncoded["lf"], formEncoded["lf"], ${value}.content, formEncoded["lf"]`;
        } else {
            const k = `${JSON.stringify(key)}.1`;
            formEncoded[k] = `\nContent-Disposition: form-data; name=${key}\nContent-Type: application/json\n\n`;
            return source`formEncoded["--"], boundary, formEncoded[${JSON.stringify(k)}], encoder.encode(JSON.stringify(${value})), formEncoded["lf"]`;
        }
    }
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
        ${props.map(p => {
        return `if (${p} in model) {
    const value = model[${p}];
    if (value !== undefined && value !== null) {
        result[${p}] = String(value);
    }
}`
    }).join('\n        ')}
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
        ${props.map(p => {
        return `if (${p} in model) {
    const value = model[${p}];
    if (value !== undefined && value !== null) {
        yield [${p}, String(value)] as [${p}, string];
    }
}`
    }).join('\n        ')}
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