import pkg from '../package.json' assert { type: 'json' };
import { buildOperations } from '@yadal/rest';
import { cdn } from '@yadal/discord-spec';

export const defaultUserAgent = `${pkg.name} (${pkg.repository.url}, ${pkg.version})`;
export const operations = buildOperations(new URL('cdn:/'), Object.values(cdn));