import { IRateLimitService } from "./RateLimitService.js";

export class NoOpRateLimitService implements IRateLimitService {
    clear(): void {
    }
    wait(): Promise<void> {
        return Promise.resolve();
    }
    update(): void {
    }
}
