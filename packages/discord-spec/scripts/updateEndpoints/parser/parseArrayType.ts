import { documentation } from "../index.js";
import { ArraySchemaObject } from "../types.js";
import { ArrayType, LiteralType, UnionType } from "../types/index.js";
import { ParserContext } from "./TypeBuilder.js";

export function parseArrayType(name: string | undefined, definition: ArraySchemaObject, context: ParserContext) {

    return new ArrayType({
        name,
        documentation: documentation(definition),
        item: getItemType(definition, context),
        readonly: definition.readOnly === true
    });
}
function getItemType(definition: ArraySchemaObject, context: ParserContext) {
    if (definition.items === undefined)
        return new LiteralType({ value: 'unknown' });
    if (!Array.isArray(definition.items))
        return context.parse(definition.items);
    switch (definition.items.length) {
        case 0: return new LiteralType({ value: 'unknown' });
        case 1: return context.parse(definition.items[0]!);
        default: return new UnionType({ types: definition.items.map(v => context.parse(v)) });
    }
}