import { CompositeType } from "./CompositeType.js";
import { Expose, Source } from "./Type.js";
import { TypeReference } from "./TypeReference.js";
import { Documentation } from "./jsDoc.js";

export class IntersectionType extends CompositeType {
    constructor(options: { name?: string; documentation?: Documentation; types: Iterable<TypeReference>; }) {
        super(options);
        if (this.types.length === 0)
            throw new Error('Cannot have an intersection of 0 elements');
    }

    inline(context: string): Source {
        switch (this.types.length) {
            case 0: return ['never'];
            case 1: return this.types[0]!.dereference().inline(`${context}Value`);
            default: return this.joinTypes(['('], [' & '], [')'], `${context}Option`);
        }
    }

    define(expose: Expose): Source {
        return expose(this.joinTypes([`type ${this.name} = `], [' & '], [';'], `${this.name}Option`));
    }
}
