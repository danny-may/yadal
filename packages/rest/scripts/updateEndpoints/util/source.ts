export function source(template: TemplateStringsArray, ...args: Array<string | Iterable<string> | (() => string | Iterable<string>)>) {
    return new SourceIterable(template, args);
}

class SourceIterable implements Iterable<string> {
    readonly #template: TemplateStringsArray;
    readonly #args: ReadonlyArray<string | Iterable<string> | (() => string | Iterable<string>)>;

    constructor(template: TemplateStringsArray, args: ReadonlyArray<string | Iterable<string> | (() => string | Iterable<string>)>) {
        this.#template = template;
        this.#args = args;
    }

    *[Symbol.iterator]() {
        let i = 0;
        const prev: string[] = []
        for (; i < this.#args.length; i++) {
            const template = this.#template[i]!
            yield* yieldLines(prev, template, '');
            let arg = this.#args[i]!;
            if (typeof arg === 'function')
                arg = arg();
            if (typeof arg === 'string')
                yield* yieldLines(prev, arg, getIndent(template));
            else
                yield* yieldLines(prev, arg, getIndent(template));
        }
        yield* yieldLines(prev, this.#template[i]!, '');
        if (prev.length > 0)
            yield prev.join('');
    }
}
function* yieldLines(buffer: string[], lines: Iterable<string>, indent: string) {
    if (typeof lines === 'string')
        lines = lines.split('\n');
    const iter = lines[Symbol.iterator]();
    let next = iter.next();
    if (next.done)
        return;
    buffer.push(next.value);
    next = iter.next();
    while (!next.done) {
        yield buffer.join('');
        buffer.length = 0;
        buffer.push(indent + next.value);
        next = iter.next();
    }
}
const indentRegex = /(?:^|\n)(?=( *))\1[^\n]*$/;
function getIndent(chunk: string) {
    return chunk.match(indentRegex)?.[1] ?? '';
}