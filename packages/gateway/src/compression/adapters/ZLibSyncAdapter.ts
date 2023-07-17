import { constants } from "node:zlib";
import { IInflator, IInflatorContext, IInflatorFactory } from '../IInflator.js';
import { ZLibError } from "./ZLibError.js";
import { ZLibSyncInflate } from './extern.js';

export class ZLibSyncAdapter implements IInflator {
    readonly #factory: ZLibSyncContextAdapterFactory;

    constructor(impl: typeof ZLibSyncInflate) {
        this.#factory = new ZLibSyncContextAdapterFactory(impl);
    }

    inflate(...chunks: readonly ArrayBufferView[]): ArrayBufferView {
        const inflator = this.#factory.createInflator();
        for (const chunk of chunks)
            inflator.push(chunk);
        return inflator.flush();
    }
}

export class ZLibSyncContextAdapterFactory implements IInflatorFactory {
    readonly #impl: typeof ZLibSyncInflate;

    constructor(impl: typeof ZLibSyncInflate) {
        this.#impl = impl;
    }

    createInflator() {
        return new ZLibSyncContextAdapter(new this.#impl({ chunkSize: 128 * 1024 }))
    }
}

export class ZLibSyncContextAdapter implements IInflatorContext {
    readonly #inflate: ZLibSyncInflate;
    readonly #encoder: InstanceType<typeof TextEncoder>;
    readonly #chunks: ArrayBufferView[];

    constructor(inflate: ZLibSyncInflate) {
        this.#inflate = inflate;
        this.#encoder = new TextEncoder();
        this.#chunks = [];
    }

    push(chunk: ArrayBufferView): void {
        this.#chunks.push(chunk);
    }

    flush(): ArrayBufferView {
        if (this.#chunks.length === 0)
            return empty;

        const lastChunk = this.#chunks.length - 1;
        for (let i = 0; i < lastChunk; i++)
            this.#inflate.push(viewToBuffer(this.#chunks[i]!), constants.Z_NO_FLUSH);
        this.#inflate.push(viewToBuffer(this.#chunks[lastChunk]!), constants.Z_SYNC_FLUSH);
        this.#chunks.length = 0;

        if (this.#inflate.err)
            throw new ZLibError(this.#inflate);

        const result = this.#inflate.result;
        if (typeof result === 'string')
            return this.#encoder.encode(result);

        if (result === null || result === undefined)
            throw new Error('Decompression returned nothing');

        return result;
    }
}

const empty = Buffer.alloc(0);

function viewToBuffer(view: ArrayBufferView): Buffer {
    return Buffer.from(view.buffer, view.byteOffset, view.byteLength);
}
