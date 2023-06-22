const { converter } = require('../converter/index.cts');
import {parentPort, workerData} from "worker_threads"

let data = workerData.data as [string[], string];

converter(...data).then((records: number) =>{
    parentPort!.postMessage(records);
});


