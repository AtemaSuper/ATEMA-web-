const express = require("express");
const app = express();
const workField = require("../service/workFieldService");

/**
 * 現場詳細編集画面のController
 */
app.use("/", workField);
app.use("/save", workField);
app.use("/delete", workField);

module.exports = app;
