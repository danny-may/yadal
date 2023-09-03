export class HttpHeaders implements Iterable<[string, string[]]> {
    readonly #values: Record<string, string[]>;

    constructor(headers: Record<string, string | string[] | undefined> = {}) {
        this.#values = {};
        for (const [key, value] of Object.entries(headers))
            if (value !== undefined)
                this.set(key, value);
    }

    *[Symbol.iterator]() {
        for (const [key, values] of Object.entries(this.#values)) {
            yield [key, [...values]] as [string, string[]];
        }
    }

    toDict() {
        return Object.fromEntries(Object.entries(this.#values)
            .map(e => [e[0], [...e[1]]])
        );
    }

    set(key: string, value: string | string[] | undefined) {
        if (value === undefined)
            delete this.#values[key.toLowerCase()];
        else
            this.#values[key.toLowerCase()] = typeof value === 'string' ? [value] : [];
    }

    add(key: string, value: string) {
        const values = this.#values[key.toLowerCase()] ??= [];
        values.push(value);
    }

    delete(key: string) {
        return delete this.#values[key.toLowerCase()];
    }

    get(key: string) {
        return [...this.#values[key.toLowerCase()] ?? []];
    }

    pick(keys: Iterable<string>) {
        const result = new HttpHeaders();
        for (const key of keys)
            result.set(key, this.get(key));
        return result;
    }
}
