import { Type } from "./Type.js";

export class TypeReference {
    readonly #getter: () => Type;
    #type?: Type;
    #resolveState = 0 | 1 | 2;

    constructor(getter: () => Type) {
        this.#getter = getter;
    }

    dereference() {
        if (this.#type !== undefined)
            return this.#type;

        switch (this.#resolveState) {
            case 1: TypeReference.#throwCircular();
            case 2: TypeReference.#throwFailed();
            case 0: this.#resolveState = 1; break;
        }

        const result = this.#getter();
        if (result instanceof Type)
            return this.#type = result;

        this.#resolveState = 2;
        TypeReference.#throwFailed();
    }

    static #throwCircular(): never {
        throw new Error('Cannot dereference a circular type reference');
    }

    static #throwFailed(): never {
        throw new Error('Dereferencing failed to get a valid Type');
    }
}
