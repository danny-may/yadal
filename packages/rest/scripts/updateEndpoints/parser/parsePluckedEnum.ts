import { SchemaObject } from "openapi-typescript";
import { EnumType, LiteralType, Type, TypeReference, UnionType } from "../types/index.js";
import { ParserContext } from "./TypeBuilder.js";
import { documentation } from "../util/index.js";

export function parsePluckedEnum(name: string | undefined, definition: SchemaObject, context: ParserContext) {
    if (!Array.isArray(definition.enum))
        throw new Error('Enum values not specified');
    if (!('allOf' in definition) || !Array.isArray(definition.allOf))
        throw new Error('Inherited enum types not declared');

    const typeReferences = definition.allOf.map(v => context.parse(v));
    let valueToTypeMap: undefined | ReturnType<typeof buildEnumValueMap>;
    return new UnionType({
        name,
        documentation: documentation(definition),
        types: definition.enum.map(v => new TypeReference(() => {
            valueToTypeMap ??= buildEnumValueMap(typeReferences);
            const sources = valueToTypeMap.get(v)?.map(x => new LiteralType({ value: `typeof ${x.type.name}[${JSON.stringify(x.key)}]` }));
            switch (sources?.length) {
                case undefined:
                case 0:
                    return new LiteralType({ value: JSON.stringify(v) });
                case 1:
                    return sources[0]!;
                default:
                    return new UnionType({ types: sources! })
            }
        }))
    })
}

function buildEnumValueMap(references: Iterable<TypeReference>) {
    const seenTypes = new Set<Type>();
    const valueToEnumMap = new Map<unknown, Array<{ type: EnumType; key: string; }>>();
    for (const ref of references) {
        const type = ref.dereference();
        if (seenTypes.size === seenTypes.add(type).size)
            continue;

        if (!(type instanceof EnumType))
            throw new Error(`Cannot access an enum member of a non-enum type (${type.name ?? '~Anonymous'})`);

        for (const value of type.values) {
            let result = valueToEnumMap.get(value.value);
            if (result === undefined)
                valueToEnumMap.set(value.value, result = []);
            result.push({ type, key: value.name });
        }
    }
    return valueToEnumMap;
}