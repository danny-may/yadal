import { HttpHeaders } from "./HttpHeaders";
import { request as createRequest } from 'node:https';
import { IHttpRequest } from "./IHttpRequest";
import { Deferred } from "@yadal/core";
import { IncomingMessage } from "node:http";
import { IHttpResponse } from "./IHttpResponse";

export async function defaultHttpHandler(request: IHttpRequest, signal?: AbortSignal): Promise<IHttpResponse> {
    const responsePromise = new Deferred<IncomingMessage>(signal);
    const message = createRequest(request.url, {
        method: request.method,
        headers: {
            ...request.headers.toDict(),
            ...request.body?.headers?.toDict()
        },
    }, responsePromise.resolve);
    message.on('error', responsePromise.reject);
    if (request.body !== undefined) {
        for await (const chunk of request.body.stream())
            message.write(chunk);
    }
    message.end();
    const response = await responsePromise.wait();
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