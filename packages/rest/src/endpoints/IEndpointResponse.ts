import { IEndpointRequest } from "./IEndpointRequest";
import { HttpHeaders } from "../http";
import { Blob } from "@yadal/dep";

export interface IEndpointResponse<TModel, TResult> {
    readonly request: IEndpointRequest<TModel, TResult>;
    status: number;
    headers: HttpHeaders;
    body: () => PromiseLike<Blob>;
    model: (recompute?: boolean) => PromiseLike<TResult>
}
