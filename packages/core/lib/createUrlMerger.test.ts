import { describe, it } from "node:test";
import { URLMergerConfig, createUrlMerger } from "./createUrlMerger.js";
import assert from "node:assert";
import { describeFile } from "../../../root.test.util.js";

describeFile(() => {
    describe(createUrlMerger.name, () => {
        describe('Default merge config', () => {
            const testCases = [
                {
                    baseUrl: 'https://discord.com/api/v10',
                    input: 'rel://api/guilds/something?abc=123',
                    expected: 'https://discord.com/api/v10/guilds/something?abc=123',
                },
                {
                    baseUrl: 'https://test:pwd123@discord.com:80/api/v10/?token=123#xyz',
                    input: 'rel://api/guilds/xyz',
                    expected: 'https://test:pwd123@discord.com:80/api/v10/guilds/xyz?token=123#xyz',
                },
                {
                    baseUrl: 'https://test:pwd123@discord.com:80/api/v10/?token=123#xyz',
                    input: 'rel://other:pwd321@api:9999/guilds/xyz?name=abc#qwerty',
                    expected: 'https://test:pwd123@discord.com:9999/api/v10/guilds/xyz?name=abc&token=123#qwerty',
                }
            ];
            for (const { baseUrl, input, expected } of testCases) {
                it(`Should correctly merge ${baseUrl} into ${input}`, () => {
                    testConfig(undefined, baseUrl, input, expected);
                });
            }
        });

        describe('config.protocol', () => {
            it('Should do nothing when set to targetUrl', () => {
                testConfig({ protocol: 'targetUrl' }, 'fail://', 'success://test.com', 'success://test.com');
            });
            it('Should replace the value when set to baseUrl', () => {
                testConfig({ protocol: 'baseUrl' }, 'success://', 'fail://test.com', 'success://test.com');
            });
            it('Should do nothing when set to merge if there is already a protocol', () => {
                testConfig({ protocol: 'merge' }, 'fail://', 'success://test.com', 'success://test.com');
            });
            it('Should replace the value when set to merge if there is not already a protocol', () => {
                testConfig({ protocol: 'merge' }, 'success://', 'fail://test.com', 'success://test.com', (input) => Object.defineProperty(input, 'protocol', { value: '' }))
            });
            it('Should reject an invalid config', () => {
                testInvalid({ protocol: 'invalid' }, 'protocol', '"invalid"');
            });
        });

        describe('config.username', () => {
            it('Should do nothing when set to targetUrl', () => {
                testConfig({ username: 'targetUrl' }, 'fail://fail@fail', 'success://success@test.com', 'success://success@test.com');
            });
            it('Should replace the value when set to baseUrl', () => {
                testConfig({ username: 'baseUrl' }, 'fail://success@fail', 'success://fail@test.com', 'success://success@test.com');
            });
            it('Should do nothing when set to merge if there is already a username', () => {
                testConfig({ username: 'merge' }, 'fail://fail@fail', 'success://success@test.com', 'success://success@test.com');
            });
            it('Should replace the value when set to merge if there is not already a username', () => {
                testConfig({ username: 'merge' }, 'fail://success@fail', 'success://test.com', 'success://success@test.com');
            });
            it('Should reject an invalid config', () => {
                testInvalid({ username: 'invalid' }, 'username', '"invalid"');
            });
        });

        describe('config.password', () => {
            it('Should do nothing when set to targetUrl', () => {
                testConfig({ password: 'targetUrl' }, 'fail://fail:fail@fail', 'success://success:success@test.com', 'success://success:success@test.com');
            });
            it('Should replace the value when set to baseUrl', () => {
                testConfig({ password: 'baseUrl' }, 'fail://fail:success@fail', 'success://success:fail@test.com', 'success://success:success@test.com');
            });
            it('Should do nothing when set to merge if there is already a password', () => {
                testConfig({ password: 'merge' }, 'fail://fail:fail@fail', 'success://success:success@test.com', 'success://success:success@test.com');
            });
            it('Should replace the value when set to merge if there is not already a password', () => {
                testConfig({ password: 'merge' }, 'fail://fail:success@fail', 'success://success@test.com', 'success://success:success@test.com');
            });
            it('Should reject an invalid config', () => {
                testInvalid({ password: 'invalid' }, 'password', '"invalid"');
            });
        });

        describe('config.hostname', () => {
            it('Should do nothing when set to targetUrl', () => {
                testConfig({ hostname: 'targetUrl' }, 'fail://fail', 'success://success', 'success://success');
            });
            it('Should replace the value when set to baseUrl', () => {
                testConfig({ hostname: 'baseUrl' }, 'fail://success', 'success://fail', 'success://success');
            });
            it('Should do nothing when set to merge if there is already a hostname', () => {
                testConfig({ hostname: 'merge' }, 'fail://fail', 'success://success', 'success://success');
            });
            it('Should replace the value when set to merge if there is not already a hostname', () => {
                testConfig({ hostname: 'merge' }, 'fail://success', 'success://', 'success://success');
            });
            it('Should reject an invalid config', () => {
                testInvalid({ hostname: 'invalid' }, 'hostname', '"invalid"');
            });
        });

        describe('config.port', () => {
            it('Should do nothing when set to targetUrl', () => {
                testConfig({ port: 'targetUrl' }, 'fail://fail:500', 'success://success:200', 'success://success:200');
            });
            it('Should replace the value when set to baseUrl', () => {
                testConfig({ port: 'baseUrl' }, 'fail://fail:200', 'success://success:500', 'success://success:200');
            });
            it('Should do nothing when set to merge if there is already a port', () => {
                testConfig({ port: 'merge' }, 'fail://fail:500', 'success://success:200', 'success://success:200');
            });
            it('Should replace the value when set to merge if there is not already a port', () => {
                testConfig({ port: 'merge' }, 'fail://fail:200', 'success://success', 'success://success:200');
            });
            it('Should reject an invalid config', () => {
                testInvalid({ port: 'invalid' }, 'port', '"invalid"');
            });
        });

        describe('config.pathname', () => {
            it('Should do nothing when set to targetUrl', () => {
                testConfig({ pathname: 'targetUrl' }, 'fail://fail/fail', 'success://success/success', 'success://success/success');
            });
            it('Should replace the value when set to baseUrl', () => {
                testConfig({ pathname: 'baseUrl' }, 'fail://fail/success', 'success://success/fail', 'success://success/success');
            });
            it('Should prepend the pathname when it is set to merge', () => {
                testConfig({ pathname: 'merge' }, 'fail://fail/success1', 'success://success/success2', 'success://success/success1/success2');
            });
            it('Should do nothing when the pathname is empty if it is set to merge merge', () => {
                testConfig({ pathname: 'merge' }, 'fail://fail/', 'success://success/success1', 'success://success/success1');
            });
            it('Should reject an invalid config', () => {
                testInvalid({ pathname: 'invalid' }, 'pathname', '"invalid"');
            });
        });

        describe('config.search', () => {
            it('Should do nothing when set to targetUrl', () => {
                testConfig({ searchParams: 'targetUrl' }, 'fail://fail?fail=fail', 'success://success?success=success', 'success://success?success=success');
            });
            it('Should replace the value when set to baseUrl', () => {
                testConfig({ searchParams: 'baseUrl' }, 'fail://fail?success=success', 'success://success?success=fail&other=fail', 'success://success?success=success');
            });
            it('Should include all queries when set to merge:append', () => {
                testConfig({ searchParams: 'merge:append' }, 'fail://fail?q1=1&q2=2&q1=3', 'success://success?q1=4&q3=5&q1=6', 'success://success?q1=4&q3=5&q1=6&q1=1&q2=2&q1=3');
            });
            it('Should include all unique queries when set to merge:set', () => {
                testConfig({ searchParams: 'merge:set' }, 'fail://fail?q1=1&q2=2&q1=3', 'success://success?q1=4&q3=5&q1=6', 'success://success?q1=1&q3=5&q2=2&q1=3');
            });
            it('Should follow custom merge rules with a default', () => {
                testConfig({
                    searchParams: {
                        default: 'append',
                        byKey: {
                            q1: 'set',
                            q2: 'append',
                            q3: 'ignore'
                        }
                    }
                }, 'fail://fail?q1=1&q2=2&q1=3&q3=fail&q4=success', 'success://success?q1=4&q2=99&q3=5&q1=6', 'success://success?q1=1&q2=99&q3=5&q2=2&q1=3&q4=success')
            });
            it('Should follow custom merge rules without a default', () => {
                testConfig({
                    searchParams: {
                        byKey: {
                            q1: 'set',
                            q2: 'append',
                            q3: 'ignore'
                        }
                    }
                }, 'fail://fail?q1=1&q2=2&q1=3&q3=fail&q4=success', 'success://success?q1=4&q2=99&q3=5&q1=6', 'success://success?q1=1&q2=99&q3=5&q2=2&q1=3')
            });
            it('Should reject an invalid config', () => {
                testInvalid({ searchParams: 'invalid' }, 'searchParams', '"invalid"');
            });
            it('Should reject an invalid config default value', () => {
                testInvalid({ searchParams: { default: 'invalid' } }, 'searchParams', '"invalid"');
            });
            it('Should reject an invalid config default value', () => {
                testInvalid({ searchParams: { default: 'invalid' } }, 'searchParams', '"invalid"');
            });
            it('Should reject an invalid config byKey value', () => {
                testInvalid({ searchParams: { byKey: { search: 'invalid' } } }, 'searchParams', '"invalid"');
            });
        });

        describe('config.hash', () => {
            it('Should do nothing when set to targetUrl', () => {
                testConfig({ hash: 'targetUrl' }, 'fail://fail#fail', 'success://success#success', 'success://success#success');
            });
            it('Should replace the value when set to baseUrl', () => {
                testConfig({ hash: 'baseUrl' }, 'fail://fail#success', 'success://success#fail', 'success://success#success');
            });
            it('Should do nothing when set to merge if there is already a hash', () => {
                testConfig({ hash: 'merge' }, 'fail://fail#fail', 'success://success#success', 'success://success#success');
            });
            it('Should replace the value when set to merge if there is not already a hash', () => {
                testConfig({ hash: 'merge' }, 'fail://fail#success', 'success://success', 'success://success#success');
            });
            it('Should reject an invalid config', () => {
                testInvalid({ hash: 'invalid' }, 'hash', '"invalid"');
            });
        });
    });
});

function testConfig(config: Partial<URLMergerConfig> | undefined, baseUrl: string, input: string, expected: string, transform?: (input: URL) => void) {
    // arrange
    const sut = createUrlMerger(new URL(baseUrl), config === undefined ? undefined : { ...baseConfig, ...config });
    const target = new URL(input);
    transform?.(target);

    // act
    const actual = sut(target)

    // assert
    assert.strictEqual(actual.href, expected);
    assert.strictEqual(target.href, input, 'The target should not be modified');
}

function testInvalid(config: Record<string, unknown>, prop: string, value: string) {
    // arrange

    // act
    const actual = (() => {
        try {
            createUrlMerger(new URL('protocol://username:password@hostname:500/pathname?search=true#hash'), { ...baseConfig, ...config });
            assert.fail('Expected an error to be thrown');
        } catch (err) {
            return err;
        }
    })();

    // assert
    assert(actual instanceof Error, 'The error should have been an Error instance');
    assert.strictEqual(actual.message, `Unknown configuration ${value} for merging the ${prop}`);
}

const baseConfig: URLMergerConfig = {
    hash: 'targetUrl',
    hostname: 'targetUrl',
    password: 'targetUrl',
    pathname: 'targetUrl',
    port: 'targetUrl',
    protocol: 'targetUrl',
    searchParams: 'targetUrl',
    username: 'targetUrl',
}