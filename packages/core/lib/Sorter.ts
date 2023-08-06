export interface Sorter<T> {
    (this: void, a: T, b: T): number;
    ascending(this: void, a: T, b: T): number;
    descending(this: void, a: T, b: T): number;
}

export function createSorter<T>(ascending: (a: T, b: T) => number): Sorter<T> {
    const descending: typeof ascending = (a, b) => -ascending(a, b);
    return Object.freeze(Object.assign(
        (a: T, b: T) => ascending(a, b),
        {
            ascending,
            descending
        }
    ))
}