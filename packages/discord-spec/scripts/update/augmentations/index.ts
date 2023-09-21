import { isoDateTime } from './isoDateTime.js';
import { uriString } from './uriString.js';
import { messageTags } from './messageTags.js';

export * from './messageTags.js';
export * from './isoDateTime.js';
export * from './uriString.js';

export const augmentations = [
    isoDateTime,
    uriString,
    ...messageTags
]