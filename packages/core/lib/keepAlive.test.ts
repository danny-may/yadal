import 'disposablestack/auto';
import { describe, it } from "node:test";
import { keepAlive } from "./keepAlive.js";
import { mockTimers } from "../../../testUtil/index.js";
import assert from "node:assert";

describe(keepAlive.name, () => {
    it('Should clear the interval when it is the last timer', (t) => {
        // arrange
        using scope = new DisposableStack();
        const { setInterval, clearInterval } = mockTimers(t);
        const impls: unknown[] = [];
        const states: Array<ReturnType<typeof state>> = [];
        const state = () => ({
            set: setInterval.mock.calls.map(c => c.arguments),
            clear: clearInterval.mock.calls.map(c => c.arguments)
        })
        const capture = () => states.push(state());


        // act
        capture();
        setInterval.mock.mockImplementationOnce((fn: unknown) => { impls.push(fn); return 123456 });
        const sut = scope.use(keepAlive());
        capture();
        clearInterval.mock.mockImplementationOnce(() => { });
        sut[Symbol.dispose]();
        capture();

        // assert
        assert(typeof impls[0] === 'function');
        assert.deepStrictEqual(states, [
            { set: [], clear: [] },
            { set: [[impls[0], 1 << 30]], clear: [] },
            { set: [[impls[0], 1 << 30]], clear: [[123456]] },
        ]);
    });
    it('Should ignore multiple disposes', (t) => {
        // arrange
        using scope = new DisposableStack();
        const { setInterval, clearInterval } = mockTimers(t);
        const impls: unknown[] = [];
        setInterval.mock.mockImplementationOnce((fn: unknown) => { impls.push(fn); return 123456 });
        clearInterval.mock.mockImplementationOnce(() => { });
        const states: Array<ReturnType<typeof state>> = [];
        const state = () => ({
            set: setInterval.mock.calls.map(c => c.arguments),
            clear: clearInterval.mock.calls.map(c => c.arguments)
        })
        const capture = () => states.push(state());

        capture();
        const sut = scope.use(keepAlive());

        // act
        capture();
        sut[Symbol.dispose]();
        capture();
        sut[Symbol.dispose]();
        capture();
        sut[Symbol.dispose]();
        capture();

        // assert
        assert(typeof impls[0] === 'function');
        assert.deepStrictEqual(states, [
            { set: [], clear: [] },
            { set: [[impls[0], 1 << 30]], clear: [] },
            { set: [[impls[0], 1 << 30]], clear: [[123456]] },
            { set: [[impls[0], 1 << 30]], clear: [[123456]] },
            { set: [[impls[0], 1 << 30]], clear: [[123456]] },
        ]);
    });
    it('Should only clear once all instances are disposed', (t) => {
        // arrange
        using scope = new DisposableStack();
        const { setInterval, clearInterval } = mockTimers(t);
        const impls: unknown[] = [];
        const states: Array<ReturnType<typeof state>> = [];
        const state = () => ({
            set: setInterval.mock.calls.map(c => c.arguments),
            clear: clearInterval.mock.calls.map(c => c.arguments)
        })
        const capture = () => states.push(state());


        // act
        capture();
        setInterval.mock.mockImplementationOnce((fn: unknown) => { impls.push(fn); return 123456 });
        const sut1 = scope.use(keepAlive());
        capture();
        const sut2 = scope.use(keepAlive());
        capture();
        const sut3 = scope.use(keepAlive());
        capture();
        sut1[Symbol.dispose]();
        capture();
        sut3[Symbol.dispose]();
        capture();
        const sut4 = scope.use(keepAlive());
        capture();
        sut4[Symbol.dispose]();
        capture();
        clearInterval.mock.mockImplementationOnce(() => { });
        sut2[Symbol.dispose]();
        capture();

        // assert
        assert(typeof impls[0] === 'function');
        assert.deepStrictEqual(states, [
            { set: [], clear: [] },
            { set: [[impls[0], 1 << 30]], clear: [] },
            { set: [[impls[0], 1 << 30]], clear: [] },
            { set: [[impls[0], 1 << 30]], clear: [] },
            { set: [[impls[0], 1 << 30]], clear: [] },
            { set: [[impls[0], 1 << 30]], clear: [] },
            { set: [[impls[0], 1 << 30]], clear: [] },
            { set: [[impls[0], 1 << 30]], clear: [] },
            { set: [[impls[0], 1 << 30]], clear: [[123456]] },
        ]);
    });
    it('Should create a new timeout when it has previously expired', (t) => {
        // arrange
        using scope = new DisposableStack();
        const { setInterval, clearInterval } = mockTimers(t);
        const impls: unknown[] = [];
        const states: Array<ReturnType<typeof state>> = [];
        const state = () => ({
            set: setInterval.mock.calls.map(c => c.arguments),
            clear: clearInterval.mock.calls.map(c => c.arguments)
        })
        const capture = () => states.push(state());


        // act
        capture();
        setInterval.mock.mockImplementationOnce((fn: unknown) => { impls.push(fn); return 123456 });
        const sut1 = scope.use(keepAlive());
        capture();
        clearInterval.mock.mockImplementationOnce(() => { });
        sut1[Symbol.dispose]();
        capture();
        setInterval.mock.mockImplementationOnce((fn: unknown) => { impls.push(fn); return 987654 });
        const sut2 = scope.use(keepAlive());
        capture();
        clearInterval.mock.mockImplementationOnce(() => { });
        sut2[Symbol.dispose]();
        capture();

        // assert
        assert(typeof impls[0] === 'function');
        assert(typeof impls[1] === 'function');
        assert.deepStrictEqual(states, [
            { set: [], clear: [] },
            { set: [[impls[0], 1 << 30]], clear: [] },
            { set: [[impls[0], 1 << 30]], clear: [[123456]] },
            { set: [[impls[0], 1 << 30], [impls[1], 1 << 30]], clear: [[123456]] },
            { set: [[impls[0], 1 << 30], [impls[1], 1 << 30]], clear: [[123456], [987654]] },
        ]);
    });
});