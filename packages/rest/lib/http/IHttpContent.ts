import { HttpHeaders } from "./HttpHeaders.js";

export interface IHttpContent {
    readonly headers?: HttpHeaders | undefined;
    stream(): AsyncIterable<ArrayBufferView> | Iterable<ArrayBufferView>;
}
