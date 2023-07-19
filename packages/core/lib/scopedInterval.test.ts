import 'disposablestack/auto';
import { describe, it } from "node:test";
import { scopedInterval } from "./scopedInterval.js";
import { mockTimers } from "../../../testUtil/index.js";
import assert from 'node:assert';

describe(scopedInterval.name, () => {
    it('Should create the interval and clear it when disposed', (t) => {
        // arrange
        using scope = new DisposableStack();
        const callback = t.mock.fn();
        const { setInterval, clearInterval } = mockTimers(t);
        const states: Array<ReturnType<typeof state>> = [];
        const state = () => ({
            set: setInterval.mock.calls.map(c => c.arguments),
            clear: clearInterval.mock.calls.map(c => c.arguments)
        })
        const capture = () => states.push(state());

        // act
        capture();
        setInterval.mock.mockImplementationOnce(() => 999999);
        const sut = scope.use(scopedInterval(callback, 123456))
        capture();
        clearInterval.mock.mockImplementationOnce(() => { });
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
        const { setInterval, clearInterval } = mockTimers(t);
        const states: Array<ReturnType<typeof state>> = [];
        const interval = { unref: assert.fail.bind(assert, 'Should not have unrefed') };
        const state = () => ({
            set: setInterval.mock.calls.map(c => c.arguments),
            clear: clearInterval.mock.calls.map(c => c.arguments)
        })
        const capture = () => states.push(state());

        // act
        capture();
        setInterval.mock.mockImplementationOnce(() => interval);
        const sut = scope.use(scopedInterval(callback, 123456, true))
        capture();
        clearInterval.mock.mockImplementationOnce(() => { });
        sut[Symbol.dispose]();
        capture();

        // assert
        assert.deepStrictEqual(states, [
            { set: [], clear: [] },
            { set: [[callback, 123456]], clear: [] },
            { set: [[callback, 123456]], clear: [[interval]] },
        ])
    });
    it('Should not unref the timeout when given false but there is no unref method', (t) => {
        // arrange
        using scope = new DisposableStack();
        const callback = t.mock.fn();
        const { setInterval, clearInterval } = mockTimers(t);
        const states: Array<ReturnType<typeof state>> = [];
        const state = () => ({
            set: setInterval.mock.calls.map(c => c.arguments),
            clear: clearInterval.mock.calls.map(c => c.arguments)
        })
        const capture = () => states.push(state());

        // act
        capture();
        setInterval.mock.mockImplementationOnce(() => 999999);
        const sut = scope.use(scopedInterval(callback, 123456, false))
        capture();
        clearInterval.mock.mockImplementationOnce(() => { });
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
        const { setInterval, clearInterval } = mockTimers(t);
        const states: Array<ReturnType<typeof state>> = [];
        const interval = { unref: t.mock.fn() };
        const state = () => ({
            set: setInterval.mock.calls.map(c => c.arguments),
            clear: clearInterval.mock.calls.map(c => c.arguments),
            unref: interval.unref.mock.calls.map(c => c.arguments)
        })
        const capture = () => states.push(state());

        // act
        capture();
        setInterval.mock.mockImplementationOnce(() => interval);
        const sut = scope.use(scopedInterval(callback, 123456, false))
        capture();
        clearInterval.mock.mockImplementationOnce(() => { });
        sut[Symbol.dispose]();
        capture();

        // assert
        assert.deepStrictEqual(states, [
            { unref: [], set: [], clear: [] },
            { unref: [[]], set: [[callback, 123456]], clear: [] },
            { unref: [[]], set: [[callback, 123456]], clear: [[interval]] },
        ]);
    });
})