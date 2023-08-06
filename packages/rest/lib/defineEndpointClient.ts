import { IEndpoint, IEndpointClient } from "./endpoints/index.js";

type RestMethods<T extends Record<PropertyKey, IEndpoint<object, unknown>>> = {
    [P in keyof T]: T[P] extends IEndpoint<infer Model, infer Result>
    ? RestMethod<Model, Result>
    : never;
}
type RestMethod<Model extends object, Result> = (...args: RestMethodArgs<Model>) => Promise<Result>
type RestMethodArgs<Model extends object> = [{}] extends [Model] ? [signal?: AbortSignal] : [request: Model, signal?: AbortSignal];

export function defineEndpointClient<T extends Record<PropertyKey, IEndpoint<any, any>>>(endpoints: T) {
    return class BoundEndpointClient {
        readonly #client: IEndpointClient;
        constructor(client: IEndpointClient) {
            this.#client = client;
        }

        static {
            for (const key of Reflect.ownKeys(endpoints)) {
                Object.defineProperty(this.prototype, key, {
                    configurable: true,
                    writable: true,
                    value: this.#bindEndpoint(key, endpoints[key]!)
                });
            }
        }

        static #bindEndpoint<K extends PropertyKey, Model extends object, Result>(key: K, endpoint: IEndpoint<Model, Result>) {
            const result = {
                [key](this: BoundEndpointClient, ...args: RestMethodArgs<Model>) {
                    return args[0] instanceof AbortSignal
                        ? this.#client.send(endpoint, {} as Model, args[0])
                        : this.#client.send(endpoint, args[0]!, args[1]);
                }
            };
            return result[key as keyof typeof result];
        }
    } as unknown as new (client: IEndpointClient) => RestMethods<T>
}
