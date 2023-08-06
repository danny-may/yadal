import { describe, it } from "node:test";
import { ProtocolURLResolver } from "./ProtocolURLResolver.js";
import assert from "node:assert";
import { describeFile } from "../../../root.test.util.js";

describeFile(() => {
    describe(ProtocolURLResolver.name, () => {
        describe('#resolve', () => {
            it('Should return the result of a resolver when one exists', (t) => {
                // arrange
                const resolve = t.mock.fn<(url: URL) => URL>(() => assert.fail('No implementation'));
                const expected = new URL('https://success.com');
                const input = new URL('xyz://protocol');
                resolve.mock.mockImplementationOnce(() => expected);
                const sut = new ProtocolURLResolver({
                    'xyz:': resolve
                });

                // act
                const actual = sut.resolve(input);

                // assert
                assert.strictEqual(actual, expected);
                assert.strictEqual(resolve.mock.callCount(), 1);
                assert.deepStrictEqual(resolve.mock.calls[0]?.arguments, [input]);
            });
            it('Should return the input when no resolver exists', (t) => {
                // arrange
                const resolve = t.mock.fn<(url: URL) => URL>(() => assert.fail('No implementation'));
                const expected = new URL('https://success.com');
                const sut = new ProtocolURLResolver({
                    'test:': resolve
                });

                // act
                const actual = sut.resolve(expected);

                // assert
                assert.strictEqual(actual, expected);
                assert.strictEqual(resolve.mock.callCount(), 0);
            });
        });
    });
});