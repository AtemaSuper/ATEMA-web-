const express = require('express')
const app = express()
var jwt = require('jsonwebtoken');
var NCMB   = require('ncmb');
var application_key = "c693810d5d59983dad54088877981edd272984c7eb6cf7ddfdb3feb407425f13";
var client_key = "34d5ccb39527f3aef7db0048f4b1fad96ee89a4ec503e7ec35bbdeb06bd68dfd";
var ncmb = new NCMB(application_key, client_key);
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const authorization = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.sendStatus(403);
  }
  try {
    const data = jwt.verify(token, "secret_atema_key");
    req.userId = data.userName;
    req.userRole = data.objectId;
    return next();
  } catch {
    return res.sendStatus(403);
  }
};

app.get("/", (req, res) => {
  // cookieに登録する処理
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.cookie('access-token', 'SSSSSSSSSSSSS', {
    maxAge: 1209600000,
    secure:false, // secure属性は開発環境はfalseにしておきましょう
    httpOnly: true,
    sameSite: 'strict',
  })
  console.log(res)
  return res.json({ message: "Hello World 🇵🇹 🤘" });
});

app.post("/login", (req, res) => {
  ncmb.User
  .login(req.body.id, req.body.password)
  .then(user => {
    console.log(user);
    const userHash = {
      userName: user.userName,
      objectId: user.objectId,
      mailAddress: user.mailAddress,
      sessionToken: user.sessionToken
    }
    //　ToDo　secret_atema_keyはユーザーごとに作成する必要がある
    var token= jwt.sign(userHash, "secret_atema_key", {
      expiresIn: '24h'
    });
    res
    .cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    var text1 = user.userName;
    res
    .cookie("msg", text1, {
      maxAge: 30000  //有効期限30000ミリ秒
    })
    .status(200)
    .json({ message: "Logged in successfully 😊 👌" })
  })
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


  module.exports=app