import { HttpHeaders } from "./HttpHeaders";

export interface IHttpContent {
    readonly headers?: HttpHeaders;
    stream(): AsyncIterable<ArrayBufferView>;
}
