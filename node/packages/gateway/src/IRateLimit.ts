import { AbortSignal } from '@yadal/dep';

export interface IRateLimit<T> {
    wait(value: T, signal?: AbortSignal): Promise<void>;
}
