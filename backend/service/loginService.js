const express = require("express");
const app = express();
var jwt = require("jsonwebtoken");
var NCMB = require("ncmb");
const ncmb_key = require("../ncmb-key");
var ncmb = new NCMB(ncmb_key.application_key, ncmb_key.client_key);
const cookieParser = require("cookie-parser");
app.use(cookieParser());

//会社紐づけテーブル
const ContractRelationDao = require("../middle/dao/contractRelationDao");
var contractRelationDao = new ContractRelationDao();
//契約テーブル
const ContactDao = require("../middle/dao/contactDao");
var contactDao = new ContactDao();
//客先テーブル
const EmployeeDao = require("../middle/dao/employeeDao");
var employeeDao = new EmployeeDao();
//役職テーブル
const PostDao = require("../middle/dao/postDao");
var postDao = new PostDao();

/**
 * ログイン画面のService
 */

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
//ログインユーザの情報を取得します。
app.post("/getUserInfo", async function (req, res) {
  var contractorId = "";
  var employeeResponse = {};
  var contactResponse = {};
  var postResponse = {};
  //会社紐づけテーブルから会社IDを取得します。
  await contractRelationDao
    .getContractorId(req.body.employeeId)
    .then(function (items) {
      contractorId = items.contractorId;
      //社員テーブルから社員情報を取得します。
      return employeeDao.selectEmployee(contractorId, req.body.employeeId);
    })
    .then(function (items) {
      employeeResponse = items;
      //会社テーブルから会社情報を取得します。
      return contactDao.selectContactAll(contractorId);
    })
    .then(function (items) {
      contactResponse = items;
      //役職IDから役職名を取得します。
      return postDao.selectPostInfoByPostId(
        contractorId,
        employeeResponse.postId
      );
    })
    .then(function (items) {
      postResponse = items;
      var userInfo = {
        companyName: contactResponse.contractorName,
        companyId: contractorId,
        userName:
          employeeResponse.employeeFirstName +
          employeeResponse.employeeLastName,
        userId: req.body.employeeId,
        postName: postResponse.postName,
        attendanceAuth: postResponse.attendanceAuth,
        ownCompanyManageAuth: postResponse.ownCompanyManageAuth,
        ownWorkerManageAuth: postResponse.ownWorkerManageAuth,
        payPlanAuth: postResponse.payPlanAuth,
        subCompanyAuth: postResponse.subCompanyAuth,
      };

      //返却用のdata
      var data = {
        userInfo: userInfo,
      };
      console.log(data);
      //dataをレスポンスで返却します。
      res.status(200).json(data);
    })
    .catch(function (err) {
      console.log(err);

      res.status(500).json(err);
    });
});

module.exports = app;
