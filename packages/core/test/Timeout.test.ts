import { describe, it } from "node:test";
import { Timeout } from "../src/Timeout.js";
import assert from "node:assert";
import { nextTick } from "node:process";

describe(Timeout.name, () => {
    it('Should timeout after a set time', async (t) => {
        // arrange
        t.mock.timers.enable(['setTimeout']);
        const sut = new Timeout(() => state = 'resolved', 1000);
        let state = 'pending';
        let waited: unknown = 'pending';
        const result = [];
        void (async () => {
            try {
                waited = { resolved: await sut.wait() };
            } catch (err) {
                waited = { rejected: err };
            }
        })();

        // act
        result.push({ state, waited });
        t.mock.timers.tick(999);
        result.push({ state, waited });
        await new Promise(nextTick);
        result.push({ state, waited });
        t.mock.timers.tick(1);
        result.push({ state, waited });
        await new Promise(nextTick);
        result.push({ state, waited });

        // assert
        assert.deepStrictEqual(result, [
            { state: 'pending', waited: 'pending' },
            { state: 'pending', waited: 'pending' },
            { state: 'pending', waited: 'pending' },
            { state: 'resolved', waited: 'pending' },
            { state: 'resolved', waited: { resolved: 'resolved' } },
        ]);
    });
    describe('#remove', () => {
        it('Should remove the timer', async (t) => {
            // arrange
            t.mock.timers.enable(['setTimeout']);
            const sut = new Timeout(() => state = 'resolved', 1000);
            let state = 'pending';
            let waited: unknown = 'pending';
            const result = [];
            void (async () => {
                try {
                    waited = { resolved: await sut.wait() };
                } catch (err) {
                    waited = { rejected: err };
                }
            })();

            // act
            result.push({ state, waited });
            t.mock.timers.tick(999);
            result.push({ state, waited });
            await new Promise(nextTick);
            result.push({ state, waited });
            sut.cancel();
            result.push({ state, waited });
            t.mock.timers.tick(1);
            result.push({ state, waited });
            await new Promise(nextTick);
            result.push({ state, waited });

            // assert
            assert.deepStrictEqual(result, [
                { state: 'pending', waited: 'pending' },
                { state: 'pending', waited: 'pending' },
                { state: 'pending', waited: 'pending' },
                { state: 'pending', waited: 'pending' },
                { state: 'pending', waited: 'pending' },
                { state: 'pending', waited: { rejected: (waited as Record<string, unknown>).rejected } },
            ]);
        });
    });
    describe('#ref', () => {
        it('Should call the timers ref method', (t) => {
            // arrange
            const timeout = { ref: t.mock.fn(), [Symbol.toPrimitive]() { return 0; } };
            const setTimeout = t.mock.method(globalThis, 'setTimeout', () => timeout);
            const sut = new Timeout(() => { }, 999999);
            const timeoutCalls = setTimeout.mock.calls;

            // act
            const actual = sut.ref();

            // assert
            assert.equal(actual, sut);
            assert.equal(timeoutCalls.length, 1);
            assert.equal(timeout.ref.mock.callCount(), 1);
        });
    });
    describe('#unref', () => {
        it('Should call the timers ref method', (t) => {
            // arrange
            const timeout = { unref: t.mock.fn(), [Symbol.toPrimitive]() { return 0; } };
            const setTimeout = t.mock.method(globalThis, 'setTimeout', () => timeout);
            const sut = new Timeout(() => { }, 999999);
            const timeoutCalls = setTimeout.mock.calls;

            // act
            const actual = sut.unref();

            // assert
            assert.equal(actual, sut);
            assert.equal(timeoutCalls.length, 1);
            assert.equal(timeout.unref.mock.callCount(), 1);
        });
    });
});