import { SchemaObject } from "openapi-typescript";
import { IntegerSchemaObject } from "../types.js";
import { EnumType, EnumValue, LiteralType } from "../types/index.js";
import { documentation } from "../util/index.js";
import { ParserContext } from "./TypeBuilder.js";
import { parsePluckedEnum } from "./parsePluckedEnum.js";

const wellKnownFormats = {
    int32: new LiteralType({ name: 'Int32', value: 'number' }),
    int64: new LiteralType({ name: 'Int64', value: 'number' }),
}

export function parseIntegerType(name: string | undefined, definition: IntegerSchemaObject, context: ParserContext) {
    if ('oneOf' in definition && Array.isArray(definition.oneOf)) {
        return new EnumType({
            name,
            documentation: documentation(definition),
            values: definition.oneOf.map((v: SchemaObject) => {
                const name = v.title;
                if (typeof name !== 'string')
                    throw new Error('Unnamed enum value');
                const value = v.const;
                if (typeof value !== 'number')
                    throw new Error('Integer enum value should be a number');
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
    return new LiteralType({ value: 'number', documentation: documentation(definition) });
}
