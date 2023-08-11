
export function isIdentifier(value: string) {
    return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(value);
}
