import { GatewaySendPayload } from "discord-api-types/v10";
import { IGatewayConnection, IGatewayConnectionFactory } from "./GatewayConnection.js";
import { GatewayEventConsumer } from "./GatewayEventConsumer.js";
import { GatewayEventEmitter } from "./GatewayEventEmitter.js";

export interface IGatewayMultiConnectionFactory extends IGatewayConnectionFactory {
    createConnection(url: URL): IGatewayMultiConnection;
}

export interface IGatewayMultiConnection extends IGatewayConnection {
    get connection(): IGatewayConnection;
    reconnect(url?: URL): void;
}

export class GatewayMultiConnectionFactory implements IGatewayMultiConnectionFactory {
    readonly #options: GatewayMultiConnectionFactoryOptions;

    constructor(options: GatewayMultiConnectionFactoryOptions) {
        this.#options = options;
    }

    createConnection(url: URL): IGatewayMultiConnection {
        return new GatewayMultiConnection({ ...this.#options, url });
    }
}

export class GatewayMultiConnection implements IGatewayMultiConnection {
    readonly #factory: IGatewayConnectionFactory;
    readonly #consumer: GatewayEventConsumer;
    readonly #emitter: GatewayEventEmitter;
    #url: string;
    #connection: IGatewayConnection;
    #registration?: Disposable;
    #isOpen: boolean;
    #isClosed: boolean;
    #innerOpen: boolean;

    get connection() {
        return this.#connection;
    }

    constructor(options: GatewayMultiConnectionOptions) {
        this.#factory = options.factory;
        this.#emitter = new GatewayEventEmitter();
        this.#isOpen = false;
        this.#isClosed = false;
        this.#innerOpen = false;
        this.#consumer = {
            ...this.#emitter.asConsumer(),
            open: (...args) => {
                this.#innerOpen = true;
                if (this.#isOpen)
                    return;
                this.#isOpen = true;
                this.#emitter.emit('open', ...args);
            },
            close: (...args) => {
                this.#innerOpen = false;
                if (!this.#isClosed)
                    return;
                this.#isOpen = false;
                this.#emitter.emit('close', ...args);
            }
        };
        this.#url = options.url.toString();
        this.#connection = this.#createConnection(options.url);
    }

    reconnect(url?: URL): void {
        if (this.#isClosed)
            throw new Error('Cannot reconnect a closed multi connection.');
        if (url === undefined)
            url = new URL(this.#url);
        else
            this.#url = url.toString();
        this.#connection = this.#createConnection(url);
    }

    handle(consumer: GatewayEventConsumer): Disposable {
        return this.#emitter.handle(consumer);
    }

    async send(payload: GatewaySendPayload, signal?: AbortSignal | undefined): Promise<void> {
        await this.#connection.send(payload, signal);
    }

    close(code?: number | undefined, reason?: string | undefined): void {
        if (this.#isClosed)
            return;
        this.#isClosed = true;
        if (this.#innerOpen)
            this.#connection.close(code, reason);
        else
            this.#emitter.emit('close', { code, reason });
    }

    #createConnection(url: URL): IGatewayConnection {
        this.#registration?.[Symbol.dispose]();
        const connection = this.#factory.createConnection(url);
        this.#registration = connection.handle(this.#consumer);
        return connection;
    }
}

export interface GatewayMultiConnectionFactoryOptions {
    readonly factory: IGatewayConnectionFactory;
}

export interface GatewayMultiConnectionOptions extends GatewayMultiConnectionFactoryOptions {
    readonly url: URL;
}
