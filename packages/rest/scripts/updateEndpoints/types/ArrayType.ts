import { ClosedGenericType } from "./ClosedGenericType.js";
import { TypeReference } from "./TypeReference.js";
import { Documentation } from "./jsDoc.js";

export class ArrayType extends ClosedGenericType {
    readonly item: TypeReference;
    readonly readonly: boolean;

    constructor(options: { name?: string; documentation?: Documentation; item: TypeReference; readonly: boolean; }) {
        super({
            ...options,
            generic: options.readonly ? 'ReadonlyArray' : 'Array',
            parameters: [options.item]
        });
        this.item = options.item;
        this.readonly = options.readonly;
    }
}
