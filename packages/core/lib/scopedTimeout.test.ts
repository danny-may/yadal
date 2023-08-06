import 'disposablestack/auto';
import { describe, it } from "node:test";
import { mockTimers } from "../../../testUtil/index.js";
import assert from 'node:assert';
import { scopedTimeout } from './scopedTimeout.js';
import { describeFile } from "../../../root.test.util.js";

describeFile(() => {
    describe(scopedTimeout.name, () => {
        it('Should create the timeout and clear it when disposed', (t) => {
            // arrange
            using scope = new DisposableStack();
            const callback = t.mock.fn();
            const { setTimeout, clearTimeout } = mockTimers(t);
            const states: Array<ReturnType<typeof state>> = [];
            const state = () => ({
                set: setTimeout.mock.calls.map(c => c.arguments),
                clear: clearTimeout.mock.calls.map(c => c.arguments)
            })
            const capture = () => states.push(state());

            // act
            capture();
            setTimeout.mock.mockImplementationOnce(() => 999999);
            const sut = scope.use(scopedTimeout(callback, 123456))
            capture();
            clearTimeout.mock.mockImplementationOnce(() => { });
            sut[Symbol.dispose]();
            capture();

            // assert
            assert.deepStrictEqual(states, [
                { set: [], clear: [] },
                { set: [[callback, 123456]], clear: [] },
                { set: [[callback, 123456]], clear: [[999999]] },
            ])
        });
        it('Should not unref the timeout when given true', (t) => {
            // arrange
            using scope = new DisposableStack();
            const callback = t.mock.fn();
            const { setTimeout, clearTimeout } = mockTimers(t);
            const states: Array<ReturnType<typeof state>> = [];
            const timeout = { unref: assert.fail.bind(assert, 'Should not have unrefed') };
            const state = () => ({
                set: setTimeout.mock.calls.map(c => c.arguments),
                clear: clearTimeout.mock.calls.map(c => c.arguments)
            })
            const capture = () => states.push(state());

            // act
            capture();
            setTimeout.mock.mockImplementationOnce(() => timeout);
            const sut = scope.use(scopedTimeout(callback, 123456, true))
            capture();
            clearTimeout.mock.mockImplementationOnce(() => { });
            sut[Symbol.dispose]();
            capture();

            // assert
            assert.deepStrictEqual(states, [
                { set: [], clear: [] },
                { set: [[callback, 123456]], clear: [] },
                { set: [[callback, 123456]], clear: [[timeout]] },
            ])
        });
        it('Should not unref the timeout when given false but there is no unref method', (t) => {
            // arrange
            using scope = new DisposableStack();
            const callback = t.mock.fn();
            const { setTimeout, clearTimeout } = mockTimers(t);
            const states: Array<ReturnType<typeof state>> = [];
            const state = () => ({
                set: setTimeout.mock.calls.map(c => c.arguments),
                clear: clearTimeout.mock.calls.map(c => c.arguments)
            })
            const capture = () => states.push(state());

            // act
            capture();
            setTimeout.mock.mockImplementationOnce(() => 999999);
            const sut = scope.use(scopedTimeout(callback, 123456, false))
            capture();
            clearTimeout.mock.mockImplementationOnce(() => { });
            sut[Symbol.dispose]();
            capture();

            // assert
            assert.deepStrictEqual(states, [
                { set: [], clear: [] },
                { set: [[callback, 123456]], clear: [] },
                { set: [[callback, 123456]], clear: [[999999]] },
            ])
        });
        it('Should unref the timeout when given false', (t) => {
            // arrange
            using scope = new DisposableStack();
            const callback = t.mock.fn();
            const { setTimeout, clearTimeout } = mockTimers(t);
            const states: Array<ReturnType<typeof state>> = [];
            const timeout = { unref: t.mock.fn() };
            const state = () => ({
                set: setTimeout.mock.calls.map(c => c.arguments),
                clear: clearTimeout.mock.calls.map(c => c.arguments),
                unref: timeout.unref.mock.calls.map(c => c.arguments)
            })
            const capture = () => states.push(state());

            // act
            capture();
            setTimeout.mock.mockImplementationOnce(() => timeout);
            const sut = scope.use(scopedTimeout(callback, 123456, false))
            capture();
            clearTimeout.mock.mockImplementationOnce(() => { });
            sut[Symbol.dispose]();
            capture();

            // assert
            assert.deepStrictEqual(states, [
                { unref: [], set: [], clear: [] },
                { unref: [[]], set: [[callback, 123456]], clear: [] },
                { unref: [[]], set: [[callback, 123456]], clear: [[timeout]] },
            ]);
        });
    });
});