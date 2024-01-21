const express = require("express");
const app = express();

const ExcelDao = require("../middle/dao/excelDao");

const excelDao = new ExcelDao();

/**
 * csv service
 */

app.use("/", function (req, res) {
  excelDao
    .excelDownload()
    .then(async (result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json();
    });
});

module.exports = app;
