const express = require("express");
const app = express();
const stub = require("../service/stubService");

/**
 * stubデータ登録等用のController
 */
app.use("/", stub);

module.exports = app;
