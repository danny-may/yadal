import { HttpHeaders } from "./HttpHeaders.js";
import { IHttpContent } from "./IHttpContent.js";

export interface IHttpResponse {
    readonly headers: HttpHeaders;
    readonly status: number;
    readonly body: IHttpContent;
}
