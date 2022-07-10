const express = require("express");
const app = express();
const authentication = require("../service/authenticationService");

/**
 * 認証のController
 */
app.use("/", authentication);

module.exports = app;
