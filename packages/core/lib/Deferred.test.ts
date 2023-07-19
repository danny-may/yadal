import { describe, it } from "node:test";
import { Deferred } from "./Deferred.js";
import assert from "node:assert";
import { nextTick } from "node:process";

describe(Deferred.name, () => {
    it('Should construct correctly', () => {
        // arrange

        // act
        const sut = new Deferred();

        // assert
        assert(sut.promise instanceof Promise);
        assert(sut.resolve instanceof Function);
        assert(sut.reject instanceof Function);
        assert(sut.resolve !== sut.reject);
    });
    describe('#resolve', () => {
        it('Should cause the promise to resolve', async () => {
            // arrange
            const sut = new Deferred();
            let actual;
            void (async () => {
                try {
                    actual = { resolved: await sut.promise };
                } catch (err) {
                    actual = { rejected: err }
                }
            })();

            // act
            sut.resolve('Success!');
            await new Promise(nextTick);

            // assert
            assert.deepStrictEqual(actual, { resolved: 'Success!' })
        });
        it('Should not change the value of a resolved promise', async () => {
            // arrange
            const sut = new Deferred();
            let actual;
            void (async () => {
                try {
                    actual = { resolved: await sut.promise };
                } catch (err) {
                    actual = { rejected: err }
                }
            })();

            // act
            sut.resolve('Success!');
            sut.resolve('Failed!');
            await new Promise(nextTick);

            // assert
            assert.deepStrictEqual(actual, { resolved: 'Success!' })
        });
        it('Should not change the value of a rejected promise', async () => {
            // arrange
            const sut = new Deferred();
            let actual;
            void (async () => {
                try {
                    actual = { resolved: await sut.promise };
                } catch (err) {
                    actual = { rejected: err }
                }
            })();

            // act
            sut.reject('Success!');
            sut.resolve('Failed!');
            await new Promise(nextTick);

            // assert
            assert.deepStrictEqual(actual, { rejected: 'Success!' })
        });
    });
    describe('#reject', () => {
        it('Should cause the promise to reject', async () => {
            // arrange
            const sut = new Deferred();
            let actual;
            void (async () => {
                try {
                    actual = { resolved: await sut.promise };
                } catch (err) {
                    actual = { rejected: err }
                }
            })();

            // act
            sut.reject('Success!');
            await new Promise(nextTick);

            // assert
            assert.deepStrictEqual(actual, { rejected: 'Success!' })
        });
        it('Should not change the value of a resolved promise', async () => {
            // arrange
            const sut = new Deferred();
            let actual;
            void (async () => {
                try {
                    actual = { resolved: await sut.promise };
                } catch (err) {
                    actual = { rejected: err }
                }
            })();

            // act
            sut.resolve('Success!');
            sut.reject('Failed!');
            await new Promise(nextTick);

            // assert
            assert.deepStrictEqual(actual, { resolved: 'Success!' })
        });
        it('Should not change the value of a rejected promise', async () => {
            // arrange
            const sut = new Deferred();
            let actual;
            void (async () => {
                try {
                    actual = { resolved: await sut.promise };
                } catch (err) {
                    actual = { rejected: err }
                }
            })();

            // act
            sut.reject('Success!');
            sut.reject('Failed!');
            await new Promise(nextTick);

            // assert
            assert.deepStrictEqual(actual, { rejected: 'Success!' })
        });
    });
    describe('@@dispose', () => {
        it('Should cause the promise to reject', async () => {
            // arrange
            const sut = new Deferred();
            let actual: unknown;
            void (async () => {
                try {
                    actual = { resolved: await sut.promise };
                } catch (err) {
                    actual = { rejected: err }
                }
            })();

            // act
            sut[Symbol.dispose]();
            await new Promise(nextTick);

            // assert
            assert(typeof actual === 'object');
            assert(actual !== null);
            assert('rejected' in actual);
            assert(actual.rejected instanceof Error);
            assert(actual.rejected.message === 'Deferred was disposed');
        });
        it('Should not change the value of a resolved promise', async () => {
            // arrange
            const sut = new Deferred();
            let actual;
            void (async () => {
                try {
                    actual = { resolved: await sut.promise };
                } catch (err) {
                    actual = { rejected: err }
                }
            })();

            // act
            sut.resolve('Success!');
            sut[Symbol.dispose]();
            await new Promise(nextTick);

            // assert
            assert.deepStrictEqual(actual, { resolved: 'Success!' })
        });
        it('Should not change the value of a rejected promise', async () => {
            // arrange
            const sut = new Deferred();
            let actual;
            void (async () => {
                try {
                    actual = { resolved: await sut.promise };
                } catch (err) {
                    actual = { rejected: err }
                }
            })();

            // act
            sut.reject('Success!');
            sut[Symbol.dispose]();
            await new Promise(nextTick);

            // assert
            assert.deepStrictEqual(actual, { rejected: 'Success!' })
        });
    });
});