import { describe, it } from "node:test";
import { describeFile } from "../../../root.test.util.js";
import { distinct } from "./distinct.js";
import assert from "node:assert";

describeFile(() => {
    describe(distinct.name, () => {
        const testCases = [
            { input: [1, 2, 3, 4, 5], expected: [1, 2, 3, 4, 5] },
            { input: [1, 2, 3, 4, 5, 1, 2, 3, 4, 5], expected: [1, 2, 3, 4, 5] },
            { input: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5], expected: [1, 2, 3, 4, 5] }
        ];
        for (const { input, expected } of testCases) {
            it(`Should return the values ${JSON.stringify(expected)} when given ${JSON.stringify(input)}`, () => {
                // arrange

                // act
                const actual = [...distinct(input)];

                // assert
                assert.strictEqual(actual.length, expected.length, 'Expected the result to contain the correct number of entries');
                for (let i = 0; i < expected.length; i++)
                    assert.strictEqual(actual[i], expected[i], `Expected index ${i} to have the correct value`);
            });
        }
    });
});