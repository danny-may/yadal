import 'disposablestack/auto';
import { describe, it } from "node:test";
import { sleep } from "./sleep.js";
import { mockTimers } from "../../../testUtil/index.js";
import assert from "node:assert";
import { nextTick } from "node:process";
import { describeFile } from "../../../root.test.util.js";

describeFile(() => {
    describe(sleep.name, () => {
        it('Should resolve once the timeout expires', async (t) => {
            // arrange
            const { setTimeout, clearTimeout } = mockTimers(t);
            const states: unknown[] = [];
            let actual: unknown;
            let resolve: unknown;

            setTimeout.mock.mockImplementationOnce((fn: unknown) => { resolve = fn; return 123; });
            clearTimeout.mock.mockImplementationOnce(() => { });

            // act
            states.push(actual);
            const sut = sleep(10000);
            void (async () => {
                try {
                    await sut;
                    actual = { resolved: 'Success!' };
                } catch (err) {
                    actual = { rejected: err }
                }
            })();
            states.push(actual);
            await new Promise(nextTick);
            states.push(actual);
            assert(typeof resolve === 'function');
            resolve();
            states.push(actual);
            await new Promise(nextTick);
            states.push(actual);

            // assert
            assert.deepStrictEqual(states, [
                undefined,
                undefined,
                undefined,
                undefined,
                { resolved: 'Success!' }
            ]);
            assert.deepStrictEqual(clearTimeout.mock.calls[0]?.arguments, [123]);
        });
        it('Should resolve if the timeout triggers before the abort', async (t) => {
            // arrange
            const { setTimeout, clearTimeout } = mockTimers(t);
            const controller = new AbortController();
            const states: unknown[] = [];
            let actual: unknown;
            let resolve: unknown;

            setTimeout.mock.mockImplementationOnce((fn: unknown) => { resolve = fn; return 123; });
            clearTimeout.mock.mockImplementationOnce(() => { });

            // act
            states.push(actual);
            const sut = sleep(10000, controller.signal);
            void (async () => {
                try {
                    await sut;
                    actual = { resolved: 'Success!' };
                } catch (err) {
                    actual = { rejected: err }
                }
            })();
            states.push(actual);
            await new Promise(nextTick);
            states.push(actual);
            assert(typeof resolve === 'function');
            resolve();
            controller.abort('Fail');
            states.push(actual);
            await new Promise(nextTick);
            states.push(actual);

            // assert
            assert.deepStrictEqual(states, [
                undefined,
                undefined,
                undefined,
                undefined,
                { resolved: 'Success!' }
            ]);
            assert.deepStrictEqual(clearTimeout.mock.calls[0]?.arguments, [123]);
        });
        it('Should reject if the abort controller fires before the timeout', async (t) => {
            // arrange
            const { setTimeout, clearTimeout } = mockTimers(t);
            const controller = new AbortController();
            const states: unknown[] = [];
            let actual: unknown;
            let resolve: unknown;

            setTimeout.mock.mockImplementationOnce((fn: unknown) => { resolve = fn; return 123; });
            clearTimeout.mock.mockImplementationOnce(() => { });

            // act
            states.push(actual);
            const sut = sleep(10000, controller.signal);
            void (async () => {
                try {
                    await sut;
                    actual = { resolved: 'Failed!' };
                } catch (err) {
                    actual = { rejected: err }
                }
            })();
            states.push(actual);
            await new Promise(nextTick);
            states.push(actual);
            assert(typeof resolve === 'function');
            controller.abort('Success!')
            resolve();
            states.push(actual);
            await new Promise(nextTick);
            states.push(actual);

            // assert
            assert.deepStrictEqual(states, [
                undefined,
                undefined,
                undefined,
                undefined,
                { rejected: 'Success!' }
            ]);
            assert.deepStrictEqual(clearTimeout.mock.calls[0]?.arguments, [123]);
        });
        it('Should clear the timer if aborted', async (t) => {
            // arrange
            const { setTimeout, clearTimeout } = mockTimers(t);
            const controller = new AbortController();
            const states: unknown[] = [];
            let actual: unknown;

            setTimeout.mock.mockImplementationOnce(() => { return 123; });
            clearTimeout.mock.mockImplementationOnce(() => { });

            // act
            states.push(actual);
            const sut = sleep(10000, controller.signal);
            void (async () => {
                try {
                    await sut;
                    actual = { resolved: 'Failed!' };
                } catch (err) {
                    actual = { rejected: err }
                }
            })();
            states.push(actual);
            await new Promise(nextTick);
            states.push(actual);
            controller.abort('Success!')
            states.push(actual);
            await new Promise(nextTick);
            states.push(actual);

            // assert
            assert.deepStrictEqual(states, [
                undefined,
                undefined,
                undefined,
                undefined,
                { rejected: 'Success!' }
            ]);
            assert.deepStrictEqual(clearTimeout.mock.calls[0]?.arguments, [123]);
        });
    });
});