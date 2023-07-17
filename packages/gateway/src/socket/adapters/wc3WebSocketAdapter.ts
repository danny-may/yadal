import { WebSocket, WebSocketFactory } from "../WebSocket.js";
import { EventEmitter } from 'node:events';
import { Wc3WebSocket } from "./extern.js";

export class Wc3WebSocketFactory implements WebSocketFactory {
    readonly #impl: typeof Wc3WebSocket;

    constructor(impl: typeof Wc3WebSocket) {
        this.#impl = impl;
    }

    createSocket(url: URL): Wc3WebSocketAdapter {
        return new Wc3WebSocketAdapter(new this.#impl(url.toString()));
    }
}

export class Wc3WebSocketAdapter implements WebSocket {
    readonly #socket: Wc3WebSocket;
    readonly #emitter: EventEmitter;

    constructor(socket: Wc3WebSocket) {
        this.#socket = socket;
        this.#emitter = new EventEmitter();

        this.#socket.binaryType = 'arraybuffer';
        this.#socket.onerror = err => this.#emitter.emit('error', err);
        this.#socket.onclose = ({ code, reason }) => this.#emitter.emit('close', code, reason);
        this.#socket.onmessage = msg => this.#emitter.emit('message', toArrayBufferView(msg.data));
        this.#socket.onopen = () => this.#emitter.emit('open');
    }

    on(event: "open", handler: () => void): void;
    on(event: "message", handler: (message: ArrayBufferView) => void): void;
    on(event: "error", handler: (error: unknown) => void): void;
    on(event: "close", handler: (code?: number | undefined, reason?: string | undefined) => void): void;
    on(event: string, handler: (...args: any[]) => void): void {
        this.#emitter.on(event, handler);
    }

    once(event: "open", handler: () => void): void;
    once(event: "message", handler: (message: ArrayBufferView) => void): void;
    once(event: "error", handler: (error: unknown) => void): void;
    once(event: "close", handler: (code?: number | undefined, reason?: string | undefined) => void): void;
    once(event: string, handler: (...args: any[]) => void): void {
        this.#emitter.once(event, handler);
    }

    off(event: "open", handler: () => void): void;
    off(event: "message", handler: (message: ArrayBufferView) => void): void;
    off(event: "error", handler: (error: unknown) => void): void;
    off(event: "close", handler: (code?: number | undefined, reason?: string | undefined) => void): void;
    off(event: string, handler: (...args: any[]) => void): void {
        this.#emitter.off(event, handler);
    }

    close(code?: number | undefined, reason?: string | undefined): void {
        this.#socket.close(code, reason);
    }

    send(data: ArrayBufferView): void {
        this.#socket.send(data);
    }
}

const encoder = new TextEncoder();
function toArrayBufferView(value: string | Buffer | ArrayBuffer) {
    if (value instanceof ArrayBuffer)
        return new Uint8Array(value);
    if (typeof value === 'string')
        return encoder.encode(value);
    return value;
}