type CamelCaseToDelimCase<T extends string, D extends string> = CamelCaseToDelimCaseHelper<T, D, '', '', ''>;
type CamelCaseToDelimCaseHelper<T extends string, D extends string, S extends string, W extends string, R extends string> =
    string extends T
    ? string
    : T extends `${infer Char}${infer Rest}`
    ? Char extends Lowercase<Char>
    ? CamelCaseToDelimCaseHelper<Rest, D, S, `${W}${Char}`, R> // Character is not uppercase, keep building the current word
    : CamelCaseToDelimCaseHelper<Rest, D, D, Char, `${R}${S}${W}`> // Character is uppercase, append the separator and current word to the result and replace the separator with the deliminator
    : Lowercase<`${R}${S}${W}`>; // No characters left, append the separator and current word to the result and return the result as lowercase
type DelimCaseToPascalCase<T extends string, D extends string> = T extends `${infer Word}${D}${infer Rest}`
    ? `${Capitalize<Word>}${DelimCaseToPascalCase<Rest, D>}`
    : Capitalize<T>;
type PascalCaseToCamelCase<T extends string> = T extends `${infer Char}${infer Rest}`
    ? `${Lowercase<Char>}${Rest}`
    : T;

export function camelCaseToDelimCase<const T extends string, const D extends string>(delim: D, value: T) {
    return value.replace(/(?=[A-Z])/g, () => delim).toLowerCase() as CamelCaseToDelimCase<T, D>;
}

export function pascalCaseToDelimCase<const T extends string, const D extends string>(delim: D, value: T) {
    return camelCaseToDelimCase(delim, pascalCaseToCamelCase(value));
}

export function camelCaseToKebabCase<const T extends string>(value: T) {
    return camelCaseToDelimCase('-', value);
}

export function camelCaseToSnakeCase<const T extends string>(value: T) {
    return camelCaseToDelimCase('_', value);
}

export function camelCaseToPascalCase<const T extends string>(value: T) {
    switch (value.length) {
        case 0: return '' as Capitalize<T>;
        case 1: return value.toUpperCase() as Capitalize<T>;
        default: return `${value[0]!.toUpperCase()}${value.slice(1)}` as Capitalize<T>;
    }
}

export function pascalCaseToCamelCase<const T extends string>(value: T) {
    switch (value.length) {
        case 0: return '' as PascalCaseToCamelCase<T>;
        case 1: return value.toLowerCase() as PascalCaseToCamelCase<T>;
        default: return `${value[0]!.toLowerCase()}${value.slice(1)}` as PascalCaseToCamelCase<T>;
    }
}

export function delimCaseToPascalCase<const T extends string, const D extends string>(delim: D, value: T) {
    return value.split(delim).map(camelCaseToPascalCase).join('') as DelimCaseToPascalCase<T, D>;
}

export function kebabCaseToPascalCase<const T extends string>(value: T) {
    return delimCaseToPascalCase('-', value);
}

export function snakeCaseToPascalCase<const T extends string>(value: T) {
    return delimCaseToPascalCase('_', value);
}

export function kebabCaseToCamelCase<const T extends string>(value: T) {
    return pascalCaseToCamelCase(kebabCaseToPascalCase(value));
}

export function snakeCaseToCamelCase<const T extends string>(value: T) {
    return pascalCaseToCamelCase(snakeCaseToPascalCase(value));
}

export function pascalCaseToKebabCase<const T extends string>(value: T) {
    return camelCaseToKebabCase(pascalCaseToCamelCase(value));
}

export function pascalCaseToSnakeCase<const T extends string>(value: T) {
    return camelCaseToSnakeCase(pascalCaseToCamelCase(value));
}

