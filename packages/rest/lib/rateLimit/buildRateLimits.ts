import { EndpointDefinition, HttpMethod } from '../index.js';
import { IRouteRateLimitConfig } from './RateLimitManager.js';

export function buildRateLimit<T extends EndpointDefinition>(options: T): BuildRateLimit<T>
export function buildRateLimit(options: EndpointDefinition): IRouteRateLimitConfig<object> {
    const { route, rateLimit } = options;
    return Object.freeze<IRouteRateLimitConfig<object>>({
        global: rateLimit.global,
        route,
        getKey(model) {
            return rateLimit.bucket(model);
        }
    })
}
export function buildRateLimits<T extends EndpointDefinition>(options: Iterable<T>) {
    const result = {} as Record<PropertyKey, BuildRateLimit<T>>;
    for (const option of options)
        result[option.name] = buildRateLimit(option);
    return result as { readonly [P in T as P['name']]: BuildRateLimit<P> };
}

type BuildRateLimit<T extends EndpointDefinition> =
    T extends EndpointDefinition<HttpMethod, PropertyKey, infer Model, object, object, unknown, object>
    ? IRouteRateLimitConfig<Model>
    : never;