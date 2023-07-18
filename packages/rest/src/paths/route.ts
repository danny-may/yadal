import { randomUUID } from "node:crypto";
import { IRoute, RouteModel, RouteSegment } from "./IRoute.js";

export type RouteTemplateArg<Name extends PropertyKey, Type> = {
    (value: Type): string;
    parse(value: string): Type;
    readonly pattern: RegExp;
    readonly key: Name;
}
export type RouteFrom<Args extends RouteTemplateArg<PropertyKey, any>> = IRoute<{
    [P in Args as P['key']]: Parameters<P>[0];
}>;
type RouteFn = <Args extends RouteTemplateArg<PropertyKey, any>[]>(template: TemplateStringsArray, ...args: Args) => RouteFrom<Args[number]>;

export function route(baseUrl: string | URL): RouteFn;
export function route<Args extends RouteTemplateArg<PropertyKey, any>[]>(template: TemplateStringsArray, ...args: Args): RouteFrom<Args[number]>;
export function route(...args:
    | [template: TemplateStringsArray, ...args: RouteTemplateArg<PropertyKey, unknown>[]]
    | [baseUrl: string | URL]
) {
    return Array.isArray(args[0])
        ? routeImpl('relative:/', ...args as Exclude<typeof args, { 0: string | URL }>)
        : routeImpl.bind(null, args[0] as string | URL)
}

function routeImpl<Args extends RouteTemplateArg<PropertyKey, any>[]>(baseUrl: string | URL, template: TemplateStringsArray, ...args: Args): RouteFrom<Args[number]> {
    const getters: Array<(model: Parameters<RouteFrom<Args[number]>['getUrl']>[0]) => string> = [];
    const matchers: Array<string | RouteSegment> = [];

    const segments = toSegments(template, ...args);
    let next = segments.next();
    if (!next.done && next.value.length === 1 && next.value[0] === '')
        next = segments.next();
    while (!next.done) {
        const v = next.value.filter(v => v !== '');
        getters.push(createGetter(v));
        matchers.push(createMatcher(v));
        next = segments.next();
    }

    return {
        getUrl(model) {
            const rel = getters.map(v => v(model)).join('');
            return rel.startsWith('/')
                ? new URL(`.${rel}`, baseUrl)
                : new URL(`./${rel}`, baseUrl)
        },
        segments: matchers
    };
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

const matchers = new WeakMap<RouteTemplateArg<PropertyKey, any>, RouteSegment>();
function createMatcher<Args extends RouteTemplateArg<PropertyKey, any>[]>(segment: Array<string | Args[number]>): string | RouteSegment {
    if (segment.length === 1) {
        const s = segment[0]!;
        if (typeof s === 'string')
            return s;

        let result = matchers.get(s);
        if (result === undefined) {
            assertPatternAnchored(s.pattern);
            matchers.set(s, result = {
                parse(value) {
                    if (!s.pattern.test(value))
                        return { success: false };
                    return {
                        success: true,
                        model: {
                            [s.key]: s.parse(value)
                        } as Partial<RouteModel<RouteFrom<Args[number]>>>
                    }
                }
            })
        }
        return result;
    }

    const regexStr = [];
    const flags = [];
    const props: Array<[string, Args[number]]> = [];
    for (const part of segment) {
        if (typeof part === 'string')
            regexStr.push(part.replaceAll(/[.*+?^${}()|[\]\\]/g, '\\$&'));
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
                return { success: false };

            const model: Record<PropertyKey, unknown> = {};
            for (const [id, part] of props)
                model[part.key] = part.parse(match.groups![id]!);
            return { success: true, model: model as Partial<RouteModel<RouteFrom<Args[number]>>> }
        }
    }
}
function createGetter<Args extends RouteTemplateArg<PropertyKey, any>[]>(segment: Array<string | Args[number]>): (model: Parameters<RouteFrom<Args[number]>['getUrl']>[0]) => string {
    const getters: Array<(model: Parameters<RouteFrom<Args[number]>['getUrl']>[0]) => string> = [];
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

export function str<Name extends PropertyKey>(key: Name): RouteTemplateArg<Name, string> {
    function str(m: string) {
        switch (typeof m) {
            case 'string':
                return m;
            default:
                return String(m);
        }
    }
    return Object.assign(str, { key, pattern: /^.*$/, parse: (v: string) => v });
}
const idRegex = /^\d+$/;
export function id<Name extends PropertyKey>(key: Name): RouteTemplateArg<Name, string | bigint> {
    function id(m: string | bigint) {
        switch (typeof m) {
            case 'bigint':
                return m.toString();
            case 'string': if (idRegex.test(m))
                return m;
            default:
                throw new Error('Value is not a valid id');
        }
    }
    return Object.assign(id, { key, pattern: idRegex, parse: (v: string) => BigInt(v) });
}
