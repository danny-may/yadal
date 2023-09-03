import { IHttpResponse } from "@yadal/rest";
import { IRestProxyInvocation, IRestProxyMiddleware } from "./IRestProxyMiddleware.js";
import { IAuthorizationValidator } from "../authorization/index.js";

export class AuthorizeMiddleware implements IRestProxyMiddleware {
    #validator: IAuthorizationValidator;

    constructor(validator: IAuthorizationValidator) {
        this.#validator = validator;
    }

    handle<T extends object>(context: IRestProxyInvocation<T>, next: () => PromiseLike<IHttpResponse> | IHttpResponse): PromiseLike<IHttpResponse> | IHttpResponse {
        const schemes = context.route.authentication;
        const header = context.request.headers.get('Authorize');
        if (!this.#validator.validate(schemes, header))
            throw new Error('Authorization failed to match any of the defined schemes');

        return next();
    }
}