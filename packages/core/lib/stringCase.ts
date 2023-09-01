type CamelCaseToDelimCaseHelper<T extends string, D extends string, S extends string, W extends string, R extends string> =
    string extends T
    ? string
    : T extends `${infer Char}${infer Rest}`
    ? Char extends Lowercase<Char>
    ? CamelCaseToDelimCaseHelper<Rest, D, S, `${W}${Char}`, R> // Character is not uppercase, keep building the current word
    : CamelCaseToDelimCaseHelper<Rest, D, D, Char, `${R}${S}${W}`> // Character is uppercase, append the separator and current word to the result and replace the separator with the deliminator
    : Lowercase<`${R}${S}${W}`>; // No characters left, append the separator and current word to the result and return the result as lowercase

export type CamelCaseToDelimCase<T extends string, D extends string> = CamelCaseToDelimCaseHelper<T, D, '', '', ''>;
export function camelCaseToDelimCase<const T extends string, const D extends string>(delim: D, value: T) {
    return value.replace(/(?=[A-Z])/g, () => delim).toLowerCase() as CamelCaseToDelimCase<T, D>;
}

export type PascalCaseToDelimCase<T extends string, D extends string> = CamelCaseToDelimCase<PascalCaseToCamelCase<T>, D>
export function pascalCaseToDelimCase<const T extends string, const D extends string>(delim: D, value: T): PascalCaseToDelimCase<T, D> {
    return camelCaseToDelimCase(delim, pascalCaseToCamelCase(value));
}

export type CamelCaseToKebabCase<T extends string> = CamelCaseToDelimCase<T, '-'>
export function camelCaseToKebabCase<const T extends string>(value: T): CamelCaseToKebabCase<T> {
    return camelCaseToDelimCase('-', value);
}

export type CamelCaseToSnakeCase<T extends string> = CamelCaseToDelimCase<T, '_'>
export function camelCaseToSnakeCase<const T extends string>(value: T): CamelCaseToSnakeCase<T> {
    return camelCaseToDelimCase('_', value);
}

export type CamelCaseToPascalCase<T extends string> = Capitalize<T>
export function camelCaseToPascalCase<const T extends string>(value: T): CamelCaseToPascalCase<T> {
    switch (value.length) {
        case 0: return '' as CamelCaseToPascalCase<T>;
        case 1: return value.toUpperCase() as CamelCaseToPascalCase<T>;
        default: return `${value[0]!.toUpperCase()}${value.slice(1)}` as CamelCaseToPascalCase<T>;
    }
}

export type PascalCaseToCamelCase<T extends string> = T extends `${infer Char}${infer Rest}` ? `${Lowercase<Char>}${Rest}` : T;
export function pascalCaseToCamelCase<const T extends string>(value: T): PascalCaseToCamelCase<T> {
    switch (value.length) {
        case 0: return '' as PascalCaseToCamelCase<T>;
        case 1: return value.toLowerCase() as PascalCaseToCamelCase<T>;
        default: return `${value[0]!.toLowerCase()}${value.slice(1)}` as PascalCaseToCamelCase<T>;
    }
}

export type DelimCaseToPascalCase<T extends string, D extends string> = T extends `${infer Word}${D}${infer Rest}` ? `${Capitalize<Word>}${DelimCaseToPascalCase<Rest, D>}` : Capitalize<T>;
export function delimCaseToPascalCase<const T extends string, const D extends string>(delim: D, value: T): DelimCaseToPascalCase<T, D> {
    return value.split(delim).map(camelCaseToPascalCase).join('') as DelimCaseToPascalCase<T, D>;
}

export type KebabCaseToPascalCase<T extends string> = DelimCaseToPascalCase<T, '-'>;
export function kebabCaseToPascalCase<const T extends string>(value: T): KebabCaseToPascalCase<T> {
    return delimCaseToPascalCase('-', value);
}

export type SnakeCaseToPascalCase<T extends string> = DelimCaseToPascalCase<T, '_'>;
export function snakeCaseToPascalCase<const T extends string>(value: T): SnakeCaseToPascalCase<T> {
    return delimCaseToPascalCase('_', value);
}

export type KebabCaseToCamelCase<T extends string> = PascalCaseToCamelCase<KebabCaseToPascalCase<T>>;
export function kebabCaseToCamelCase<const T extends string>(value: T): KebabCaseToCamelCase<T> {
    return pascalCaseToCamelCase(kebabCaseToPascalCase(value));
}

export type SnakeCaseToCamelCase<T extends string> = PascalCaseToCamelCase<SnakeCaseToPascalCase<T>>;
export function snakeCaseToCamelCase<const T extends string>(value: T): SnakeCaseToCamelCase<T> {
    return pascalCaseToCamelCase(snakeCaseToPascalCase(value));
}

export type PascalCaseToKebabCase<T extends string> = CamelCaseToKebabCase<PascalCaseToCamelCase<T>>;
export function pascalCaseToKebabCase<const T extends string>(value: T): PascalCaseToKebabCase<T> {
    return camelCaseToKebabCase(pascalCaseToCamelCase(value));
}

export type PascalCaseToSnakeCase<T extends string> = CamelCaseToSnakeCase<PascalCaseToCamelCase<T>>;
export function pascalCaseToSnakeCase<const T extends string>(value: T): PascalCaseToSnakeCase<T> {
    return camelCaseToSnakeCase(pascalCaseToCamelCase(value));
}

