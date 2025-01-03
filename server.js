import express from "express";
import dotenv from "dotenv/config";
import bodyParser from "body-parser";
import redisStore from "connect-redis";
import { createClient } from "redis";
import viewEngine from "./viewEngine";
import initWebRoutes from "./routes";
import session from "express-session";
import cors from "cors";

import sequelize from "./configs/sequelize";
const app = express();
app.use(cors());
app.use(express.static("public"));
const redisClient = createClient({
  password: "CzMRmSxudRmnZwrTZvpX8hHm4i2DU6Ts",
  socket: {
    host: "redis-10158.c282.east-us-mz.azure.redns.redis-cloud.com",
    port: 10158,
  },
});
redisClient.connect().catch(console.error);
const redisStoreInstance = new redisStore({
  client: redisClient,
  prefix: "",
});
app.use(
  session({
    store: redisStoreInstance,
    secret: "hehe ahhe hahehheehehhe",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
sequelize.sync({ force: false }).then(() => {
  console.log("Database & tables created!");
});
viewEngine(app);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = process.env.PORT;
initWebRoutes(app);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
