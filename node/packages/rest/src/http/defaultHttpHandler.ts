import { HttpHeaders } from "./HttpHeaders";
import { IHttpHandler } from "./IHttpHandler";
import { fetch } from "@yadal/dep";

export const defaultHttpHandler: IHttpHandler = async (request, signal) => {
    const result = await fetch(request.url, {
        body: request.body,
        headers: request.headers.toDict(),
        method: request.method,
        signal: signal
    });

    const headers = new HttpHeaders();
    result.headers.forEach((v, k) => headers.set(k, v))
    return {
        status: result.status,
        body: result.blob.bind(result),
        headers
    }
}