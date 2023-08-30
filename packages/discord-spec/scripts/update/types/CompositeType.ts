import { Source, Type } from "./Type.js";
import { TypeReference } from "./TypeReference.js";
import { Documentation } from "./jsDoc.js";

export abstract class CompositeType extends Type {
    readonly types: readonly TypeReference[];

    constructor(options: { name?: string; documentation?: Documentation; types: Iterable<TypeReference>; }) {
        super(options);
        this.types = [...options.types];
    }

    protected joinTypes(prefix: Iterable<string>, separator: Iterable<string>, postfix: Iterable<string>, itemName: string) {
        return this.joinParagraphs(this.#typeParagraphs(itemName), prefix, separator, postfix);
    }

    *#typeParagraphs(itemPrefix: string): Source<Source> {
        let iType = 0;
        for (const type of this.types)
            yield this.#typeParagraph(type.dereference(), `${itemPrefix}${iType++}`);
    }

    *#typeParagraph(type: Type, context: string): Source {
        if (type.name !== undefined) {
            yield type.name;
            return;
        }

        let iLine = 0;
        for (const line of type.inline(context)) {
            iLine += 1;
            yield line;
        }

        if (iLine === 0)
            yield 'never';
    }
}
