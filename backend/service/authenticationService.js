const express = require("express");
const app = express();

const authenticationDao = require("../middle/dao/authenticationDao");

const authentication = new authenticationDao();

/**
 * 認証service
 */

function getBearerToken(req) {
  let token = "";
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  return token;
}

app.use("/", function (req, res) {
  const token = getBearerToken(req);
  authentication
    .verificationToken(token, res)
    .then(async (result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).json();
    });
});

module.exports = app;
