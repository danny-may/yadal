
const globalNames = new Set(deepKeys(globalThis));
function* deepKeys(x: object | null) {
    while (x !== null) {
        yield* Object.getOwnPropertyNames(x);
        x = Object.getPrototypeOf(x);
    }
}

export function preventShadowGlobal(name: string, prefix: string): string {
    if (globalNames.has(name))
        return `${prefix}${name.slice(0, 1).toUpperCase()}${name.slice(1)}`;
    return name;
}