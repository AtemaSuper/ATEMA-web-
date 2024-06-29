const express = require("express");
const app = express();

//自社員Logic
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
//共通変数
var employeeResponse = [];
var postResponse = [];
var checkResult = false;
var messageList = [];

/**
 * 社員情報取得処理
 *
 * @param {string} contractorId 会社IDです。
 * @returns
 */
const selectEmployeeAll = function (contractorId) {
  return new Promise(function (resolve, reject) {
    employeeDao
      .selectEmployeeAll(contractorId)
      .then(function (items) {
        employeeResponse = items;
        resolve(items);
      })
      .catch(function (err) {
        reject(err);
      });
  });
};

/**
 * 役職情報取得処理
 *
 * @param {string} contractorId 会社IDです。
 * @returns
 */
const selectPostAll = function (contractorId) {
  return new Promise(function (resolve, reject) {
    postDao
      .selectPostAll(contractorId)
      .then(function (items) {
        postResponse = items;
        resolve(items);
      })
      .catch(function (err) {
        reject(err);
      });
  });
};

/**
 * 会社員情報重複チェック処理
 *
 * @param {string} contractorId 会社IDです。
 * @param {string} param パラメータです。
 * @returns
 */
const checkEmployeeExistsData = function (contractorId, param) {
  return new Promise(function (resolve, reject) {
    selectEmployeeAll(contractorId)
      .then(function (items) {
        return ownWorkerAllLogic.checkEmployeeExistsData(param, items);
      })
      .then(function () {
        resolve();
      })
      .catch(function (err) {
        reject(err);
      });
  });
};

/**
 * 役職情報存在チェック処理
 *
 * @param {string} contractorId 会社IDです。
 * @param {string} param パラメータです。
 * @returns
 */
const checkPostExistsData = function (contractorId, param) {
  return new Promise(function (resolve, reject) {
    selectPostAll(contractorId)
      .then(function (items) {
        return ownWorkerAllLogic.checkPostExistsData(param, items);
      })
      .then(function () {
        resolve();
      })
      .catch(function (err) {
        reject(err);
      });
  });
};

/**
 * 自社員管理画面のService
 */
//自社員編集の初期表示処理です。
app.post("/", async function (req, res) {
  const promises = [];
  promises.push(selectEmployeeAll(req.body.contractorId));
  promises.push(selectPostAll(req.body.contractorId));
  Promise.all(promises)
    .then(function () {
      //返却用のdata
      var data = {
        employeeResponse: employeeResponse,
        postResponse: postResponse,
      };
      //dataをレスポンスで返却します。
      res.status(200).json(data);
    })
    .catch(function (err) {
      err = ownWorkerAllLogic.createErrorResponse(err);
      res.status(err.status).json(err);
    });
});

//社員編集の入力情報を保存します。
app.post("/saveEmployee", async function (req, res) {
  var isNew = req.body.employeeId == ""; //true：新規追加、false：更新
  const promises = [];
  promises.push(ownWorkerAllLogic.checkEmployeeInputData(req.body));
  promises.push(checkPostExistsData(req.body.contractorId, req.body));
  promises.push(checkEmployeeExistsData(req.body.contractorId, req.body));
  Promise.all(promises)
    .then(function () {
      // Authenticationに入力内容を登録します。
      return authentication.updateUserForFirebase(req.body, isNew);
    })
    .then(function (items) {
      if (isNew) {
        req.body.employeeId = items.employeeId;
      }
      //社員テーブルに社員情報を保存します。
      return employeeDao.saveEmployee(req.body);
    })
    .then(function (items) {
      checkResult = items.checkResult;
      messageList = items.messageList;
      // 画面の最新情報を取得します。
      const promises2 = [];
      promises2.push(selectEmployeeAll(req.body.contractorId));
      promises2.push(selectPostAll(req.body.contractorId));
      return Promise.all(promises2);
    })
    .then(function () {
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
      err = ownWorkerAllLogic.createErrorResponse(err);
      res.status(err.status).json(err);
    });
});
//役職情報を保存します。
app.post("/savePost", async function (req, res) {
  //入力値チェックします。
  await ownWorkerAllLogic
    .checkPostInputData(req.body)
    .then(function () {
      //役職テーブルに役職情報を保存します。
      return postDao.savePost(req.body);
    })
    .then(function (items) {
      checkResult = items.checkResult;
      messageList = items.messageList;
      // 画面の最新情報を取得します。
      const promises = [];
      promises.push(selectEmployeeAll(req.body.contractorId));
      promises.push(selectPostAll(req.body.contractorId));
      return Promise.all(promises);
    })
    .then(function () {
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
      err = ownWorkerAllLogic.createErrorResponse(err);
      res.status(err.status).json(err);
    });
});
//社員情報を削除します。
app.post("/deleteEmployee", async function (req, res) {
  //社員テーブルから社員情報を削除します。
  await employeeDao
    .deleteEmployee(req.body)
    .then(function (items) {
      checkResult = items.checkResult;
      messageList = items.messageList;
      //FirestoreのAuthenticationを削除します。
      return authentication.deleteUserForFirebase(req.body);
    })
    .then(function () {
      // 画面の最新情報を取得します。
      const promises = [];
      promises.push(selectEmployeeAll(req.body.contractorId));
      promises.push(selectPostAll(req.body.contractorId));
      return Promise.all(promises);
    })
    .then(function () {
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
      err = ownWorkerAllLogic.createErrorResponse(err);
      res.status(err.status).json(err);
    });
});
//役職情報を削除します。
app.post("/deletePost", async function (req, res) {
  await postDao
    .deletePost(req.body)
    .then(function (items) {
      checkResult = items.checkResult;
      messageList = items.messageList;
      // 画面の最新情報を取得します。
      const promises = [];
      promises.push(selectEmployeeAll(req.body.contractorId));
      promises.push(selectPostAll(req.body.contractorId));
      return Promise.all(promises);
    })
    .then(function () {
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
      err = ownWorkerAllLogic.createErrorResponse(err);
      res.status(err.status).json(err);
    });
});

// 以下、テスト
//FirestoreのAuthenticationを保存します。(テスト)
app.post("/testCreateAuthentication", async function (req, res) {
  await authentication
    .createUserForFirebase(req.body)
    .then(function (uid) {
      res.status(200).json(uid);
    })
    .catch(function (err) {
      err = ownWorkerAllLogic.createErrorResponse(err);
      res.status(err.status).json(err);
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
      err = ownWorkerAllLogic.createErrorResponse(err);
      res.status(err.status).json(err);
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
      err = ownWorkerAllLogic.createErrorResponse(err);
      res.status(err.status).json(err);
    });
});
module.exports = app;
