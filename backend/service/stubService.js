const express = require("express");
const app = express();

const StubDao = require("../middle/dao/stubDao");

const stubDao = new StubDao();

/**
 * stub service
 */

app.use("/", function (req, res) {
  stubDao
    .stubImport(req.body.collectionName, req.body.documentName)
    .then(async (result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).json();
    });
});

module.exports = app;
