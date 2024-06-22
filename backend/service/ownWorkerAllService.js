const express = require("express");
const app = express();

//協力会社Logic
const OwnWorkerAllLogic = require("../logic/ownWorkerAllLogic");
var ownWorkerAllLogic = new OwnWorkerAllLogic();
//客先テーブル
const EmployeeDao = require("../middle/dao/employeeDao");
var employeeDao = new EmployeeDao();
//役職テーブル
const PostDao = require("../middle/dao/postDao");
var postDao = new PostDao();
//Authentication
const authenticationDao = require("../middle/dao/authenticationDao");
const authentication = new authenticationDao();

/**
 * 自社員管理画面のService
 */
//自社員編集の初期表示処理です。
app.post("/", async function (req, res) {
  var employeeResponse = {};
  var postResponse = {};
  //社員テーブルから社員情報を取得します。
  await employeeDao
    .selectEmployeeAll(req.body.contractorId)
    .then(function (items) {
      employeeResponse = items;
      //役職テーブルから役職情報を取得します。
      return postDao.selectPostAll(req.body.contractorId);
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
      console.log(err);

      res.status(500).json(err);
    });
});
//社員編集の入力情報を保存します。
app.post("/saveEmployee", async function (req, res) {
  var employeeResponse = {};
  var postResponse = {};
  var userResponse = {}; //チェック用
  var postCheckResponse = {}; //チェック用
  var checkResult = false;
  var messageList = [];
  var isNew = req.body.employeeId == ""; //true：新規追加、false：更新
  //入力値チェックします。
  await ownWorkerAllLogic
    .checkEmployeeInputData(req.body)
    .then(function () {
      //役職テーブルから役職情報を取得します。
      return postDao.selectPostAll(req.body.contractorId);
    })
    .then(function (items) {
      postCheckResponse = items;
      //入力値の存在チェックします。
      return ownWorkerAllLogic.checkPostExistsData(req.body, postCheckResponse);
    })
    .then(function () {
      //社員テーブルから社員情報を取得します。
      return employeeDao.selectEmployeeAll(req.body.contractorId);
    })
    .then(function (items) {
      userResponse = items;
      //入力値の存在チェックします。
      return ownWorkerAllLogic.checkEmployeeExistsData(req.body, userResponse);
    })
    .then(function () {
      //社員テーブルに社員情報を保存します。
      return employeeDao.saveEmployee(req.body);
    })
    .then(function (data) {
      checkResult = data.checkResult;
      messageList = data.messageList;
      req.body.employeeId = data.employeeId;
      // FirestoreのAuthentication処理
      // 電話番号を国際電話形式に変換
      req.body.telNumber = ownWorkerAllLogic.convertTelNumberForGlobal(
        req.body.telNumber1,
        req.body.telNumber2,
        req.body.telNumber3
      );
      if (isNew) {
        return authentication.createUserForFirebase(req.body);
      } else {
        return authentication.updateUserForFirebase(req.body);
      }
    })
    .then(function (data) {
      //社員テーブルから社員情報を取得します。
      return employeeDao.selectEmployeeAll(req.body.contractorId);
    })
    .then(function (items) {
      employeeResponse = items;
      //役職テーブルから役職情報を取得します。
      return postDao.selectPostAll(req.body.contractorId);
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
      console.log(err);
      //サーバー側での入力値チェックエラーです。
      if (err.messageList) {
        res.status(400).json(err);
        //サーバー側でのシステムエラーです。
      } else {
        err.checkResult = false;
        err.messageList.push(ownWorkerAllLogic.createSytemErrorMessage());
        res.status(500).json(err);
      }
    });
});
//役職情報を保存します。
app.post("/savePost", async function (req, res) {
  var employeeResponse = {};
  var postResponse = {};
  var checkResult = false;
  var messageList = [];
  //入力値チェックします。
  await ownWorkerAllLogic
    .checkPostInputData(req.body)
    .then(function () {
      //役職テーブルに役職情報を保存します。
      return postDao.savePost(req.body);
    })
    .then(function (data) {
      checkResult = data.checkResult;
      messageList = data.messageList;
      //社員テーブルから社員情報を取得します。
      return employeeDao.selectEmployeeAll(req.body.contractorId);
    })
    .then(function (items) {
      employeeResponse = items;
      //役職テーブルから役職情報を取得します。
      return postDao.selectPostAll(req.body.contractorId);
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
      console.log(err);
      //サーバー側での入力値チェックエラーです。
      if (err.messageList) {
        res.status(400).json(err);
        //サーバー側でのシステムエラーです。
      } else {
        err.checkResult = false;
        err.messageList.push(ownWorkerAllLogic.createSytemErrorMessage());
        res.status(500).json(err);
      }
    });
});
//社員情報を削除します。
app.post("/deleteEmployee", async function (req, res) {
  var employeeResponse = {};
  var postResponse = {};
  var checkResult = false;
  var messageList = [];
  //社員テーブルから社員情報を削除します。
  await employeeDao
    .deleteEmployee(req.body)
    .then(function (data) {
      checkResult = data.checkResult;
      messageList = data.messageList;
      //FirestoreのAuthenticationを削除します。
      return authentication.deleteUserForFirebase(req.body);
    })
    .then(function () {
      //社員テーブルから社員情報を取得します。
      return employeeDao.selectEmployeeAll(req.body.contractorId);
    })
    .then(function (items) {
      employeeResponse = items;
      //役職テーブルから役職情報を取得します。
      return postDao.selectPostAll(req.body.contractorId);
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
      console.log(err);
      //サーバー側での入力値チェックエラーです。
      if (err.messageList) {
        res.status(400).json(err);
        //サーバー側でのシステムエラーです。
      } else {
        err.checkResult = false;
        err.messageList.push(ownWorkerAllLogic.createSytemErrorMessage());
        res.status(500).json(err);
      }
    });
});
//役職情報を削除します。
app.post("/deletePost", async function (req, res) {
  var employeeResponse = {};
  var postResponse = {};
  var checkResult = false;
  var messageList = [];
  //役職テーブルから役職情報を削除します。
  await postDao
    .deletePost(req.body)
    .then(function (data) {
      checkResult = data.checkResult;
      messageList = data.messageList;
      //社員テーブルから社員情報を取得します。
      return employeeDao.selectEmployeeAll(req.body.contractorId);
    })
    .then(function (items) {
      employeeResponse = items;
      //役職テーブルから役職情報を取得します。
      return postDao.selectPostAll(req.body.contractorId);
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
      console.log(err);
      //サーバー側での入力値チェックエラーです。
      if (err.messageList) {
        res.status(400).json(err);
        //サーバー側でのシステムエラーです。
      } else {
        err.checkResult = false;
        err.messageList.push(ownWorkerAllLogic.createSytemErrorMessage());
        res.status(500).json(err);
      }
    });
});
//FirestoreのAuthenticationを保存します。(テスト)
app.post("/testCreateAuthentication", async function (req, res) {
  await authentication
    .createUserForFirebase(req.body)
    .then(function (uid) {
      res.status(200).json(uid);
    })
    .catch(function (err) {
      console.log(err);
      //サーバー側での入力値チェックエラーです。
      if (err.messageList) {
        res.status(400).json(err);
        //サーバー側でのシステムエラーです。
      } else {
        err.checkResult = false;
        err.messageList.push(ownWorkerAllLogic.createSytemErrorMessage());
        res.status(500).json(err);
      }
    });
});
//FirestoreのAuthenticationを更新します。(テスト)
app.post("/testUpdateAuthentication", async function (req, res) {
  await authentication
    .updateUserForFirebase(req.body)
    .then(function (uid) {
      res.status(200).json(uid);
    })
    .catch(function (err) {
      console.log(err);
      //サーバー側での入力値チェックエラーです。
      if (err.messageList) {
        res.status(400).json(err);
        //サーバー側でのシステムエラーです。
      } else {
        err.checkResult = false;
        err.messageList.push(ownWorkerAllLogic.createSytemErrorMessage());
        res.status(500).json(err);
      }
    });
});
//FirestoreのAuthenticationを削除します。(テスト)
app.post("/testDeleteAuthentication", async function (req, res) {
  await authentication
    .deleteUserForFirebase(req.body)
    .then(function (uid) {
      res.status(200).json(uid);
    })
    .catch(function (err) {
      console.log(err);
      //サーバー側での入力値チェックエラーです。
      if (err.messageList) {
        res.status(400).json(err);
        //サーバー側でのシステムエラーです。
      } else {
        err.checkResult = false;
        err.messageList.push(ownWorkerAllLogic.createSytemErrorMessage());
        res.status(500).json(err);
      }
    });
});
module.exports = app;
