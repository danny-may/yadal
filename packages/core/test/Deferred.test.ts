import { describe, it } from "node:test";
import { Deferred } from "../src/Deferred.js";
import assert from "node:assert";
import { nextTick } from "node:process";

describe(Deferred.name, () => {
    it('Should resolve in the tick after resolve is called', async () => {
        // arrange
        const sut = new Deferred();
        const expected = Symbol();
        let state: unknown = 'pending';
        const result = [];
        void (async () => {
            try {
                state = { resolved: await sut.wait() };
            } catch (err) {
                state = { rejected: err }
            }
        })();

        // act
        result.push(state);
        await new Promise(nextTick);
        result.push(state);
        sut.resolve(expected);
        result.push(state);
        await new Promise(nextTick);
        result.push(state);

        // assert
        assert.deepStrictEqual(result, [
            'pending',
            'pending',
            'pending',
            { resolved: expected }
        ]);
    });
    it('Should reject in the tick after reject is called', async () => {
        // arrange
        const sut = new Deferred();
        const expected = Symbol();
        let state: unknown = 'pending';
        const result = [];
        void (async () => {
            try {
                state = { resolved: await sut.wait() };
            } catch (err) {
                state = { rejected: err }
            }
        })();

        // act
        result.push(state);
        await new Promise(nextTick);
        result.push(state);
        sut.reject(expected);
        result.push(state);
        await new Promise(nextTick);
        result.push(state);

        // assert
        assert.deepStrictEqual(result, [
            'pending',
            'pending',
            'pending',
            { rejected: expected }
        ]);
    });
    it('Should reject in the tick after @@dispose is called', async () => {
        // arrange
        const sut = new Deferred();
        let state: unknown = 'pending';
        const result = [];
        void (async () => {
            try {
                state = { resolved: await sut.wait() };
            } catch (err) {
                state = { rejected: err }
            }
        })();

        // act
        result.push(state);
        await new Promise(nextTick);
        result.push(state);
        sut[Symbol.dispose]();
        result.push(state);
        await new Promise(nextTick);

        // assert
        assert.deepStrictEqual(result, [
            'pending',
            'pending',
            'pending'
        ]);
        assert((state as Record<string, unknown>).rejected instanceof Error, 'Promise should have been rejected');
        assert.equal((state as { rejected: Error }).rejected.message, 'Deferred was disposed');
    });
    it('Should abort in the tick after abort is called when using the constructor', async () => {
        // arrange
        const controller = new AbortController();
        const sut = new Deferred(controller.signal);
        const expected = Symbol();
        let state: unknown = 'pending';
        const result = [];
        void (async () => {
            try {
                state = { resolved: await sut.wait() };
            } catch (err) {
                state = { rejected: err }
            }
        })();

        // act
        result.push(state);
        await new Promise(nextTick);
        result.push(state);
        controller.abort(expected);
        sut.resolve('failed');
        result.push(state);
        await new Promise(nextTick);
        result.push(state);

        // assert
        assert.deepStrictEqual(result, [
            'pending',
            'pending',
            'pending',
            { rejected: expected }
        ]);
    });
    it('Should abort in the tick after abort is called when using wait', async () => {
        // arrange
        const controller = new AbortController();
        const sut = new Deferred();
        const expected = Symbol();
        let state: unknown = 'pending';
        const result = [];
        void (async () => {
            try {
                state = { resolved: await sut.wait(controller.signal) };
            } catch (err) {
                state = { rejected: err }
            }
        })();

        // act
        result.push(state);
        await new Promise(nextTick);
        result.push(state);
        controller.abort(expected);
        sut.resolve('failed');
        result.push(state);
        await new Promise(nextTick);
        result.push(state);

        // assert
        assert.deepStrictEqual(result, [
            'pending',
            'pending',
            'pending',
            { rejected: expected }
        ]);
    });
})