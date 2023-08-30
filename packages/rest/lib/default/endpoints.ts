import { buildEndpoints } from '../endpoints/index.js';
import { rest as restDef, cdn as cdnDef } from '@yadal/discord-spec';

export const rest = buildEndpoints(new URL('rest:/'), Object.values(restDef));
export const cdn = buildEndpoints(new URL('cdn:/'), Object.values(cdnDef));