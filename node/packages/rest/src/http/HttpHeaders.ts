export class HttpHeaders implements Iterable<[string, string]> {
    #values: Record<string, string>;

    constructor(headers: Record<string, string | undefined> = {}) {
        this.#values = {};
        for (const [key, value] of Object.entries(headers))
            if (value !== undefined)
                this.set(key, value);
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
        this.#values[key.toLowerCase()] = value;
    }

    add(key: string, value: string) {
        key = key.toLowerCase();
        if (key in this.#values)
            this.#values[key] += `,${value}`;
        else
            this.#values[key] = value;
    }

    clear(key: string) {
        return delete this.#values[key.toLowerCase()];
    }

    get(key: string) {
        return this.#values[key.toLowerCase()];
    }
}
