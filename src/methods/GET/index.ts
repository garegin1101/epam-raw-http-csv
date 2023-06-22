import findJSON from "../../extending/findFilesViaExtension/index.js";
import { createReadStream , ReadStream} from "fs";
import { IncomingMessage, ServerResponse } from "http";
import path from "path";
import type { NowDaysReadStream } from "./interfaces.js"

const getFiles = (res : ServerResponse)  => {
    findJSON("converted", ".json").then((files : string[]) => {
        res.end(JSON.stringify(files))
    }).catch((err : Error) => {
        res.statusCode = 400;
        res.end(err.message)
    })
}

const getDataFromFile = async (res: ServerResponse, req: IncomingMessage, filename : string) => {
    let readstr = createReadStream(path.join("converted", filename)) as NowDaysReadStream;
    try {
        await readstr.forEach((element : string) => {
            res.write(element)
        })

        res.end()
    } catch (err) {
        res.end("there is no such file")
    }

}

export default {
    "files": {
        "/": getFiles,
        ":": getDataFromFile
    }
} as const