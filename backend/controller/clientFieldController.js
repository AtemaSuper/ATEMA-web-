const express = require("express");
const app = express();
const clientField = require("../service/clientFieldService");

/**
 * 客先編集画面のController
 */
app.use("/", clientField);
app.use("/saveClientField", clientField);
app.use("/saveWorkField", clientField);
app.use("/deleteClientField", clientField);
app.use("/deleteWorkField", clientField);

module.exports = app;
