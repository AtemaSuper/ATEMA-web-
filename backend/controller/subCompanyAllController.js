const express = require("express");
const app = express();
const subCompanyAll = require("../service/subCompanyAllService");

/**
 * 協力会社管理画面のController
 */
app.use("/", subCompanyAll);
app.use("/saveSubCompany", subCompanyAll);
app.use("/saveSubEmployee", subCompanyAll);
app.use("/deleteSubCompany", subCompanyAll);
app.use("/deleteSubEmployee", subCompanyAll);

module.exports = app;
