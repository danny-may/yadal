import { Expose, Source, Type } from "./Type.js";
import { Documentation } from "./jsDoc.js";

export class LiteralType extends Type {
    readonly value: string;
    constructor(options: { value: string; name?: string; documentation?: Documentation; }) {
        super(options);
        this.value = options.value;
    }

    *inline(): Source {
        yield this.value;
    }

    define(expose: Expose): Source {
        return expose([`type ${this.name} = ${this.value};`]);
    }
}
