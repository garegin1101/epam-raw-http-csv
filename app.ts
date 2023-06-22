import { createServer } from "http"
import listener from "./src/listener.js";

const app = createServer(listener);

app.listen(3000);