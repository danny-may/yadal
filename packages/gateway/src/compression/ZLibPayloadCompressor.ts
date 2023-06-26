import { IMessageCompressor, IMessageCompressorFactory } from "./IMessageCompressor";
import { IInflator } from "./IInflator";

export class ZLibPayloadCompressorFactory implements IMessageCompressorFactory {
    readonly #inflator: IInflator;

    constructor(inflator: IInflator) {
        this.#inflator = inflator;
    }

    createCompressor() {
        return new ZLibPayloadCompressor(this.#inflator);
    }
}

export class ZLibPayloadCompressor implements IMessageCompressor {
    readonly type = 'payload';

    readonly #inflator: IInflator;

    constructor(inflator: IInflator) {
        this.#inflator = inflator;
    }

    * decompress(value: ArrayBufferView) {
        yield this.#inflator.inflate(value);
    }
}