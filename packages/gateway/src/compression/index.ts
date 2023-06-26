import { NodeZLibAdapter, ZLibSyncAdapter, ZLibSyncContextAdapterFactory } from './adapters';
import { NoOpCompressorFactory } from './NoOpCompressor';
import { ZLibStreamTransportCompressorFactory } from './ZLibStreamTransportCompressor';
import type { ZLibSyncInflate } from './adapters/extern';
import { ZLibPayloadCompressorFactory } from './ZLibPayloadCompressor';
import { IInflator, IInflatorFactory } from './IInflator';
import { inflateSync } from 'zlib';

export * from './adapters';
export * from './IMessageCompressor';
export * from './IInflator';
export * from './NoOpCompressor';
export * from './ZLibStreamTransportCompressor';

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
