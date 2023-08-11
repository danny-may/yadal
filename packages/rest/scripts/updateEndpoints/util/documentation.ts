import { SchemaObject } from "openapi-typescript";
import { Documentation } from "../types/jsDoc.js";

export function documentation(value: SchemaObject, ...ignore: PropertyKey[]): Documentation {
    const ignoreSet = new Set(ignore);
    const propChecks = wellKnownProps.map(v => ignoreSet.has(v.prop) ? { ...v, get: () => undefined } : v);
    return {
        *[Symbol.iterator]() {
            for (const check of propChecks) {
                const v = check.get(value);
                if (v !== undefined)
                    yield { tag: check.tag, value: v };
            }
        }
    }
}

const wellKnownProps = [
    define('', 'description', isNonEmptyString),
    define('maximum', 'maximum', isNumber),
    define('minimum', 'minimum', isNumber),
    define('maxLength', 'maxLength', isNumber),
    define('minLength', 'minLength', isNumber),
    define('maxItems', 'maxItems', isNumber),
    define('minItems', 'minItems', isNumber),
    define('maxProperties', 'maxProperties', isNumber),
    define('distinct', 'uniqueItems', isTrue, () => ''),
    define('pattern', 'pattern', isNonEmptyString, v => `/${v}/`),
]

function isNonEmptyString(value: unknown): value is string {
    return typeof value === 'string' && value.length > 0;
}

function isNumber(value: unknown): value is number {
    return typeof value === 'number';
}
function isTrue(value: unknown): value is true {
    return value === true;
}

interface PropChecker {
    prop: PropertyKey;
    tag: string;
    get(value: object): string | undefined;
}

function define<Prop extends PropertyKey, T>(
    tag: string,
    prop: Prop,
    guard: (value: unknown) => value is T,
    toString: (value: T) => string = String
): PropChecker {
    return {
        prop,
        tag,
        get(value: object) {
            if (!hasProp(value, prop))
                return undefined;
            const v = value[prop];
            if (!guard(v))
                return undefined;
            return toString(v);
        }
    }
}

function hasProp<T extends object, Prop extends PropertyKey>(value: T, prop: Prop): value is T & Record<Prop, unknown> {
    return prop in value;
}