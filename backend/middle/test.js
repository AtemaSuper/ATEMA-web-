const express = require("express");
const app = express();

app.post("/", function (req, res) {
  console.log(app.get("errorMessage"));
  res.send({
    message: app.get("errorMessage"),
  });
});

module.exports = app;
