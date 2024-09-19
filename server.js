import express from "express";
import dotenv from "dotenv/config";

import date from "./date";
import getURL from "./getURL";
import viewEngine from "./viewEngine";
const app = express();
viewEngine(app);
const port = process.env.PORT;
app.get("/", (req, res) => {
  res.render("home");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/date", (req, res) => {
  res.send(date());
});
app.get("/geturl", (req, res) => {
  res.send(getURL.getPath(req) + "<br>" + getURL.getParamsURL(req));
});
app.get("/ejs", (req, res) => {
  res.render("test");
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
