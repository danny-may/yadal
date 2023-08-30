import { parser, TypeBuilder, augmentations, typesToSource, writeFile, exposeViaExport, deleteFsItem, defineHelpers, getRest, getCdn } from './updateEndpoints/index.js';

const [rest, cdn] = await Promise.all([
    getRest(),
    getCdn()
]);
const builder = new TypeBuilder(parser);
loadAugmentations(builder);
rest.loadTypes(builder);
cdn.loadTypes(builder);

const types = builder.build();
const typesFile = new URL('../ref/types.ts', import.meta.url);
const helperFile = new URL('../ref/helpers.ts', import.meta.url);

await deleteFsItem(new URL('../ref', import.meta.url));

await writeFile({ contents: typesToSource(types.values(), exposeViaExport) }, typesFile);
await writeFile(defineHelpers(typesFile), helperFile);
const restIndex = await rest.writeFiles(new URL('../ref/rest/', import.meta.url), types, typesFile, helperFile);
const cdnIndex = await cdn.writeFiles(new URL('../ref/cdn/', import.meta.url), types, typesFile, helperFile);

await writeFile({
    exports: [
        { file: typesFile, isType: false },
        { file: helperFile, isType: false },
        { file: restIndex, isType: false, name: 'rest' },
        { file: cdnIndex, isType: false, name: 'cdn' }
    ]
}, new URL('../ref/index.ts', import.meta.url));

function loadAugmentations(types: TypeBuilder) {
    for (const type of augmentations)
        types.register(type);
}