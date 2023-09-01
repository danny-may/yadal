import { IMessageCompressor, IMessageCompressorFactory } from './IMessageCompressor.js';

export class NoOpCompressorFactory implements IMessageCompressorFactory {
    createCompressor() {
        return new NoOpCompressor();
    }
}

export class NoOpCompressor implements IMessageCompressor {
    readonly type = 'none';

    decompress(data: ArrayBufferView): ArrayBufferView {
        return data;
    }
}
