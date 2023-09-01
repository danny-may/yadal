import { HttpMethod, Route } from "@yadal/rest";
import { IRateLimitManager, IRateLimiter } from "./IRateLimitManager.js";
import { IRateLimitService } from "./RateLimitService.js";

export interface IRouteRateLimitConfig<T extends object> {
    readonly global: boolean;
    readonly route: Route<HttpMethod, T>;
    getKey(model: { [P in keyof T]: T[P] | string }): string;
}

export class RateLimitManager implements IRateLimitManager {
    readonly #config: Map<Route<HttpMethod, any>, IRouteRateLimitConfig<any>>;
    readonly #service: IRateLimitService;

    constructor(service: IRateLimitService, config: Iterable<IRouteRateLimitConfig<any>>) {
        this.#service = service;
        this.#config = new Map();
        for (const entry of config)
            this.#config.set(entry.route, entry);
    }

    get<T extends object>(route: Route<HttpMethod, T>, model: T): IRateLimiter | undefined {
        const config = this.#config.get(route) as IRouteRateLimitConfig<T> | undefined;
        if (config === undefined)
            return undefined

        const key = config.getKey(model);
        return {
            clear: this.#service.clear.bind(this.#service, key),
            update: this.#service.update.bind(this.#service, key),
            wait: this.#service.wait.bind(this.#service, key, config.global)
        }
    }

    clear(): void {
        this.#service.clear();
    }
}