import { SchemaObjectTypeMap } from "../types.js";
import { IntersectionType, LiteralType, Type, UnionType } from "../types/index.js";
import { documentation } from "../util/index.js";
import { parseArrayType } from "./parseArrayType.js";
import { parseObjectType } from "./parseObjectType.js";
import { parseIntegerType } from "./parseIntegerType.js";
import { parseStringType } from "./parseStringType.js";
import { ParserContext, TypeParser } from "./TypeBuilder.js";
export * from './TypeBuilder.js';

export const parser: TypeParser = {
    parse(name, definition, context) {
        if ('type' in definition) {
            if (typeof definition.type === 'string')
                return parseTypedDefinition(definition.type, name, definition, context);
            return new UnionType({
                name,
                documentation: documentation(definition),
                types: definition.type.map(r => parseTypedDefinition(r, undefined, definition as SchemaObjectTypeMap[typeof r], context))
            });
        }
        if ('oneOf' in definition && definition.oneOf !== undefined) {
            return new UnionType({
                name,
                documentation: documentation(definition),
                types: definition.oneOf.map(v => context.parse(v))
            });
        }
        if ('allOf' in definition || 'anyOf' in definition) {
            const allOf = definition.allOf?.map(v => context.parse(v)) ?? [];
            const anyOf = definition.anyOf?.map(v => context.parse(v)) ?? [];
            switch (allOf.length) {
                case 0: switch (anyOf.length) {
                    case 0: return new LiteralType({ name, value: 'never', documentation: documentation(definition) });
                    default: return new UnionType({ name, documentation: documentation(definition), types: anyOf })
                };
                default: switch (anyOf.length) {
                    case 0: return new IntersectionType({ name, documentation: documentation(definition), types: allOf });
                    default: return new IntersectionType({
                        name,
                        documentation: documentation(definition),
                        types: [
                            ...allOf,
                            new UnionType({ types: anyOf })
                        ]
                    })
                }
            }
        }
        return new LiteralType({
            name,
            value: 'unknown',
            documentation: documentation(definition)
        });
    },
}

function parseTypedDefinition<T extends keyof SchemaObjectTypeMap>(type: T, name: string | undefined, definition: SchemaObjectTypeMap[T], context: ParserContext): Type
function parseTypedDefinition<Args extends { [T in keyof SchemaObjectTypeMap]: readonly [type: T, name: string | undefined, definition: SchemaObjectTypeMap[T], context: ParserContext] }[keyof SchemaObjectTypeMap]>(...args: Args): Type {
    switch (args[0]) {
        case 'integer': return parseIntegerType(args[1], args[2], args[3]);
        case 'string': return parseStringType(args[1], args[2], args[3]);
        case 'number': return new LiteralType({ value: 'number', documentation: documentation(args[2]) });
        case 'boolean': return new LiteralType({ value: 'boolean', documentation: documentation(args[2]) });
        case 'null': return new LiteralType({ value: 'null', documentation: documentation(args[2]) });
        case 'array': return parseArrayType(args[1], args[2], args[3]);
        case 'object': return parseObjectType(args[1], args[2], args[3])
    }
    throw new Error(`Unexpected type ${args[0]}`);
}
