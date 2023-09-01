import { IOperation, IOperationSender } from "./operation/index.js";

type RestMethods<T extends Record<PropertyKey, IOperation<object, unknown>>> = {
    [P in keyof T]: T[P] extends IOperation<infer Model, infer Result>
    ? RestMethod<Model, Result>
    : never;
}
type RestMethod<Model extends object, Result> = (...args: RestMethodArgs<Model>) => Promise<Result>
type RestMethodArgs<Model extends object> = [{}] extends [Model] ? [signal?: AbortSignal] : [request: Model, signal?: AbortSignal];

export function defineOperationClient<T extends Record<PropertyKey, IOperation<any, any>>>(operations: T) {
    return class BoundOperationClient {
        static readonly operations = operations

        readonly #client: IOperationSender;
        constructor(client: IOperationSender) {
            this.#client = client;
        }

        static {
            for (const key of Reflect.ownKeys(operations)) {
                Object.defineProperty(this.prototype, key, {
                    configurable: true,
                    writable: true,
                    value: this.#bindOperation(key, operations[key]!)
                });
            }
        }

        static #bindOperation<K extends PropertyKey, Model extends object, Result>(key: K, operation: IOperation<Model, Result>) {
            const result = {
                [key](this: BoundOperationClient, ...args: RestMethodArgs<Model>) {
                    return args[0] instanceof AbortSignal
                        ? this.#client.send(operation, {} as Model, args[0])
                        : this.#client.send(operation, args[0] ?? {} as Model, args[1]);
                }
            };
            return result[key as keyof typeof result];
        }
    } as unknown as new (client: IOperationSender) => RestMethods<T>
}
