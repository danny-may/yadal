import { HttpMethod } from "../http/index.js";
import { IRoute } from "../paths/index.js";
import { IRateLimitManager, IRateLimiter } from "./IRateLimitManager.js";
import { IRateLimitService } from "./RateLimitService.js";

export interface IRouteRateLimitConfig<T extends object> {
    readonly route: IRoute<T>;
    readonly global: boolean;
    toRouteKey(model: T): T;
}

export class RateLimitManager implements IRateLimitManager {
    readonly #config: Map<IRoute, IRouteRateLimitConfig<object>>;
    readonly #service: IRateLimitService;

    constructor(service: IRateLimitService, config: Iterable<IRouteRateLimitConfig<object>>) {
        this.#service = service;
        this.#config = new Map();
        for (const entry of config)
            this.#config.set(entry.route, entry);
    }

    get<T extends object>(method: HttpMethod, route: IRoute<T>, model: T): IRateLimiter | undefined {
        const config = this.#config.get(route) as IRouteRateLimitConfig<T> | undefined;
        if (config === undefined)
            return undefined

        const key = `${method}_${route.getUrl(config.toRouteKey(model)).toString()}`;
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