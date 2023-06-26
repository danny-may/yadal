import { IMessageCompressor, IMessageCompressorFactory } from './IMessageCompressor';

export class NoOpCompressorFactory implements IMessageCompressorFactory {
    createCompressor() {
        return new NoOpCompressor();
    }
}

export class NoOpCompressor implements IMessageCompressor {
    readonly type = 'none';

    *decompress(data: ArrayBufferView): Iterable<ArrayBufferView> {
        yield data;
    }
}
