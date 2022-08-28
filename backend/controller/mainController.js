const express = require("express");
const app = express();
const main = require("../service/mainService");

/**
 * トップ画面のController
 */
app.use("/", main);
app.use("/showAttendanceDialog", main);
app.use("/check", main);
app.use("/save", main);

module.exports = app;
