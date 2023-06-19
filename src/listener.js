import methods from "./methods/index.js";


export default (req, res) => {
    const method = req.method;
    const Urls = req.url.split("/");
    
    if(Urls.length <= 3)
    if(methods[method])
    if(methods[method][Urls[1]]?.[Urls[2] ? ":" : "/"])
    methods[method][Urls[1]][Urls[2] ? ":" : "/"](res, req, Urls[2])
    else {
        res.statusCode = 404;
        res.end("ther is no resourse under that url")
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