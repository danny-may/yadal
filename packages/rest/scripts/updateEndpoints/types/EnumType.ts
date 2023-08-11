import { depluralize } from "../util/index.js";
import { Expose, Source, Type } from "./Type.js";
import { isIdentifier } from "./isIdentifier.js";
import { Documentation, jsDoc } from "./jsDoc.js";

export class EnumType extends Type {
    readonly values: readonly EnumValue[];
    constructor(options: { name?: string; documentation?: Documentation; values: Iterable<EnumValue>; }) {
        let name = options.name;
        if (name !== undefined) {
            name = depluralize(name);
            if (/enum$/i.test(name))
                name = depluralize(name.slice(0, -4));
            options.name = name;
        }

        super(options);
        this.values = [...options.values];
    }

    *inline(): Source {
        yield `(${this.values.map(v => JSON.stringify(v.value)).join(' | ')})`;
    }

    *define(expose: Expose): Source {
        yield* expose(this.#type());
        yield* expose(this.#value());
        yield `Object.freeze(${this.name});`;
    }

    *#type() {
        yield `type ${this.name} = typeof ${this.name}[keyof typeof ${this.name}];`;
    }

    #value() {
        return this.joinParagraphs(
            this.#enumProperties(),
            [`const ${this.name} = {`, ''],
            [',', ''],
            ['', `} as const;`]
        )
    }

    *#enumProperties(): Source<Source> {
        for (const property of this.values)
            yield this.prefix(property.declare(), '    ');
    }
}

export class EnumValue {
    readonly name: string;
    readonly value: number | string;
    readonly documentation: Documentation | undefined;

    constructor(options: { name: string; value: number | string; documentation?: Documentation; }) {
        this.name = options.name.toUpperCase();
        this.value = options.value;
        this.documentation = options.documentation
    }

    *declare() {
        yield* jsDoc(this.documentation);
        yield `${this.#propertyName(this.name)}: ${JSON.stringify(this.value)}`
    }

    #propertyName(name: string): string {
        if (isIdentifier(name))
            return name;
        return JSON.stringify(name);
    }
}

