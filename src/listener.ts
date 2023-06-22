import { IncomingMessage,  ServerResponse } from "http";
import { methods, use } from "./methods/index.js";

function whetherFieldExist<T extends {}>(method: PropertyKey , obj: T): method is keyof T {
    if(method in obj) return true
    return false
}

export default (req: IncomingMessage, res : ServerResponse) => {
    let { method, url } = req;
    let Urls: string[];

    if(url) Urls = url.split("/");
    else {
        res.statusCode = 400;
        res.end("Url is not defined");
        return
    } 
    
    const [ , endpoint, param ]  = Urls as [ "", string, string | undefined];

    if(Urls.length <= 3 && method)
    if(whetherFieldExist(method,methods))
    if(whetherFieldExist(endpoint, use(methods)[method]))
    use(methods)[method][endpoint][param? ":" : "/"](res, req, param)
    else {
        res.statusCode = 404;
        res.end("there is no resourse under that url")
    }
    else {
        res.statusCode = 405;
        res.end("Method Not Allowed")
    }
    else {
        res.statusCode = 400;
        res.end("Error : Large path")
    } 
  }