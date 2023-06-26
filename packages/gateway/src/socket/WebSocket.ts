export interface WebSocketFactory {
    createSocket(url: URL): WebSocket
}

export interface WebSocket {
    on(event: 'open', handler: () => void): void;
    once(event: 'open', handler: () => void): void;
    off(event: 'open', handler: () => void): void;
    on(event: 'message', handler: (message: ArrayBufferView) => void): void;
    once(event: 'message', handler: (message: ArrayBufferView) => void): void;
    off(event: 'message', handler: (message: ArrayBufferView) => void): void;
    on(event: 'error', handler: (error: unknown) => void): void;
    once(event: 'error', handler: (error: unknown) => void): void;
    off(event: 'error', handler: (error: unknown) => void): void;
    on(event: 'close', handler: (code?: number, reason?: string) => void): void;
    once(event: 'close', handler: (code?: number, reason?: string) => void): void;
    off(event: 'close', handler: (code?: number, reason?: string) => void): void;
    close(code?: number, reason?: string): void;
    send(data: ArrayBufferView, callback?: (error?: unknown) => void): void;
}
