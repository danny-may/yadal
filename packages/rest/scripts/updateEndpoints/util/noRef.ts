import { ReferenceObject } from "openapi-typescript";

export function noRef<const T>(value: T | ReferenceObject): T {
    if (typeof value === 'object' && value !== null && '$ref' in value)
        throw new Error('Cannot have a ref object');
    return value;
}
