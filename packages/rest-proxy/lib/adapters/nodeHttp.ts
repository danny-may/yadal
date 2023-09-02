import { type IncomingMessage, type RequestListener, type ServerResponse } from 'node:http';
import { type IRestProxy } from '../IRestProxy.js';
import { HttpHeaders, type HttpMethod } from '@yadal/rest';

export function toNodeHttp<
    Request extends typeof IncomingMessage = typeof IncomingMessage,
    Response extends typeof ServerResponse = typeof ServerResponse,
>(proxy: IRestProxy, onError: (error: unknown) => void = e => { throw e; }): RequestListener<Request, Response> {
    return async (req, resp) => {
        try {
            const response = await proxy.handle({
                headers: new HttpHeaders(req.headers),
                method: req.method!.toUpperCase() as HttpMethod,
                url: new URL(`rel:${req.url}`),
                body: {
                    stream() {
                        return req
                    }
                }
            })

            resp.writeHead(response.status, {
                ...response.headers.toDict(),
                ...response.body.headers?.toDict()
            });
            for await (const chunk of response.body.stream())
                resp.write(chunk);
            resp.end();
        } catch (err) {
            onError(err)
        }
    }
}