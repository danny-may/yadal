import { Expose, Source, Type } from "./Type.js";
import { TypeReference } from "./TypeReference.js";
import { fuseLines } from "./fuseLines.js";
import { Documentation, jsDoc } from "./jsDoc.js";

export class RecordType extends Type {
    readonly value: RecordValueType;

    constructor(options: { name?: string; documentation?: Documentation; value: RecordValueType }) {
        super(options);
        this.value = options.value;
    }

    inline(context: string): Source {
        return fuseLines(
            [`{`, ''],
            this.prefix(this.value.declare(context), '    '),
            ['', '}']
        )
    }

    define(expose: Expose): Source {
        return expose(fuseLines(
            [`type ${this.name} = {`, ''],
            this.prefix(this.value.declare(this.name!), '    '),
            ['', '};']
        ))
    }
}

export class RecordValueType {
    readonly type: TypeReference;
    readonly readonly: boolean;
    readonly documentation: Documentation | undefined;

    constructor(options: { type: TypeReference; readonly?: boolean; documentation?: Documentation }) {
        this.type = options.type;
        this.readonly = options.readonly ?? false;
        this.documentation = options.documentation;
    }

    *declare(context: string) {
        const prefix = [];
        if (this.readonly)
            prefix.push('readonly ');
        prefix.push('[key: string]: ');

        yield* jsDoc(this.documentation);
        yield* fuseLines(
            [prefix.join('')],
            this.type.dereference().inline(`${context}Key`),
            [';']
        );
    }
}