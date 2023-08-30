import { buildRateLimits } from "../rateLimit/buildRateLimits.js";
import { rest as config } from "@yadal/discord-spec";

export const rateLimits = buildRateLimits(Object.values(config));
