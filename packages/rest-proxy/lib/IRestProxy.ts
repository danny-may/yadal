import { IHttpRequest, IHttpResponse } from '@yadal/rest';

export interface IRestProxy {
    handle(request: IHttpRequest, signal?: AbortSignal): Promise<IHttpResponse>;
}
