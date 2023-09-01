export function waitAll<const T extends readonly unknown[]>(sources: T): Promise<{ [P in keyof T]: Awaited<T[P]> }>
export function waitAll<T>(sources: Iterable<T>): Promise<T[]>
export async function waitAll(sources: Iterable<unknown>) {
    const failed = [];
    const succeeded = [];
    for (const source of sources) {
        try {
            succeeded.push(await source);
        } catch (error) {
            failed.push(error);
        }
    }
    if (failed.length > 0)
        throw new AggregateError(failed);
    return succeeded;
}