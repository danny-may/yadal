import { WebSocket, WebSocketFactory } from "../WebSocket.js";
import EventEmitter from "node:events";
import { WsWebSocket } from "./extern.js";

export class WsWebSocketFactory implements WebSocketFactory {
    readonly #impl: typeof WsWebSocket;

    constructor(impl: typeof WsWebSocket) {
        this.#impl = impl;
    }

    createSocket(url: URL): WsWebSocketAdapter {
        return new WsWebSocketAdapter(new this.#impl(url.toString()));
    }

}

export class WsWebSocketAdapter implements WebSocket {
    readonly #socket: WsWebSocket;
    readonly #emitter: EventEmitter;

    constructor(socket: WsWebSocket) {
        this.#socket = socket;
        this.#emitter = new EventEmitter();

        this.#socket.binaryType = 'arraybuffer';
        this.#socket.on('error', err => this.#emitter.emit('error', err));
        this.#socket.on('close', (code, reason) => this.#emitter.emit('close', code, reason.toString()));
        this.#socket.on('message', msg => this.#emitter.emit('message', new Uint8Array(msg as ArrayBuffer)));
        this.#socket.on('open', () => this.#emitter.emit('open'));
    }

    on(event: "open", handler: () => void): void;
    on(event: "message", handler: (message: ArrayBufferView) => void): void;
    on(event: "error", handler: (error: unknown) => void): void;
    on(event: "close", handler: (code?: number, reason?: string) => void): void;
    on(event: string, handler: (...args: any[]) => void): void {
        this.#emitter.on(event, handler);
    }

    once(event: "open", handler: () => void): void;
    once(event: "message", handler: (message: ArrayBufferView) => void): void;
    once(event: "error", handler: (error: unknown) => void): void;
    once(event: "close", handler: (code?: number, reason?: string) => void): void;
    once(event: string, handler: (...args: any[]) => void): void {
        this.#emitter.once(event, handler);
    }

    off(event: "open", handler: () => void): void;
    off(event: "message", handler: (message: ArrayBufferView) => void): void;
    off(event: "error", handler: (error: unknown) => void): void;
    off(event: "close", handler: (code?: number, reason?: string) => void): void;
    off(event: string, handler: (...args: any[]) => void): void {
        this.#emitter.off(event, handler);
    }

    close(code?: number, reason?: string): void {
        this.#socket.close(code, reason);
    }

    send(data: ArrayBufferView): void {
        this.#socket.send(data);
    }
}