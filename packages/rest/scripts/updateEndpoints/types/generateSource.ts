import { Expose, Source } from "./Type.js";
import { TypeReference } from "./TypeReference.js";
import { fuseLines } from "./fuseLines.js";

export function* generateSource(types: Iterable<TypeReference>, expose: Expose): Source {
    for (const type of types)
        yield* type.dereference().define(expose);
}

export function exposeViaExport(source: Source): Source {
    return fuseLines(
        ['export '],
        source
    )
}

