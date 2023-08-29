import { OperationObject, ParameterObject, PathItemObject } from "openapi-typescript";
import { HttpMethod } from "../../lib/http/index.js";
import { InterfaceType, LiteralType, Type, TypeBuilderResult, UnionType, noRef, snakeCaseToCamelCase, ImportFromDetails, InterfaceProperty, IntersectionType } from "./index.js";
import { fuseLines } from "./types/fuseLines.js";
import { wellKnownEncodings } from "./parser/parseStringType.js";
import { rateLimitError } from './augmentations/index.js';
import { escapeRegex } from "@yadal/core";

const emptyObj = new LiteralType({ value: '{}' });
const empty = new LiteralType({ value: 'undefined' });
export function* defineEndpoint(
    id: string,
    method: Lowercase<HttpMethod>,
    operation: OperationObject,
    url: string,
    path: PathItemObject,
    types: TypeBuilderResult,
    typesUrl: URL,
    helperUrl: URL,
    schemes: Partial<Record<ParameterObject['in'], symbol>>,
) {
    const name = snakeCaseToCamelCase(id);

    const queryType = types.get(operation, schemes.query ?? Symbol());
    const pathType = types.get(operation, schemes.path ?? Symbol()) ?? emptyObj;
    const headerType = types.get(operation, schemes.header ?? Symbol());
    const bodyTypes = Object.entries(noRef(operation.requestBody)?.content ?? {})
        .map(([contentType, definition]) => ({ contentType, type: types.get(noRef(definition).schema ?? {}) }));
    const responseTypes = Object.entries(operation.responses ?? {})
        .map(x => [x[0], noRef(x[1])] as const)
        .flatMap(([statusPattern, response]) => response.content === undefined
            ? [{ statusPattern, contentType: undefined as string | undefined, type: undefined as Type | undefined }]
            : Object.entries(response.content)
                .map(([contentType, definition]) => ({ statusPattern, contentType, type: types.get(definition.schema ?? {}) })));
    const successTypes = responseTypes.filter(t => t.statusPattern === 'default' || t.statusPattern.startsWith('2'));
    const responseType = successTypes.length === 0 ? empty : new UnionType({ types: new Set(successTypes.map(t => t.type ?? empty)) });

    path;
    for (const tag of operation.tags?.map(t => `${t}/`) ?? ['']) {
        const fullName = snakeCaseToCamelCase(`${tag.slice(0, -1)}_${id}`);
        const imports: ImportFromDetails[] = [];

        yield {
            imports,
            contents: fuseLines(
                [`export const name = ${JSON.stringify(fullName)};`, ''],
                ...defineRoute(method, pathType, imports, typesUrl, fullName, url),
                ...defineQuery(queryType, imports, typesUrl, fullName),
                ...defineHeader(headerType, imports, typesUrl, fullName),
                ...defineResponse(imports, helperUrl, responseType, fullName, responseTypes, typesUrl),
                ...defineRequest(bodyTypes, imports, helperUrl, typesUrl)
            ),
            name: `endpoints/${tag}${name}.ts`
        };
    }
}



function* defineRequest(bodyTypes: { contentType: string; type: Type | undefined; }[], imports: ImportFromDetails[], helperUrl: URL, typesUrl: URL) {
    if (bodyTypes.length === 0) {
        yield `export type Body = {};
export function createBody(_: Body): undefined {
    return undefined;
}
`.split('\n');
        return;
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

    const extern = {} as Record<string, Iterable<string>>;
    const bodyUnion = new UnionType({ types: bodyTypeUnion });
    yield* [`export type Body = `.split('\n'), bodyUnion.inline('~'), `;
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
`.split('\n')];
    for (const { begin, contentType, end, type, indent } of differentiateBodyTypes(bodyTypes)) {
        yield* begin;
        if (isNonObjectType(type)) {
            for (const chunk of defineNestedBody(contentType, 'data', extern))
                yield chunk.map((v, i) => i === 0 ? v : indent + v);
        } else {
            const props = getAllProperties(type);
            if (props !== null) {
                for (const chunk of defineInlineBody(contentType, props, extern))
                    yield chunk.map((v, i) => i === 0 ? v : indent + v);
            } else
                yield ['    throw new DiscordRestError(null, "Unsupported type")', indent];
        }
        yield* end;
    }
    yield `}
`.split('\n');
    for (const value of Object.values(extern))
        yield value;
}

function isNonObjectType(type: Type): boolean {
    if (type instanceof InterfaceType)
        return false;
    if (type instanceof IntersectionType || type instanceof UnionType)
        return type.types.every(t => isNonObjectType(t.dereference()));
    return true;
}

const declareEncoder = `declare const TextEncoder: typeof import('node:util').TextEncoder;
declare type TextEncoder = import('node:util').TextEncoder;
const encoder = new TextEncoder();
`.split('\n');
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

function* differentiateBodyTypes(bodyTypes: { contentType: string; type: Type | undefined; }[]) {
    if (bodyTypes.length === 1) {
        const { type, contentType } = bodyTypes[0]!;
        yield { type: type!, contentType, begin: [], end: [['', '']], indent: '' };
    } else {
        const match = bodyTypes.find(b => b.contentType === 'multipart/form-data')
            ?? bodyTypes.find(b => b.contentType === 'application/json');
        if (match === undefined)
            throw new Error('No supported body type found');
        const { type, contentType } = match;
        yield { type: type!, contentType, begin: [], end: [['', '']], indent: '' };
    }
}

function* defineJsonInlineRequest(props: Iterable<{ name: string, optional: boolean; }>, extern: Record<string, Iterable<string>>) {
    const preEncoded = {
        ',': ',',
        '{': '{',
        '}': '}'
    } as Record<string, string>;
    yield ['    const chunks = [', '        jsonEncoded["{"]'];
    let i = 0;
    const optional = [];
    for (const prop of props) {
        const name = JSON.stringify(prop.name);
        const key = `${name}:`;
        if (prop.optional)
            optional.push(name);
        else if (i++ > 0)
            yield [', jsonEncoded[","],', `        jsonEncoded[${JSON.stringify(key)}], encoder.encode(JSON.stringify(model[${name}]))`];
        else
            yield [',', `        jsonEncoded[${JSON.stringify(key)}], encoder.encode(JSON.stringify(model[${name}]))`]
        preEncoded[key] = key;
    }
    if (optional.length === 0) {
        yield [',', '        jsonEncoded["}"]', '    ];', ''];
    } else {
        yield ['', '    ];', ''];
        if (i === 0) {
            for (const name of optional) {
                yield `    if (${name} in model) {
        const value = model[${name}];
        if (value !== undefined) {
            if (chunks.length > 1)
                chunks.push(jsonEncoded[","]);
            chunks.push(jsonEncoded[${JSON.stringify(`${name}:`)}], encoder.encode(JSON.stringify(value)));
        }
    }
`.split('\n')
            }
        } else {
            for (const name of optional) {
                yield `    if (${name} in model) {
        const value = model[${name}];
        if (value !== undefined) {
            chunks.push(jsonEncoded[","], jsonEncoded[${JSON.stringify(`${name}:`)}], encoder.encode(JSON.stringify(value)));
        }
    }
`.split('\n')
            }
        }
        yield ['    chunks.push(jsonEncoded["}"]);', ''];
    }
    yield ['    return { type: `application/json; charset=${encoder.encoding}`, content: chunks };', ''];

    const jsonEncodedProps = Object.entries(preEncoded)
        .map(x => `    ${JSON.stringify(x[0])}:encoder.encode(${JSON.stringify(x[1])})`)
        .join(',\n')
    extern.encoder = declareEncoder;
    extern.jsonEncoded = [`const jsonEncoded = {\n${jsonEncodedProps}\n} as const;`, ''];
}

function* defineJsonNestedRequest(propName: string, extern: Record<string, Iterable<string>>) {
    extern.encoder = declareEncoder;
    yield [`    return { type: \`application/json; charset=\${encoder.encoding}\`, content: [encoder.encode(JSON.stringify(model[${JSON.stringify(propName)}]))] };`, ''];
}

function* defineFormDataRequest(props: Iterable<{ name: string, optional: boolean; type: Type; }>, model: string, extern: Record<string, Iterable<string>>) {
    const preEncoded = {
        '--': '--',
        'lf': '\n',
    } as Record<string, string>;
    yield ['    const boundaryStr = \`boundary-${[...new Array(4)].map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)).join(\'-\')}\`;', ''];
    yield [`    const boundary = encoder.encode(boundaryStr);`, ''];
    yield ['    const chunks = [', ''];
    const optional = [];
    let i = 0;
    for (const prop of props) {
        if (prop.optional) {
            optional.push({ key: prop.name, type: prop.type });
        } else {
            if (i++ > 0)
                yield [',', ''];
            yield* propertyChunks('        ', prop.name, `${model}[${JSON.stringify(prop.name)}]`, [], prop.type, preEncoded);
        }
    }
    if (optional.length === 0) {
        if (i++ > 0)
            yield [',', ''];
        yield ['        formEncoded["--"], boundary, formEncoded["--"]', '    ];', ''];
    } else {
        yield ['', '    ];', ''];
        for (const { key, type } of optional) {
            yield [`    if (${JSON.stringify(key)} in ${model}) {`, '']
            yield [`        const value = ${model}[${JSON.stringify(key)}];`, '']
            yield [`        if (value !== undefined) {`, '']
            yield [`            chunks.push(`, ''];
            yield* propertyChunks('                ', key, 'value', [''], type, preEncoded);
            yield ['            )', ''];
            yield ['        }', ''];
            yield ['    }', ''];
        }
        yield ['    chunks.push(formEncoded["--"], boundary, formEncoded["--"]);', ''];
    }
    const formEncodedProps = Object.entries(preEncoded)
        .map(x => `    ${JSON.stringify(x[0])}:encoder.encode(${JSON.stringify(x[1])})`)
        .join(',\n')
    extern.encoder = declareEncoder;
    extern.formEncoded = [`const formEncoded = {\n${formEncodedProps}\n} as const;`, ''];
    yield ['    return { type: \`multipart/form-data; boundary=${boundaryStr}; charset=${encoder.encoding}\`, content: chunks };', ''];

    function* propertyChunks(indent: string, key: string, value: string, postfix: Iterable<string>, type: Type, formEncoded: Record<string, string>) {
        if (type === wellKnownEncodings.binary || (type instanceof LiteralType && type.value === wellKnownEncodings.binary.name)) {
            const k1 = `${JSON.stringify(key)}.1`;
            const k2 = `${JSON.stringify(key)}.2`;
            formEncoded[k1] = `\nContent-Disposition: form-data; name=${key}; filename=`;
            formEncoded[k2] = `\nContent-Type: `;

            yield [`${indent}...(({ name, content, contentType }) => [formEncoded["--"], boundary, formEncoded[${JSON.stringify(k1)}], encoder.encode(encodeURIComponent(name ?? ${JSON.stringify(key)})), formEncoded[${JSON.stringify(k2)}], encoder.encode(contentType ?? "application/octet-stream"), formEncoded["lf"], formEncoded["lf"], content, formEncoded["lf"]])(${value})`, ...postfix];
        } else {
            const k = `${JSON.stringify(key)}.1`;
            formEncoded[k] = `\nContent-Disposition: form-data; name=${key}\nContent-Type: application/json\n\n`;
            yield [`${indent}formEncoded["--"], boundary, formEncoded[${JSON.stringify(k)}], encoder.encode(JSON.stringify(${value})), formEncoded["lf"]`, ...postfix];
        }
    }
}

function* defineResponse(imports: ImportFromDetails[], helperUrl: URL, responseType: LiteralType | UnionType, fullName: string, responseTypes: { statusPattern: string; contentType: string | undefined; type: Type | undefined; }[], typesUrl: URL) {
    imports.push({ file: helperUrl, exported: 'DiscordRestError', isType: false });
    imports.push({ file: helperUrl, exported: 'DiscordRateLimitError', isType: false });
    imports.push({ file: typesUrl, exported: 'RateLimitError', isType: true });
    yield* [['export type Response = '], responseType.inline(`${fullName}Response`), [';', '']];
    const conditions: Record<string, { precision: number; contentTypes: Record<string, { kind: 'ratelimit' | 'error' | 'data' | 'default'; type: Type | undefined; }>; }> = {
        'statusCode === 429': {
            precision: 2,
            contentTypes: {
                'contentType === "application/json"': { kind: 'ratelimit', type: rateLimitError }
            }
        }
    };
    for (const { statusPattern, contentType, type } of responseTypes) {
        if (type?.name !== undefined)
            imports.push({ file: typesUrl, exported: type.name, isType: true });
        const [statusConditionKey, precision] = statusPattern === 'default' ? ['', 0] : statusToCondition(statusPattern, 'statusCode');
        const contentTypeKey = contentType === undefined ? '' : `contentType === ${JSON.stringify(contentType)}`;
        const { contentTypes } = conditions[statusConditionKey] ??= { precision, contentTypes: {} };
        if (contentTypes[contentTypeKey] !== undefined)
            throw new Error(`Duplicate content types for ${statusPattern} ${contentType ?? '*/*'} response handler`);
        contentTypes[contentTypeKey] = {
            kind: statusConditionKey === '' ? 'default' : statusToResponseKind(statusPattern),
            type: type
        };
    }
    yield* [['export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {', '']];
    const { '': { contentTypes: statusElse } = { contentTypes: undefined }, ...statuses } = conditions;
    for (const [condition, { contentTypes }] of Object.entries(statuses).sort((a, b) => a[1].precision - b[1].precision)) {
        yield* [[`    if (${condition}) {`, '']];
        yield* generateReadResponseStatusCodeHandler('        ', contentTypes);
        yield* [['    }', '']];
    }
    if (statusElse !== undefined) {
        yield* generateReadResponseStatusCodeHandler('    ', statusElse);
    }
    yield* [['    throw new DiscordRestError(null, `Unexpected status code ${statusCode} response`);', '']];
    yield* [['}', '']];
}

const rateLimitKeyCompatibility: Record<string, Array<string | undefined>> = {
    guild_id: [undefined],
    channel_id: [undefined],
    webhook_id: [undefined],
    interaction_id: [undefined],
    webhook_token: ['webhook_id'],
    interaction_token: ['interaction_id'],
}
const deleteMessageMessageIdFn = (value: string) => `((message_id: string) => {
            const age = Date.now() - Number((BigInt(message_id) >> 22n) + 1420070400000n /* Discord epoch */);
            return age < 10000 /* 10 seconds */ ? 'new' : age < 1209600000 /* 2 weeks */ ? 'recent' : 'old';
        })(${value})`;
function defineRoute(method: Lowercase<HttpMethod>, pathType: Type, imports: ImportFromDetails[], typesUrl: URL, fullName: string, url: string) {
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
        .replace(/\{(\w+)\}/g, (_, key) => {
            return `\${encodeURIComponent(model.${key})}`
        });
    const rateLimitKeys = [] as string[];
    const ratelimitSource = JSON.stringify(url)
        .slice(1, -1)
        .replace(/`/g, '\\`')
        .replace(/\{(\w+)\}/g, (_, key: string) => {
            if (rateLimitKeyCompatibility[key]?.some(k => k === undefined ? rateLimitKeys.length === 0 : rateLimitKeys.includes(k))) {
                rateLimitKeys.push(key);
                return `\${model.${key}}`;
            }
            if (key === 'message_id' && url === '/channels/{channel_id}/messages/{message_id}' && method === 'delete') {
                rateLimitKeys.push(key);
                return `\${${deleteMessageMessageIdFn('model.message_id')}}`;
            }
            return '<any>';
        });

    const createArgName = matchKeys.length === 0 ? '_' : 'model';
    const ratelimitArg = rateLimitKeys.length === 0 ? '_: {}' : `model: { ${rateLimitKeys.map(k => `["${k}"]: RouteModel["${k}"] | string;`).join(' ')} }`;

    return [`export type RouteModel = `.split('\n'), pathType.inline(`${fullName}RouteModel`), `;
const routeRegex = /^${regexSource.join('')}$/i;
export const route = {
    method: ${JSON.stringify(method.toUpperCase())},
    template: ${JSON.stringify(url)},
    get regex(){
        return /^${regexSource.join('')}$/i;
    },
    create(${createArgName}: RouteModel) {
        return \`${createSource}\` as const satisfies \`/\${string}\`;
    },
    test(url: \`/\${string}\`) {
        return routeRegex.test(url);
    },
    parse(url: \`/\${string}\`) {
        const match = url.match(routeRegex);
        if (match === null)
            throw new Error('Invalid URL');
        return {
            ${matchKeys.map(k => `[${k}]: decodeURIComponent(match.groups![${k}]!)`).join(',\n            ')}
        }
    },
    rateLimitBuckets(${ratelimitArg}) {
        return [${matchKeys.includes('"interaction_id"') ? '' : '"global", '}\`${method} ${ratelimitSource}\`] as const;
    }
} as const;
Object.freeze(route);
`.split('\n')];
}

function* defineHeader(headerType: Type | undefined, imports: ImportFromDetails[], typesUrl: URL, fullName: string) {
    if (headerType === undefined)
        return;
    if (headerType.name !== undefined)
        imports.push({ file: typesUrl, exported: headerType.name, isType: true });
    yield* [['export type HeaderModel = '], headerType.inline(`${fullName}HeaderModel`), [';', '']];
    if (!(headerType instanceof InterfaceType))
        throw new Error('Header must be an interface');
    yield* [[`export const headerKeys = Object.freeze([${headerType.properties.map(p => JSON.stringify(p.name)).join(', ')}] as const);`, '']];
}

function* defineQuery(queryType: Type | undefined, imports: ImportFromDetails[], typesUrl: URL, fullName: string) {
    if (queryType === undefined)
        return;
    if (queryType.name !== undefined)
        imports.push({ file: typesUrl, exported: queryType.name, isType: true });
    yield* [['export type QueryModel = '], queryType.inline(`${fullName}QueryModel`), [';', '']];
    if (!(queryType instanceof InterfaceType))
        throw new Error('Query must be an interface');
    yield* [[`export const queryKeys = Object.freeze([${queryType.properties.map(p => JSON.stringify(p.name)).join(', ')}] as const);`, '']];
}

// function mediaTypeToName(mediaType: string): string {
//     switch (mediaType.toLowerCase()) {
//         case 'application/json': return 'json';
//         case 'application/x-www-form-urlencoded': return 'urlEncoded';
//         case 'multipart/form-data': return 'formData';
//         default: throw new Error(`Unknown media type ${mediaType}`);
//     }
// }
function statusToCondition(status: string, paramName: string): [condition: string, precision: number] {
    if (/^\dXX$/i.test(status)) {
        return [`${paramName} >= ${status[0]}00 && ${paramName} <= ${status[0]}99`, 100];
    }
    if (/^\d{3}$/) {
        return [`${paramName} === ${status}`, 1];
    }
    throw new Error(`Unsupported status template: ${status}`);
}
function statusToResponseKind(status: string) {
    return status[0] !== '2' ? 'error' : 'data';
}

function* generateReadResponseContentTypeHandler(indent: string, type: Type | undefined, kind: 'data' | 'error' | 'ratelimit' | 'default') {
    switch (kind) {
        case 'error':
            if (type === undefined)
                yield* [[`${indent}throw new DiscordRestError(null, \`Unexpected status code \${statusCode} response\`);`, '']];
            else
                yield* [[`${indent}throw new DiscordRestError(await resolve(contentType, content) as `], type.inline('~'), [');', '']];
            break;
        case 'ratelimit':
            yield [`${indent}throw new DiscordRateLimitError(await resolve(contentType, content) as RateLimitError);`, ''];
            break;
        case 'data':
            if (type === undefined)
                yield [`${indent}return undefined;`, ''];
            else
                yield* [[`${indent}return await resolve(contentType, content) as `], type.inline('~'), [';', '']];
            break;
        case 'default':
            if (type === undefined)
                yield [`${indent}return undefined;`, ''];
            else {
                yield* [[`${indent}if (statusCode >= 200 && statusCode < 300) {`, '']];
                yield* [[`${indent}    return await resolve(contentType, content) as `], type.inline('~'), [';', '']];
                yield* [[`${indent}} else {`, '']];
                yield* [[`${indent}    throw new DiscordRestError(await resolve(contentType, content) as `], type.inline('~'), [');', '']];
                yield* [[`${indent}}`, '']];
            }
            break;
    }
}

function* generateReadResponseStatusCodeHandler(indent: string, config: Record<string, { kind: 'ratelimit' | 'error' | 'data' | 'default'; type: Type | undefined; }>) {
    const { '': defaultContent, ...contentTypes } = config;
    for (const [condition, { kind, type }] of Object.entries(contentTypes)) {
        yield* [[`        if (${condition}) {`, '']];
        yield* generateReadResponseContentTypeHandler(indent + '    ', type, kind);
        yield* [['        }', '']];
    }
    if (defaultContent !== undefined)
        yield* generateReadResponseContentTypeHandler(indent, defaultContent.type, defaultContent.kind);
    else
        yield* [['        throw new DiscordRestError(null, `Unexpected content type ${JSON.stringify(contentType)} response with status code ${statusCode}`);', '']];
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