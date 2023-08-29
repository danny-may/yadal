import { buildRateLimits } from "../rateLimit/buildRateLimits.js";
import { rest as config } from "../../ref/index.js";

export const rateLimits = buildRateLimits(Object.values(config));
