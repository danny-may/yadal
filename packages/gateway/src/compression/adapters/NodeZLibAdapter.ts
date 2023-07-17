import { IInflator } from "../IInflator.js";
import { NodeInflate } from "./extern.js";

export class NodeZLibAdapter implements IInflator {
    readonly #inflator: typeof NodeInflate;

    constructor(inflator: typeof NodeInflate) {
        this.#inflator = inflator;
    }

    inflate(...data: readonly ArrayBufferView[]): ArrayBufferView {
        return this.#inflator(concatBuffers(data));
    }
}

function concatBuffers(buffers: readonly ArrayBufferView[]): Uint8Array {
    switch (buffers.length) {
        case 0: return new Uint8Array(0);
        case 1: {
            const source = buffers[0]!;
            return new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
        };
        default: {
            const size = buffers.reduce((p, c) => p + c.byteLength, 0);
            const result = new Uint8Array(size);
            let i = 0;
            for (const buffer of buffers)
                result.set(new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength), i += buffer.byteLength);
            return result;
        }
    }
}