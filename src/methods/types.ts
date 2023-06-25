import { IncomingMessage, ServerResponse } from "http";

export type makeMethodUsable<T extends Record<string, {}>> = T & {
    [key in keyof  T]: {
        [key1 in keyof (T["GET"] & T["POST"] & T["DELETE"])]: {
            [key2 in "/" | ":"]: (res: ServerResponse, ...args: [IncomingMessage, ...any[]]) => void | Promise<void>
        };
    }
}