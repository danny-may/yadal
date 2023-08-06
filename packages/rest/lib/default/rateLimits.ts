import * as config from "./config/index.js";
import { buildRateLimits } from "../rateLimit/buildRateLimits.js";

export const rateLimits = buildRateLimits(config);
