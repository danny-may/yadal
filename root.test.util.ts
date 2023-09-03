import path from "node:path";
import { describe } from "node:test";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL('./', import.meta.url));
export function testTarget(meta?: ImportMeta) {
    return getFileUnderTest(testTarget, meta);
}
export function describeFile(suiteFn: () => void | Promise<void>) {
    describe(getFileUnderTest(describeFile), suiteFn);
}
function getFileUnderTest(caller: Function, meta?: ImportMeta) {
    const f = meta === undefined ? getCallerFileName(caller) : fileURLToPath(meta.url);
    if (!f.endsWith('.test.js'))
        throw new Error('Called from a non-test file');
    return path.relative(projectRoot, `${f.replace('/test/', '/lib/').slice(0, -'.test.js'.length)}.js`);
}

function getCallerFileName(callee: Function) {
    const [caller] = getStack(callee);
    if (caller === undefined)
        throw new Error('Unknown caller');
    const fileName = caller.getFileName();
    if (fileName === undefined)
        throw new Error('Called from a non-file source');
    return fileURLToPath(fileName);
}

function getStack(callee: Function) {
    const result = {} as { stack?: NodeJS.CallSite[] }
    const prep = Error.prepareStackTrace;
    try {
        Error.prepareStackTrace = (_, s) => result.stack = s;
        const err = new Error();
        Error.captureStackTrace(err, callee);
        err.stack;
    } finally {
        Error.prepareStackTrace = prep;
    }
    return result.stack!;
}