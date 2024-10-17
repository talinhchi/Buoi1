import express from "express";
import dotenv from "dotenv/config";

import viewEngine from "./viewEngine";
import initWebRoutes from "./routes";
const app = express();
viewEngine(app);
const port = process.env.PORT;
initWebRoutes(app);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
