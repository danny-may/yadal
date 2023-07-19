
export type TestContext = Parameters<NonNullable<Parameters<typeof import('node:test').it>[0]>>[0];
type FunctionPropertyNames<T> = {
    [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T]

export function mockTimers(t: TestContext) {
    return {
        setTimeout: mockMethod(t, 'setTimeout'),
        clearTimeout: mockMethod(t, 'clearTimeout'),
        setInterval: mockMethod(t, 'setInterval'),
        clearInterval: mockMethod(t, 'clearInterval'),
        setImmediate: mockMethod(t, 'setImmediate')
    }
}
function mockMethod<Name extends FunctionPropertyNames<typeof globalThis>>(t: TestContext, name: Name) {
    const fn = t.mock.method(globalThis, name);
    fn.mock.mockImplementation(() => { throw new Error('Mock hasnt been set up!') });
    return fn;
}