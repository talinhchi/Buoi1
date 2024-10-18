import express from "express";
import dotenv from "dotenv/config";
import bodyParser from "body-parser";

import viewEngine from "./viewEngine";
import initWebRoutes from "./routes";
const app = express();
viewEngine(app);
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT;
initWebRoutes(app);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
