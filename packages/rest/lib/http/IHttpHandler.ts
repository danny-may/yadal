import { IHttpRequest } from "./IHttpRequest.js";
import { IHttpResponse } from "./IHttpResponse.js";


export interface IHttpHandler {
    (request: IHttpRequest, signal: AbortSignal): PromiseLike<IHttpResponse>;
}
