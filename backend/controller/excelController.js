const express = require("express");
const app = express();
const excel = require("../service/excelService");

/**
 * csvダウンロード用のController
 */
app.use("/", excel);

module.exports = app;
