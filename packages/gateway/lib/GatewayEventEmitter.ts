import { GatewayEvent, GatewayEventConsumer, GatewayEvents, gatewayEvents } from "./GatewayEventConsumer.js";

export class GatewayEventEmitter {
    readonly #handlers: { [P in GatewayEvent]?: Map<symbol, (...args: GatewayEvents[P]) => void> }
    readonly #deferred: Map<symbol, GatewayEventEmitter>;
    readonly #asConsumer = Object.freeze({ unhandled: this.emit.bind(this) });
    static readonly #consumerMap = new WeakMap<GatewayEventConsumer, GatewayEventEmitter>();

    constructor() {
        this.#handlers = {};
        this.#deferred = new Map();
        GatewayEventEmitter.#consumerMap.set(this.#asConsumer, this);
    }

    asConsumer(): GatewayEventConsumer {
        return this.#asConsumer;
    }

    handle(consumer: GatewayEventConsumer): Disposable {
        const stack = new DisposableStack();
        const id = Symbol();
        const deferred = GatewayEventEmitter.#consumerMap.get(consumer)
        if (deferred !== undefined) {
            this.#deferred.set(id, deferred);
            stack.defer(() => this.#deferred.delete(id));
        } else {
            for (const event of gatewayEvents) {
                const handler = consumer[event] ?? consumer.unhandled?.bind(null, event);
                if (handler === undefined)
                    continue;
                const handlers = (this.#handlers[event] as Map<symbol, typeof handler>) ??= new Map();
                handlers.set(id, handler);
                stack.defer(() => {
                    if (handlers.delete(id) && handlers.size === 0)
                        delete this.#handlers[event];
                });
            }
        }
        return stack;
    }

    emit<Event extends keyof GatewayEvents>(event: Event, ...args: GatewayEvents[Event]) {
        this.#emit(event, args);
    }

    #emit<Event extends keyof GatewayEvents>(event: Event, args: GatewayEvents[Event]) {
        const handlers = this.#handlers[event]
        if (handlers !== undefined && handlers.size > 0)
            for (const handler of handlers.values())
                handler(...args);

        for (const deferred of this.#deferred.values())
            deferred.#emit(event, args);
    }
}
