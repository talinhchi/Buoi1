import express from "express";
import dotenv from "dotenv/config";
import bodyParser from "body-parser";

import viewEngine from "./viewEngine";
import initWebRoutes from "./routes";
import session from "express-session";
const app = express();
app.use(
  session({
    secret: "hehe ahhe hahehheehehhe",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
viewEngine(app);
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT;
initWebRoutes(app);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
