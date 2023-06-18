import extending from "../../extending/index.js";

const convertToJSON = async (res, req) => {
    if (req.headers["content-type"] === "text/plain") {

            const body = await req.take(1).toArray();
            const dirname = body.toString();
            extending(dirname, res)

    } else {
        res.statusCode = 400;
        res.end("please provide relavant body")
    }
}

export default {
    "exports": {
        "/": convertToJSON
    }
}