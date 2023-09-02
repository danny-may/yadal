import { describe, it } from "node:test";
import { describeFile } from "../../../../root.test.util.js";
import { RouteMatcher } from "./RouteMatcher.js";
import { api } from "@yadal/discord-spec";
import { randomUUID } from "node:crypto";
import { Route } from "./Route.js";
import assert from "node:assert";

const operations: Array<{ readonly name: string; readonly route: Route }> = [
    ...Object.values(api)
]

describeFile(() => {
    describe(RouteMatcher.name, () => {
        for (const { route, name } of operations) {
            it(`Should correctly locate requests made to the ${name} operation`, () => {
                // arrange
                const matcher = new RouteMatcher(operations.map(o => o.route));
                const model = Object.fromEntries(route.template.keys.map(k => [k, randomUUID()]));
                const url = route.create(model);

                // act
                const actual = matcher.match(route.method, url);

                // assert
                assert(actual !== undefined);
                assert.strictEqual(actual.route, route);
                assert.deepStrictEqual(actual.model, model);
            });
        }
    });
});