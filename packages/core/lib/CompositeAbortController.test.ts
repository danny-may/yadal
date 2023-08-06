import { describe, it } from "node:test";
import assert from "node:assert";
import { CompositeAbortController } from "./CompositeAbortController.js";
import { TestContext } from "../../../testUtil/index.js";
import { describeFile } from "../../../root.test.util.js";

describeFile(() => {
    describe(CompositeAbortController.name, () => {
        it('Should accept an undefined signal', () => {
            // arrange

            // act
            const sut = new CompositeAbortController(undefined);
            sut[Symbol.dispose]();

            // assert
        });
        it('Should remove its listeners once when disposed', (t) => {
            // arrange
            const controller = new AbortController();
            const getEventState = setupEventBindings(t, controller.signal);
            const sut = new CompositeAbortController(controller.signal);
            const beforeDispose = getEventState();

            // act
            sut[Symbol.dispose]();
            sut[Symbol.dispose]();
            sut[Symbol.dispose]();
            sut[Symbol.dispose]();

            // assert
            const afterDispose = getEventState();
            assertEventBindings(beforeDispose, afterDispose);
        });
        it('Should attach each listener only once', (t) => {
            // arrange
            const controller = new AbortController();
            const getEventState = setupEventBindings(t, controller.signal);
            const sut = new CompositeAbortController(controller.signal, controller, undefined, [controller]);
            const beforeDispose = getEventState();

            // act
            sut[Symbol.dispose]();

            // assert
            const afterDispose = getEventState();
            assertEventBindings(beforeDispose, afterDispose);
        });
        it('Should abort when a child signal aborts', (t) => {

            // arrange
            const controller = new AbortController();
            const getEventState = setupEventBindings(t, controller.signal);
            const sut = new CompositeAbortController(controller.signal);
            const beforeDispose = getEventState();
            const expected = {};

            // act
            controller.abort(expected);

            // assert
            const afterDispose = getEventState();
            assertEventBindings(beforeDispose, afterDispose);
            assert.equal(sut.signal.aborted, true);
            assert.equal(sut.signal.reason, expected);
        });
        it('Should abort when a child controller aborts', (t) => {

            // arrange
            const controller = new AbortController();
            const getEventState = setupEventBindings(t, controller.signal);
            const sut = new CompositeAbortController(controller);
            const beforeAbort = getEventState();
            const expected = {};

            // act
            controller.abort(expected);

            // assert
            const afterAbort = getEventState();
            assertEventBindings(beforeAbort, afterAbort);
            assert.equal(sut.signal.aborted, true);
            assert.equal(sut.signal.reason, expected);
        });
        it('Should abort when any child controller or signal aborts', (t) => {
            for (let i = 0; i < 9; i++) {
                // arrange
                const controllers = Array.from({ length: 9 }).map(() => new AbortController());
                const sources = [
                    controllers[0],
                    controllers[1]!.signal,
                    undefined,
                    controllers[2],
                    controllers[3],
                    controllers[4]!.signal,
                    [
                        controllers[5]!.signal,
                        [
                            controllers[6]
                        ]
                    ],
                    controllers[7],
                    controllers[8]
                ] as const;
                const states = controllers.map(c => setupEventBindings(t, c.signal));
                const sut = new CompositeAbortController(...sources);
                const beforeAbort = states.map(s => s());
                const expected = {};

                // act
                controllers[i as number & keyof typeof controllers]!.abort(expected);
                controllers.forEach(c => c.abort(0));

                // assert
                const afterAbort = states.map(s => s());
                for (let i = 0; i < controllers.length; i++) {
                    assertEventBindings(beforeAbort[i]!, afterAbort[i]!);
                }
                assertEventBindings(beforeAbort[i]!, afterAbort[i]!);
                assert.equal(sut.signal.aborted, true);
                assert.equal(sut.signal.reason, expected);
            }
        });
    });
});

function setupEventBindings(t: TestContext, signal: EventTarget) {
    const addEventListener = t.mock.method(signal, 'addEventListener');
    const removeEventListener = t.mock.method(signal, 'removeEventListener');

    return () => ({
        signal,
        add: addEventListener.mock.calls,
        remove: removeEventListener.mock.calls
    })
}

type EventBindingState = ReturnType<ReturnType<typeof setupEventBindings>>;
function assertEventBindings(before: EventBindingState, after: EventBindingState) {
    const addCall = after.add[0]!;
    const removeCall = after.remove[0]!;

    assert.deepStrictEqual({
        beforeAddLength: before.add.length,
        afterAddLength: after.add.length,
        beforeRemoveLength: before.remove.length,
        afterRemoveLength: after.remove.length,
        addThis: addCall?.this,
        addArg1: addCall?.arguments[0],
        removeThis: removeCall?.this,
        removeArgs: removeCall?.arguments
    }, {
        beforeAddLength: 1,
        afterAddLength: 1,
        beforeRemoveLength: 0,
        afterRemoveLength: 1,
        addThis: after.signal,
        addArg1: 'abort',
        removeThis: after.signal,
        removeArgs: addCall?.arguments
    });
}