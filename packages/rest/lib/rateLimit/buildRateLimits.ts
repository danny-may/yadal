import { HttpMethod } from '../http/index.js';
import { Route } from '../routes/index.js';
import { IRouteRateLimitConfig } from './RateLimitManager.js';

export function buildRateLimit<T extends RateLimitDefinition>(options: T): BuildRateLimit<T>
export function buildRateLimit(options: RateLimitDefinition): IRouteRateLimitConfig<object> {
    const { route, rateLimit } = options;
    return Object.freeze<IRouteRateLimitConfig<object>>({
        global: rateLimit.global,
        route,
        getKey(model) {
            return rateLimit.bucket(model);
        }
    })
}
export function buildRateLimits<T extends RateLimitDefinition>(options: Iterable<T>) {
    const result = {} as Record<PropertyKey, BuildRateLimit<T>>;
    for (const option of options)
        result[option.name] = buildRateLimit(option);
    return result as { readonly [P in T as P['name']]: BuildRateLimit<P> };
}

type BuildRateLimit<T extends RateLimitDefinition> =
    T extends RateLimitDefinition<infer Model>
    ? IRouteRateLimitConfig<Model>
    : never;

export interface RateLimitDefinition<
    Path extends object = any
> {
    readonly name: PropertyKey;
    readonly route: Route<HttpMethod, Path>;
    readonly rateLimit: RateLimitConfig<Path>;
}

export interface RateLimitConfig<Model extends object> {
    readonly global: boolean;
    bucket(model: { [P in keyof Model]: Model[P] | string }): string;
}