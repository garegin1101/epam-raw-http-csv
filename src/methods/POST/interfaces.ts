import { IncomingMessage } from "http";

export interface NowDaysIncomingMessage extends IncomingMessage {
    take(num: number) : {toArray(): Promise<(string | JSON)[]>}
}