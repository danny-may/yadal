import { AbortSignal, Blob, DeferredIterable, URL } from '@yadal/dep';
import * as Discord from 'discord-api-types/v10';
import { WebSocketConnection } from './WebSocketConnection';
import { IRateLimit } from './IRateLimit';

export type MessageMap =
    & { [P in Discord.GatewayReceivePayload as P['op']]: P }
    & { [P in Discord.GatewayDispatchPayload as P['t']]: P['d'] }
    & { '*': Discord.GatewayReceivePayload };

export class DiscordGatewayConnection {
    readonly #socket: WebSocketConnection;
    readonly #encode: (value: Discord.GatewaySendPayload, signal?: AbortSignal | undefined) => Blob | PromiseLike<Blob>;
    readonly #decode: (value: Blob, signal?: AbortSignal | undefined) => PromiseLike<Discord.GatewayReceivePayload> | Discord.GatewayReceivePayload;
    readonly #rateLimit: IRateLimit<Discord.GatewaySendPayload>;
    readonly #handlers: { [P in keyof MessageMap]?: Set<DeferredIterable<MessageMap[keyof MessageMap]>> };
    readonly #reject: (error: unknown) => void;
    sequenceId: number | null = null;

    constructor(options: DiscordGatewayConnectionOptions) {
        this.#socket = new WebSocketConnection(options.url);
        this.#encode = options.encode;
        this.#decode = options.decode;
        this.#rateLimit = options.rateLimit;
        this.#handlers = {};
        this.#reject = (error: unknown) => {
            for (const handlers of Object.values(this.#handlers))
                for (const handler of handlers)
                    handler.throw(error);
        };
        void this.#mainLoop();
    }

    async #mainLoop() {
        for await (const blob of this.#socket.messages()) {
            void this.#processMessage(blob).catch(this.#reject);
        }
    }

    async #processMessage(data: Blob) {
        const message = await this.#decode(data);
        this.#handlers['*']?.forEach(h => h.yield(message));
        this.#handlers[message.op]?.forEach(h => h.yield(message));
        if (message.op === Discord.GatewayOpcodes.Dispatch) {
            this.sequenceId = message.s;
            this.#handlers[message.t]?.forEach(h => h.yield(message.d));
        }
    }

    close(code?: number, reason?: string) {
        this.#socket.close(code, reason);
    }

    async send(message: Discord.GatewaySendPayload, signal?: AbortSignal) {
        const blob = await this.#encode(message, signal);
        await this.#rateLimit.wait(message, signal);
        await this.#socket.send(blob, signal);
    }

    async waitOpen(signal?: AbortSignal) {
        return await this.#socket.waitOpen(signal);
    }

    async waitClose(signal?: AbortSignal) {
        return await this.#socket.waitClose(signal);
    }

    messages<T extends keyof MessageMap>(type: T, signal?: AbortSignal): AsyncGenerator<MessageMap[T]>
    messages(type?: keyof MessageMap, signal?: AbortSignal): AsyncGenerator<Discord.GatewayReceivePayload>;
    async *messages(type: keyof MessageMap = '*', signal?: AbortSignal) {
        const messages = new DeferredIterable<MessageMap[keyof MessageMap]>(signal);
        const handlers = this.#handlers[type] ??= new Set();
        handlers.add(messages);
        try {
            yield* messages;
        } finally {
            handlers.delete(messages);
        }
    }

    waitMessage<T extends keyof MessageMap>(type: T, signal?: AbortSignal): Promise<MessageMap[T]>
    waitMessage(type?: keyof MessageMap, signal?: AbortSignal): Promise<Discord.GatewayReceivePayload>;
    async waitMessage(type: keyof MessageMap = '*', signal?: AbortSignal) {
        for await (const message of this.messages(type, signal))
            return message;
        if (type === '*')
            throw new Error('Connection closed before a message was received');
        throw new Error(`Connection closed before a ${typeErrors[type]} message was received`)
    }
}

export interface DiscordGatewayConnectionOptions {
    url: URL;
    rateLimit: IRateLimit<Discord.GatewaySendPayload>;
    encode: (value: Discord.GatewaySendPayload, signal?: AbortSignal) => PromiseLike<Blob> | Blob;
    decode: (value: Blob, signal?: AbortSignal) => PromiseLike<Discord.GatewayReceivePayload> | Discord.GatewayReceivePayload;
}

const typeErrors = Object.fromEntries([
    ...Object.entries(Discord.GatewayOpcodes)
        .map(v => [v[0], Discord.GatewayOpcodes[v[0] as keyof typeof Discord.GatewayOpcodes]] as const),
    ...Object.entries(Discord.GatewayDispatchEvents)
        .map(v => [v[0], Discord.GatewayDispatchEvents[v[0] as keyof typeof Discord.GatewayDispatchEvents]] as const),
]) as Record<Discord.GatewayOpcodes | Discord.GatewayDispatchEvents, string>