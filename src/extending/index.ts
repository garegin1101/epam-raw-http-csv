import { Worker } from "worker_threads";
import { once } from "events";
import optimization from "./optimization/index.js";
import findCSV from "./findFilesViaExtension/index.js";
import { ServerResponse } from "http";

export default async (dirname: string, res: ServerResponse) => {
    const start = Date.now();

    try {

        const files = await findCSV(dirname);

        let allFiles = optimization(files, 11, res);

        if(!allFiles) return

        const { length } = allFiles;
        let j = 0, q = 0;
        for (const fileGroup of allFiles) {

            const worker = new Worker("./src/worker/worker.cjs", {
                workerData: {
                    data: [fileGroup, dirname],
                    path: "./worker.cts"
                }
            });

            // for true index, if I directly put ++j it will work wrong due to scope
            const i = ++j;

            once(worker, "message")
                .then((records) => {
                    console.log(`worker ${i} - ${records} records : duration ${Date.now() - start} milisecond`);
                    worker.terminate()
                    if(length === ++q) res.end("Files are successfuly converted")
                })

        }

    } catch (err) {
        res.statusCode = 400;

        if(err instanceof Error) console.log(err.message);
         
        res.end("no such directory");

    }
}