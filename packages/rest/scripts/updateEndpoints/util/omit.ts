export function omit<T, K extends keyof T>(value: T, ...properties: K[]): Omit<T, K> {
    const result = { ...value };
    for (const property of properties)
        delete result[property];
    return result;
}