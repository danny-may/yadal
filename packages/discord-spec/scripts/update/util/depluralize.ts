export function depluralize(value: string): string {
    if (/(s|sh|ch|x|z)es$/i.test(value)) {
        return `${value.slice(0, -2)}`
    }
    if (/s$/.test(value)) {
        return `${value.slice(0, -1)}`
    }
    return value;
}