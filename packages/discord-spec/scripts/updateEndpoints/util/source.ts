export type SourceArg = string | boolean | number | Iterable<string | boolean | number>;
export function source(template: readonly string[], ...args: ReadonlyArray<SourceArg | (() => SourceArg)>) {
    return new SourceIterable(template, args);
}

export function sourceJoin(values: Iterable<SourceArg | (() => SourceArg)>, separator: string) {
    const v = [...values];
    if (v.length === 0)
        return source``;
    return new SourceIterable(['', ...new Array(v.length - 1).fill(separator), ''], v);
}

class SourceIterable implements Iterable<string> {
    readonly #template: readonly string[];
    readonly #args: ReadonlyArray<SourceArg | (() => SourceArg)>;

    constructor(template: readonly string[], args: ReadonlyArray<SourceArg | (() => SourceArg)>) {
        this.#template = template;
        this.#args = args;
    }

    *[Symbol.iterator]() {
        const line: string[] = [];
        let indent = '';
        let i = 0;
        for (; i < this.#args.length; i++) {
            if (i >= this.#template.length) {
                do {
                    let arg = this.#args[i++]!;
                    if (typeof arg === 'function')
                        arg = arg();
                    yield* yieldLines(line, arg, indent);
                } while (i < this.#args.length)
                break;
            }

            const template = this.#template[i]!;
            yield* yieldLines(line, template, '');
            indent = getIndent(template);
            let arg = this.#args[i]!;
            if (typeof arg === 'function')
                arg = arg();
            yield* yieldLines(line, arg, indent);
        }
        for (; i < this.#template.length; i++) {
            yield* yieldLines(line, this.#template[i++]!, '');
        }
        if (line.length > 0)
            yield line.join('');
    }
}

function* yieldLines(buffer: string[], lines: SourceArg, indent: string) {
    if (typeof lines === 'string')
        lines = lines.split('\n');
    else if (typeof lines !== 'object')
        lines = [lines];
    const iter = lines[Symbol.iterator]();
    let next = iter.next();
    if (next.done)
        return;
    buffer.push(String(next.value));
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