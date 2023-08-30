import { CompositeType } from "./CompositeType.js";
import { Expose, Source } from "./Type.js";
import { TypeReference } from "./TypeReference.js";
import { Documentation } from "./jsDoc.js";

export class ClosedGenericType extends CompositeType {
    readonly generic: string;
    get parameters() { return this.types; };

    constructor(options: { name?: string; documentation?: Documentation; generic: string; parameters: Iterable<TypeReference>; }) {
        super({
            ...options,
            types: options.parameters
        });
        this.generic = options.generic;
        if (this.parameters.length === 0)
            throw new Error('Cannot have no generic parameters');
    }

    inline(context: string): Source {
        return this.joinTypes([`${this.generic}<`], [', '], ['>'], `${context}Arg`);
    }

    define(expose: Expose): Source {
        return expose(this.joinTypes([`type ${this.name} = ${this.generic}<`], [', '], ['>;'], `${this.name}Arg`));
    }
}
