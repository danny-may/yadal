import { describe, it } from "node:test";
import { describeFile } from "../../../root.test.util.js";
import { escapeRegex } from "./escapeRegex.js";
import assert from "node:assert";

describeFile(() => {
    describe(escapeRegex.name, () => {
        const testCases = [
            { input: 'this is a test', expected: 'this is a test' },
            { input: '.*+?^${}()|[]\\/', expected: '\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\\\\/' }
        ] as const;

        for (const { input, expected } of testCases) {
            it(`Should escape ${JSON.stringify(input)} and return ${JSON.stringify(expected)}`, () => {
                assert.strictEqual(escapeRegex(input), expected);
            })
        }
    })
});