import { describe, it } from "node:test";
import { NoOpCompressor, NoOpCompressorFactory } from "@yadal/gateway";
import assert from "node:assert";

describe(NoOpCompressor.name, () => {
    describe('type', () => {
        it('should have type none', () => {
            // arrange

            // act
            const sut = new NoOpCompressor();

            // assert
            assert.strictEqual(sut.type, 'none');
        });
    });
    describe('decompress', () => {
        it('should do nothing to the given data', () => {
            // arrange
            const sut = new NoOpCompressor();
            const input: ArrayBufferView = {
                get buffer(): ArrayBuffer { throw null },
                get byteLength(): number { throw null; },
                get byteOffset(): number { throw null; }
            }
            const actual = [];

            // act
            for (const item of sut.decompress(input))
                actual.push(item);


            // assert
            assert.strictEqual(actual.length, 1);
            assert.strictEqual(actual[0], input);
        });
    })
});


describe(NoOpCompressorFactory.name, () => {
    describe('createCompressor', () => {
        it('should create a ' + NoOpCompressor.name, () => {
            // arrange
            const sut = new NoOpCompressorFactory();

            // act
            const actual = sut.createCompressor();

            // assert
            assert(actual instanceof NoOpCompressor);
        });
    });
});