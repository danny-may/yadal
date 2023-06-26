import { HttpHeaders } from "./HttpHeaders.js";

export interface IHttpRequest {
    readonly method: HttpMethod;
    readonly body?: Blob;
    readonly headers: HttpHeaders;
    readonly url: URL;
}

export type HttpMethod = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'TRACE' | 'CONNECT';