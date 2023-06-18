import findJSON from "../../extending/findFilesViaExtension/index.js";
import { createReadStream } from "fs";
import path from "path";


const getFiles = res => {
    findJSON("converted", ".json").then((files) => {
        res.end(JSON.stringify(files))
    }).catch(err => {
        res.statusCode = 400;
        res.end(err.message)
    })
}

const getDataFromFile = async (res, req, filename) => {
    let readstr = createReadStream(path.join("converted", filename));
    try {
        await readstr.forEach(element => {
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
}