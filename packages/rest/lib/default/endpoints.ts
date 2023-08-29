import { buildEndpoints } from '../endpoints/index.js';
import { rest as restDef } from '../../ref/index.js';

export const rest = buildEndpoints(new URL('rest:'), Object.values(restDef));