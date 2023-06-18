import { unlink } from "fs/promises";
import path from "path";

const deleteFile = async (res, req, filename) => {
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
}