export interface IMessageCompressorFactory {
    createCompressor(): IMessageCompressor;
}

export interface IMessageCompressor {
    readonly type: `transport:${string}` | 'payload' | 'none';
    decompress(data: ArrayBufferView): Iterable<ArrayBufferView>;
}
