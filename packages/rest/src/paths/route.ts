import { IRoute } from "./IRoute.js";

export type RouteTemplateArg<Name extends PropertyKey, Type> = {
    (value: Type): string;
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
    const factory: Array<(model: {
        [P in Args[number]as P['key']]: Parameters<P>[0];
    }) => string> = [];
    for (let i = 0; i < template.length; i++) {
        const value = template[i]!;
        factory[i * 2] = () => value;
    }
    for (let i = 0; i < args.length; i++) {
        const impl: Args[number] = args[i]!;
        const key: Args[number]['key'] = impl.key;
        factory[i * 2 + 1] = m => encodeURIComponent(impl(m[key]));
    }
    return {
        getUrl(model) {
            return new URL(factory.map(v => v(model)).join(''), baseUrl);
        }
    };
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
    return Object.assign(str, { key });
}
const snowflakeRegex = /^\d+$/;
export function id<Name extends PropertyKey>(key: Name): RouteTemplateArg<Name, string | bigint> {
    function id(m: string | bigint) {
        switch (typeof m) {
            case 'bigint':
                return m.toString();
            case 'string': if (snowflakeRegex.test(m))
                return m;
            default:
                throw new Error('Value is not a valid id');
        }
    }
    return Object.assign(id, { key });
}
