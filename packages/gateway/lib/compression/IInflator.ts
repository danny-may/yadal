export interface IInflatorFactory {
    createInflator(): IInflatorContext;
}

export interface IInflatorContext {
    push(chunk: ArrayBufferView): void;
    flush(): ArrayBufferView;
}

export interface IInflator {
    inflate(...chunks: readonly ArrayBufferView[]): ArrayBufferView;
}