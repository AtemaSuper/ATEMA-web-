const express = require("express");
const app = express();

//客先Logic
const ClientFieldLogic = require("../logic/clientFieldLogic");
var clientFieldLogic = new ClientFieldLogic();
//客先テーブル
const ClientFieldDao = require("../middle/dao/clientFieldDao");
var clientFieldDao = new ClientFieldDao();
//現場テーブル
const WorkFieldDao = require("../middle/dao/workFieldDao");
var workFieldDao = new WorkFieldDao();
//共通変数
var clientFieldResponse = [];
var workFieldResponse = [];
var checkResult = false;
var messageList = [];

/**
 * 客先情報取得処理
 *
 * @param {string} contractorId 会社IDです。
 * @returns
 */
const selectClientFieldAll = function (contractorId) {
  return new Promise(function (resolve, reject) {
    clientFieldDao
      .selectClientFieldAll(contractorId)
      .then(function (items) {
        clientFieldResponse = items;
        resolve(items);
      })
      .catch(function (err) {
        reject(err);
      });
  });
};

/**
 * 現場情報取得処理
 *
 * @param {string} contractorId 会社IDです。
 * @returns
 */
const selectWorkFieldAll = function (contractorId) {
  return new Promise(function (resolve, reject) {
    workFieldDao
      .selectWorkFieldAll(contractorId)
      .then(function (items) {
        workFieldResponse = items;
        resolve(items);
      })
      .catch(function (err) {
        reject(err);
      });
  });
};

/**
 * 客先情報存在チェック処理
 *
 * @param {string} contractorId 会社IDです。
 * @param {string} param パラメータです。
 * @param {string} isNew 新規かどうかです。
 * @returns
 */
const checkClientFieldExistsData = function (contractorId, param, isNew) {
  return new Promise(function (resolve, reject) {
    selectClientFieldAll(contractorId)
      .then(function (items) {
        return clientFieldLogic.checkExistsData(param, items, isNew);
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
 * 客先編集画面のService
 */
//客先編集の初期表示処理です。
app.post("/", async function (req, res) {
  const promises = [];
  promises.push(selectClientFieldAll(req.body.contractorId));
  promises.push(selectWorkFieldAll(req.body.contractorId));
  Promise.all(promises)
    .then(function () {
      //返却用のdata
      var data = {
        clientFieldResponse: clientFieldResponse,
        workFieldResponse: workFieldResponse,
      };
      //dataをレスポンスで返却します。
      res.status(200).json(data);
    })
    .catch(function (err) {
      err = clientFieldLogic.createErrorResponse(err);
      res.status(err.status).json(err);
    });
});
//客先編集(客先)の入力情報を保存します。
app.post("/saveClientField", async function (req, res) {
  const promises = [];
  promises.push(clientFieldLogic.checkClientFieldInputData(req.body));
  Promise.all(promises)
    .then(function () {
      //客先テーブルに客先情報を保存します。
      return clientFieldDao.saveClientField(req.body);
    })
    .then(function (items) {
      checkResult = items.checkResult;
      messageList = items.messageList;
      // 画面の最新情報を取得します。
      const promises2 = [];
      promises2.push(selectClientFieldAll(req.body.contractorId));
      promises2.push(selectWorkFieldAll(req.body.contractorId));
      return Promise.all(promises2);
    })
    .then(function () {
      //返却用のdata
      var data = {
        clientFieldResponse: clientFieldResponse,
        workFieldResponse: workFieldResponse,
        checkResult: checkResult,
        messageList: messageList,
      };
      res.status(200).json(data);
    })
    .catch(function (err) {
      err = clientFieldLogic.createErrorResponse(err);
      res.status(err.status).json(err);
    });
});
//客先情報を削除します。
app.post("/deleteClientField", async function (req, res) {
  //客先テーブルから客先情報を削除します。
  await clientFieldDao
    .deleteClientField(req.body)
    .then(function (items) {
      checkResult = items.checkResult;
      messageList = items.messageList;
      // 画面の最新情報を取得します。
      const promises = [];
      promises.push(selectClientFieldAll(req.body.contractorId));
      promises.push(selectWorkFieldAll(req.body.contractorId));
      return Promise.all(promises);
    })
    .then(function () {
      //返却用のdata
      var data = {
        clientFieldResponse: clientFieldResponse,
        workFieldResponse: workFieldResponse,
        checkResult: checkResult,
        messageList: messageList,
      };
      res.status(200).json(data);
    })
    .catch(function (err) {
      err = clientFieldLogic.createErrorResponse(err);
      res.status(err.status).json(err);
    });
});
//客先編集(現場)の入力情報を保存します。
app.post("/saveWorkField", async function (req, res) {
  var isNew = req.body.workFieldId == ""; //true：新規追加、false：更新
  const promises = [];
  promises.push(clientFieldLogic.checkWorkFieldInputData(req.body));
  promises.push(
    checkClientFieldExistsData(req.body.contractorId, req.body, isNew)
  );
  Promise.all(promises)
    .then(function () {
      //現場テーブルに現場情報を保存します。
      return workFieldDao.saveWorkField(req.body);
    })
    .then(function (items) {
      checkResult = items.checkResult;
      messageList = items.messageList;
      // 画面の最新情報を取得します。
      const promises2 = [];
      promises2.push(selectClientFieldAll(req.body.contractorId));
      promises2.push(selectWorkFieldAll(req.body.contractorId));
      return Promise.all(promises2);
    })
    .then(function () {
      //返却用のdata
      var data = {
        clientFieldResponse: clientFieldResponse,
        workFieldResponse: workFieldResponse,
        checkResult: checkResult,
        messageList: messageList,
      };
      res.status(200).json(data);
    })
    .catch(function (err) {
      err = clientFieldLogic.createErrorResponse(err);
      res.status(err.status).json(err);
    });
});
//現場情報を削除します。
app.post("/deleteWorkField", async function (req, res) {
  //現場テーブルから現場情報を削除します。
  await workFieldDao
    .deleteWorkField(req.body)
    .then(function (items) {
      checkResult = items.checkResult;
      messageList = items.messageList;
      // 画面の最新情報を取得します。
      const promises = [];
      promises.push(selectClientFieldAll(req.body.contractorId));
      promises.push(selectWorkFieldAll(req.body.contractorId));
      return Promise.all(promises);
    })
    .then(function () {
      //返却用のdata
      var data = {
        clientFieldResponse: clientFieldResponse,
        workFieldResponse: workFieldResponse,
        checkResult: checkResult,
        messageList: messageList,
      };
      res.status(200).json(data);
    })
    .catch(function (err) {
      err = clientFieldLogic.createErrorResponse(err);
      res.status(err.status).json(err);
    });
});
module.exports = app;
