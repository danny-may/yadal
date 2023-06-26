import { ISerializer } from './ISerializer';
import { ErlpackAdapter } from './adapters';
import { MessageSerializerFactory } from './IMessageSerializer';
import type { Erlpack } from './adapters/extern';
import { inflateSync } from 'zlib';

export * from './adapters';
export * from './IMessageSerializer';
export * from './ISerializer';

export const messageSerializer = Object.freeze({
    etf(serializer: ISerializer) {
        return new MessageSerializerFactory(serializer, 'etf')
    },
    json(serializer = jsonSerializer) {
        return new MessageSerializerFactory(serializer, 'json');
    },
    erlpack(erlpack: typeof Erlpack) {
        return new MessageSerializerFactory(new ErlpackAdapter(erlpack), 'etf');
    }
})

const encoder = new TextEncoder();
const decoder = new TextDecoder();
const jsonSerializer: ISerializer = {
    deserialize(value) {
        return JSON.parse(decoder.decode(new Uint8Array(value.buffer, value.byteOffset, value.byteLength)))
    },
    serialize(value) {
        return encoder.encode(JSON.stringify(value))
    }
}
