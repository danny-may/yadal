import { isoDateTime } from './isoDateTime.js';
import { uriString } from './uriString.js';
import { messageTags } from './messageTags.js';
import { snowflake } from './snowflake.js';

export * from './messageTags.js';
export * from './snowflake.js';
export * from './isoDateTime.js';
export * from './uriString.js';

export const augmentations = [
    snowflake,
    isoDateTime,
    uriString,
    ...messageTags
]