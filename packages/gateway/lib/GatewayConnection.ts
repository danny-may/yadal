import * as Discord from 'discord-api-types/v10';
import { GatewayEventConsumer } from "./GatewayEventConsumer.js";
import { IMessageCompressor, IMessageCompressorFactory } from "./compression/index.js";
import { IMessageSerializer, IMessageSerializerFactory } from "./serialization/index.js";
import { WebSocket, WebSocketFactory } from "./socket/index.js";
import { GatewayEventEmitter } from './GatewayEventEmitter.js';
import { IRateLimit, IRateLimitFactory } from './IRateLimit.js';

export interface IGatewayConnectionFactory {
    createConnection(url: URL): IGatewayConnection;
}
export interface IGatewayConnection {
    handle(consumer: GatewayEventConsumer): Disposable;
    send(payload: Discord.GatewaySendPayload, signal?: AbortSignal): Promise<void>;
    close(code?: number, reason?: string): void;
}
export class GatewayConnectionFactory implements IGatewayConnectionFactory {
    readonly #options: GatewayConnectionFactoryOptions;
    constructor(options: GatewayConnectionFactoryOptions) {
        this.#options = options;
    }

    createConnection(url: URL): IGatewayConnection {
        return new GatewayConnection({ ...this.#options, url })
    }
}

export class GatewayConnection implements IGatewayConnection {
    readonly #serializer: IMessageSerializer;
    readonly #compressor: IMessageCompressor;
    readonly #socket: WebSocket;
    readonly #emitter: GatewayEventEmitter;
    readonly #ratelimit: IRateLimit<Discord.GatewaySendPayload>;

    constructor(options: GatewayConnectionOptions) {
        this.#emitter = new GatewayEventEmitter();
        this.#serializer = options.serializer.createSerializer();
        this.#compressor = options.compressor.createCompressor();
        this.#ratelimit = options.ratelimit.createRateLimit();
        this.#socket = options.socket.createSocket(this.#getUrl(options.url));
        this.#socket.on('message', m => this.#handleMessage(m));
        this.#socket.once('open', () => this.#emitter.emit('open'));
        this.#socket.once('close', (code, reason) => this.#emitter.emit('close', { code, reason }));
        this.#socket.on('error', err => this.#emitter.emit('error', err));
    }

    async send(payload: Discord.GatewaySendPayload, signal?: AbortSignal): Promise<void> {
        await this.#ratelimit.wait(payload, signal);
        this.#emitter.emit('send', payload);
        await this.#socket.send(this.#serializer.serialize(payload), signal);
    }

    close(code?: number | undefined, reason?: string | undefined): void {
        this.#socket.close(code, reason);
    }

    handle(consumer: GatewayEventConsumer): Disposable {
        return this.#emitter.handle(consumer);
    }

    #handleMessage(data: ArrayBufferView) {
        const decompressed = this.#compressor.decompress(data);
        if (decompressed === null)
            return;

        const payload = this.#serializer.deserialize(decompressed);
        const { op, t } = payload;
        this.#emitter.emit(op, payload as never);
        if (t !== null)
            this.#emitter.emit(t, payload as never);
    }

    #getUrl(url: URL) {
        url = new URL(url.toString());
        setHeader(url, 'encoding', this.#serializer.type);
        setHeader(url, 'compress', getTransportCompression(this.#compressor.type));
        return url;
    }
}

function setHeader(url: URL, key: string, value: string | undefined) {
    if (value === undefined)
        url.searchParams.delete(key);
    else
        url.searchParams.set(key, value);
}

const transportCompressionPrefix: IMessageCompressor['type'] = 'transport:';
function getTransportCompression(compressionType: IMessageCompressor['type']) {
    if (!compressionType.startsWith(transportCompressionPrefix))
        return undefined;

    return compressionType.slice(transportCompressionPrefix.length);
}

interface GatewayConnectionOptions extends GatewayConnectionFactoryOptions {
    readonly url: URL;
}

interface GatewayConnectionFactoryOptions {
    readonly socket: WebSocketFactory;
    readonly serializer: IMessageSerializerFactory;
    readonly compressor: IMessageCompressorFactory;
    readonly ratelimit: IRateLimitFactory<Discord.GatewaySendPayload>;
}