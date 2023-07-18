import fs from 'fs/promises';
import { describe, it } from 'node:test';
import ZLibSync from 'zlib-sync';
import assert from 'node:assert';
import { fileURLToPath } from 'url';
import { ZLibSyncContextAdapter, ZLibSyncContextAdapterFactory } from '../../../src/index.js';


describe(ZLibSyncContextAdapter.name, () => {
    it('Should decompress test case 1', async () => {
        // arrange
        const steps = [...deserializeTestCase(await fs.readFile(fileURLToPath(new URL('zlibData/testCase1.dat', import.meta.url))))];
        const sut = new ZLibSyncContextAdapterFactory(ZLibSync.Inflate).createInflator();
        const expected = steps.map(v => v.output).filter(o => o !== undefined);
        const actual = [] as Uint8Array[];

        // act
        for (const step of steps) {
            sut.push(step.input);
            if (step.output !== undefined) {
                const chunk = sut.flush();
                actual.push(new Uint8Array(chunk.buffer, chunk.byteOffset, chunk.byteLength));
            }
        }

        // assert
        assert.strictEqual(steps.length, 11);
        assert.strictEqual(expected.length, 11);
        assert.deepStrictEqual(actual, expected);
    })
})

function* deserializeTestCase(data: ArrayBufferView) {
    let offset = 0;
    const buffer = new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
    const reader = new DataView(data.buffer, data.byteOffset, data.byteLength)
    while (offset < data.byteLength) {
        const dataSize = reader.getInt32(offset);
        offset += 4;
        const input = buffer.slice(offset, offset += dataSize);
        const hasFlush = reader.getInt8(offset);
        offset += 1;
        let output;
        if (hasFlush) {
            const dataSize = reader.getInt32(offset);
            offset += 4;
            output = buffer.slice(offset, offset += dataSize);
        } else {
            output = undefined;
        }

        yield { input, output }
    }
}