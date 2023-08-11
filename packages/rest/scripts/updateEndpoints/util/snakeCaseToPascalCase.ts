export type SnakeCaseToPascalCase<T extends string> = T extends `${infer Word}_${infer Rest}` ? `${Capitalize<Word>}${SnakeCaseToPascalCase<Rest>}` : Capitalize<T>;
export function snakeCaseToPascalCase<T extends string>(value: T): SnakeCaseToPascalCase<T>
export function snakeCaseToPascalCase(value: string): string {
    return value.split('_').map(v => `${v[0]!.toUpperCase()}${v.slice(1)}`).join('');
}