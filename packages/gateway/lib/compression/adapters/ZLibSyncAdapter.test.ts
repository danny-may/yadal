import { describe, it } from 'node:test';
import assert from 'node:assert';
import { ZLibSyncAdapter, ZLibSyncContextAdapter, ZLibSyncContextAdapterFactory } from './ZLibSyncAdapter.js';
import ZLibSync from 'zlib-sync';
import { TestContext } from '../../../../../testUtil/index.js';
import { constants } from 'zlib';
import { ZLibError } from './ZLibError.js';

describe(ZLibSyncAdapter.name, () => {
    it(`Should push each chunk and then flush`, async (t) => {
        // arrange
        const inflate = createMockInflate();
        const type = createMockInflateCtor(t, () => inflate)
        const sut = new ZLibSyncAdapter(type);

        const chunks = [new Uint8Array(123), new Uint8Array(456), new Uint8Array(789)] as const;
        const expected = new Uint8Array(98765);
        const order: string[] = [];
        const push = t.mock.method(inflate, 'push', () => { order.push('push') });
        t.mock.getter(inflate, 'err', () => { order.push('err') });
        t.mock.getter(inflate, 'result', () => { order.push('result'); return expected })

        // act
        const actual = sut.inflate(...chunks);

        // assert
        assert.equal(actual, expected);
        assert.equal(type.mock.calls.length, 1);
        assert.deepStrictEqual(type.mock.calls[0]?.arguments, [{ chunkSize: 128 * 1024 }]);
        assert.deepStrictEqual(order, ['push', 'push', 'push', 'err', 'result']);
        for (const [i, flag] of [[0, constants.Z_NO_FLUSH], [1, constants.Z_NO_FLUSH], [2, constants.Z_SYNC_FLUSH]] as const) {
            const call = push.mock.calls[i];
            const chunk = chunks[i];
            assert(call);
            assert(call.arguments[0] instanceof Buffer);
            assert(call.arguments[0].buffer === chunk.buffer);
            assert(call.arguments[0].byteOffset === chunk.byteOffset);
            assert(call.arguments[0].byteLength === chunk.byteLength);
            assert(call.arguments[1] === flag);
        }
    });
    it(`Should not reuse inflators`, async (t) => {
        // arrange
        const inflators: Array<ReturnType<typeof createInflator>> = [];
        const createInflator = () => {
            const inflator = createMockInflate();
            const expected = new Uint8Array(98765);
            const order: string[] = [];
            return {
                inflator,
                order,
                expected,
                push: t.mock.method(inflator, 'push', () => { order.push('push') }),
                err: t.mock.getter(inflator, 'err', () => { order.push('err') }),
                result: t.mock.getter(inflator, 'result', () => { order.push('result'); return expected }),
            }
        }
        const type = createMockInflateCtor(t, () => {
            const inflator = createInflator();
            inflators.push(inflator);
            return inflator.inflator;
        });
        const sut = new ZLibSyncAdapter(type);

        const chunks = [new Uint8Array(123), new Uint8Array(456), new Uint8Array(789)] as const;

        // act
        const results = [
            sut.inflate(...chunks),
            sut.inflate(...chunks),
            sut.inflate(...chunks),
            sut.inflate(...chunks)
        ]

        // assert
        assert.equal(results.length, 4);
        assert.equal(inflators.length, 4);
        assert.equal(type.mock.calls.length, 4);
        for (let i = 0; i < 4; i++) {
            const actual = results[i];
            const { expected, order, push } = inflators[i]!;
            assert.equal(actual, expected);
            assert.deepStrictEqual(type.mock.calls[i]?.arguments, [{ chunkSize: 128 * 1024 }]);
            assert.deepStrictEqual(order, ['push', 'push', 'push', 'err', 'result']);
            for (const [i, flag] of [[0, constants.Z_NO_FLUSH], [1, constants.Z_NO_FLUSH], [2, constants.Z_SYNC_FLUSH]] as const) {
                const call = push.mock.calls[i];
                const chunk = chunks[i];
                assert(call);
                assert(call.arguments[0] instanceof Buffer);
                assert(call.arguments[0].buffer === chunk.buffer);
                assert(call.arguments[0].byteOffset === chunk.byteOffset);
                assert(call.arguments[0].byteLength === chunk.byteLength);
                assert.equal(call.arguments[1], flag);
            }
        }
    });
});

describe(ZLibSyncContextAdapter.name, () => {
    it(`Should push each chunk and then flush`, async (t) => {
        // arrange
        const inflate = createMockInflate();
        const type = createMockInflateCtor(t, () => inflate)
        const sut = new ZLibSyncContextAdapterFactory(type).createInflator();

        let resI = 0;
        const chunks = [new Uint8Array(123), new Uint8Array(456), new Uint8Array(789)] as const;
        const expected = [new Uint8Array(98765), new Uint8Array(9999)];
        const order: string[] = [];
        const push = t.mock.method(inflate, 'push', () => { order.push('push') });
        t.mock.getter(inflate, 'err', () => { order.push('err') });
        t.mock.getter(inflate, 'result', () => { order.push('result'); return expected[resI++] })
        const actual = [];

        // act
        sut.push(chunks[0]);
        sut.push(chunks[1]);
        actual.push(sut.flush());
        sut.push(chunks[2]);
        actual.push(sut.flush());
        actual.push(sut.flush());

        // assert
        assert.equal(actual.length, 3);
        assert.equal(actual[0], expected[0]);
        assert.equal(actual[1], expected[1]);
        assert.deepEqual(actual[2], Buffer.alloc(0));
        assert.equal(type.mock.calls.length, 1);
        assert.deepStrictEqual(type.mock.calls[0]?.arguments, [{ chunkSize: 128 * 1024 }]);
        assert.deepStrictEqual(order, ['push', 'push', 'err', 'result', 'push', 'err', 'result']);
        for (const [i, flag] of [[0, constants.Z_NO_FLUSH], [1, constants.Z_SYNC_FLUSH], [2, constants.Z_SYNC_FLUSH]] as const) {
            const call = push.mock.calls[i];
            const chunk = chunks[i];
            assert(call);
            assert(call.arguments[0] instanceof Buffer);
            assert(call.arguments[0].buffer === chunk.buffer);
            assert(call.arguments[0].byteOffset === chunk.byteOffset);
            assert(call.arguments[0].byteLength === chunk.byteLength);
            assert(call.arguments[1] === flag);
        }
    });
    it(`Should encode when the result is a string`, async (t) => {
        // arrange
        const inflate = createMockInflate();
        const type = createMockInflateCtor(t, () => inflate)
        const sut = new ZLibSyncContextAdapterFactory(type).createInflator();

        const chunk = new Uint8Array(123);
        const expected = new TextEncoder().encode('Success!');
        const order: string[] = [];
        const push = t.mock.method(inflate, 'push', () => { order.push('push') });
        t.mock.getter(inflate, 'err', () => { order.push('err') });
        t.mock.getter(inflate, 'result', () => { order.push('result'); return 'Success!' });

        // act
        sut.push(chunk);
        const actual = sut.flush();

        // assert
        assert.deepStrictEqual(actual, expected);
        assert.equal(type.mock.calls.length, 1);
        assert.deepStrictEqual(type.mock.calls[0]?.arguments, [{ chunkSize: 128 * 1024 }]);
        assert.deepStrictEqual(order, ['push', 'err', 'result']);
        const call = push.mock.calls[0];
        assert(call);
        assert(call.arguments[0] instanceof Buffer);
        assert(call.arguments[0].buffer === chunk.buffer);
        assert(call.arguments[0].byteOffset === chunk.byteOffset);
        assert(call.arguments[0].byteLength === chunk.byteLength);
        assert(call.arguments[1] === constants.Z_SYNC_FLUSH);
    });
    it(`Should throw if there is a compression error`, async (t) => {
        // arrange
        const inflate = createMockInflate();
        const type = createMockInflateCtor(t, () => inflate)
        const sut = new ZLibSyncContextAdapterFactory(type).createInflator();

        const chunks = [new Uint8Array(123)] as const;
        const order: string[] = [];
        const push = t.mock.method(inflate, 'push', () => { order.push('push') });
        t.mock.getter(inflate, 'err', () => { order.push('err'); return -3; });
        t.mock.getter(inflate, 'msg', () => { order.push('msg'); return 'Success!'; });

        // act
        sut.push(chunks[0]);
        const actual = (() => {
            try {
                sut.flush();
            } catch (err) {
                return err;
            }
            assert.fail('An error should have been thrown')
        })()

        // assert
        assert(actual instanceof ZLibError);
        assert.equal(actual.message, 'Success!');
        assert.equal(actual.errno, -3);
        assert.equal(actual.code, 'Z_DATA_ERROR');
        assert.equal(type.mock.calls.length, 1);
        assert.deepStrictEqual(type.mock.calls[0]?.arguments, [{ chunkSize: 128 * 1024 }]);
        assert.deepStrictEqual(order, ['push', 'err', 'msg', 'err']);
        const call = push.mock.calls[0];
        const chunk = chunks[0];
        assert(call);
        assert(call.arguments[0] instanceof Buffer);
        assert(call.arguments[0].buffer === chunk.buffer);
        assert(call.arguments[0].byteOffset === chunk.byteOffset);
        assert(call.arguments[0].byteLength === chunk.byteLength);
        assert(call.arguments[1] === constants.Z_SYNC_FLUSH);
    });
    for (const value of [null, undefined]) {
        it(`Should throw if the inflator returns ${String(value)}`, async (t) => {
            // arrange
            const inflate = createMockInflate();
            const type = createMockInflateCtor(t, () => inflate)
            const sut = new ZLibSyncContextAdapterFactory(type).createInflator();

            const chunks = [new Uint8Array(123)] as const;
            const order: string[] = [];
            const push = t.mock.method(inflate, 'push', () => { order.push('push') });
            t.mock.getter(inflate, 'err', () => { order.push('err'); return 0; });
            t.mock.getter(inflate, 'result', () => { order.push('result'); return value; });

            // act
            sut.push(chunks[0]);
            const actual = (() => {
                try {
                    sut.flush();
                } catch (err) {
                    return err;
                }
                assert.fail('An error should have been thrown')
            })()

            // assert
            assert(actual instanceof Error);
            assert.equal(actual.message, 'Decompression returned nothing');
            assert.equal(type.mock.calls.length, 1);
            assert.deepStrictEqual(type.mock.calls[0]?.arguments, [{ chunkSize: 128 * 1024 }]);
            assert.deepStrictEqual(order, ['push', 'err', 'result']);
            const call = push.mock.calls[0];
            const chunk = chunks[0];
            assert(call);
            assert(call.arguments[0] instanceof Buffer);
            assert(call.arguments[0].buffer === chunk.buffer);
            assert(call.arguments[0].byteOffset === chunk.byteOffset);
            assert(call.arguments[0].byteLength === chunk.byteLength);
            assert(call.arguments[1] === constants.Z_SYNC_FLUSH);
        });
    }
});

function notMocked(): never {
    assert.fail('No mock has been set up');
}
function createMockInflate(): ZLibSync.Inflate {
    return {
        get chunkSize(): number { return notMocked(); },
        get err(): number { return notMocked(); },
        get windowBits(): number { return notMocked(); },
        get result(): string | Buffer | null { return notMocked(); },
        get msg() { return notMocked(); },
        push: notMocked
    }
}
function createMockInflateCtor(context: TestContext, factory: (...args: ConstructorParameters<typeof ZLibSync.Inflate>) => ZLibSync.Inflate) {
    const result = context.mock.fn(factory);
    return Object.assign(function (...args: ConstructorParameters<typeof ZLibSync.Inflate>) {
        return result(...args);
    }, { mock: result.mock }) as typeof result & typeof ZLibSync.Inflate;
}
