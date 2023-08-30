import { Source } from "./Type.js";

export interface DocumentationTag {
    readonly tag: string;
    readonly value: string;
}

export type Documentation = Iterable<DocumentationTag>

export function* jsDoc(source: Documentation | undefined): Source {
    if (source === undefined)
        return;

    const iter = source[Symbol.iterator]();
    try {
        let next = iter.next();
        if (next.done)
            return;

        yield '/**';
        while (!next.done) {
            const { tag, value: content } = next.value;
            yield tag.length === 0
                ? ` * ${content.replaceAll('@', '\\@')}`
                : ` * @${tag} ${content.replaceAll('@', '\\@')}`
            next = iter.next();
        }
        yield ' */'
    } finally {
        iter.return?.();
    }
}
