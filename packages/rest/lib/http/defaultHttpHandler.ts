import { HttpHeaders } from "./HttpHeaders.js";
import { request as createRequest } from 'node:https';
import { IHttpRequest } from "./IHttpRequest.js";
import { Deferred, abortListener } from "@yadal/core";
import { IncomingMessage } from "node:http";
import { IHttpResponse } from "./IHttpResponse.js";

export async function defaultHttpHandler(request: IHttpRequest, signal?: AbortSignal): Promise<IHttpResponse> {
    using scope = new DisposableStack();

    const defer = scope.use(new Deferred<IncomingMessage>());
    scope.use(abortListener(signal, defer.reject));

    const message = createRequest(request.url, {
        method: request.method,
        headers: {
            ...request.headers.toDict(),
            ...request.body?.headers?.toDict()
        },
    }, defer.resolve);
    message.on('error', defer.reject);
    if (request.body !== undefined) {
        for await (const chunk of request.body.stream())
            message.write(chunk);
    }
    message.end();
    const response = await defer.promise;
    const headers = new HttpHeaders(response.headers);

    return {
        status: response.statusCode ?? 0,
        body: {
            headers: headers.pick(contentHeaders),
            async * stream() {
                yield* response;
            },
        },
        headers
    }
}

const contentHeaders = [
    'allow',
    'content-disposition',
    'content-encoding',
    'content-language',
    'content-length',
    'content-location',
    'content-md5',
    'content-range',
    'content-type',
    'expires',
    'last-modified'
]