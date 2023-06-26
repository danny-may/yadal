export * from './WebSocket';
export * from './adapters';

import { Wc3WebSocketFactory, WsWebSocketFactory } from './adapters';
import { Wc3WebSocket as Wc3WebSocket, WsWebSocket } from './adapters/extern';

export const webSocket = Object.freeze({
    ws(impl: typeof WsWebSocket) {
        return new WsWebSocketFactory(impl)
    },
    wc3(impl: typeof Wc3WebSocket) {
        return new Wc3WebSocketFactory(impl);
    }
})