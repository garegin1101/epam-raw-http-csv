import { ServerResponse } from "http";
import { availableParallelism } from "os";

export default (files: string[], length: number, res: ServerResponse) => {
    if (files.length == 0) {
        res.statusCode = 400;
        res.end("There is no csv file in this directory");
        return
    }

    let arr: string[][] = Array.from({ length }, () => [])

    let i = 0;
    for (const file of files) {
        if (i >= length) i = 0
        arr[i].push(file)
        i++
    }

    arr = arr.filter(val => val.length)

    if (arr.length > 4) {
        const virtualCpus = availableParallelism();
        process.env.UV_THREADPOOL_SIZE = virtualCpus > arr.length ? String(arr.length) : String(virtualCpus);
    }

    return arr;
}

