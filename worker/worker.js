import converter from "../src/converter/index.js";
import {parentPort, workerData} from "worker_threads"

const records  = await converter(...workerData);

parentPort.postMessage(records);
