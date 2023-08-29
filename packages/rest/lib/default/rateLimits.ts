import { buildRateLimits } from "../rateLimit/buildRateLimits.js";
import { endpoints as config } from "../../ref/index.js";

export const rateLimits = buildRateLimits(Object.values(config));
