const express = require("express");
const app = express();
var jwt = require("jsonwebtoken");
var NCMB = require("ncmb");
const ncmb_key = require("../ncmb-key");
var ncmb = new NCMB(ncmb_key.application_key, ncmb_key.client_key);
const cookieParser = require("cookie-parser");
app.use(cookieParser());

/**
 * ログイン画面のService
 */
const User = {
  userName: "AtemAdmin",
  password: "1234",
  objectId: "R4XlUN8vWVoOEg5J",
  mailAddress: null,
  mailAddressConfirm: null,
  sessionToken: "Rr6nWkhk8VNgNIT6OOTUgqtZE",
  createDate: "2022-01-20T11:11:19.095Z",
  updateDate: "2022-01-20T11:11:19.110Z",
  authData: null,
};

const authorization = (req, res, next) => {
  // カレントユーザー情報の取得
  var currentUser = ncmb.User.getCurrentUser();
  if (currentUser) {
    console.log("ログイン中のユーザー: " + currentUser.get("userName"));
  } else {
    console.log("未ログインまたは取得に失敗");
  }

  const token = req.cookies.access_token;
  if (!token) {
    return res.sendStatus(403);
  }
  try {
    const data = jwt.verify(token, "secret_atema_key");
    req.userName = data.userName;
    return next();
  } catch {
    return res.sendStatus(403);
  }
};

app.post("/", (req, res) => {
  ncmb.User.login(req.body.id, req.body.password).then((user) => {
    console.log(user);
    const userHash = {
      userName: user.userName,
      objectId: user.objectId,
      mailAddress: user.mailAddress,
      sessionToken: user.sessionToken,
    };
    //　ToDo　secret_atema_keyはユーザーごとに作成する必要がある
    var token = jwt.sign(userHash, "secret_atema_key", {
      expiresIn: "24h",
    });
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({ message: "Logged in successfully 😊 👌" });
  });
});

app.post("/protected", authorization, (req, res) => {
  return res.json({ user: { userName: req.userName } });
});

app.post("/logout", authorization, (req, res) => {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out 😏 🍀" });
});

module.exports = app;
