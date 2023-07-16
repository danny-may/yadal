export class HttpHeaders implements Iterable<[string, string]> {
    #values: Record<string, string>;

    constructor(headers: Record<string, string | string[] | undefined> = {}) {
        this.#values = {};
        for (const [key, value] of Object.entries(headers))
            if (value)
                this.set(key, typeof value === 'string' ? value : value.join(','));
    }

    *[Symbol.iterator]() {
        for (const [key, value] of Object.entries(this.#values)) {
            yield [key, value] as [string, string];
        }
    }

    toDict() {
        return { ...this.#values };
    }

    set(key: string, value: string) {
        if (value)
            this.#values[key.toLowerCase()] = value;
        else
            delete this.#values[key.toLowerCase()];
    }

    clear(key: string) {
        return delete this.#values[key.toLowerCase()];
    }

    get(key: string) {
        return this.#values[key.toLowerCase()];
    }

    pick(keys: Iterable<string>) {
        const result = new HttpHeaders();
        for (const key of keys)
            result.set(key, this.get(key) ?? '');
        return result;
    }
}
