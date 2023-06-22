import { unlink } from "fs/promises";
import { IncomingMessage, ServerResponse } from "http";
import path from "path";

const deleteFile = async (res: ServerResponse, req: IncomingMessage, filename : string) => {
    try {

        await unlink(path.join("converted", filename));

        res.end('File successfuly deleted');

    } catch (err) {
        
        res.end("no such file");

    }
}

export default {
    "files": {
        ":": deleteFile
    }
} as const