import { describe, it } from "node:test";
import Erlpack from 'erlpack';
import assert from "node:assert";
import { ErlpackAdapter } from "./ErlpackAdapter.js";
import { describeFile } from "../../../../../root.test.util.js";

describeFile(() => {
    describe(ErlpackAdapter.name, () => {
        const cases = getCases();
        describe('serialize', () => {
            for (const { name, buffer: expected, input } of cases) {
                it('should serialize ' + name, () => {
                    // arrange
                    const sut = new ErlpackAdapter(Erlpack);

                    // act
                    const actual = sut.serialize(input);

                    // assert
                    assert.deepStrictEqual(Buffer.from(actual.buffer, actual.byteOffset, actual.byteLength), expected);
                })
            }
        });
        describe('deserialize', () => {
            for (const { name, buffer, output: expected } of cases) {
                it('should deserialize ' + name, () => {
                    // arrange
                    const sut = new ErlpackAdapter(Erlpack);

                    // act
                    const actual = sut.deserialize(buffer);

                    // assert
                    assert.deepStrictEqual(actual, expected);
                });
            }
        });
    });
});
function getCases() {
    return rawCases().map(c => ({ ...c, buffer: Buffer.from(c.buffer, 'base64') }))
}

function rawCases(): Array<{ name: string, buffer: string, input: unknown, output: unknown }> {
    return [
        { name: 'null', buffer: 'g3MDbmls', input: null, output: null },
        { name: 'number', buffer: 'g2F7', input: 123, output: 123 },
        { name: 'string', buffer: 'g20AAAAJc29tZSB0ZXh0', input: 'some text', output: 'some text' },
        { name: 'true', buffer: 'g3MEdHJ1ZQ==', input: true, output: true },
        { name: 'false', buffer: 'g3MFZmFsc2U=', input: false, output: false },
        { name: 'array', buffer: 'g2wAAAAFYQFtAAAAAWFzBHRydWVzBWZhbHNlcwNuaWxq', input: [1, 'a', true, false, null], output: [1, 'a', true, false, null] },
        { name: 'object', buffer: 'g3QAAAABbQAAAARzb21ldAAAAAFtAAAABGRlZXB0AAAAAW0AAAAGb2JqZWN0bQAAAAVhYWFhYQ==', input: { some: { deep: { object: 'aaaaa' } } }, output: { some: { deep: { object: 'aaaaa' } } } },
        { name: 'object with undefined prop', buffer: 'g3QAAAABbQAAAANhYmNhew==', input: { abc: 123, def: undefined }, output: { abc: 123 } },
        { name: 'date', buffer: 'g20AAAAYMTk3MC0wMS0wMVQwMzoyNTo0NS42Nzha', input: new Date(12345678), output: '1970-01-01T03:25:45.678Z' }
    ]
}
