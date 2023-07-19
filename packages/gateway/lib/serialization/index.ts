import { ISerializer } from './ISerializer.js';
import { ErlpackAdapter } from './adapters/index.js';
import { MessageSerializerFactory } from './IMessageSerializer.js';
import type { Erlpack } from './adapters/extern.js';

export * from './adapters/index.js';
export * from './IMessageSerializer.js';
export * from './ISerializer.js';

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
