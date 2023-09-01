import { IInflatorContext, IInflatorFactory } from './IInflator.js';
import { IMessageCompressor, IMessageCompressorFactory } from './IMessageCompressor.js';

export class ZLibStreamTransportCompressorFactory implements IMessageCompressorFactory {
    readonly #inflator: IInflatorFactory;

    constructor(inflator: IInflatorFactory) {
        this.#inflator = inflator;
    }

    createCompressor() {
        return new ZLibStreamTransportCompressor(this.#inflator.createInflator());
    }
}

export class ZLibStreamTransportCompressor implements IMessageCompressor {
    readonly type = 'transport:zlib-stream';

    readonly #inflator: IInflatorContext;

    constructor(inflator: IInflatorContext) {
        this.#inflator = inflator;
    }

    decompress(value: ArrayBufferView) {
        this.#inflator.push(value)
        if (lastInt32(value) === 0x0000FFFF)
            return this.#inflator.flush();
        else
            return null;
    }
}

function lastInt32(value: ArrayBufferView) {
    if (value.byteLength < 4)
        return NaN;

    return new DataView(value.buffer, value.byteOffset, value.byteLength)
        .getInt32(value.byteLength - 4);
}
