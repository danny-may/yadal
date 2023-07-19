import { describe, it } from "node:test";
import { Wc3WebSocketFactory, WsWebSocketFactory, webSocket } from "./index.js";
import * as wc3 from "websocket";
import * as ws from "ws";
import assert from "node:assert";

describe('webSocket', () => {
    describe('wc3', () => {
        it('Should create an instance of the wc3 factory', () => {
            // arrange

            // act
            const actual = webSocket.wc3(wc3.w3cwebsocket);

            // assert
            assert(actual instanceof Wc3WebSocketFactory);
        });
    });
    describe('ws', () => {
        it('Should create an instance of the ws adapter', () => {
            // arrange

            // act
            const actual = webSocket.ws(ws.WebSocket);

            // assert
            assert(actual instanceof WsWebSocketFactory);
        });
    });
});