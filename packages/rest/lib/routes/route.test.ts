import { describe, it } from "node:test";
import { snowflakeArg, stringArg } from "./_route.js";
import assert from "node:assert";
import { describeFile } from "../../../../root.test.util.js";

describeFile(() => {
    describe('str', () => {
        const tests = [
            { input: 'abc', expected: 'abc', name: 'strings' },
            { input: true, expected: 'true', name: 'booleans' },
            { input: 123.456, expected: '123.456', name: 'numbers' },
            { input: 12345678923847294729347924743543987567384739857439857457357935945n, expected: '12345678923847294729347924743543987567384739857439857457357935945', name: 'bigints' },
            { input: { toJSON() { return "Success!" } }, expected: 'Success!', name: 'objects with a toJSON method which returns a string' },
            { input: { toJSON() { return true } }, error: 'Cannot convert object to string [prop: Testing]', name: 'objects with a toJSON method which returns something other than a string' },
            { input: null, error: 'Cannot convert null to string [prop: Testing]', name: 'null' },
            { input: undefined, error: 'Cannot convert undefined to string [prop: Testing]', name: 'undefined' },
            { input: {}, error: 'Cannot convert object to string [prop: Testing]', name: 'object without toJSON' },
            { input: () => { }, error: 'Cannot convert function to string [prop: Testing]', name: 'functions' },
        ]
        for (const test of tests) {
            if ('error' in test) {
                it(`Should not convert ${test.name}`, () => {
                    // arrange
                    const sut = stringArg('Testing');

                    // act
                    const actual = (() => {
                        try {
                            // @ts-expect-error
                            sut(test.input)
                        } catch (err) {
                            return err;
                        }
                        assert.fail('An error was expected');
                    })();

                    // assert
                    assert(actual instanceof Error);
                    assert.strictEqual(actual.message, test.error);
                })
            } else {
                it(`Should convert ${test.name}`, () => {
                    // arrange
                    const sut = stringArg('Testing');

                    // act
                    // @ts-expect-error
                    const actual = sut(test.input);

                    // assert
                    assert.strictEqual(actual, test.expected);
                });
            }
        }
    });

    describe('id', () => {
        const tests = [
            { input: '12345', expected: '12345', name: 'strings containing only numbers' },
            { input: 12345, expected: '12345', name: 'integers' },
            { input: 12345678923847294729347924743543987567384739857439857457357935945n, expected: '12345678923847294729347924743543987567384739857439857457357935945', name: 'bigints' },
            { input: 'abc', error: 'Value is not a valid snowflake [prop: Testing]', name: 'strings containing characters other than numbers' },
            { input: 123.456, error: 'Value is not a valid snowflake [prop: Testing]', name: 'numbers which are not integers' },
            { input: true, error: 'Cannot convert boolean to snowflake [prop: Testing]', name: 'booleans' },
            { input: null, error: 'Cannot convert null to snowflake [prop: Testing]', name: 'null' },
            { input: undefined, error: 'Cannot convert undefined to snowflake [prop: Testing]', name: 'undefined' },
            { input: {}, error: 'Cannot convert object to snowflake [prop: Testing]', name: 'object' },
            { input: () => { }, error: 'Cannot convert function to snowflake [prop: Testing]', name: 'functions' },
        ]
        for (const test of tests) {
            if ('error' in test) {
                it(`Should not convert ${test.name}`, () => {
                    // arrange
                    const sut = snowflakeArg('Testing');

                    // act
                    const actual = (() => {
                        try {
                            // @ts-expect-error
                            sut(test.input)
                        } catch (err) {
                            return err;
                        }
                        assert.fail('An error was expected');
                    })();

                    // assert
                    assert(actual instanceof Error);
                    assert.strictEqual(actual.message, test.error);
                })
            } else {
                it(`Should convert ${test.name}`, () => {
                    // arrange
                    const sut = snowflakeArg('Testing');

                    // act
                    const actual = sut(test.input);

                    // assert
                    assert.strictEqual(actual, test.expected);
                });
            }
        }
    });
});