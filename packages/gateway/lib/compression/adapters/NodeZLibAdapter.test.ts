import { describe, it } from "node:test";
import { NodeZLibAdapter } from "./NodeZLibAdapter.js";
import assert from "node:assert";
import { inflateSync } from "node:zlib";
import { describeFile } from "../../../../../root.test.util.js";

describeFile(() => {
    describe(NodeZLibAdapter.name, () => {
        it('Should inflate no chunks', (t) => {
            // arrange
            const impl = t.mock.fn<typeof inflateSync>(notMocked);
            const sut = new NodeZLibAdapter(impl);

            const expected = new Uint8Array(76676);
            impl.mock.mockImplementationOnce(() => expected);

            // act
            const actual = sut.inflate()

            // assert
            assert.equal(actual, expected);
            assert.equal(impl.mock.calls.length, 1);
            assert(impl.mock.calls[0]);
            assert.equal(impl.mock.calls[0].arguments.length, 1);
            assert(impl.mock.calls[0].arguments[0]);
            assert(impl.mock.calls[0].arguments[0] instanceof Uint8Array);
            assert.equal(impl.mock.calls[0].arguments[0].byteLength, 0);
        });
        it('Should inflate a single chunk', (t) => {
            // arrange
            const impl = t.mock.fn<typeof inflateSync>(notMocked);
            const sut = new NodeZLibAdapter(impl);

            const chunk = new Uint8Array(54);
            const expected = new Uint8Array(76676);
            impl.mock.mockImplementationOnce(() => expected);

            // act
            const actual = sut.inflate(chunk)

            // assert
            assert.equal(actual, expected);
            assert.equal(impl.mock.calls.length, 1);
            assert(impl.mock.calls[0]);
            assert.equal(impl.mock.calls[0].arguments.length, 1);
            assert(impl.mock.calls[0].arguments[0]);
            assert(impl.mock.calls[0].arguments[0] instanceof Uint8Array);
            assert.equal(impl.mock.calls[0].arguments[0].buffer, chunk.buffer);
            assert.equal(impl.mock.calls[0].arguments[0].byteLength, chunk.byteLength);
            assert.equal(impl.mock.calls[0].arguments[0].byteOffset, chunk.byteOffset);
        });
        it('Should inflate multiple chunks', (t) => {
            // arrange
            const impl = t.mock.fn<typeof inflateSync>(notMocked);
            const sut = new NodeZLibAdapter(impl);

            const chunks = [
                new Uint8Array([1, 2, 3, 4, 5]),
                new Uint8Array([6, 7, 8, 9, 234]),
                new Uint8Array([6]),
                new Uint8Array([2, 2, 2, 2, 2, 2, 2, 2, 2]),
            ];
            const concat = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 234, 6, 2, 2, 2, 2, 2, 2, 2, 2, 2]);
            const expected = new Uint8Array(76676);
            impl.mock.mockImplementationOnce(() => expected);

            // act
            const actual = sut.inflate(...chunks)

            // assert
            assert.equal(actual, expected);
            assert.equal(impl.mock.calls.length, 1);
            assert(impl.mock.calls[0]);
            assert.equal(impl.mock.calls[0].arguments.length, 1);
            assert(impl.mock.calls[0].arguments[0]);
            assert(impl.mock.calls[0].arguments[0] instanceof Uint8Array);
            assert.deepEqual(impl.mock.calls[0].arguments[0], concat);
        });
    });
});

function notMocked(): never {
    assert.fail('No mock has been set up');
}