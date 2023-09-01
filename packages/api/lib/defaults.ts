import pkg from '../package.json' assert { type: 'json' };
import { buildOperations } from '@yadal/rest';
import { buildRateLimits } from './rateLimit/buildRateLimits.js';
import { api } from '@yadal/discord-spec';

export const defaultUserAgent = `${pkg.name} (${pkg.repository.url}, ${pkg.version})`;
export const rateLimits = buildRateLimits(Object.values(api));
export const operations = buildOperations(new URL('api:/'), Object.values(api));