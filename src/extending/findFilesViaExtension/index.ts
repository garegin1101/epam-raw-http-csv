import { readdir } from "fs/promises";
import path from "path";

export default async (dirname: string, extension = ".csv") => {
    let files: string[] = [];
    (await readdir(dirname, { withFileTypes: true }))
            .forEach((file) => {
                if (!file.isDirectory()) 
                if (path.extname(file.name) === extension) files.push(file.name)
            })

    return files;        
}