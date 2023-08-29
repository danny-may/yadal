import { SchemaObject } from "openapi-typescript";
import { snowflake, isoDateTime, uriString } from "../augmentations/index.js";
import { StringSchemaObject } from "../types.js";
import { EnumType, EnumValue, InterfaceProperty, InterfaceType, LiteralType } from "../types/index.js";
import { documentation } from "../util/index.js";
import { ParserContext } from "./TypeBuilder.js";
import { parsePluckedEnum } from "./parsePluckedEnum.js";

const wellKnownFormats = {
    snowflake: snowflake,
    'date-time': isoDateTime,
    uri: uriString,
    nonce: new LiteralType({ value: 'string' }),
}
export const wellKnownEncodings = {
    binary: new InterfaceType({
        name: 'File',
        properties: [
            new InterfaceProperty({
                name: 'content',
                type: new LiteralType({ value: 'ArrayBufferView' })
            }),
            new InterfaceProperty({
                name: 'name',
                optional: true,
                type: new LiteralType({ value: 'string' })
            }),
            new InterfaceProperty({
                name: 'contentType',
                optional: true,
                type: new LiteralType({ value: 'string' })
            })
        ]
    }),
    base64: new LiteralType({ name: 'Base64String', value: '`data:image/${"jpeg"|"png"|"gif"};base64,${string}`' }),
}

export function parseStringType(name: string | undefined, definition: StringSchemaObject, context: ParserContext) {
    if ('oneOf' in definition && Array.isArray(definition.oneOf)) {
        return new EnumType({
            name,
            documentation: documentation(definition),
            values: definition.oneOf.map((v: SchemaObject) => {
                const name = v.title;
                if (typeof name !== 'string')
                    throw new Error('Unnamed enum value');
                const value = v.const;
                if (typeof value !== 'string')
                    throw new Error('String enum value should be a string');
                return new EnumValue({ name, value, documentation: documentation(v) })
            })
        });
    }
    if ('enum' in definition && 'allOf' in definition) {
        return parsePluckedEnum(name, definition, context);
    }
    if (definition.format !== undefined) {
        if (definition.format in wellKnownFormats) {
            const type = wellKnownFormats[definition.format as keyof typeof wellKnownFormats];
            if (type.name !== undefined)
                context.register(type);
            return new LiteralType({ name, value: type.name ?? type.value, documentation: documentation(definition) });
        }
        throw new Error(`Unknown format ${definition.format}`);
    }
    if ('contentEncoding' in definition && typeof definition.contentEncoding === 'string') {
        if (definition.contentEncoding in wellKnownEncodings) {
            const type = wellKnownEncodings[definition.contentEncoding as keyof typeof wellKnownEncodings];
            if (type.name !== undefined)
                context.register(type);
            return new LiteralType({ name, value: type.name!, documentation: documentation(definition) });
        }
        throw new Error(`Unknown encoding ${definition.contentEncoding}`);
    }
    return new LiteralType({ value: 'string', documentation: documentation(definition) });
}
