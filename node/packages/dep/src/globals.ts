import { Deferred } from "./Deferred";

export let Timeout: TimeoutConstructor = makeTimeout();
export let AbortController: AbortControllerConstructor = getGlobal('AbortController');
export let AbortSignal: AbortSignalConstructor = getGlobal('AbortSignal');
export let URL: URLConstructor = getGlobal('URL');
export let WebSocket: WebSocketConstructor = getGlobal('WebSocket');
export let Blob: BlobConstructor = getGlobal('Blob');
export let fetch: Fetch = getGlobal('fetch');

export interface WebSocketConstructor {
    new(url: string | URL): WebSocket;
}

export interface WebSocket {
    onmessage: (x: any) => void;
    binaryType: 'blob' | 'arrayBuffer';
    addEventListener(event: 'close', listener: (event: { code: number, reason: string }) => void): void;
    removeEventListener(event: 'close', listener: (event: { code: number, reason: string }) => void): void;
    addEventListener(event: 'message', listener: (message: WebSocketMessage) => void): void;
    removeEventListener(event: 'message', listener: (message: WebSocketMessage) => void): void;
    addEventListener(event: 'open', listener: () => void): void;
    removeEventListener(event: 'open', listener: () => void): void;
    addEventListener(event: 'error', listener: () => void): void;
    removeEventListener(event: 'error', listener: () => void): void;
    close(code?: number, reason?: string): void;
    send(message: Blob): void;
}

export interface WebSocketMessage {
    data: Blob | string | ArrayBuffer;
}

export interface TimeoutConstructor {
    new <T>(callback: () => T, timeout: number): Timeout<T>
}

export interface Timeout<T = void> {
    remove(): void;
    unref(): this;
    ref(): this;
    wait(): Promise<T>;
}

export interface IntervalConstructor {
    new(callback: () => void, delay: number): Interval
}

export interface Interval {
    unref(): this;
    ref(): this;
    stop(): void;
    wait(): Promise<void>
}

export interface AbortSignal {
    readonly aborted: boolean;
    readonly reason?: unknown;
    addEventListener(event: 'abort', handler: () => void): void;
    removeEventListener(event: 'abort', handler: () => void): void;
}

export interface AbortSignalConstructor {
    new(): AbortSignal
}

export interface AbortController {
    readonly signal: AbortSignal;
    abort(reason?: unknown): void;
}

export interface AbortControllerConstructor {
    new(): AbortController;
}

export interface URLConstructor {
    new(url: string | URL): URL;
    new(url: string, baseURL: URL | string): URL;
}

export interface URL {
    protocol: string;
    pathname: string;
    host: string;
    hash: string;
    searchParams: {
        append(key: string, value: string): void;
    } & Iterable<[string, string]>
}

export interface Blob extends ArrayBuffer {
    readonly type: string;
    text(): Promise<string>;
}

export interface BlobConstructor {
    new(data: Array<string | Blob | ArrayBuffer>, options?: { type?: string }): Blob;
}

export interface Fetch {
    (url: string | URL, options: FetchOptions): Promise<FetchResult>;
}

export interface FetchOptions {
    body?: Blob;
    headers?: Record<string, string>;
    method?: string;
    signal?: AbortSignal;
}

export interface FetchResult {
    status: number;
    blob(): Promise<Blob>;
    headers: {
        forEach(handler: (key: string, value: string) => void): void;
    };
}


export function setTimeout(timeout: TimeoutConstructor) {
    Timeout = timeout;
}

export function setAbortController(controller: AbortControllerConstructor, signal: AbortSignalConstructor) {
    AbortController = controller;
    AbortSignal = signal;
}

export function setURL(url: URLConstructor) {
    URL = url;
}

export function setBlob(blob: BlobConstructor) {
    Blob = blob;
}

export function setFetch(impl: Fetch) {
    fetch = impl;
}

export function setWebSocket(impl: WebSocketConstructor) {
    WebSocket = impl;
}

function getGlobal<T>(key: string): T {
    return (globalThis as unknown as { [x: string]: T })[key] as T;
}

function makeTimeout(): TimeoutConstructor {
    const setTimeout = getGlobal<(action: () => void, timeout: number) => number | { ref(): void; unref(): void }>('setTimeout');
    const clearTimeout = getGlobal<(timeout: number | { ref(): void; unref(): void }) => void>('clearTimeout');

    if (setTimeout === undefined || clearTimeout === undefined)
        return undefined!;

    return class Timeout<T> {
        readonly #waiter: Deferred<T>;
        readonly #timeout: number | { ref(): void; unref(): void; };
        readonly #refUnref?: { ref(): void; unref(): void; };

        constructor(...args: ConstructorParameters<TimeoutConstructor>) {
            this.#waiter = new Deferred<T>();
            this.#timeout = setTimeout(() => {
                this.#waiter.resolve(args[0]() as T)
            }, args[1]);
            this.#refUnref = typeof this.#timeout === 'number' ? undefined : this.#timeout;
        }

        remove() {
            clearTimeout(this.#timeout);
        }

        ref() {
            this.#refUnref?.ref();
            return this;
        }

        unref() {
            this.#refUnref?.unref();
            return this;
        }

        wait() {
            return this.#waiter.wait();
        }
    };
}