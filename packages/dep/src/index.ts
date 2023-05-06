export let Timeout: TimeoutConstructor = makeTimeouts();
export let AbortController: AbortControllerConstructor = getGlobal('AbortController');
export let AbortSignal: AbortSignalConstructor = getGlobal('AbortSignal');
export let URL: URLConstructor = getGlobal('URL');
export let Blob: BlobConstructor = getGlobal('Blob');
export let fetch: Fetch = getGlobal('fetch');

export interface TimeoutConstructor {
    new(callback: () => void, timeout: number): Timeout
}

export interface Timeout {
    remove(): void;
    unref(): this;
    ref(): this;
}

export interface AbortSignal {
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

function getGlobal<T>(key: string): T {
    return (globalThis as unknown as { [x: string]: T })[key] as T;
}

function makeTimeouts(): TimeoutConstructor {
    const setTimeout = getGlobal<(action: () => void, timeout: number) => number | { ref(): void; unref(): void }>('setTimeout');
    const clearTimeout = getGlobal<(timeout: number | { ref(): void; unref(): void }) => void>('clearTimeout');

    if (setTimeout === undefined || clearTimeout === undefined)
        return undefined!;

    return class Timeout {
        #timeout: number | { ref(): void; unref(): void; };
        #refUnref?: { ref(): void; unref(): void; };

        constructor(...args: ConstructorParameters<TimeoutConstructor>) {
            this.#timeout = setTimeout(...args);
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
    } satisfies TimeoutConstructor;
}
