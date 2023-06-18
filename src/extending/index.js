import { Worker } from "worker_threads";
import { once } from "events";
import optimization from "./optimization/index.js";
import findCSV from "./findFilesViaExtension/index.js";

export default async (dirname, res) => {
    const start = Date.now();

    try {

        const files = await findCSV(dirname);

        let allFiles = optimization(files, 11, res);
        let j = 0, q = 0;
        for (const fileGroup of allFiles) {

            const worker = new Worker("./worker/worker.js", {
                workerData: [fileGroup, dirname]
            });

            // for true index, if I directly put ++j it will work wrong due to scope
            const i = ++j;

            once(worker, "message")
                .then((records) => {
                    console.log(`worker ${i} - ${records} records : duration ${Date.now() - start} milisecond`);
                    worker.terminate()
                    if(allFiles.length === ++q) res.end("Files are successfuly converted")
                })

        }

    } catch (err) {

        console.log(err.message);
        res.statusCode = 400;
        res.end("no such directory");

    }
}