import { HttpMethod } from "../index.js";
import { Route } from "./Route.js";

export class RouteMatcher<T extends object> {
    readonly #routes: Route<HttpMethod, T>[];

    constructor(routes: Iterable<Route<HttpMethod, T>>) {
        this.#routes = [...routes];
    }

    * match(method: HttpMethod, path: `/${string}`) {
        for (const route of this.#routes) {
            if (route.method !== method)
                continue;
            const model = route.tryParse(path);
            if (model !== null)
                yield { route, model };
        }
    }
}
