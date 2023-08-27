import { randomUUID } from "node:crypto";
import { IRoute, RouteModel, RouteSegment } from "./_IRoute.js";
import { HttpMethod } from "../index.js";

export type RouteTemplateArg<Name extends PropertyKey, Type> = {
    (value: Type): string;
    parse(value: string): Type;
    readonly pattern: RegExp;
    readonly key: Name;
}
export type RouteFrom<Args extends RouteTemplateArg<PropertyKey, any>[]> = IRoute<{ [P in Args[number]as P['key']]: Parameters<P>[0]; }>;
export type RouteFactory = <Args extends RouteTemplateArg<PropertyKey, any>[]>(template: TemplateStringsArray, ...args: Args) => RouteFrom<Args>
export const route: { readonly [P in HttpMethod]: RouteFactory } = {
    CONNECT: (template, ...args) => buildRoute('CONNECT', template, args),
    DELETE: (template, ...args) => buildRoute('DELETE', template, args),
    GET: (template, ...args) => buildRoute('GET', template, args),
    HEAD: (template, ...args) => buildRoute('HEAD', template, args),
    PATCH: (template, ...args) => buildRoute('PATCH', template, args),
    POST: (template, ...args) => buildRoute('POST', template, args),
    PUT: (template, ...args) => buildRoute('PUT', template, args),
    TRACE: (template, ...args) => buildRoute('TRACE', template, args),
    OPTIONS: (template, ...args) => buildRoute('OPTIONS', template, args),
};
Object.freeze(route);

function buildRoute<Args extends RouteTemplateArg<PropertyKey, any>[]>(method: HttpMethod, template: TemplateStringsArray, args: Args): RouteFrom<Args> {
    const getters: Array<(model: Parameters<RouteFrom<Args>['getUrl']>[0]) => string> = [];
    const matchers: Array<RouteSegment> = [];
    const idParts: string[] = [];

    const segments = toSegments(template, ...args);
    let next = segments.next();
    if (!next.done && next.value.length === 1 && next.value[0] === '')
        next = segments.next();
    while (!next.done) {
        const v = next.value.filter(v => v !== '');
        getters.push(createGetter(v));
        matchers.push(createMatcher(v));
        idParts.push(createId(v));
        next = segments.next();
    }
    return {
        method,
        id: [method, ...idParts].join('/'),
        parse: buildParser(matchers),
        getUrl: (model: RouteModel<RouteFrom<Args>>) => new URL(getters.map(v => v(model)).join('/'))
    };
}

function buildParser(matchers: RouteSegment[]): IRoute<object>['parse'] {
    const rootSegment = matchers.reduceRight((p, c) => {
        if (c.next !== undefined)
            throw new Error('aaaaaa');
        return Object.assign(c, { next: p })
    })

    return Object.assign(function parse(url: URL): Record<PropertyKey, unknown> | undefined {
        const segments = url.href.split('/');
        if (segments.length !== matchers.length)
            return undefined;
        const model = {};
        let node = rootSegment;
        for (const segment of segments) {
            const res = node.parse(segment);
            if (res === undefined)
                return undefined;
            Object.assign(model, res);
            node = node.next!
        }
        return model;
    }, { rootSegment })
}

function* toSegments<Args extends RouteTemplateArg<PropertyKey, any>[]>(template: TemplateStringsArray, ...args: Args) {
    if (args.length !== template.length - 1)
        throw new Error('Number of args must be 1 less than the number of template parts');
    let argI = 0;
    const pending: Array<string | Args[number]> = [];
    for (const x of template) {
        const segments = x.split('/');
        pending.push(segments.shift()!);
        for (const segment of segments) {
            yield pending.splice(0, pending.length);
            pending.push(segment);
        }
        pending.push(args[argI++]!);
    }
    pending.pop(); // remove last element: pending.push(args[args.length]) => pending.push(undefined)
    yield pending;
}

function assertPatternAnchored(pattern: RegExp) {
    if (!pattern.source.startsWith('^') || !pattern.source.endsWith('$'))
        throw new Error('Component patterns must be anchored to both the start and end');
}

const matchers = new WeakMap<RouteTemplateArg<PropertyKey, any>, RouteSegment['parse']>();
function createMatcher<Args extends RouteTemplateArg<PropertyKey, any>[]>(segment: Array<string | Args[number]>): RouteSegment {
    if (segment.length === 1) {
        const s = segment[0]!;
        if (typeof s === 'string') {
            return {
                literal: s,
                parse(value) {
                    if (value === s)
                        return {};
                    return undefined
                }
            }
        }

        let parse = matchers.get(s);
        if (parse === undefined) {
            assertPatternAnchored(s.pattern);
            matchers.set(s, parse = function parse(value) {
                if (!s.pattern.test(value))
                    return undefined;
                return {
                    [s.key]: s.parse(decodeURIComponent(value))
                }
            })
        }
        return { parse };
    }

    const regexStr = [];
    const flags = [];
    const props: Array<[string, Args[number]]> = [];
    for (const part of segment) {
        if (typeof part === 'string')
            regexStr.push(escapeRegex(part));
        else {
            assertPatternAnchored(part.pattern);
            const id = `CG_${randomUUID()}`.replaceAll('-', '_');
            regexStr.push(`(?<${id}>${part.pattern.source.slice(1, -1)})`);
            flags.push(...part.pattern.flags);
            props.push([id, part]);
        }
    }
    const matcher = new RegExp(`^${regexStr.join('')}$`, [...new Set(flags)].join(''));
    return {
        parse(value) {
            const match = value.match(matcher);
            if (match === null)
                return undefined;

            const model: Record<PropertyKey, unknown> = {};
            for (const [id, part] of props)
                model[part.key] = part.parse(decodeURIComponent(match.groups![id]!));
            return model as Partial<RouteModel<RouteFrom<Args>>>
        }
    }
}
function escapeRegex(value: string): string {
    return value.replaceAll(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
function createGetter<Args extends RouteTemplateArg<PropertyKey, any>[]>(segment: Array<string | Args[number]>): (model: Parameters<RouteFrom<Args>['getUrl']>[0]) => string {
    const getters: Array<(model: Parameters<RouteFrom<Args>['getUrl']>[0]) => string> = [];
    for (const v of segment) {
        if (typeof v === 'string')
            getters.push(() => v);
        else
            getters.push(m => encodeURIComponent(v(m[v.key as Args[number]['key']])));
    }
    return getters.length === 1
        ? getters[0]!
        : v => getters.map(g => g(v)).join('')
}
function createId<Args extends RouteTemplateArg<PropertyKey, any>[]>(segment: Array<string | Args[number]>): string {
    const id: Array<string> = [];
    for (const v of segment) {
        if (typeof v === 'string')
            id.push(JSON.stringify(v));
        else if (typeof v.key === 'symbol')
            id.push(`[${String(v.key)}]`);
        else
            id.push(`[${JSON.stringify(v.key)}]`)
    }
    return id.join('');
}
function toJSON(value: { toJSON?: unknown }) {
    const toJSON = value.toJSON;
    if (typeof toJSON !== 'function')
        return undefined;

    const json = toJSON.call(value);
    if (typeof json !== 'string')
        return undefined;
    return json;
}

type TypeofResult = {
    bigint: bigint,
    string: string,
    number: number,
    boolean: boolean,
    object: object,
    function: Function,
    symbol: symbol,
    undefined: undefined,
    null: null,
}
function typeOf(value: unknown): keyof TypeofResult {
    const type = typeof value;
    return type === 'object' && value === null ? 'null' : type;
}

function makeRouteTemplateArgFactory<Value>(
    type: string,
    pattern: RegExp,
    parse: (value: string) => Value,
    cases: { [P in keyof TypeofResult]?: Array<(value: TypeofResult[P]) => string | undefined | false | Iterable<unknown>> }
): <Name extends PropertyKey>(name: Name) => RouteTemplateArg<Name, Value>
function makeRouteTemplateArgFactory<Value>(
    type: string,
    pattern: RegExp,
    parse: (value: string) => Value,
    cases: { [P in keyof TypeofResult]?: Array<(value: TypeofResult[P]) => string | undefined | false | Iterable<unknown>> }
): (name: PropertyKey) => RouteTemplateArg<PropertyKey, Value> {
    const cache = new Map<PropertyKey, RouteTemplateArg<PropertyKey, Value>>();
    return name => {
        let result = cache.get(name);
        if (result === undefined) {
            function tryConvert(value: unknown): string | undefined {
                for (const handler of cases[typeOf(value)] ?? []) {
                    const result = handler(value as never);
                    switch (typeof result) {
                        case 'string': return result;
                        case 'boolean': throw new Error(`Value is not a valid ${type} [prop: ${String(name)}]`);
                        case 'undefined': break;
                        case 'object': for (const value of result) {
                            const r = tryConvert(value);
                            if (r !== undefined)
                                return r;
                        }
                    }
                }
                return undefined;
            }
            cache.set(name, result = Object.assign((v: unknown) => {
                const result = tryConvert(v);
                if (result === undefined)
                    throw new Error(`Cannot convert ${typeOf(v)} to ${type} [prop: ${String(name)}]`);
                return result;
            }, { key: name, pattern, parse }));
        }
        return result;
    }
}

export const stringArg = makeRouteTemplateArgFactory<string>('string', /^.*$/, v => v, {
    string: [v => v],
    boolean: [v => v.toString()],
    number: [v => v.toString()],
    bigint: [v => v.toString()],
    object: [toJSON]
});

export const numberArg = makeRouteTemplateArgFactory<number>('number', /^[+-]?\d+(?:\.\d+)?$/, Number, {
    number: [v => v.toString()],
    bigint: [v => v.toString()]
})

const idRegex = /^\d+$/;
export const snowflakeArg = makeRouteTemplateArgFactory<bigint | number | string>('snowflake', idRegex, BigInt, {
    bigint: [v => v.toString()],
    number: [v => v % 1 === 0 && v.toString()],
    string: [v => idRegex.test(v) && v]
})

const formatCache = new Map<string, ReturnType<typeof makeRouteTemplateArgFactory<string>>>();
export function choiceArg<const Name extends PropertyKey, const T extends string>(
    name: Name,
    ...values: T[]
): RouteTemplateArg<Name, T>
export function choiceArg(
    name: PropertyKey,
    ...values: string[]
) {
    const key = JSON.stringify(values.sort((a, b) => a < b ? -1 : 1));
    let result = formatCache.get(key);
    if (result === undefined) {
        const regex = new RegExp(`^(?:${values.map(escapeRegex).join('|')})$`);
        const valid = Set.prototype.has.bind(new Set(values.map(v => v)));
        formatCache.set(key, result = makeRouteTemplateArgFactory(values.join(','), regex, v => v, {
            string: [v => valid(v) && v]
        }))
    }
    return result(name);
}