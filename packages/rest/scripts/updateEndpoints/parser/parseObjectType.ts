import { ObjectSchemaObject } from "../types.js";
import { InterfaceProperty, InterfaceType, IntersectionType, RecordType, RecordValueType } from "../types/index.js";
import { documentation } from "../util/index.js";
import { ParserContext } from "./TypeBuilder.js";
import { noRef } from "../util/index.js";

export function parseObjectType(name: string | undefined, definition: ObjectSchemaObject, context: ParserContext) {
    if (typeof definition.additionalProperties === 'object') {
        if (definition.properties !== undefined) {
            throw new Error('Unsupported object containing additionalProperties and properties');
        }
        return new RecordType({
            name,
            documentation: documentation(definition),
            value: new RecordValueType({
                documentation: documentation(definition.additionalProperties),
                type: context.parse(definition.additionalProperties)
            })
        });
    }

    if (definition.allOf !== undefined) {
        if (definition.properties !== undefined) {
            throw new Error('Unsupported object containing allOf and properties');
        }
        return new IntersectionType({
            name,
            documentation: documentation(definition),
            types: definition.allOf.map(v => context.parse(v))
        });
    }

    if (definition.properties !== undefined) {
        const required = new Set<string>(definition.required ?? []);
        return new InterfaceType({
            name,
            base: [],
            documentation: documentation(definition),
            properties: Object.entries(definition.properties)
                .map(([key, type]) => [key, noRef(type)] as const)
                .map(([key, type]) => new InterfaceProperty({
                    name: key,
                    readonly: type.readOnly === true,
                    documentation: documentation(type),
                    optional: !required.has(key),
                    type: context.parse(type)
                }))
        });
    }

    throw new Error('Unsupported object containing no properties, allOf or additionalProperties');
}
