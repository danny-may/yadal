import { HttpHeaders } from "./HttpHeaders.js";
import { IHttpContent } from "./IHttpContent.js";

export interface IHttpRequest {
    method: HttpMethod;
    body?: IHttpContent;
    headers: HttpHeaders;
    url: URL;
}


export type HttpMethod = typeof HttpMethod[keyof typeof HttpMethod];
export const HttpMethod = {
    GET: 'GET',
    HEAD: 'HEAD',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH',
    TRACE: 'TRACE',
    CONNECT: 'CONNECT',
} as const