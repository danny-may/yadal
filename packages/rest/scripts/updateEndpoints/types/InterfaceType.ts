import { Expose, Source, Type } from "./Type.js";
import { TypeReference } from "./TypeReference.js";
import { fuseLines } from "./fuseLines.js";
import { isIdentifier } from "./isIdentifier.js";
import { Documentation, jsDoc } from "./jsDoc.js";

export class InterfaceType extends Type {
    readonly properties: readonly InterfaceProperty[];
    readonly base: readonly TypeReference[];

    constructor(options: { name?: string; documentation?: Documentation; properties: Iterable<InterfaceProperty>; base?: Iterable<TypeReference> }) {
        super(options);
        this.properties = [...options.properties];
        this.base = [...options.base ?? []];
    }

    inline(context: string): Source {
        if (this.base.length === 0)
            return this.#value(context, []);
        return this.#value(context, this.joinParagraphs(
            this.base.map((t, i) => t.dereference().inline(`${context}Option${i}`)),
            [],
            [' & '],
            [' & ']
        ));
    }

    define(expose: Expose): Source {
        if (this.base.length === 0)
            return expose(this.#value(this.name!, [`interface ${this.name} `]));
        return expose(this.#value(this.name!, this.joinParagraphs(
            this.base.map((t, i) => t.dereference().inline(`${this.name}Option${i}`)),
            [`interface ${this.name} extends `],
            [', '],
            [' ']
        )))
    }

    #value(context: string, prefix: Iterable<string>): Source {
        return this.joinParagraphs(
            this.#objectProperties(context),
            fuseLines(prefix, [`{`, '']),
            ['', ''],
            ['', `}`]
        );
    }

    *#objectProperties(context: string): Source<Source> {
        for (const property of this.properties)
            yield this.prefix(property.declare(context), '    ');
    }
}

export class InterfaceProperty {
    readonly name: string;
    readonly type: TypeReference;
    readonly optional: boolean;
    readonly readonly: boolean;
    readonly documentation: Documentation | undefined;

    constructor(options: { name: string; type: TypeReference; optional?: boolean; readonly?: boolean; documentation?: Documentation }) {
        this.name = options.name;
        this.type = options.type;
        this.optional = options.optional ?? false;
        this.readonly = options.readonly ?? false;
        this.documentation = options.documentation;
    }

    *declare(context: string) {
        const prefix = [];
        if (this.readonly)
            prefix.push('readonly ');
        prefix.push(this.#propertyName(this.name));
        if (this.optional)
            prefix.push('?');
        prefix.push(': ');

        yield* jsDoc(this.documentation);
        yield* fuseLines(
            [prefix.join('')],
            this.type.dereference().inline(`${context}${this.name}`),
            [';']
        );
    }

    #propertyName(name: string): string {
        if (isIdentifier(name))
            return name;
        return JSON.stringify(name);
    }
}

