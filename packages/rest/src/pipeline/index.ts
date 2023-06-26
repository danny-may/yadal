export interface IRequestTransform<Request, Response, In, Out> {
    handle(request: Request, next: (value: In) => Out): Response
}

export interface IRequestHandler<Request, Response> {
    handle(request: Request): Response
}

export interface IRequestHandlerBuilder<Request, Response, In, Out> {
    transform(transform: IRequestTransform<In, Out, In, Out>): IRequestHandlerBuilder<Request, Response, In, Out>
    transform<NextIn, NextOut>(transform: IRequestTransform<In, Out, NextIn, NextOut>): IRequestHandlerBuilder<Request, Response, NextIn, NextOut>
    handle(handler: IRequestHandler<In, Out>): IRequestHandler<Request, Response>
}

export class RequestHandlerBuilder<Request, Response> implements IRequestHandlerBuilder<Request, Response, Request, Response> {
    transform<NextIn, NextOut>(transform: IRequestTransform<Request, Response, NextIn, NextOut>): IRequestHandlerBuilder<Request, Response, NextIn, NextOut> {
        return new TransformedRequestHandlerBuilder(transform);
    }

    handle(handler: IRequestHandler<Request, Response>): IRequestHandler<Request, Response> {
        return handler;
    }
}

class TransformedRequestHandlerBuilder<Request, Response, In, Out> implements IRequestHandlerBuilder<Request, Response, In, Out> {
    readonly #transform: IRequestTransform<Request, Response, In, Out>['handle']

    constructor(transform: IRequestTransform<Request, Response, In, Out>) {
        this.#transform = transform.handle.bind(transform);
    }

    transform<NextIn, NextOut>(transform: IRequestTransform<In, Out, NextIn, NextOut>): IRequestHandlerBuilder<Request, Response, NextIn, NextOut> {
        const rootTransform = this.#transform;
        const nextTransform = transform.handle.bind(transform);
        return new TransformedRequestHandlerBuilder({
            handle(request, next) {
                return rootTransform(request, v => nextTransform(v, next));
            },
        })
    }

    handle(handler: IRequestHandler<In, Out>): IRequestHandler<Request, Response> {
        const transform = this.#transform;
        const next = handler.handle.bind(handler);
        return {
            handle(request) {
                return transform(request, next);
            }
        }
    }
}