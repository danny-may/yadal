import { ISerializer } from '../ISerializer.js';
import { Erlpack } from './extern.js';

export class ErlpackAdapter implements ISerializer {
    readonly #erlpack: typeof Erlpack;

    constructor(erlpack: typeof Erlpack) {
        this.#erlpack = erlpack;
    }

    serialize(value: unknown): ArrayBufferView {
        return this.#erlpack.pack(cleanup(value));
    }

    deserialize(value: ArrayBufferView): unknown {
        return this.#erlpack.unpack(Buffer.from(value.buffer, value.byteOffset, value.byteLength));
    }
}

function cleanup(value: unknown): unknown {
    return JSON.parse(JSON.stringify(value));
}
