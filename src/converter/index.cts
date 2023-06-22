import csv from 'csv-parser'
import fs from "fs"
import { pipeline } from "stream/promises";
import path from "path";
import type { NowDaysReadStream } from "./interfaces.cjs"

export const converter = async (fileGroup : string[], dirname: string) => {
    let records = 0;
    for (const file of fileGroup) {
        await pipeline(
            (fs.createReadStream(path.join(dirname, file)) as NowDaysReadStream).map((chunk : Buffer)=>{
                return chunk.toString()
            }),
            csv(),
            async function* (source) {
                yield "["
                let i = 0;
                for await (const chunk of source) {
                    yield i ? "," + JSON.stringify(chunk, null, 2) : JSON.stringify(chunk, null, 2)
                    i++
                }
                
                records = records + i;
                yield "]"
            }, 
            fs.createWriteStream(path.join('converted', path.basename(file, ".csv") + ".json"))
        )
    }
    return records

}