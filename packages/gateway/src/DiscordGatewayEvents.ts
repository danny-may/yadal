import * as Discord from 'discord-api-types/v10';
import { Deferred, DeferredIterable } from '@yadal/core';

export type MessageHandler<T extends keyof MessageMap> = (message: MessageMap[T]) => void | PromiseLike<void>;
export type ErrorHandler = (error: unknown, message: MessageMap[keyof MessageMap]) => void
export type MessageMap =
    & { [P in Discord.GatewayReceivePayload as P['op']]: P }
    & { [P in Discord.GatewayDispatchPayload as P['t']]: P extends never ? undefined : P }
    & {
        'message': Discord.GatewayReceivePayload,
        'error': unknown,
        'close': { code?: number, reason?: string },
        'end': void,
        'open': void
    };

export class DiscordGatewayEventManager {
    readonly #handlers: { [P in keyof MessageMap]?: Set<MessageHandler<P>> };
    readonly #listener: DiscordGatewayEventListener;

    get listener() {
        return this.#listener
    }

    constructor() {
        this.#handlers = {};
        this.#listener = new DiscordGatewayEventListener(this.#handlers);
    }

    emit(message: Discord.GatewayReceivePayload) {
        this.#emitMessage('message', message);
        this.#emitMessage(message.op, message);
        if (message.op === Discord.GatewayOpcodes.Dispatch)
            this.#emitMessage(message.t, message);
    }

    catch(error: unknown) {
        const errorHandlers = this.#handlers.error;
        if (errorHandlers === undefined || errorHandlers.size === 0)
            throw error;
        errorHandlers.forEach(m => m(error));
    }

    #emitPersist<T extends keyof MessageMap>(event: T, message: MessageMap[T]) {
        const handlers: Set<MessageHandler<T>> = this.#handlers[event] ??= new Set() as never;
        if (handlers.add !== Set.prototype.add)
            return;
        handlers.add = handler => {
            this.#callHandler(message, handler);
            return handlers;
        }
        this.#callHandlers(handlers, message);
        handlers.clear();
    }

    open() {
        this.#emitPersist('open', undefined);
    }

    close(code?: number, reason?: string) {
        this.#emitPersist('close', Object.freeze({ code, reason }));
    }

    end() {
        this.#emitPersist('end', undefined);
        this.emit = this.open = this.close = this.catch = () => { };
    }

    #emitMessage<T extends keyof MessageMap>(type: T, message: MessageMap[T]) {
        const handlers = this.#handlers[type];
        if (handlers !== undefined)
            this.#callHandlers(handlers, message);
    }

    #callHandlers<T extends keyof MessageMap>(handlers: Set<MessageHandler<T>>, message: MessageMap[T]) {
        handlers?.forEach(c => this.#callHandler(message, c));
    }

    async #callHandler<T extends keyof MessageMap>(message: MessageMap[T], handler: MessageHandler<T>) {
        try {
            await Promise.resolve();
            await handler(message);
        } catch (error) {
            this.catch(error);
        }
    }
}

export class DiscordGatewayEventListener {
    readonly #handlers: { [P in keyof MessageMap]?: Set<MessageHandler<P>> };

    constructor(handlers: { [P in keyof MessageMap]?: Set<MessageHandler<P>> }) {
        this.#handlers = handlers;
    }

    handle<T extends keyof MessageMap>(type: T, handler: MessageHandler<T>): EventHandle {
        const handlers = this.#handlers[type] ??= new Set() as never;
        handlers.add(handler);
        return { dispose: () => { handlers.delete(handler); } };
    }

    once<T extends keyof MessageMap>(type: T, handler: MessageHandler<T>): EventHandle {
        const handle = this.handle(type, (...args) => {
            handle.dispose();
            return handler(...args)
        });
        return handle;
    }

    stream<T extends keyof MessageMap>(type: T | T[], signal?: AbortSignal): AsyncGenerator<MessageMap[T], void, void>
    async * stream(types: (keyof MessageMap) | (keyof MessageMap)[], signal?: AbortSignal) {
        const events = Array.isArray(types) ? types : [types];
        if (events.length === 0)
            throw new Error('No message types found to listen for.');
        const result = new DeferredIterable<MessageMap[keyof MessageMap]>(signal);
        const handlers = [
            ...events.map(t => this.handle(t, result.yield)),
            this.once('end', result.resolve)
        ];
        try {
            yield* result.items;
        } finally {
            for (const handler of handlers)
                handler.dispose();
        }
    }

    wait<T extends keyof MessageMap>(types: T | T[], signal?: AbortSignal): Promise<MessageMap[T]>;
    async wait(types: (keyof MessageMap) | (keyof MessageMap)[], signal?: AbortSignal) {
        const events = Array.isArray(types) ? types : [types];
        if (events.length === 0)
            throw new Error('No message types found to listen for.');
        const result = new Deferred<MessageMap[keyof MessageMap]>(signal);
        const handlers = events.map(t => this.once(t, result.resolve));
        if (!events.includes('end')) {
            handlers.push(this.once('end', () => result.reject(new Error(events.includes('message')
                ? 'Connection ended before a message was received'
                : `Connection ended before a ${events.map(t => typeErrors[t]).join('/')} message was received`))));
        }
        try {
            return await result.wait();
        } finally {
            for (const handler of handlers)
                handler.dispose();
        }
    }
}

export interface EventHandle {
    dispose(): void;
}

const typeErrors = Object.fromEntries([
    ['message', ''],
    ['close', 'close'],
    ['open', 'open'],
    ['end', 'end'],
    ...Object.entries(Discord.GatewayOpcodes)
        .map(v => [v[0], Discord.GatewayOpcodes[v[0] as keyof typeof Discord.GatewayOpcodes]] as const),
    ...Object.entries(Discord.GatewayDispatchEvents)
        .map(v => [v[0], Discord.GatewayDispatchEvents[v[0] as keyof typeof Discord.GatewayDispatchEvents]] as const),
]) as Record<keyof MessageMap, string>