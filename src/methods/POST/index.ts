import { ServerResponse } from "http";
import extending from "../../extending/index.js";
import type { NowDaysIncomingMessage } from "./interfaces.js"

const convertToJSON = async (res: ServerResponse, req: NowDaysIncomingMessage) => {
    if (req.headers["content-type"] === "text/plain") {

            const body = await req.take(1).toArray();
            const dirname = body.toString();
            extending(dirname, res)

    } else {
        res.statusCode = 400;
        res.end("please provide relavant body")
    }
}

export default {
    "exports": {
        "/": convertToJSON
    }
} as const