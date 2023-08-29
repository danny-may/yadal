import { OperationObject, ParameterObject } from "openapi-typescript";
import { HttpMethod } from "../../lib/http/index.js";
import { wellKnownEncodings } from "./parser/parseStringType.js";
import { rateLimitError } from './augmentations/index.js';
import { escapeRegex } from "@yadal/core";
import { noRef, snakeCaseToCamelCase, source } from "./util/index.js";
import { ImportFromDetails } from "./output.js";
import { TypeBuilderResult } from "./parser/index.js";
import { InterfaceProperty, InterfaceType, IntersectionType, LiteralType, Type, UnionType } from "./types/index.js";

const emptyObj = new InterfaceType({ properties: [] });
const empty = new LiteralType({ value: 'undefined' });
export function* defineEndpoint(
    id: string,
    method: Lowercase<HttpMethod>,
    operation: OperationObject,
    url: string,
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

    for (const tag of operation.tags?.map(t => `${t}/`) ?? ['']) {
        const fullName = snakeCaseToCamelCase(`${tag.slice(0, -1)}_${id}`);
        const imports: ImportFromDetails[] = [];

        yield {
            imports,
            contents: source`export const name = ${JSON.stringify(fullName)};
${defineRoute(method, pathType, imports, typesUrl, fullName, url, operation.security?.reduce((p, c) => Object.assign(p, c), {}) ?? {})}
${defineQuery(queryType, imports, typesUrl, fullName)}
${defineHeader(headerType, imports, typesUrl, fullName)}
${defineResponse(imports, helperUrl, responseType, fullName, responseTypes, typesUrl)}
${defineRequest(bodyTypes, imports, helperUrl, typesUrl)}`,
            name: `${tag}${name}.ts`
        };
    }
}



function defineRequest(bodyTypes: { contentType: string; type: Type | undefined; }[], imports: ImportFromDetails[], helperUrl: URL, typesUrl: URL) {
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

    const extern = {} as Record<string, Iterable<string>>;
    const bodyUnion = new UnionType({ types: bodyTypeUnion });
    const parts = [...differentiateBodyTypes(bodyTypes, (type, contentType) => {
        if (isNonObjectType(type))
            return defineNestedBody(contentType, 'data', extern);
        const props = getAllProperties(type);
        if (props !== null)
            return defineInlineBody(contentType, props, extern);
        return source`throw new DiscordRestError(null, "Unsupported type")`;
    })];
    return source`export type Body = ${bodyUnion.inline('~')};
export function createBody(model: Body): { type: string; content: ArrayBufferView[]; } {
    ${parts}
}
${source([], ...Object.values(extern))}`;
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

function differentiateBodyTypes(bodyTypes: { contentType: string; type: Type | undefined; }[], selector: (type: Type, contentType: string) => Iterable<string>) {
    if (bodyTypes.length === 1) {
        const { type, contentType } = bodyTypes[0]!;
        return source`${selector(type!, contentType)}\n`;
    } else {
        const match = bodyTypes.find(b => b.contentType === 'multipart/form-data')
            ?? bodyTypes.find(b => b.contentType === 'application/json');
        if (match === undefined)
            throw new Error('No supported body type found');
        const { type, contentType } = match;
        return source`${selector(type!, contentType)}\n`;
    }
}

function defineJsonInlineRequest(props: Iterable<{ name: string, optional: boolean; }>, extern: Record<string, Iterable<string>>) {
    const preEncoded = {
        ',': ',',
        '{': '{',
        '}': '}'
    } as Record<string, string>;
    const optional: string[] = [];
    const required: string[] = [];
    for (const prop of props) {
        const name = JSON.stringify(prop.name);
        preEncoded[`${name}:`] = `${name}:`;
        if (prop.optional)
            optional.push(name);
        else
            required.push(name);
    }
    const jsonEncodedProps = Object.entries(preEncoded)
        .map(x => `    ${JSON.stringify(x[0])}:encoder.encode(${JSON.stringify(x[1])})`)
        .join(',\n')
    extern.encoder = declareEncoder;
    extern.jsonEncoded = source`const jsonEncoded = {\n${jsonEncodedProps}\n} as const;\n`;
    return source`const chunks = [
    jsonEncoded["{"]${source([], ...(function* () {
        for (let i = 0; i < required.length; i++)
            yield source`,${i === 0 ? '' : 'jsonEncoded[","],'}\njsonEncoded[${JSON.stringify(`${required[i]!}:`)}], encoder.encode(JSON.stringify(model[${required[i]!}]))`;
        yield optional.length === 0
            ? source`,\njsonEncoded["}"]`
            : source``;
    })())}
];
${source([], ...(function* () {
        if (required.length === 0) {
            for (const name of optional) {
                yield source`if (${name} in model) {
    const value = model[${name}];
    if (value !== undefined) {
        if (chunks.length > 1)
            chunks.push(jsonEncoded[","]);
        chunks.push(jsonEncoded[${JSON.stringify(`${name}:`)}], encoder.encode(JSON.stringify(value)));
    }
}
`
            }
        } else {
            for (const name of optional) {
                yield source`if (${name} in model) {
    const value = model[${name}];
    if (value !== undefined) {
        chunks.push(jsonEncoded[","], jsonEncoded[${JSON.stringify(`${name}:`)}], encoder.encode(JSON.stringify(value)));
    }
}
`
            }
        }
        if (optional.length > 0) {
            yield source`chunks.push(jsonEncoded["}"]);`;
        }
    })())}
return { type: \`application/json; charset=\${encoder.encoding}\`, content: chunks };`;
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
    const optional: Map<string, Iterable<string>> = new Map();
    const required: Array<Iterable<string>> = [];
    for (const prop of props) {
        if (prop.optional)
            optional.set(prop.name, propertyChunks(prop.name, 'value', prop.type, preEncoded));
        else
            required.push(propertyChunks(prop.name, `${model}[${JSON.stringify(prop.name)}]`, prop.type, preEncoded))
    }
    const formEncodedProps = Object.entries(preEncoded)
        .map(x => `    ${JSON.stringify(x[0])}:encoder.encode(${JSON.stringify(x[1])})`)
        .join(',\n')
    extern.encoder = declareEncoder;
    extern.formEncoded = [`const formEncoded = {\n${formEncodedProps}\n} as const;`, ''];
    return source`const boundaryStr = \`boundary-\${[...new Array(4)].map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)).join(\'-\')}\`;
const boundary = encoder.encode(boundaryStr);
const chunks = [
    ${source([], ...(function* () {
        for (let i = 0; i < required.length; i++) {
            yield i === 0 ? required[i]! : source`,\n${required[i]!}`;
        }
        if (optional.size === 0) {
            yield source`formEncoded["--"], boundary, formEncoded["--"]`
        }
    })())}
];
${source([], ...(function* () {
        if (optional.size === 0)
            return;

        for (const [key, chunks] of optional) {
            yield source`if (${JSON.stringify(key)} in ${model}) {
    const value = ${model}[${JSON.stringify(key)}];
    if (value !== undefined) {
        chunks.push(${chunks});
    }
}
`;
        }
        yield source`chunks.push(formEncoded["--"], boundary, formEncoded["--"]);`;
    })())}
return { type: \`multipart/form-data; boundary=\${boundaryStr}; charset=\${encoder.encoding}\`, content: chunks };`;

    function propertyChunks(key: string, value: string, type: Type, formEncoded: Record<string, string>) {
        if (type === wellKnownEncodings.binary || (type instanceof LiteralType && type.value === wellKnownEncodings.binary.name)) {
            const k1 = `${JSON.stringify(key)}.1`;
            const k2 = `${JSON.stringify(key)}.2`;
            formEncoded[k1] = `\nContent-Disposition: form-data; name=${key}; filename=`;
            formEncoded[k2] = `\nContent-Type: `;

            return source`...(({ name, content, contentType }) => [formEncoded["--"], boundary, formEncoded[${JSON.stringify(k1)}], encoder.encode(encodeURIComponent(name ?? ${JSON.stringify(key)})), formEncoded[${JSON.stringify(k2)}], encoder.encode(contentType ?? "application/octet-stream"), formEncoded["lf"], formEncoded["lf"], content, formEncoded["lf"]])(${value})`;
        } else {
            const k = `${JSON.stringify(key)}.1`;
            formEncoded[k] = `\nContent-Disposition: form-data; name=${key}\nContent-Type: application/json\n\n`;
            return source`formEncoded["--"], boundary, formEncoded[${JSON.stringify(k)}], encoder.encode(JSON.stringify(${value})), formEncoded["lf"]`;
        }
    }
}

function defineResponse(imports: ImportFromDetails[], helperUrl: URL, responseType: LiteralType | UnionType, fullName: string, responseTypes: { statusPattern: string; contentType: string | undefined; type: Type | undefined; }[], typesUrl: URL) {
    imports.push({ file: helperUrl, exported: 'DiscordRestError', isType: false });
    imports.push({ file: helperUrl, exported: 'DiscordRateLimitError', isType: false });
    imports.push({ file: typesUrl, exported: 'RateLimitError', isType: true });
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
    const { '': { contentTypes: statusElse } = { contentTypes: undefined }, ...statuses } = conditions;
    return source`export type Response = ${responseType.inline(`${fullName}Response`)};
export async function readResponse<R>(statusCode: number, contentType: string | undefined, content: R, resolve: (contentType: string, content: R) => Promise<unknown>): Promise<Response> {
    ${source([], ...(function* () {
        for (const [condition, { contentTypes }] of Object.entries(statuses).sort((a, b) => a[1].precision - b[1].precision)) {
            yield source`if (${condition}) {
    ${generateReadResponseStatusCodeHandler(contentTypes)}
}
`
        }
    })())}${statusElse !== undefined
        ? generateReadResponseStatusCodeHandler(statusElse)
        : ''}throw new DiscordRestError(null, \`Unexpected status code \${statusCode} response\`);
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
        const match = url.match(routeRegex);
        return match === null
            ? null
            : {
                ${matchKeys.map(k => `[${k}]: decodeURIComponent(match.groups![${k}]!)`).join(',\n')}
            };
    },
    parse(url: \`/\${string}\`) {
        const result = route.tryParse(url);
        if (result === null)
            throw new Error('Invalid URL');
        return result;
    }
} as const;
Object.freeze(route);
${defineRateLimit(method, url)}`;
}

function defineRateLimit(method: Lowercase<HttpMethod>, url: string) {
    const rateLimitKeys = [] as string[];
    const ratelimitSource = JSON.stringify(url)
        .slice(1, -1)
        .replace(/`/g, '\\`')
        .replace(/\{(\w+)\}/g, (_, key: string) => getRateLimitTemplateArg(key, url, method, rateLimitKeys));
    const ratelimitArgName = rateLimitKeys.length === 0 ? '_?' : `model`;
    return source`export const rateLimit = {
    global: ${hasGlobalRateLimit(rateLimitKeys).toString()},
    bucket(${ratelimitArgName}: { ${rateLimitKeys.map(k => `["${k}"]: RouteModel["${k}"] | string;`).join(' ')} }) {
        return \`${method} ${ratelimitSource}\` as const;
    }
} as const;
Object.freeze(rateLimit);`
}

function hasGlobalRateLimit(keys: string[]) {
    return keys.includes('interaction_id');
}

function getRateLimitTemplateArg(paramName: string, url: string, method: string, rateLimitKeys: string[]) {
    if (rateLimitKeyCompatibility[paramName]?.some(k => k === undefined ? rateLimitKeys.length === 0 : rateLimitKeys.includes(k))) {
        rateLimitKeys.push(paramName);
        return `\${model.${paramName}}`;
    }
    if (paramName === 'message_id' && url === '/channels/{channel_id}/messages/{message_id}' && method === 'delete') {
        rateLimitKeys.push(paramName);
        return `\${${deleteMessageMessageIdFn('model.message_id')}}`;
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
const deleteMessageMessageIdFn = (value: string) => `((message_id: string) => {
    const age = Date.now() - Number((BigInt(message_id) >> 22n) + 1420070400000n /* Discord epoch */);
    return age < 10000 /* 10 seconds */ ? 'new' : age < 1209600000 /* 2 weeks */ ? 'recent' : 'old';
})(${value})`;

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
function statusToResponseKind(status: string) {
    return status[0] !== '2' ? 'error' : 'data';
}

function generateReadResponseContentTypeHandler(type: Type | undefined, kind: 'data' | 'error' | 'ratelimit' | 'default') {
    switch (kind) {
        case 'error':
            return type === undefined
                ? source`throw new DiscordRestError(null, \`Unexpected status code \${statusCode} response\`);`
                : source`throw new DiscordRestError(await resolve(contentType, content) as ${type.inline('~')});`;
        case 'ratelimit':
            return source`throw new DiscordRateLimitError(await resolve(contentType, content) as RateLimitError);`
        case 'data':
            return type === undefined
                ? source`return undefined;`
                : source`return await resolve(contentType, content) as ${type.inline('~')};`;
        case 'default':
            return type === undefined
                ? source`return undefined;`
                : source`if (statusCode >= 200 && statusCode < 300) {
    return await resolve(contentType, content) as ${type.inline('~')});
} else {
    throw new DiscordRestError(await resolve(contentType, content) as ${type.inline('~')});
}`;
    }
}

function generateReadResponseStatusCodeHandler(config: Record<string, { kind: 'ratelimit' | 'error' | 'data' | 'default'; type: Type | undefined; }>) {
    const { '': defaultContent, ...contentTypes } = config;
    return source`${Object.entries(contentTypes).flatMap(([condition, { kind, type }]) => [
        ...source`if (${condition}) {
    ${generateReadResponseContentTypeHandler(type, kind)}
}
`
    ])}${defaultContent !== undefined
        ? generateReadResponseContentTypeHandler(defaultContent.type, defaultContent.kind)
        : source`throw new DiscordRestError(null, \`Unexpected content type \${JSON.stringify(contentType)} response with status code \${statusCode}\`);`
        }`;
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