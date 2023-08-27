import { Source } from "./Type.js";

export const fuseLines = (() => {
    function* yieldJoined(items: string[]): Source {
        switch (items.length) {
            case 0: break;
            case 1: yield items[0]!; break;
            default: yield items.join(''); break;
        }
    }
    return function* fuseLines(...sources: Array<Iterable<string>>): Source {
        const builder: string[] = [];
        for (const lines of sources) {
            const iter = lines[Symbol.iterator]();
            try {
                let next = iter.next();
                if (next.done)
                    continue;
                builder.push(next.value);
                next = iter.next();
                while (!next.done) {
                    yield* yieldJoined(builder);
                    builder.length = 0;
                    builder.push(next.value);
                    next = iter.next();
                }
            } finally {
                iter.return?.();
            }
        }
        yield* yieldJoined(builder);
    }
})();