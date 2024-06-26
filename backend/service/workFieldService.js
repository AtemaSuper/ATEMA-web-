const express = require("express");
const app = express();

//現場Logic
const WorkFieldLogic = require("../logic/workFieldLogic");
var workFieldLogic = new WorkFieldLogic();
//客先テーブル
const ClientFieldDao = require("../middle/dao/clientFieldDao");
var clientFieldDao = new ClientFieldDao();
//現場テーブル
const WorkFieldDao = require("../middle/dao/workFieldDao");
var workFieldDao = new WorkFieldDao();
//現場詳細テーブル
const WorkFieldDetailDao = require("../middle/dao/workFieldDetailDao");
var workFieldDetailDao = new WorkFieldDetailDao();
//共通変数
var clientFieldResponse = [];
var workFieldResponse = [];
var workFieldDetailResponse = [];
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
 * 現場詳細情報取得処理
 *
 * @param {string} contractorId 会社IDです。
 * @returns
 */
const selectWorkFieldDetailAll = function (contractorId) {
  return new Promise(function (resolve, reject) {
    workFieldDetailDao
      .selectWorkFieldDetailAll(contractorId)
      .then(function (items) {
        workFieldDetailResponse = items;
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
const checkClientFieldExistsData = function (contractorId, param) {
  return new Promise(function (resolve, reject) {
    selectClientFieldAll(contractorId)
      .then(function (items) {
        return workFieldLogic.checkClientFieldExistsData(param, items);
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
 * 現場情報存在チェック処理
 *
 * @param {string} contractorId 会社IDです。
 * @param {string} param パラメータです。
 * @returns
 */
const checkWorkFieldExistsData = function (contractorId, param) {
  return new Promise(function (resolve, reject) {
    selectWorkFieldAll(contractorId)
      .then(function (items) {
        return workFieldLogic.checkWorkFieldExistsData(param, items);
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
 * 現場詳細編集画面のService
 */
//現場詳細編集の初期表示処理です。
app.post("/", async function (req, res) {
  const promises = [];
  promises.push(selectClientFieldAll(req.body.contractorId));
  promises.push(selectWorkFieldAll(req.body.contractorId));
  promises.push(selectWorkFieldDetailAll(req.body.contractorId));
  Promise.all(promises)
    .then(function () {
      //返却用のdata
      var data = {
        clientFieldResponse: clientFieldResponse,
        workFieldResponse: workFieldResponse,
        workFieldDetailResponse: workFieldDetailResponse,
      };
      //dataをレスポンスで返却します。
      res.status(200).json(data);
    })
    .catch(function (err) {
      err = workFieldLogic.createErrorResponse(err);
      res.status(err.status).json(err);
    });
});
//現場詳細編集の入力情報を保存します。
app.post("/save", async function (req, res) {
  var isNew = req.body.workFieldDetailId == ""; //true：新規追加、false：更新
  const promises = [];
  promises.push(workFieldLogic.checkInputData(req.body));
  promises.push(
    workFieldLogic.checkExistsData(req.body.contractorId, req.body, isNew)
  );
  promises.push(checkClientFieldExistsData(req.body.contractorId, req.body));
  promises.push(checkWorkFieldExistsData(req.body.contractorId, req.body));
  Promise.all(promises)
    .then(function () {
      //現場詳細テーブルに現場詳細情報を保存します。
      return workFieldDetailDao.saveWorkFieldDetail(req.body);
    })
    .then(function (items) {
      checkResult = items.checkResult;
      messageList = items.messageList;
      const promises2 = [];
      promises2.push(selectClientFieldAll(req.body.contractorId));
      promises2.push(selectWorkFieldAll(req.body.contractorId));
      promises2.push(selectWorkFieldDetailAll(req.body.contractorId));
      Promise.all(promises2);
    })
    .then(function () {
      //返却用のdata
      var data = {
        clientFieldResponse: clientFieldResponse,
        workFieldResponse: workFieldResponse,
        workFieldDetailResponse: workFieldDetailResponse,
        checkResult: checkResult,
        messageList: messageList,
      };
      res.status(200).json(data);
    })
    .catch(function (err) {
      err = workFieldLogic.createErrorResponse(err);
      res.status(err.status).json(err);
    });
});
//現場詳細編集の入力情報を削除します。
app.post("/delete", async function (req, res) {
  //現場詳細テーブルから現場詳細情報を削除します。
  await workFieldDetailDao
    .deleteWorkFieldDetail(req.body)
    .then(function (items) {
      checkResult = items.checkResult;
      messageList = items.messageList;
      const promises = [];
      promises.push(selectClientFieldAll(req.body.contractorId));
      promises.push(selectWorkFieldAll(req.body.contractorId));
      promises.push(selectWorkFieldDetailAll(req.body.contractorId));
      Promise.all(promises);
    })
    .then(function () {
      //返却用のdata
      var data = {
        clientFieldResponse: clientFieldResponse,
        workFieldResponse: workFieldResponse,
        workFieldDetailResponse: workFieldDetailResponse,
        checkResult: checkResult,
        messageList: messageList,
      };
      res.status(200).json(data);
    })
    .catch(function (err) {
      err = workFieldLogic.createErrorResponse(err);
      res.status(err.status).json(err);
    });
});
module.exports = app;
