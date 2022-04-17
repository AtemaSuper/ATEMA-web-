const express = require("express");
const app = express();
const ownWorkerAll = require("../service/ownWorkerAllService");

/**
 * 自社員管理画面のController
 */
app.use("/", ownWorkerAll);
app.use("/saveEmployee", ownWorkerAll);
app.use("/savePost", ownWorkerAll);
app.use("/deleteEmployee", ownWorkerAll);
app.use("/deletePost", ownWorkerAll);

module.exports = app;
