const express = require("express");
const app = express();

//会員管理
const UserDao = require("../middle/dao/userDao");
var userDao = new UserDao();
//客先テーブル
const EmployeeDao = require("../middle/dao/employeeDao");
var employeeDao = new EmployeeDao();
//客先テーブル
const PostDao = require("../middle/dao/postDao");
var postDao = new PostDao();

/**
 * 自社員管理画面のService
 */
//自社員編集の初期表示処理です。
app.post("/", async function (req, res) {
  var employeeResponse = {};
  var postResponse = {};
  //社員テーブルから社員情報を取得します。
  await employeeDao
    .selectEmployeeAll()
    .then(function (items) {
      employeeResponse = items;
      //役職テーブルから役職情報を取得します。
      return postDao.selectPostAll();
    })
    .then(function (items) {
      postResponse = items;

      //返却用のdata
      var data = {
        employeeResponse: employeeResponse,
        postResponse: postResponse,
      };
      //dataをレスポンスで返却します。
      res.status(200).json(data);
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
});
//社員編集の入力情報を保存します。
app.post("/saveEmployee", async function (req, res) {
  var employeeResponse = {};
  var userResponse = {};
  var postResponse = {};
  var checkResult = false;
  var messageList = [];
  //TODO 入力チェック

  //社員テーブルに社員情報を保存します。
  await employeeDao
    .saveEmployee(req.body)
    .then(function (data) {
      checkResult = data.checkResult;
      messageList = data.messageList;
      //会員管理に社員情報を保存します。
      return userDao.saveEmployee(req.body);
    })
    .then(function (items) {
      userResponse = items;
      //社員テーブルから社員情報を取得します。
      return employeeDao.selectEmployeeAll();
    })
    .then(function (items) {
      employeeResponse = items;
      //役職テーブルから役職情報を取得します。
      return postDao.selectPostAll();
    })
    .then(function (items) {
      postResponse = items;
      //返却用のdata
      var data = {
        employeeResponse: employeeResponse,
        userResponse: userResponse,
        postResponse: postResponse,
        checkResult: checkResult,
        messageList: messageList,
      };
      res.status(200).json(data);
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
});
//役職情報を保存します。
app.post("/savePost", async function (req, res) {
  var employeeResponse = {};
  var postResponse = {};
  var checkResult = false;
  var messageList = [];
  //TODO 入力チェック

  //役職テーブルに役職情報を保存します。
  await postDao
    .savePost(req.body)
    .then(function (data) {
      checkResult = data.checkResult;
      messageList = data.messageList;
      //社員テーブルから社員情報を取得します。
      return employeeDao.selectEmployeeAll();
    })
    .then(function (items) {
      employeeResponse = items;
      //役職テーブルから役職情報を取得します。
      return postDao.selectPostAll();
    })
    .then(function (items) {
      postResponse = items;
      //返却用のdata
      var data = {
        employeeResponse: employeeResponse,
        postResponse: postResponse,
        checkResult: checkResult,
        messageList: messageList,
      };
      res.status(200).json(data);
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
});
//社員情報を削除します。
app.post("/deleteEmployee", async function (req, res) {
  var employeeResponse = {};
  var postResponse = {};
  var checkResult = false;
  var messageList = [];
  //TODO 入力チェック

  //社員テーブルから社員情報を削除します。
  await employeeDao
    .deleteEmployee(req.body)
    .then(function (data) {
      checkResult = data.checkResult;
      messageList = data.messageList;
      //会員管理に社員情報を保存します。
      return userDao.deleteEmployee(req.body);
    })
    .then(function (items) {
      userResponse = items;
      //社員テーブルから社員情報を取得します。
      return employeeDao.selectEmployeeAll();
    })
    .then(function (items) {
      employeeResponse = items;
      //役職テーブルから役職情報を取得します。
      return postDao.selectPostAll();
    })
    .then(function (items) {
      postResponse = items;
      //返却用のdata
      var data = {
        employeeResponse: employeeResponse,
        postResponse: postResponse,
        checkResult: checkResult,
        messageList: messageList,
      };
      res.status(200).json(data);
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
});
//役職情報を削除します。
app.post("/deletePost", async function (req, res) {
  var employeeResponse = {};
  var postResponse = {};
  var checkResult = false;
  var messageList = [];
  //TODO 入力チェック

  //役職テーブルから役職情報を削除します。
  await postDao
    .deletePost(req.body)
    .then(function (data) {
      checkResult = data.checkResult;
      messageList = data.messageList;
      //社員テーブルから社員情報を取得します。
      return employeeDao.selectEmployeeAll();
    })
    .then(function (items) {
      employeeResponse = items;
      //役職テーブルから役職情報を取得します。
      return postDao.selectPostAll();
    })
    .then(function (items) {
      postResponse = items;
      //返却用のdata
      var data = {
        employeeResponse: employeeResponse,
        postResponse: postResponse,
        checkResult: checkResult,
        messageList: messageList,
      };
      res.status(200).json(data);
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
});
module.exports = app;
