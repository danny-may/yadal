import { createSorter } from "./Sorter.js";

export const stringSort = {
    byLength: createSorter<string>((a, b) => a.length - b.length),
    ordinal: createSorter<string>((a, b) => a < b ? -1 : 1)
} as const
Object.freeze(stringSort);
