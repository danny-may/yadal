import { describe, it } from "node:test";
import { describeFile } from "../../../root.test.util.js";
import { toTimestamp } from "./snowflake.js";
import assert from "node:assert";

describeFile(() => {
    describe(toTimestamp.name, () => {
        const testCases = [
            ['0', 1420070400000],
            [0n, 1420070400000],
            [0, 1420070400000],
            ['2350887990484224', 1420630895374],
            [2350887990484224n, 1420630895374],
            [2350887990484224, 1420630895374],
            ['1135991719234642040', 1690911931571],
            [1135991719234642040n, 1690911931571]
        ] as const
        for (const [input, expected] of testCases) {
            it(`Should accept ${s(input)} and return ${expected}`, () => {
                assert.strictEqual(toTimestamp(input), expected);
            })
        }
    });
});
function s(value: unknown) {
    switch (typeof value) {
        case 'bigint': return `${value}n`;
        case 'string': return JSON.stringify(value);
        default: return String(value);
    }
}