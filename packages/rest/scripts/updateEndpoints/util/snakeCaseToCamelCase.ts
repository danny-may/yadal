import { SnakeCaseToPascalCase, snakeCaseToPascalCase } from "./snakeCaseToPascalCase.js";

export type SnakeCaseToCamelCase<T extends string> = SnakeCaseToPascalCase<T> extends `${infer Char}${infer Rest}` ? `${Lowercase<Char>}${Rest}` : never;
export function snakeCaseToCamelCase<T extends string>(value: T): SnakeCaseToCamelCase<T>
export function snakeCaseToCamelCase(value: string): string {
    value = snakeCaseToPascalCase(value);
    return `${value[0]!.toLowerCase()}${value.slice(1)}`;
}