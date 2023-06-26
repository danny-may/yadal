import { HttpHeaders } from "./HttpHeaders";
import { request as createRequest } from 'node:https';
import { IHttpRequest } from "./IHttpRequest";
import { Deferred } from "@yadal/core";
import { IncomingMessage } from "node:http";

export async function defaultHttpHandler(request: IHttpRequest, signal?: AbortSignal) {
    const response = new Deferred<IncomingMessage>(signal);
    const message = createRequest(request.url, {
        method: request.method,
        headers: request.headers.toDict(),
    }, response.resolve);
    message.on('error', response.reject);
    if (request.body !== undefined) {
        for await (const chunk of request.body.stream())
            message.write(chunk);
    }
    message.end();
    const x = await response.wait();
    const headers = new HttpHeaders(x.headers);
    const getBody = async () => {
        const chunks = []
        for await (const chunk of x)
            chunks.push(chunk as Uint8Array);
        return new Blob(chunks, { type: headers.get('content-type') });
    }
    let body: Promise<Blob> | undefined;

    return {
        status: x.statusCode ?? 0,
        body: () => body ??= getBody(),
        headers
    }
}
