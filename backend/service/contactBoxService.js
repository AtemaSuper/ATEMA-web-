const express = require("express");
const app = express();
//通知Logic
const AlertLogic = require("../logic/alertLogic");
var alertLogic = new AlertLogic();
//通知テーブル
const AlertDao = require("../middle/dao/alertDao");
var alertDao = new AlertDao();
//社員テーブル
const EmployeeDao = require("../middle/dao/employeeDao");
var employeeDao = new EmployeeDao();
//共通変数
var alertResponse = [];
var employeeResponse = [];
var checkResult = false;
var messageList = [];

/**
 * 通知情報取得処理
 *
 * @param {string} contractorId 会社IDです。
 * @returns
 */
const selectAlertAll = function (contractorId) {
  return new Promise(function (resolve, reject) {
    alertDao
      .selectAlertAll(contractorId)
      .then(function (items) {
        alertResponse = items;
        resolve(items);
      })
      .catch(function (err) {
        reject(err);
      });
  });
};

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
 * 通知画面のService
 */
//通知BOXの初期表示処理です。
app.post("/", async function (req, res) {
  const promises = [];
  promises.push(selectAlertAll(req.body.contractorId));
  promises.push(selectEmployeeAll(req.body.contractorId));
  Promise.all(promises)
    .then(function () {
      //返却用のdata
      var data = {
        alertResponse: alertResponse,
        employeeResponse: employeeResponse,
      };
      //dataをレスポンスで返却します。
      res.status(200).json(data);
    })
    .catch(function (err) {
      err = alertLogic.createErrorResponse(err);
      res.status(err.status).json(err);
    });
});

//通知BOXの入力情報を保存します。
app.post("/saveStatus", async function (req, res) {
  //通知テーブルに通知情報を保存します。
  await alertDao
    .saveStatus(req.body)
    .then(function (items) {
      checkResult = items.checkResult;
      messageList = items.messageList;
      const promises = [];
      promises.push(selectAlertAll(req.body.contractorId));
      promises.push(selectEmployeeAll(req.body.contractorId));
      return Promise.all(promises);
    })
    .then(function () {
      //返却用のdata
      var data = {
        alertResponse: alertResponse,
        employeeResponse: employeeResponse,
        checkResult: checkResult,
        messageList: messageList,
      };
      //dataをレスポンスで返却します。
      res.status(200).json(data);
    })
    .catch(function (err) {
      err = alertLogic.createErrorResponse(err);
      res.status(err.status).json(err);
    });
});

module.exports = app;
