import { describe, it } from "node:test";
import { TimedAbortController } from "./TimedAbortController.js";
import { mockTimers } from "../../../testUtil/index.js";
import assert from "node:assert";
import { describeFile } from "../../../root.test.util.js";

describeFile(() => {
    describe(TimedAbortController.name, () => {
        it('Should abort after the given timespan', (t) => {
            // arrange
            const { setTimeout, clearTimeout } = mockTimers(t);
            const timeout = {};
            setTimeout.mock.mockImplementationOnce(() => timeout);
            clearTimeout.mock.mockImplementationOnce(() => { });
            const sut = new TimedAbortController(9999);
            const beforeCall = {
                aborted: sut.signal.aborted,
                reason: sut.signal.reason,
                cleared: clearTimeout.mock.calls.length !== 0
            };

            // act
            setTimeout.mock.calls[0]?.arguments[0]?.();

            // assert
            assert.deepStrictEqual(beforeCall, { aborted: false, reason: undefined, cleared: false });
            assert.strictEqual(setTimeout.mock.calls.length, 1);
            assert.strictEqual(setTimeout.mock.calls[0]?.arguments[1], 9999);
            assert.strictEqual(sut.signal.aborted, true);
            assert(sut.signal.reason instanceof Error, 'Reason should be an error');
            assert.strictEqual(sut.signal.reason.message, 'Aborted after 9999ms');
            assert.strictEqual(clearTimeout.mock.calls.length, 1);
            assert.strictEqual(clearTimeout.mock.calls[0]?.arguments[0], timeout);
        });
        it('Should dispose when aborted', (t) => {
            // arrange
            const { setTimeout, clearTimeout } = mockTimers(t);
            const timeout = {};
            setTimeout.mock.mockImplementationOnce(() => timeout);
            clearTimeout.mock.mockImplementationOnce(() => { });
            const sut = new TimedAbortController(9999);
            const beforeCall = {
                aborted: sut.signal.aborted,
                reason: sut.signal.reason,
                cleared: clearTimeout.mock.calls.length !== 0
            }

            // act
            sut.abort('Success');

            // assert
            assert.deepStrictEqual(beforeCall, { aborted: false, reason: undefined, cleared: false });
            assert.strictEqual(setTimeout.mock.calls.length, 1);
            assert.strictEqual(setTimeout.mock.calls[0]?.arguments[1], 9999);
            assert.strictEqual(sut.signal.aborted, true);
            assert.strictEqual(sut.signal.reason, 'Success');
            assert.strictEqual(clearTimeout.mock.calls.length, 1);
            assert.strictEqual(clearTimeout.mock.calls[0]?.arguments[0], timeout);
        });
        it('Clear the timeout when disposed', (t) => {
            // arrange
            const { setTimeout, clearTimeout } = mockTimers(t);
            const timeout = {};
            setTimeout.mock.mockImplementationOnce(() => timeout);
            clearTimeout.mock.mockImplementationOnce(() => { });
            const sut = new TimedAbortController(9999);
            const beforeCall = {
                aborted: sut.signal.aborted,
                reason: sut.signal.reason,
                cleared: clearTimeout.mock.calls.length !== 0
            }

            // act
            sut[Symbol.dispose]()

            // assert
            assert.deepStrictEqual(beforeCall, { aborted: false, reason: undefined, cleared: false });
            assert.strictEqual(setTimeout.mock.calls.length, 1);
            assert.strictEqual(setTimeout.mock.calls[0]?.arguments[1], 9999);
            assert.strictEqual(sut.signal.aborted, false);
            assert.strictEqual(sut.signal.reason, undefined);
            assert.strictEqual(clearTimeout.mock.calls.length, 1);
            assert.strictEqual(clearTimeout.mock.calls[0]?.arguments[0], timeout);
        });
    });
});