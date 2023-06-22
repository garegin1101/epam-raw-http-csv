import { ReadStream } from "fs";
export interface NowDaysReadStream extends ReadStream {
    forEach(callback: Function, options?: {signal?: AbortSignal, concurency?: number}): Promise<void>;
}