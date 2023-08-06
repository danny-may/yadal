import { Route } from '../routes/index.js';
import { IRouteRateLimitConfig } from './RateLimitManager.js';

export function buildRateLimit<T extends IRateLimitOptions>(options: T): BuildRateLimit<T>
export function buildRateLimit(options: IRateLimitOptions): IRouteRateLimitConfig<object> {
    const { route, rateLimit: { global = true, pick } = {} } = options;
    const realPick = makePicker(pick);
    const id = `${route.method} ${route.map(v => typeof v === 'string' ? JSON.stringify(v) : v.pattern.toString()).join('')}`;
    return Object.freeze<IRouteRateLimitConfig<object>>({
        global,
        route,
        getKey(model) {
            return JSON.stringify([id, ...realPick(model)]);
        }
    })
}
export function buildRateLimits<T extends Record<PropertyKey, IRateLimitOptions>>(options: T) {
    return Object.freeze(Object.fromEntries(
        Reflect.ownKeys(options)
            .map(k => [k, buildRateLimit(options[k]!)] as const)
    )) as { readonly [P in keyof T]: BuildRateLimit<T[P]> };
}
function makePicker<Model>(pick: Iterable<keyof Model> | ((model: Model) => Iterable<unknown>) | undefined) {
    switch (typeof pick) {
        case 'undefined': return () => [];
        case 'function': return pick;
        case 'object': return function* (m: Model) {
            for (const key of pick)
                yield m[key];
        }
    }
}

type BuildRateLimit<T extends IRateLimitOptions> =
    T extends IRateLimitOptions<infer Model>
    ? IRouteRateLimitConfig<Model>
    : never;

export interface IRateLimitOptions<Model extends object = any> {
    readonly route: Route<Model>;
    readonly rateLimit: {
        readonly global: boolean;
        readonly pick: ((model: Model) => Iterable<unknown>) | Iterable<keyof Model>;
    }
}