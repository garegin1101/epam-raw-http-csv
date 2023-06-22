import { ReadStream } from "fs";

export interface NowDaysReadStream extends ReadStream {
    map(callback: Function, options?: {signal?: AbortSignal, concurency?: number}): NowDaysReadStream;
}