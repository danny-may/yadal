import { parser, TypeBuilder, augmentations, typesToSource, writeFile, exposeViaExport, deleteFsItem, defineHelpers, getRest, getCdn } from './update/index.js';

const [rest, cdn] = await Promise.all([
    getRest(),
    getCdn()
]);
const builder = new TypeBuilder(parser);
loadAugmentations(builder);
rest.loadTypes(builder);
cdn.loadTypes(builder);

const types = builder.build();
const lib = new URL('../lib/', import.meta.url);
const typesFile = new URL('./types.ts', lib);
const helperFile = new URL('./helpers.ts', lib);

await deleteFsItem(lib);
await writeFile({ contents: typesToSource(types.values(), exposeViaExport) }, typesFile);
await writeFile(defineHelpers(typesFile), helperFile);
const restIndex = await rest.writeFiles(new URL('./rest/', lib), types, typesFile, helperFile);
const cdnIndex = await cdn.writeFiles(new URL('./cdn/', lib), types, typesFile, helperFile);

await writeFile({
    exports: [
        { file: typesFile, isType: false },
        { file: helperFile, isType: false },
        { file: restIndex, isType: false, name: 'rest' },
        { file: cdnIndex, isType: false, name: 'cdn' }
    ]
}, new URL('./index.ts', lib));

function loadAugmentations(types: TypeBuilder) {
    for (const type of augmentations)
        types.register(type);
}