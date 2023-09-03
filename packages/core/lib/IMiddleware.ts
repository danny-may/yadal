import { CompositeAbortController } from "./CompositeAbortController.js";

type Awaitable<T> = T | PromiseLike<T>;
export interface IMiddleware<Context, Result> {
    handle(context: Context, next: (signal?: AbortSignal) => Awaitable<Result>, signal: AbortSignal): Awaitable<Result>;
}

export interface IMiddlewareInvoker<Context, Result> {
    (context: Context, signal?: AbortSignal): Awaitable<Result>;
}

export function combineMiddleware<Context, Result>(
    middleware: Iterable<IMiddleware<Context, Result>>,
    sink: (context: Context, signal: AbortSignal) => Awaitable<Result>
): IMiddlewareInvoker<Context, Result> {
    const m = [...middleware] as const;
    function callMiddleware(index: number, context: Context, rootSignal: AbortSignal, signal?: AbortSignal): Awaitable<Result> {
        if (signal !== undefined)
            rootSignal = new CompositeAbortController(rootSignal, signal).signal;
        if (index < m.length)
            return m[index]!.handle(context, s => callMiddleware(index + 1, context, rootSignal, s), rootSignal);
        if (index > m.length)
            throw new Error('Middleware index out of range');
        return sink(context, rootSignal);
    }

    return (context: Context, signal?: AbortSignal) => {
        return callMiddleware(0, context, signal ?? new AbortController().signal);
    }
}