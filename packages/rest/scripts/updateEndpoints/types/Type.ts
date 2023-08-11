import { TypeReference } from "./TypeReference.js";
import { fuseLines } from "./fuseLines.js";
import { isIdentifier } from "./isIdentifier.js";
import { Documentation, jsDoc } from "./jsDoc.js";

export type Source<T = string> = Iterable<T>;
export type Expose = (lines: Source) => Source;


export abstract class Type extends TypeReference {
    #resolving: boolean;
    readonly #name: string | undefined;
    readonly #documentation: Documentation | undefined;

    get name() { return this.#name; };
    get documentation() { return this.#documentation; };

    constructor(options: { name?: string; documentation?: Documentation; }) {
        super(() => this);
        this.#name = this.#sanitizeName(options.name);
        this.#documentation = options.documentation;
        this.#resolving = false;

        this.inline = this.#inline.bind(this, this.inline.bind(this));
        this.define = this.#define.bind(this, this.define.bind(this));
    }

    #sanitizeName(name: string | undefined) {
        if (name === undefined)
            return undefined;
        let n = name;
        if (/^\d/.test(name))
            name = `_${name}`;
        name = name.replaceAll(/[^a-zA-Z0-9_$]/g, '');
        if (!isIdentifier(name))
            throw new Error(`Cannot convert ${JSON.stringify(n)} to a valid identifier.`);
        return name;
    }

    *#inline(impl: Type['inline'], context: string): Source {
        if (this.name !== undefined)
            return yield this.name;
        if (this.#resolving)
            throw new Error('Cannot circularly reference an inline type');
        this.#resolving = true;
        try {
            yield* impl(context);
        } finally {
            this.#resolving = false;
        }
    }

    *#define(impl: Type['define'], expose: Expose): Source {
        if (this.name === undefined)
            return;
        if (this.#resolving)
            return yield this.name;
        this.#resolving = true;
        try {
            yield* jsDoc(this.#documentation);
            yield* impl(expose);
        } finally {
            this.#resolving = false;
        }
    }

    abstract inline(context: string): Source;
    abstract define(expose: Expose): Source;

    protected joinParagraphs(paragraphs: Iterable<Iterable<string>>, prefix: Iterable<string>, separator: Iterable<string>, postfix: Iterable<string>): Source {
        return fuseLines(
            prefix,
            fuseLines(
                ...this.#joinLines(paragraphs, separator)
            ),
            postfix
        );
    }

    *#joinLines<T>(source: Iterable<T>, separator: T): Source<T> {
        const iter = source[Symbol.iterator]();
        let next = iter.next();
        if (next.done)
            return;
        yield next.value;
        next = iter.next();
        while (!next.done) {
            yield separator;
            yield next.value;
            next = iter.next();
        }
    }

    protected *prefix(lines: Iterable<string>, prefix: string): Source {
        for (const line of lines) {
            yield `${prefix}${line}`;
        }
    }
}
