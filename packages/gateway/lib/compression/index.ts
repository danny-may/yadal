import { NodeZLibAdapter, ZLibSyncAdapter, ZLibSyncContextAdapterFactory } from './adapters/index.js';
import { NoOpCompressorFactory } from './NoOpCompressor.js';
import { ZLibStreamTransportCompressorFactory } from './ZLibStreamTransportCompressor.js';
import type { ZLibSyncInflate } from './adapters/extern.js';
import { ZLibPayloadCompressorFactory } from './ZLibPayloadCompressor.js';
import { IInflator, IInflatorFactory } from './IInflator.js';
import { inflateSync } from 'node:zlib';

export * from './adapters/index.js';
export * from './IMessageCompressor.js';
export * from './IInflator.js';
export * from './NoOpCompressor.js';
export * from './ZLibStreamTransportCompressor.js';

export const messageCompressor = Object.freeze({
    uncompressed() {
        return new NoOpCompressorFactory();
    },
    transport: Object.freeze({
        zlib(inflate: IInflatorFactory) {
            return new ZLibStreamTransportCompressorFactory(inflate)
        },
        zlibSync(inflate: typeof ZLibSyncInflate) {
            return new ZLibStreamTransportCompressorFactory(new ZLibSyncContextAdapterFactory(inflate))
        }
    }),
    payload: Object.freeze({
        zlib(inflate: IInflator = new NodeZLibAdapter(inflateSync)) {
            return new ZLibPayloadCompressorFactory(inflate)
        },
        zlibSync(inflate: typeof ZLibSyncInflate) {
            return new ZLibPayloadCompressorFactory(new ZLibSyncAdapter(inflate))
        }
    })
});
