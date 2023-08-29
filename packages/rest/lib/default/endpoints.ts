import { buildEndpoints } from '../endpoints/index.js';
import { endpoints as restDef } from '../../ref/index.js';

export const rest = buildEndpoints(new URL('rest:'), Object.values(restDef));