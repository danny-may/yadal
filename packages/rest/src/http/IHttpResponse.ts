import { HttpHeaders } from "./HttpHeaders.js";

export interface IHttpResponse {
    readonly headers: HttpHeaders;
    readonly status: number;
    body(): PromiseLike<Blob>;
}
