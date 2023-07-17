import { HttpHeaders } from "./HttpHeaders.js";

export interface IHttpContent {
    readonly headers?: HttpHeaders;
    stream(): AsyncIterable<ArrayBufferView>;
}
