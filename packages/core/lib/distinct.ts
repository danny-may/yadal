export function* distinct<T>(source: Iterable<T>): Generator<T, void, unknown> {
    const seen = new Set<T>();
    for (const value of source)
        if (seen.size < seen.add(value).size)
            yield value;
}