import { describe, it } from "node:test";
import { abortListener } from "./abortListener.js";
import assert from "node:assert";

describe(abortListener.name, () => {
    it('Should do nothing when the signal is undefined', () => {
        // arrange
        const handler = assert.fail.bind(null, 'Handler should not have been called');
        const signal = undefined;

        // act
        const actual = abortListener(signal, handler);

        // assert
        assert(typeof actual === 'object');
        assert(actual !== null);
        assert(Symbol.dispose in actual);
        assert(typeof actual[Symbol.dispose] === 'function');
        actual[Symbol.dispose]();
    });
    it('Should add the listener to the signal and remove the listener on dispose', (t) => {
        // arrange
        const handler = t.mock.fn();
        const controller = new AbortController();
        const addListener = t.mock.method(controller.signal, 'addEventListener');
        const removeListener = t.mock.method(controller.signal, 'removeEventListener');
        const state = [];

        // act
        state.push({ add: addListener.mock.calls.map(c => c.arguments), remove: removeListener.mock.calls.map(c => c.arguments), })
        const actual = abortListener(controller.signal, handler);
        state.push({ add: addListener.mock.calls.map(c => c.arguments), remove: removeListener.mock.calls.map(c => c.arguments), })
        actual[Symbol.dispose]();
        state.push({ add: addListener.mock.calls.map(c => c.arguments), remove: removeListener.mock.calls.map(c => c.arguments), })
        controller.abort('Success');
        const listener = addListener.mock.calls[0]?.arguments[1];

        // assert
        assert.deepStrictEqual(state, [
            { add: [], remove: [] },
            { add: [['abort', listener]], remove: [] },
            { add: [['abort', listener]], remove: [['abort', listener]] }
        ]);
        assert(handler.mock.callCount() === 0);
        assert(typeof listener === 'function');
        listener(new Event('abort'));
        assert(handler.mock.callCount() === 1);
        assert(handler.mock.calls[0]?.arguments[0] === 'Success')
    });
    it('Should call the handler on abort', (t) => {
        // arrange
        const handler = t.mock.fn();
        const controller = new AbortController();
        const state = [];

        // act
        state.push(handler.mock.calls.map(c => c.arguments))
        const actual = abortListener(controller.signal, handler);
        state.push(handler.mock.calls.map(c => c.arguments))
        controller.abort('Success');
        state.push(handler.mock.calls.map(c => c.arguments))
        actual[Symbol.dispose]();
        state.push(handler.mock.calls.map(c => c.arguments))

        // assert
        assert.deepStrictEqual(state, [
            [],
            [],
            [['Success']],
            [['Success']]
        ])
    });
});