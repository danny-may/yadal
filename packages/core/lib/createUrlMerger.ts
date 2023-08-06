type MergeAction = 'baseUrl' | 'merge' | 'targetUrl';
type MergeSearchAction = 'baseUrl' | 'targetUrl' | 'merge:append' | 'merge:set';
type MergeSearchValueAction = 'append' | 'set' | 'ignore' | undefined;

export interface URLMergerConfig {
    readonly protocol?: MergeAction;
    readonly hostname?: MergeAction;
    readonly username?: MergeAction;
    readonly password?: MergeAction;
    readonly port?: MergeAction;
    readonly hash?: MergeAction;
    readonly pathname?: MergeAction;
    readonly searchParams?: MergeSearchAction | {
        readonly default?: MergeSearchValueAction;
        readonly byKey?: Readonly<Record<string, MergeSearchValueAction>>;
    }
}
interface ResolvedConfig {
    readonly protocol: MergeAction;
    readonly hostname: MergeAction;
    readonly username: MergeAction;
    readonly password: MergeAction;
    readonly port: MergeAction;
    readonly hash: MergeAction;
    readonly pathname: MergeAction;
    readonly searchParams: MergeSearchAction | {
        readonly default: NonNullable<MergeSearchValueAction>;
        readonly byKey: Readonly<Record<string, MergeSearchValueAction>>;
    }
}

export function createUrlMerger(baseUrl: URL, config: URLMergerConfig = {}): (url: URL) => URL {
    const cfg = resolveConfig(config);
    const source: Array<string> = [];
    const target = 'url';
    for (const prop of props)
        source.push(...configProcessor[prop](baseUrl[prop] as never, cfg[prop] as never, prop as never, target));
    const transform = new Function(target, source.filter(v => v).join('\n')) as (url: Pick<URL, typeof props[number]>) => void;
    return mergeUrl(transform);
}

function resolveConfig({
    hostname = 'baseUrl',
    password = 'baseUrl',
    protocol = 'baseUrl',
    username = 'baseUrl',
    pathname = 'merge',
    hash = 'merge',
    port = 'merge',
    searchParams = 'merge:append'
}: URLMergerConfig): ResolvedConfig {
    return {
        hash,
        password,
        pathname,
        port,
        protocol,
        username,
        hostname,
        searchParams: typeof searchParams === 'object'
            ? resolveSearchParams(searchParams)
            : searchParams
    };
}
function resolveSearchParams({ byKey = {}, default: def = 'ignore' }: Extract<URLMergerConfig['searchParams'], object>) {
    return { byKey, default: def };
}

const configProcessor: { [P in keyof ResolvedConfig]: (value: URL[P], config: ResolvedConfig[P], prop: P, target: string) => Iterable<string> } = {
    protocol(value, config, prop, target) {
        return callMergeAction(mergeUnit, config, target, prop, value);
    },
    hostname(value, config, prop, target) {
        return callMergeAction(mergeUnit, config, target, prop, value);
    },
    username(value, config, prop, target) {
        return callMergeAction(mergeUnit, config, target, prop, value);
    },
    password(value, config, prop, target) {
        return callMergeAction(mergeUnit, config, target, prop, value);
    },
    port(value, config, prop, target) {
        return callMergeAction(mergeUnit, config, target, prop, value);
    },
    hash(value, config, prop, target) {
        return callMergeAction(mergeUnit, config, target, prop, value);
    },
    pathname(value, config, prop, target) {
        return callMergeAction(mergePath, config, target, prop, value);
    },
    *searchParams(values, config, prop, target) {
        switch (config) {
            case 'baseUrl': return yield `${target}.${prop} = new URLSearchParams(${JSON.stringify([...values])});`;
            case 'targetUrl': return;
            case 'merge:append': config = { default: 'append', byKey: {} }; break;
            case 'merge:set': config = { default: 'set', byKey: {} }; break;
            default: if (typeof config !== 'object')
                return unknownAction(target, prop, values, config)
        }

        const merger = mergeSearchValue();
        for (const [key, value] of values) {
            const action = config.byKey[key] ?? config.default;
            yield* callMergeAction(merger, action, target, prop, { key, value });
        }
    }
}
const props = Object.keys(configProcessor) as Array<keyof typeof configProcessor> satisfies Array<keyof URL>;

function mergeUrl(transformer: (value: Pick<URL, typeof props[number]>) => void) {
    return (url: URL) => {
        const context = clone(url);
        transformer(context);
        return toUrl(context);
    }
}

function clone(url: URL): Pick<URL, typeof props[number]> {
    return {
        hash: url.hash,
        hostname: url.hostname,
        password: url.password,
        pathname: url.pathname,
        port: url.port,
        protocol: url.protocol,
        searchParams: new URLSearchParams(url.searchParams),
        username: url.username
    }
}

function toUrl(value: Pick<URL, typeof props[number]>): URL {
    const result = [value.protocol];
    if (value.hostname) {
        result.push('//');
        if (value.username) {
            result.push(value.username);
            if (value.password)
                result.push(':', value.password);
            result.push('@');
        }
        result.push(value.hostname);
        if (value.port)
            result.push(':', value.port);
    }
    result.push(value.pathname);
    if (value.searchParams.size)
        result.push('?', value.searchParams.toString());
    result.push(value.hash);
    return new URL(result.join(''));
}
const mergePath: Record<MergeAction, MergeActionImpl> = {
    *merge(target, prop, value) {
        if (value.endsWith('/'))
            value = value.slice(0, -1);
        if (value !== '/')
            yield `${target}.${prop} = ${JSON.stringify(value)} + ${target}.${prop};`
    },
    *baseUrl(target, prop, value) {
        if (value !== '/')
            yield `${target}.${prop} = ${JSON.stringify(value)};`
    },
    *targetUrl() {
    }
}
function mergeSearchValue(): Record<PropertyKey & MergeSearchValueAction, MergeActionImpl<{ key: string, value: string }>> {
    const seen = new Set<string>();
    return {
        *append(target, prop, { key, value }) {
            yield `${target}.${prop}.append(${JSON.stringify(key)}, ${JSON.stringify(value)});`;
        },
        *set(target, prop, { key, value }) {
            const method = seen.size < seen.add(key).size ? 'set' : 'append';
            yield `${target}.${prop}.${method}(${JSON.stringify(key)}, ${JSON.stringify(value)});`;
        },
        *ignore() {
        }
    }
}
const mergeUnit: Record<MergeAction, MergeActionImpl> = {
    *merge(target, prop, value) {
        yield `${target}.${prop} ||= ${JSON.stringify(value)};`;
    },
    *baseUrl(target, prop, value) {
        yield `${target}.${prop} = ${JSON.stringify(value)};`;
    },
    *targetUrl() {
    }
}

type MergeProp = typeof props[number];
type MergeActionImpl<V = string> = (target: string, prop: MergeProp, value: V, action: string) => Iterable<string>;
type Pop<T extends readonly unknown[]> = T extends [...infer Result, any] ? Result : never;

function unknownAction(...[, prop, , action]: Parameters<MergeActionImpl<unknown>>): never {
    throw new Error(`Unknown configuration ${JSON.stringify(action)} for merging the ${prop}`)
}

function callMergeAction<T extends PropertyKey, V>(actions: Record<T, MergeActionImpl<V>>, action: T, ...args: Pop<Parameters<MergeActionImpl<V>>>): Iterable<string> {
    const merger = actions[action] ?? unknownAction;
    return merger(...args, String(action));
}