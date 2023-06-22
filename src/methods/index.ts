import GET from "./GET/index.js";
import POST from "./POST/index.js";
import DELETE from "./DELETE/index.js";
import { makeMethodUsable } from "./types.js";

const methods = {
    GET,
    POST,
    DELETE,
} as const;

function use<T extends {}>(obj: T) {
    return obj as makeMethodUsable<T>
}

export  {
    methods,
    use
} 
