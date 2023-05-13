import { Blob, URL } from "@yadal/dep";
import { HttpHeaders } from "../http/index.js";
import { IEndpoint } from "./IEndpoint.js";


export interface IEndpointRequest<TModel, TResult> {
    readonly endpoint: IEndpoint<TModel, TResult>;
    rateLimitKey: string;
    url: URL;
    headers: HttpHeaders;
    model: TModel;
    body?: (recompute?: boolean) => PromiseLike<Blob>;
}
