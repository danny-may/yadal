import { Deferred, abortListener } from "@yadal/core";
import { ReadableStream } from "node:stream/web";

type EventFrom<Events extends Record<string, readonly unknown[]>> = 'error' | keyof Events;
type EventArgs<Event extends EventFrom<Events>, Events extends Record<string, readonly unknown[]>> =
    Event extends 'error' ? [error: unknown] : Events[Event];

export class EventListenerBase<Events extends Record<string, readonly unknown[]>> {
    readonly #handlers: { [P in EventFrom<Events>]?: Set<(...args: EventArgs<P, Events>) => unknown>; };

    constructor(handlers: { [P in EventFrom<Events>]?: Set<(...args: EventArgs<P, Events>) => unknown>; }) {
        this.#handlers = handlers;
    }

    addEventListener<Event extends EventFrom<Events>>(event: Event, handler: (...args: EventArgs<Event, Events>) => unknown): this {
        const handlers = this.#handlers[event] ??= new Set();
        handlers.add(handler);
        return this;
    }
    removeEventListener<Event extends EventFrom<Events>>(event: Event, handler: (...args: EventArgs<Event, Events>) => unknown): this {
        this.#handlers[event]?.delete(handler);
        return this;
    }
    on<Event extends EventFrom<Events>>(event: Event, handler: (...args: EventArgs<Event, Events>) => unknown): this {
        const handlers = this.#handlers[event] ??= new Set();
        handlers.add(handler);
        return this;
    }
    once<Event extends EventFrom<Events>>(event: Event, handler: (...args: EventArgs<Event, Events>) => unknown): this {
        const handlers = this.#handlers[event] ??= new Set();
        handlers.add(handler);
        return this;
    }
    off<Event extends EventFrom<Events>>(event: Event, handler: (...args: EventArgs<Event, Events>) => unknown): this {
        this.#handlers[event]?.delete(handler);
        return this;
    }

    handle<Event extends EventFrom<Events>>(event: Event, handler: (...args: EventArgs<Event, Events>) => unknown, maxCount = Infinity): Disposable {
        const stack = new DisposableStack();
        stack.use(this.#addHandler(event, handler));
        if (maxCount < Infinity) {
            let remain = maxCount;
            stack.use(this.#addHandler(event, () => {
                if (--remain <= 0)
                    stack.dispose();
            }))
        }

        return {
            [Symbol.dispose]: stack[Symbol.dispose].bind(stack)
        };
    }

    #addHandler<Event extends EventFrom<Events>>(event: Event, handler: (...args: EventArgs<Event, Events>) => unknown): Disposable {
        const handlers = this.#handlers[event] ??= new Set();
        handlers.add(handler);
        return {
            [Symbol.dispose]() { handlers.delete(handler) }
        }
    }

    async wait<Return extends EventFrom<Events>, Throw extends EventFrom<Events>>(events: Return | Return[], options: { throw?: Throw | Throw[]; signal?: AbortSignal } = {}) {
        const returnKeys = toArray<Return>(events);
        if (returnKeys.length === 0)
            throw new Error('No events to return were given');
        const throwKeys = toArray<Throw>(options.throw);

        using stack = new DisposableStack();

        const result = stack.use(new Deferred<Events[Return][0]>());
        stack.use(abortListener(options.signal, result.reject));

        for (const key of returnKeys)
            stack.use(this.handle(key, (...args) => result.resolve(args[0])));
        for (const key of throwKeys)
            stack.use(this.handle(key, (...args) => result.reject(new Error(`Event ${String(key)} was raised.: ${String(args)}`))));

        return await result.promise;
    }

    async * stream<
        Yield extends EventFrom<Events>,
        Throw extends EventFrom<Events>
    >(events: Yield | Yield[], options: { throw?: Throw | Throw[]; signal?: AbortSignal } = {}) {
        const yieldKeys = toArray<Yield>(events);
        if (yieldKeys.length === 0)
            throw new Error('No events to yield were given');
        const throwKeys = toArray<Throw>(options.throw);

        await using stack = new AsyncDisposableStack();
        yield* new ReadableStream<Events[Yield][0]>({
            start: (controller) => {
                stack.defer(controller.close.bind(controller));
                stack.use(abortListener(options.signal, controller.error.bind(controller)));

                for (const key of yieldKeys)
                    stack.use(this.handle(key, (...args) => controller.enqueue(args[0])));
                for (const key of throwKeys)
                    stack.use(this.handle(key, (...args) => controller.error(args[0] ?? new Error(`Event ${String(key)} was raised.`))))
            }
        },);
    }
}

function toArray<T>(source: T | Iterable<T> | undefined): T[] {
    if (source === undefined || source === null)
        return [];
    if (typeof source !== 'object')
        return [source];
    if (Array.isArray(source))
        return source;
    if (Symbol.iterator in source)
        return [...source];
    return [source];
}

export class EventListener<Events extends Record<string, readonly unknown[]>> extends EventListenerBase<Events> {
    constructor(manager: EventManager<Events>) {
        super(getHandlers(manager))
    }
}

let getHandlers: <Events extends Record<string, readonly unknown[]>>(manager: EventManager<Events>) => { [P in EventFrom<Events>]?: Set<(...args: EventArgs<P, Events>) => unknown>; };
export class EventManager<Events extends Record<string, readonly unknown[]>> extends EventListenerBase<Events> {
    readonly listener: EventListener<Events>;
    readonly #handlers: { [P in EventFrom<Events>]?: Set<(...args: EventArgs<P, Events>) => unknown>; };

    static {
        getHandlers = manager => manager.#handlers;
    }

    constructor() {
        const handlers = {};
        super(handlers);
        this.#handlers = handlers;
        this.listener = new EventListener(this);
    }

    /**
     * Emits the event to all currently subscribed listeners
     * @param event The event to emit
     * @param args The args to emit with the event
     * @returns {this}
     */
    emit<Event extends EventFrom<Events>>(event: Event, ...args: EventArgs<Event, Events>): this {
        const handlers = this.#handlers[event];
        if (handlers !== undefined && handlers.size > 0)
            this.#emit(event, handlers, args);
        return this;
    }

    /**
     * Sets a persistent event value such that all new handlers added, and all current handlers
     * will be triggered with the given args
     * @param event The event to emit
     * @param args The args to emit with the event
     */
    set<Event extends EventFrom<Events>>(event: Event, ...args: EventArgs<Event, Events>): this {
        const handlers = this.#handlers[event] ??= new Set();
        handlers.add = (handler) => {
            this.#emit(event, [handler], args);
            return Set.prototype.add.call(handlers, handler);
        };
        if (handlers.size > 0)
            this.#emit(event, handlers, args);

        return this;
    }

    clear<Event extends EventFrom<Events>>(event: Event) {
        const handlers = this.#handlers[event];
        if (handlers !== undefined)
            // @ts-expect-error
            delete handlers.add;
        return this;
    }

    #emit<Args extends readonly unknown[]>(event: EventFrom<Events>, handlers: Iterable<(...args: Args) => unknown>, args: Args) {
        process.nextTick(() => {
            for (const handler of handlers)
                void this.#callHandler(event, handler, args);
        })
    }

    async #callHandler<Args extends readonly unknown[]>(event: EventFrom<Events>, handler: (...args: Args) => unknown, args: Args) {
        try {
            await handler(...args);
        } catch (error) {
            if (event === 'error')
                throw error;
            this.emit('error', error);
        }
    }
}
